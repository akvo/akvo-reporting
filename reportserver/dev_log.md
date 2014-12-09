How the reportserver was installed
==================================

## Instructions generally followed ##

    http://sourceforge.net/projects/dw-rs/files/2013-08-12-reportserver-configguide.pdf/download

## Installed Tomcat7 ##

apt-get install tomcat7

from /etc/init.d/tomcat7:

    NAME=tomcat7
    # Directory where the Tomcat 6 binary distribution resides
    CATALINA_HOME=/usr/share/$NAME
    # Directory for per-instance configuration files and webapps
    CATALINA_BASE=/var/lib/$NAME

$CATALINA_BASE/conf is a soft link to /etc/tomcat7, so the server.xml there is the global config file.

Default config opens port 8080 only.


### Modified Java settings

Created /usr/share/tomcat7/bin/setenv.sh containing following line:

    export CATALINA_OPTS="-Xmx1548M -XX:MaxPermSize=512M -Dfile.encoding=UTF8"


## Installed nginx to handle ssl ##

Sends all https traffic (port 443) to 8080

## Install Reportserver ##

Downloaded 201 MB of zip archive of the latest stable report server

    wget http://sourceforge.net/projects/dw-rs/files/bin/2.1/RS2.1.6-5543-reportserver.zip/download

Stopped Tomcat

    /etc/init.d/tomcat7 stop

unzipped files into /var/lib/tomcat/webapps/reportserver/

PostgreSQL 9.4rc1 was already installed, and running on the normal port, 5432:

    psql --version

Found a postgresql-9.1-901.jdbc4.jar that came with rs in the WEB-INF/lib and decided to test using that db driver.

Otherwise I would have fetched http://jdbc.postgresql.org/download/postgresql-9.3-1102.jdbc41.jar

(which I found on http://jdbc.postgresql.org/download.html)

## Set up the DB ##

I located the appropriate datbase creation script:

    webapps/reportserver/ddl/reportserver-RS2.1.6-5543-schema-PostgreSQL_CREATE.sql

The database name can be anything.

    sudo -u postgres psql
    postgres=# \l
    
showed no database named "reportserver", so I chose that.

    sudo -u postgres psql
    postgres=# create user foo encrypted password 'bar';
    postgres=# create database reportserver with encoding 'UTF8' TEMPLATE template0 owner foo;
    
Connect to new db, as user foo.
Default connection is unix socket, where user name is taken from uniz user.
Instead we explicitly use an IP socket so password auth is allowed:

    psql --username=foo --password --dbname=reportserver --host localhost
    postgres=# \i reportserver-RS2.1.6-5543-schema-PostgreSQL_CREATE.sql

Tables and sequences were all owned by 'foo'.

## Connect reportserver to the DB ##

edit `webapps/reportserver/WEB-INF/classes/META-INF/persistence.xml` like this:

    <property name="hibernate.connection.url" value="jdbc:postgresql://localhost/reportserver" />
    <property name="hibernate.connection.driver_class" value="org.postgresql.Driver" />
    <property name="hibernate.connection.username" value="foo" />
    <property name="hibernate.connection.password" value="bar" />
    <property name="hibernate.dialect" value="org.hibernate.dialect.PostgreSQLDialect" />



