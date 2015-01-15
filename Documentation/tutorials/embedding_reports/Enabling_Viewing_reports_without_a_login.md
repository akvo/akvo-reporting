# **Enabling viewing of reports on ReportServer without a login**

To allow users to view report results without a login to the ReportServer you need to make use of 'httpauthexport'.
The details for the connection are setup in the ReportServer file 'httpauthexecute.cf'.

## Before you begin you will need to have the following:

- All report ids for reports required to be executed
- The userid of the ReportUser account which will execute the report
- A dummy username/password for allowing the report to execute via a url
- Access to configure the httpauthexecute.cf file

## How to view the result

The URL is constructed as follows:
http://SERVER:PORT/reportserverbasedir/reportserver/httpauthexport

An example of how the URL would look for Akvo:

https://reporting.akvo.org/reportserver/reportserver/httpauthexport?id=39461&format=html&user=test&password=test1


## Where do I find the 'Report ID'?

The 'Report ID' can be found in the ReportServer under 'Reportmanager/Report Root/*ReportDirectory/ReportName/*', select the report name.  The number displayed in brackets next to 'edit Eclipse Birt report' is the 'Report ID'.

![Report ID location](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/embedding_reports/img/10.png?raw=true "Report ID location")


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
        <ids>39461</ids>
         <keys/>
      </registered>
      <executeuser>
        <id>133297</id>
      </executeuser>
   </httpauthexecute>
  </servlet>
</configuration>
```






Additional information can be found on page 76, 'Embedding reports without a login', of the <p>ReportServer Administrator Guide="https://www.dropbox.com/s/cyrrv8jpc1vctr0/Report_server_Administrator_Guide.pdf?dl=0"</a>.</p>
