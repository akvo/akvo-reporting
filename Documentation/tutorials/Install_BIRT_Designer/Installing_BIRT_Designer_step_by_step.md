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

![Download BIRT ALL-in-One](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/10.png?raw=true)

Select the correct package for your operating system.  

In this guide we will select 'Mac OS X (Cocoa) 64-bit' version.  This installs 'Eclipse IDE for Java and Report Developers, version Luna Service Release 1 (4.4.1) onto your machine - BIRT Designer is part of this package.

![Select the correct package](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/11.png?raw=true)



[Download link](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/Install_BIRT_Designer/img/12.png?raw=true)

## Where do I find the 'Key'?

The 'Report key' can be found in the ReportServer under 'Reportmanager/Report Root/*ReportDirectory/ReportName/*', select the report name.  The name displayed to the right under the field 'key' is the 'Report key'.

![User ID location](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/embedding_reports/img/25.png?raw=true "User ID location")


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
```

![Httpauthexecute.cf](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/embedding_reports/img/30.png?raw=true "Httpauthexecute.cf")


##  Additional information

Additional information can be found on page 76, 'Embedding reports without a login', of the [ReportServer Administrator Guide](https://www.dropbox.com/s/cyrrv8jpc1vctr0/Report_server_Administrator_Guide.pdf?dl=0)

