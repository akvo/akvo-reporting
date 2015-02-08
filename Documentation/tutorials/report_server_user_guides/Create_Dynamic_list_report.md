# ReportServer:  Creating a Dynamic List report

This guide assumes that the ReportServer has a 'datasource' called 'FLOW' containing the Akvo FLOW dataset for Ghana.

ReportServer‘s dynamic list is the method of choice, if you need fast, user specific reports/analyses, or if the focus is on subsequent processing of the selected data.

Dynamic lists can handle almost any reporting requirement ranging from simple filter criteria, sorting, grouping and sub-totals to more advanced functionality like analytical functions, first order logic or preprocessing methods.

Once specified, you can store your report as a variant and share it with your team via a TeamSpace.

In this guide we discuss the basic functionality of dynamic lists.

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

## Executing the report

Right click on the report name to the left and select 'execute'.

![execute](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/31.png?raw=true "execute")

You will now be in the 'Report view'.  Select 'Configure list'.

![configure list](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/920.png?true=raw "configure list")

Now we need to select which columns we would like to include in our report.  Select 'select columns'. A column selection box will popup.  Double click on the column name on the left and it will be added to the column on the right.  When done select 'apply'.

![columns](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/290.png?raw=true "columns")

Select 'Preview' in the panel to the left.  You should see the below.


![preview](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/110.png?raw=true "preview")

## Filtering data

We need to filter and configure the data to make it useful for us.  There are many options available under 'configure list'.  For example, we can set the 'identifier' column 'Aggregate' to 'Count' which provides us with a count of the pumps.

![count](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/120.png?raw=true "count")

Now when we select 'Preview' on the left we will see the 'Identifier' is providing a count instead of displaying the identifier of each pump.

![identifier](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/130.png?raw=true "identifier")

To filter unwanted data select 'options'

![options](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/911.png?raw=true "options")

### Filtering with Wildcards (*, ?)

Besides specifying ranges in the filter dialog you can also specify multiple values using wildcards. The wildcard * matches any arbitrary sequence of characters. This includes the empty sequence. For example: “fish*” matches the value “fishing” as well as the value “fish”. In contrast, the wildcard ? matches exactly one arbitrary character.

Wildcards can be used in simple inclusion and exclusion filters as well as in range filters. Furthermore,note that when using wildcards in filter ranges then ReportServer tries to select the largest possible range. That is, in case the expression matches multiple values ReportServer selects the “lowest” value as the lower limit of the interval and the “biggest” as the upper limit.

Further note, that if for one of the boundaries no value matches then the expression describes an empty interval. This may lead to unexpected results when defining an inclusion range: for example, “a* - z*” is empty, if no value exists that starts with a “z”.

## Aggregation

Aggregation describes the process of summarizing or compacting of data that is equivalent according to some grouping property. For every group present in the underlying data the result set will contain one data record. 

For example, a list of persons with the features sex and age. A possible aggregation is the average age by gender. In this case the list with n data records will be aggregated to a result with one record per gender.

When using aggregation, we need to distinguish between attributes that describe to which group a record belongs (gender, in the example) and those that are to be summarized to a single value using an aggregation function.

ReportServer provides the following aggregation function
- Average: Computes the average value per group
- Count: Counts the number of records per group
- Maximum: Outputs the maximum value per group
- Minimum: Outputs the minimum value per group
- Sum: Computes the sum of all values per group
- Variance: Computes the statistical variance
- Count Distinct: Counts the records per group, however, only considers distinct values

If an aggregation function is selected for one of the columns, then all other columns that do not have an aggregation are considered as grouping columns. It is not possible that a report contains columns that are neither grouping columns nor aggregated columns. To define an aggregation for a column go to list configuration and chose an aggregation function from the list clicking in the appropriate cell in the grid.

## Notes:

- To remove a selected column select 'Remove column'. 
- Column names can be added to the report by updating the 'Alias' field under 'configure list'.
- For more detailed information please see page 31, Chapter 6 'Dynamic lists' in the ReportServer userguide:  https://www.dropbox.com/s/fhu3uu9gjb0i0b8/2015-01-02-reportserver-user-guide-2.2_300.pdf?dl=0
















