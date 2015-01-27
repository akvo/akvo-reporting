# **Installing BIRT Designer to your local machine**

If you want to create or edit report templates you need to install BIRT Designer.  It is not possible to edit '.rptdesign' templates on the ReportServer itself.

This is something that, initially, only Report Managers are likely to need.  

The ReportServer allows for general execution and parameter selection in complex crosstab reports, as well as creation of basic list reports by users.

## Before you begin you will need the following:

- internet access
- permissions to install software to your local machine


## About BIRT

BIRT Designer is part of the BIRT project by Eclipse.  You can find out more information on their [about BIRT page](http://www.eclipse.org/birt/about/)


## Downloading BIRT All-in-One

BIRT Designer is part of the [BIRT All-in-One](http://download.eclipse.org/birt/downloads/) package.  

To download BIRT All-in-One go to http://download.eclipse.org/birt/downloads/ and select 'Download Now'.

![Download BIRT All-in-One](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/10.png?raw=true "Download BIRT All-in-One")


*Select the correct package for your operating system*.  

In this guide we will select 'Mac OS X (Cocoa) 64-bit' version.  This installs 'Eclipse IDE for Java and Report Developers, version Luna Service Release 1 (4.4.1) onto your machine - BIRT Designer is part of this package.

![Select a package](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/11.png?raw=true "Select a package")

Begin the download by selecting the green arrow or the text beside it.

![Download link](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/12.png?raw=true "Download link")

A download box will appear.  Here you can choose to download and automatically unzip upon completion OR select to save the download to a specific location on your machine.

![Box](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/14.png?raw=true "Download box")

If you chose to unzip upon completion, the directory '*eclipse*' will automatically be created within the same folder as the download.

If you chose to save the download to a specific location first, you need to locate the download and unzip it.  This will create the '*eclipse*' folder.

![Eclipse folder](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/20.png?raw=true)

Depending on your operating system and your archive utility, you may be asked to unzip the folder to a specific location.  You should unzip it to your 'Applications' or 'Programs' folder.


## Installing and running BIRT Designer

If you were not asked to unzip to a specific location, you will need to add the '*eclipse*' folder to your 'Applications' or 'Programs' folder.

![Applications](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/30.png?raw=true "Applications")


To start BIRT Designer open the '*eclipse*' folder and double click on the application file.

- Mac OS = *eclipse.app*
- Windows = *eclipse.exe*

![Eclipse Application](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/40.png?raw=true "Eclipse applicaiton file")


Mac users may be presented with the below.  Please select 'Open'.

![Open](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/50.png?raw=true "Open")


BIRT Designer will start up the 'Workspace Launcher'.  The folder which you set here will be your BIRT working folder.  All of your projects, templates and resources will be stored here so make a note of where it is located.

![Workspace location](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/60.png?raw=true "Workspace location")


Select 'Use this as default and do not ask again'.

![Select](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/70.png?raw=true "Select default")

Select 'Ok'.

![Ok](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/80.png?raw=true "Ok")

The first time you run '*eclipse.app*' or '*eclipse.exe*', Eclipse will start up.  Once you have followed these next steps BIRT Designer will always startup in the 'Report Design' view.

Select 'Workbench', top right, to open BIRT Designer.

![Eclipse](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/90.png?raw=true "eclipse")


##  Setting the Perspective

'Perspective' is just Eclipse lingo for 'view'.

BIRT Designer starts up in the 'Project Explorer' perspective.

To set it to the 'Report Design' perspective select the grid+ 'open perspective' icon, top right.

![Perspective](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/100.png?raw=true "perspective")

Select 'Report Design' from the dropdown list.

![Report design](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/111.png?raw=true 'Report design')


Congratulations!  BIRT Designer is now running on your machine.


##  Notes

### Create a Windows Shortcut

- From the desktop, right click, choose New -> Shortcut.
-  For location, enter "C:\Program Files\eclipse\eclipse.exe" (without quotes.)
-  Click Next
-  Enter "Eclipse" for the shortcut name.

### JDBC Drivers

You will likely want to use your own JDBC driver with BIRT. Use the data source editor's JDBC driver management wizard. To start the wizard, open a BIRT report design, go to the Data Explorer view, right click on "Data Sources" and select "New Data Source". Choose "JDBC Data Source" and click "Next". In the next dialog, choose "Manage Drivers..." to bring up the "Manage JDBC Drivers" dialog.
In the "JAR Files" tab, click on "Add..." to add the JAR file required by your JDBC driver. Then go to the "Driver" tab to confirm that the list of drivers includes the new drivers added. You may also want to assign a display name and URL template for the new drivers in this tab.


### Updating a BIRT Installation

If you have a version of BIRT installed, and want to install a newer version, do the following: 
- Close Eclipse.
- Locate your Eclipse plugins directory. If you installed on Windows in the default location, this is "C:\program files\eclipse\plugins".
- Delete all directories that start with "org.eclipse.birt".
- Download and install BIRT as described in the BIRT section above.
- Restart Eclipse with the -clean option: eclipse -clean

## Common Problems

Some problems are due to cached information within Eclipse. Eclipse caches information about plugins for faster startup. Adding BIRT as we did above may result in stale cached information. Symptoms of this problem include: 

- The BIRT perspective does not appear in Eclipse.
- You receive "An error occurred" dialogs when opening reports or using the BIRT UI.

###Cleaning Cached Plugin Information

- The solution is to clean up the cached information. The recommended practice is to start Eclipse with the -clean option:
eclipse –clean

####Cleaning the Cache on Windows

If you are on Windows, and are not familiar with how to invoke Eclipse from the command line, do the following: 
- Choose Start->All Programs->Accessories->Command Prompt
- Move to the directory where you installed eclipse. If you installed Eclipse in the standard location, enter:
cd "\Program Files\eclipse"
- Run Eclipse with the -clean option:
eclipse -clean
- Eclipse will restart. Again check for the BIRT perspective.

## Additional installation information

http://eclipse.org/birt/documentation/install.php
