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


##  Where do I find the 'User ID'?

The 'User ID' can be found in the ReportServer under 'User management/User Root/*Group/*', select the user name.  The number displayed in brackets next to 'Edit user' is the 'User ID'.

![User ID location](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/embedding_reports/img/20.png?raw=true "User ID location")


##  Example of the httpauthexecute.cf entry 

```
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <servlet>
   <httpauthexecute>
     <username>test</username>
     <password>test1</password>
      <registered>
        <ids>3931</ids>
        <ids>5593</ids>
        <ids>7089</ids>
        <ids>7244</ids>
         <keys/>
      </registered>
      <executeuser>
        <id>133297</id>
      </executeuser>
   </httpauthexecute>
  </servlet>
</configuration>
`

##  Additional information

Additional information can be found on page 76, 'Embedding reports without a login', of the [ReportServer Administrator Guide](https://www.dropbox.com/s/cyrrv8jpc1vctr0/Report_server_Administrator_Guide.pdf?dl=0)

