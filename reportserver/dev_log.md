apt-get install tomcat7

from /etc/init.d/tomcat7:

NAME=tomcat7
# Directory where the Tomcat 6 binary distribution resides
CATALINA_HOME=/usr/share/$NAME

# Directory for per-instance configuration files and webapps
CATALINA_BASE=/var/lib/$NAME

CATALINA_BASE/conf is a soft link to /etc/tomcat7, so the server.xml there is the global config file
it opens port 8080 only
