# ReportServer:  Creating a Pivot report

This guide assumes that the ReportServer has a 'datasource' called 'FLOW' containing the Akvo FLOW dataset for Ghana.

Creating a Pivot report in ReportServer begins with configuring a basic Dynamic List report - https://github.com/akvo/akvo-reporting/blob/master/Documentation/tutorials/report_server_user_guides/Create_Dynamic_list_report.md

Pivot mode offers further possibilities for ad-hoc analysis of data, new visualizations and charting.

##  Converting Dynamic List report to a Pivot report

Once you have created your Dynamic list report you can switch to a Pivot report by selecting the 'Pivot' option.

![activate](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/160.png?raw=true "activate")

![pivot](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/150.png?raw=true "pivot")

##  Configuring a Pivot report

We now need to configure the 'Dimensions/Measures'.  This is very similar to setting up the columns to be used in the Dynamic list report, except that you now have a 'Dimension' column with which to group the data.

We need to create at least one 'Measure' before we can use the Pivot.

![dimensions](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/170.png?raw=true "dimensions")


##  Compiling the Pivot

Once we have configured all required we switch to 'Preview'.

We can now drag and drop our selected 'Dimensions' or columns over to the 'Columns', 'Rows' and 'Filters' area to build the Pivot.  If we want to remove any, we just drag and drop them back to the left.

![pivot](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/report_server_user_guides/img/190.png?raw=true "pivot")













## Notes:

- For more detailed information please see page 51, Chapter 7 'Dynamic lists' in the ReportServer userguide:  https://www.dropbox.com/s/fhu3uu9gjb0i0b8/2015-01-02-reportserver-user-guide-2.2_300.pdf?dl=0
















