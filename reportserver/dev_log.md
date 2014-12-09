How the reportserver was installed
==================================

Instructions generally followed
-------------------------------
> http://sourceforge.net/projects/dw-rs/files/2013-08-12-reportserver-configguide.pdf/download

Installed Tomcat7
-----------------

apt-get install tomcat7

from /etc/init.d/tomcat7:

NAME=tomcat7
# Directory where the Tomcat 6 binary distribution resides
CATALINA_HOME=/usr/share/$NAME

# Directory for per-instance configuration files and webapps
CATALINA_BASE=/var/lib/$NAME

CATALINA_BASE/conf is a soft link to /etc/tomcat7, so the server.xml there is the global config file
it opens port 8080 only

### Modified Java settings

Created /usr/share/tomcat7/bin/setenv.sh containing following line:
>	export CATALINA_OPTS="-Xmx1548M -XX:MaxPermSize=512M -Dfile.encoding=UTF8"


Installed nginx to handle ssl
-----------------------------

Sends all https traffic (port 443) to 8080

