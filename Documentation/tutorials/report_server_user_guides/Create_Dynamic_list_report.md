# ReportServer:  Creating a Dynamic List report

This guide assumes that the ReportServer has a 'datasource' called 'FLOW' containing the Akvo FLOW dataset for Ghana.

##  Configuring the list

Log in to the ReportServer and select 'Reportmanager' in the menu to the left.  Select 'Report Root' and either create a new folder in which to add your report, or select an exisiting folder.  Right click on the folder & select 'insert' and then 'Dynamic list'.

![dynamic](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/10.png?raw=true "dynamic list")

Add the report details to the 'properties' tab.  Add a report 'name' and 'key' add a short query with which to pull all data for the Ghana dataset.  (A specific sql statement can be added, of course, but if you do not know what the dataset contains, this is the easiest way to see what data you want to be able to report on). 

![reportdetails](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/11.png?raw=true "report details")


Select 'Data Source', and select the 'FLOW' datasource by browsing with the magnifying glass.

![datasource](https://github.com/akvo/akvo-reporting/blob/master/Documentation/tutorials/report_server_user_guides/img/60.png?raw=true "datasource")

Add a short query with which to pull all data for the Ghana dataset.  (A specific sql statement can be added, of course, but if you do not know what the dataset contains, this is the easiest way to see what data you want to be able to report on).  

"select *
from ghana"

![reportdetails1](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/11.png?raw=true "report details1")

Select 'apply'.

![apply](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/40a.png?raw=true "apply")

Right click on the report name to the left and select 'execute'.

![execute](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/31.png?raw=true "execute")

You will now be in the 'Report view'.  Select 'Configure list'.

![configure list](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/920.png?true=raw "configure list")

Now we need to select which columns we would like to include in our report.  Select 'select columns'. A column selection box will popup.  Double click on the column name on the left and it will be added to the column on the right.  When done select 'apply'.

![columns](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/290.png?raw=true "columns")

Select 'Preview' in the panel to the left.  You should see the below.


![preview](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/110.png?raw=true "preview")

We need to filter and configure the data to make it useful for us.  There are many options available under 'configure list'.  For example, we can set the 'identifier' column 'Aggregate' to 'Count' which provides us with a count of the pumps.

![count](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/120.png?raw=true "count")

Now when we select 'Preview' on the left we will see the 'Identifier' is providing a count instead of displaying the identifier of each pump.

![identifier](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/130.png?raw=true "identifier")





## Notes:

- To remove a selected column select 'Remove column'. 
- Column names can be added to the report by updating the 'Alias' field under 'configure list'.
- For more detailed information please see page 31, Chapter 6 'Dynamic lists' in the ReportServer userguide:  https://www.dropbox.com/s/fhu3uu9gjb0i0b8/2015-01-02-reportserver-user-guide-2.2_300.pdf?dl=0
















