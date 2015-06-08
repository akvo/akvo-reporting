# Setup of ReportServer with Eclipse

###Prerequisites

Java. RS needs jdk 7.

A database. I'm using Postgres, installded on my Mac via homebrew. You need to run the SQL from the [RS 2.2.2 dist](http://downloads.sourceforge.net/project/dw-rs/bin/2.2/RS2.2.2-5639-reportserver.zip). In the dist find the appropriate SQL script in the ddl folder. (Older versions of SQL are not compatible with the workspace sources.)

###Setup

Create a new workspace.

[Install Groovy for Eclipse](http://dist.springsource.org/release/GRECLIPSE/e4.4/) I do this via **Help > Install new software...**. YMMV.

Add GWT. I installed GWT same as Groovy using [this link](https://dl.google.com/eclipse/plugin/4.4). DW then told me RS needs GWT 2.5.1, so in **Eclipse > Preferences > Google > Web Toolkit** I selected the downloaded http://google-web-toolkit.googlecode.com/files/gwt-2.5.1.zip 

Get existing workspace files from DW for RS [here](http://www2.datenwerke.net/tmp/rs-222-workspace.zip). Import as existing projects into workspace.

Edit ReportServer/src/META-INF/persistence.xml to match your DB setup.

From the RS dist, grab the baseconfig-RS2.2.2-... file from the pkg folder. To get all RS settings in place you need put baseconfig-RS2.2.2-... in the ReportServer/war/pkg folder.

You should now have all you need to try run RS. In the Package explorer, find the ReportServer package, drill down to src/net.datewerke.rs/ReportServer.gwt.xml and right click on it. In the popup choose **Run as > Web application**. When prompted choose the ReportServer.html file and find the war dir in the ReportServer package.

If all goes well, you should now get the project to build, but might still bork because of low memory settings. So halt the running and right click again on the ReportServer.gwt.xml file, this time choosing **Run as > Run configurations...** Here find the Arguments tab and change -Xmx512m to -Xmx4g or some such depending on available memory. Up to jdk 7 you will also need -XX:MaxPermSize=512m. Then do Run as/Web application again. 

You should now be able to get to RS at http://127.0.0.1:8888/ReportServer.html

Finally to set all the RS configurations when logged in to RS, bring up a terminal (CTRL-ALT-T) and enter **pkg install -d baseconfig-RS2.2.2-...** Check by looking in the Administration > File system to see that it's been populated.