# Jasper Reports dev log

## Installing and setup

#### Set up a Jasper Server

Follow [these](http://www.idryman.org/blog/2014/02/26/setting-up-jasper-server-on-linux/) instuctions to set up a server on an RSR vagrant box. Currently at step 10 (inclusive), but haven't tested or used it.

### Jasper Studio

[Download](http://community.jaspersoft.com/download) Jaspersoft Studio v5.6.2 for Mac. Use [this](http://community.jaspersoft.com/questions/825596/jaspersoft-aws-ssh-connection-mysql) answer to hook up an RSR DB running on the vagrant box. Use [this](https://community.jaspersoft.com/questions/541671/problem-jdbc-mysql-connections) to add a MySQL DB connector. 


### Jasper server API play

Wiggling out a PDF using the following steps:

GET [http://localhost:8080/jasperserver/rest_v2/resources](http://localhost:8080/jasperserver/rest_v2/resources), HTTP headers: ```Accept: application/json``` returns all the available resources like so:

```
{
   "resourceLookup":
   [
       {
           "version": 0,
           "permissionMask": 1,
           "creationDate": "2014-11-06T16:42:34",
           "updateDate": "2013-10-21T21:26:09",
           "label": "Accounts Report",
           "description": "All Accounts Report",
           "uri": "/reports/samples/AllAccounts",
           "resourceType": "reportUnit"
       },
       {
           "version": 0,
           "permissionMask": 1,
           "creationDate": "2014-11-06T16:42:33",
           "updateDate": "2014-09-08T23:16:34",
           "label": "Analysis Components",
           "description": "Analysis Components",
           "uri": "/analysis",
           "resourceType": "folder"
       },
       ...
       {
           "version": 1,
           "permissionMask": 1,
           "creationDate": "2014-11-13T10:20:33",
           "updateDate": "2014-11-13T10:24:23",
           "label": "RSR simple report",
           "description": "",
           "uri": "/reports/Blank_A4_2",
           "resourceType": "reportUnit"
       },
       ...
    ]
}
```

Here we see the RSR simple report and the URI is ```/reports/Blank_A4_2```.

Using this info we POST to [http://localhost:8080/jasperserver/rest_v2/reportExecutions](http://localhost:8080/jasperserver/rest_v2/reportExecutions) with basic HTTP auth header for the jasperadmin acount, along with ```Content-Type: application/xml``` and ```Accept: application/json``` the following XML blob:

```
<reportExecutionRequest>
    <reportUnitUri>/reports/Blank_A4_2</reportUnitUri>
    <async>true</async>
    <freshData>true</freshData>
    <saveDataSnapshot>false</saveDataSnapshot>
    <outputFormat>pdf</outputFormat>
    <interactive>true</interactive>
    <ignorePagination>true</ignorePagination>    
</reportExecutionRequest>
```

where we specify the URI in &lt;reportUnitUri&gt; and set PDF as the &lt;outputFormat&gt;.

Now there's a little dance to actually get the report. The reason for this is that generating the PDF might take some time, and we can't download it before it's ready. 

TODO: There is an *interactive* parameter in the XML, check if setting it to false lets you wait for the PDF creation in the request (Not that this necessarily is a good idea...)

The response to the POST looks like this:

```
    {
       "status": "queued",
       "requestId": "9c2bd1d2-a70d-4c20-ad68-755b11a0de02",
       "reportURI": "/reports/Blank_A4_2",
       "exports":
       [
           {
               "id": "b381ca75-c3d4-487b-8d50-a4452aac4b8b",
               "status": "queued"
           }
       ]
    }


```

Here we see a requestID and an exports.id. We also see that the export is queued. We can now inquire about the status of the report generation using GET [http://localhost:8080/jasperserver/rest_v2/reportExecutions/9c2bd1d2-a70d-4c20-ad68-755b11a0de02/status/](http://localhost:8080/jasperserver/rest_v2/reportExecutions/9c2bd1d2-a70d-4c20-ad68-755b11a0de02/status/) using the requestID in the request. Supplying ```Accept: application/json``` in this request returns:

```
    {
       "value": "ready"
    }
```

There is also a more detailed response using [http://localhost:8080/jasperserver/rest_v2/reportExecutions/9c2bd1d2-a70d-4c20-ad68-755b11a0de02](http://localhost:8080/jasperserver/rest_v2/reportExecutions/9c2bd1d2-a70d-4c20-ad68-755b11a0de02) (Just skip /status/) looking like this:

```
    {
       "status": "ready",
       "totalPages": 1,
       "requestId": "9c2bd1d2-a70d-4c20-ad68-755b11a0de02",
       "reportURI": "/reports/Blank_A4_2",
       "exports":
       [
           {
               "id": "b381ca75-c3d4-487b-8d50-a4452aac4b8b",
               "status": "ready",
               "outputResource":
               {
                   "contentType": "application/pdf",
                   "fileName": "Blank_A4_2.pdf",
                   "outputFinal": true
               }
           }
       ]
    }
```

I think this resource is more useful when the format is more complex, like HTML or a JS chart etc.

Ok, the report's been generated, let's get it.

Using both the requestID and the exports.id we call GET [localhost:8080/jasperserver/rest_v2/reportExecutions/9c2bd1d2-a70d-4c20-ad68-755b11a0de02/exports/b381ca75-c3d4-487b-8d50-a4452aac4b8b/outputResource](localhost:8080/jasperserver/rest_v2/reportExecutions/9c2bd1d2-a70d-4c20-ad68-755b11a0de02/exports/b381ca75-c3d4-487b-8d50-a4452aac4b8b/outputResource)

and get ourselves a PDF!

To summarize (skipping the base Jasper server URI, e.g. http://localhost:8080/jasperserver):

 * [/rest_v2/resources](/rest_v2/resources) lists the server's resources.
 * POST to [/rest_v2/reportExecutions](/rest_v2/reportExecutions) the XML spec for the report you want
 * Using the ```requestID``` returned by the POST, chck that the report is ready calling [/rest_v2/reportExecutions/{requestId}/status/](/rest_v2/reportExecutions/{requestId}/status/)
 * Finally get the report calling GET [/rest_v2/reportExecutions/{requestId}/exports/{exports.id}/outputResource](/rest_v2/reportExecutions/{requestId}/exports/{exports.id}/outputResource)


### Installing the server

* ```apt-get install nano```
* ```apt-get install aptitude```
* ```aptitude install openjdk-7-jdk```
* add ```JAVA_HOME="/usr/lib/jdk/java-1.7.0-openjdk-amd64"``` to /etc/environment (source: [http://askubuntu.com/questions/175514/how-to-set-java-home-for-openjdk](http://askubuntu.com/questions/175514/how-to-set-java-home-for-openjdk))
* add ```CATALINA_HOME="/usr/share/tomcat7"``` to /etc/environment (source: [https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-on-ubuntu-12-04](https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-on-ubuntu-12-04))
* add two dirs that seem to make tomcat sad if they're missing:
  * ```mkdir /usr/share/tomcat7/logs```
  * ```mkdir /usr/share/tomcat7/temp```
* source /etc/environment and start tomcat using ```$CATALINA_HOME/bin/startup.sh```
* check if there's a cat at [http://sub.domain.tld:8080](http://sub.domain.tld:8080)
* Put ```deb http://apt.postgresql.org/pub/repos/apt/ squeeze-pgdg main 9.4``` into /etc/apt/sources.list.d/pgdg.list (source: [http://www.postgresql.org/about/news/1524/](http://www.postgresql.org/about/news/1524/))
* after ```aptitude update``` do ```aptitude install postgresql-9.4 postgresql-contrib-9.4```
* assume the postgres user: ```sudo su – postgres```
* create a jasper user: ```createuser -P -d -e jasper``` set the password to "password" when prompted. The actual command executed is ```CREATE ROLE jasper PASSWORD 'md54cf2b7305505a9954c915945467bb6b1' NOSUPERUSER CREATEDB NOCREATEROLE INHERIT LOGIN;```.
* download [the jasper server archive](), rename it to jasperreports-server-cp-5.6.1, move it to /opt an unzip (needs ```aptitude install unzip```)
* copy /opt/jasperreports-server-cp-5.6.1/buildomatic/sampl_conf/postgresql_master.properties to /opt/jasperreports-server-cp-5.6.1/buildomatic/default_master.properties and edit it to this: 

```
################################################################################
#                                                                              #
# Master Properties File                                                       #
#                                                                              #
# Standard usage is to rename this file to default_master.properties.          #
# It should be placed in the root of the buildomatic directory, like:          #
#                                                                              #
#     <js-install>/buildomatic/default_master.properties                       #
#                                                                              #
# There is one sample property file for each database type. Sample property    #
# files are found in:                                                          #
#                                                                              #
#     <js-install>/buildomatic/sample_conf                                     #
#                                                                              #
################################################################################

################################################################################
#                                                                              #
# Installation Settings                                                        #
#                                                                              #
# Set values for:                                                              #
#                                                                              #
#   1) Application server type                                                 #
#                                                                              #
#   2) Path to application server home directory                               #
#                                                                              #
#   3) Database location and connection settings                               #
#                                                                              #
################################################################################

appServerType = tomcat7
# appServerType = tomcat5
# appServerType = tomcat6
# appServerType = jboss
# appServerType = jboss-eap-6
# appServerType = jboss-as-7
# appServerType = glassfish2
# appServerType = glassfish3
# appServerType = skipAppServerCheck

# Tomcat app server root dir
# appServerDir = C:\\Program Files\\Apache Software Foundation\\Tomcat 7.0
# appServerDir = /usr/share/tomcat7
# if linux package managed tomcat instance, set two properties below
CATALINA_HOME = /usr/share/tomcat7
CATALINA_BASE = /var/lib/tomcat7

# JBoss app server root dir
# appServerDir = C:\\jboss-5.1.0
# appServerDir = /home/devuser/jboss-5.1.0
# appServerDir = /usr/bin/jboss
# jboss.profile = default

# Glassfish app server root dir
# appServerDir = C:\\glassfish-3.1.2
# appServerDir = /home/devuser/glassfish-3.1.2
# appServerDir = /usr/bin/glassfish

# database type
dbType=postgresql

# database location and connection settings

dbHost=localhost
dbUsername=jasper
dbPassword=password


# additional database parameters
# (uncomment these if you want non-default settings)

# dbPort=5432

# JasperServer db name, sample db names
# js.dbName=jasperserver
# sugarcrm.dbName=sugarcrm
# foodmart.dbName=foodmart

# web app name
# (set one of these to deploy to a non-default war file name)
webAppNameCE = jasper
# webAppNamePro = jasperserver-pro


################################################################################
#                                                                              #
# Additional Settings                                                          #
#                                                                              #
# Set values for:                                                              #
#                                                                              #
#   1) Setup Alternate JDBC Driver                                             #
#                                                                              #
#   2) Skip JDBC Driver Deploy                                                 #
#                                                                              #
#   3) Modify Diagnostic JMX Configurations                                    #
#                                                                              #
#   4) AWS Data Source Settings                                                #
#                                                                              #
#   5) Glassfish Application Server Settings                                   #
#                                                                              #
#   6) Report Scheduler Email Properties                                       #
#                                                                              #
#   7) Encryption Settings                                                     #
#                                                                              #
#   8) Override PostgreSQL default Locale on DB Creation                       #
#                                                                              #
#   9) External Authentication Data Sources                                    #
#                                                                              #
################################################################################

# 1) Setup Alternate JDBC Driver
#
# Uncomment and modify the value in order to change the default
# Driver will be found here: <path>/buildomatic/conf_source/db/postgresql/jdbc
#
# maven.jdbc.groupId=postgresql
# maven.jdbc.artifactId=postgresql
# maven.jdbc.version=9.2-1002.jdbc4


# 2) Skip JDBC Driver Deploy
#
# Uncomment and modify the value in order to change the default
# Flag used to skip JDBC driver deploying during deployment process
#
# deployJDBCDriver=false


# 3) Modify Diagnostic JMX Configurations
#
# Current default settings are shown as the property values below
# Uncomment and modify the value in order to change the default
#
# Diagnostic server: false uses Jaspersoft built in server, true to supply your own
# diagnostic.jmx.usePlatformServer = false
#
# change this value if you have more than one app server on same machine running JRS
# diagnostic.jmx.port = 10990
#
# change this if you have more than one instance of JRS on the same app server
# diagnostic.jmx.name = jasperserver
#
# change this to your RMI registry host name or IP, if you use a separate one
# diagnostic.jmx.rmiHost = localhost


# 4) AWS Data Source Settings
#
# Current default settings are shown as the property values below
# Uncomment and modify the value in order to change the default
#
# Change this value if you want to disable the AWS Data Source security group creation
# This group will allow your instace have access to target AWS data source instance
# aws.db.security.group.changes.enabled=true
#
# Db Security Group Name. Need to be overridden if server (where instance is running)
# is out of scope Amazon to have unique group name for this server.
# aws.db.security.group.name=JRSSecurityGroup
#
# Change this value to have a specific description
# aws.db.security.group.description=Jasper Report Server Security Group
#
# Provide the server IP address if your server is outside Amazon
# This is the Ingress Public IP address of server that will be added in the
# DB Security Group to have access to target AWS data source instance
# aws.db.security.group.ingressPublicIp=


# 5) Glassfish Application Server Settings
#
# Current default settings are shown as the property values below
# Uncomment and modify the value in order to change the default
#
# Glassfish domain name (default is domain1)
# glassfishDomain=domain1
#
# Glassfish domain port (default is 4848), user (default is admin) and password.
# glassfishPort=4848
# glassfishUser=admin
# AS_ADMIN_PASSWORD=adminadmin


# 6) Report Scheduler Email Properties
#
# Current default settings are shown as the property values below
# Uncomment and modify the value in order to change the default
#
# These properties control the configuration of the Report Scheduler functionality.
# The standard default application server http ports are the following: tomcat 8080,
# jboss 8080, glassfish 4848, weblogic 7001, websphere 9080
# These values will show up in the file WEB-INF/js.quartz.properties
#
# quartz.mail.sender.host=mail.localhost.com
# quartz.mail.sender.port=25
# quartz.mail.sender.protocol=smtp
# quartz.mail.sender.username=admin
# quartz.mail.sender.password=password
# quartz.mail.sender.from=admin@localhost.com
# quartz.web.deployment.uri=http://localhost:8080/jasperserver-pro


# 7) Encryption Settings
#
# For encryption of buildomatic passwords: only encrypt=true is required. The rest of the
# properties are going to be set to defaults below. One could also choose to modify those
# properties but only for the first encrypt=true build pass.
#
# Note: JNDI password decryption in context.xml only works for Tomcat (and tcServer). Other
# servers should handle their own container encryption. For eg., for jboss, after encrypt=true
# install run, js-jdbc-ds.xml gets the encrypted password values. If the intention was to encrypt
# buildomatic only, the admin must reset the password to plain text ones in JBoss or use internal
# JBoss encryption. Also, see the JasperReports Server Admin Guide for a full description.
#
# encrypt=true
# build.key.algo=AES
# build.key.size=128
# enc.transformation=AES/CBC/PKCS5Padding
# enc.block.size=16
# propsToEncrypt=dbPassword


# 8) Override PostgreSQL default Locale on DB Creation
#
# When the 'jasperserver' repository database is created under Linux, the default
# locale is used from PostgreSQL. PostgreSQL sets this locale when it is installed
# and initialized. If the PostgreSQL locale does not support UTF-8 encoding then
# JasperServer will have trouble with the database creation. The 'jasperserver'
# database should have UTF-8 encoding in order to fully support language
# internationalization. The PostgreSQL default locale can be overridden by using
# the properties below in order to specify a locale that supports UTF-8 encoding.
#
# Uncomment the properties below to specify a particular Locale
#
db.set.lc_collate=en_US.utf8
db.set.lc_ctype=en_US.utf8

# 9) External Authentication Data Sources
#
# Configure external LDAP context source or external database datasource here in order to be able
# to encrypt the passwords.
#
# external.jdbcDriverClass=com.mysql.jdbc.Driver
# external.jdbcUrl=jdbc:mysql://localhost:3306/EXTERNAL_DB
# external.dbUsername=externalUsername
# external.dbPassword=password
#
# external.ldapUrl=ldap://localhost:389/o=External_LDAP_Org
# external.ldapDn=cn=Manager,o=External_LDAP_Org
# external.ldapPassword=secret

# TODO: KEEP THIS PROPERTY LAST
# dummy property to temporarily fix bug 33916.
# Without this property, the last comments in master property file are removed,
# when buildomatic is encrypted (encrypt=true).
# The permanent fix will be to upgrade buildomatic/target to commons-configuration 2.0.
# http://commons.apache.org/proper/commons-configuration/download_configuration.cgi
# Original Apache bug https://issues.apache.org/jira/browse/CONFIGURATION-525
preserve_master_properties_footer_comments_when_encrypting_buildomatic=true
```
 * stop tomcat: ```/etc/init.d/tomcat7 stop```
 

