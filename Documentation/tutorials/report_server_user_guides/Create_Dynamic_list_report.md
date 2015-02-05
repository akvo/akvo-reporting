# ReportServer:  Creating a Dynamic List report

This guide assumes that the ReportServer has a 'datasource' called 'FLOW' containing the Akvo FLOW dataset for Ghana.

##  Configuring the list

Log in to the ReportServer and select 'Reportmanager' in the menu to the left.  Select 'Report Root' and either create a new folder in which to add your report, or select an exisiting folder.  Right click on the folder & select 'insert' and then 'Dynamic list'.

![dynamic](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/10.png?raw=true "dynamic list")

Add the report details to the 'properties' tab.  Add a report 'name' and 'key' add a short query with which to pull all data for the Ghana dataset.  (A specific sql statement can be added, of course, but if you do not know what the dataset contains, this is the easiest way to see what data you want to be able to report on). 

![reportdetails](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/11.png?raw=true "report details")


Select the 'FLOW' datasource by browsing with the magnifying glass.

![datasource](https://github.com/akvo/akvo-reporting/blob/master/Documentation/tutorials/report_server_user_guides/img/60.png?raw=true "datasource")

Add a short query with which to pull all data for the Ghana dataset.  (A specific sql statement can be added, of course, but if you do not know what the dataset contains, this is the easiest way to see what data you want to be able to report on).  

"select *
from ghana"

![reportdetails1](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/11.png?raw=true "report details1")

Select 'apply'.

![apply](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/40a.png?raw=true "apply")

Right click on the report name to the left and select 'execute'.

![execute](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/31.png?raw=true "execute")






