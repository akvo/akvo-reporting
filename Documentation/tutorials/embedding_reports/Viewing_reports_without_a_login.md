# **Viewing reports on ReportServer without a login**

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

The 'Report ID' can be found in the ReportServer under 'Report Manager/Report Root/*ReportDirectory/ReportName*'

akvo-reporting/Documentation/tutorials/embedding_reports/img/10.png






Additional information can be found on page 76, 'Embedding reports without a login', of the <p>ReportServer Administrator Guide="https://www.dropbox.com/s/cyrrv8jpc1vctr0/Report_server_Administrator_Guide.pdf?dl=0"</a>.</p>
