How the reportserver was installed
==================================

## Instructions generally followed ##

    http://sourceforge.net/projects/dw-rs/files/2013-08-12-reportserver-configguide.pdf/download

## Installed Tomcat7 ##
-----------------

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

Observed server runs psql 9.4rc1

    pgsql --version

Found a postgresql-9.1-901.jdbc4.jar in the WEB-INF/lib and decided to test using that db driver.

Otherwise I would have fetched `http://jdbc.postgresql.org/download/postgresql-9.3-1102.jdbc41.jar`

(which I found on http://jdbc.postgresql.org/download.html)

## Set up the DB ##

PostgreSQL was already installed.

    sudo -u postgres psql
    \l
    
showed no database named reportserver, so I chose that.





