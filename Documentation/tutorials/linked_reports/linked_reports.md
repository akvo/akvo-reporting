## Linked reports tutorial

This document describes how to create a pair of reports where one links to the other, creating a "drill down". The creation of the data source, data cube and crosstab is walked through more quickly. For in-depth description of those steps check out the [crosstab tutorial](../crosstab_with_params/crosstab_with_params.md).

### Ghana pump status reports

We will create two reports that display the same data, but with different granularity. The reports show how many pumps are working and how many are broken in Ghana. The difference between the reports is that the "parent" shows this on the region level. There are three regions in ghana. The "child" report shows the status of the pumps for all districts in one region.

### Create the region level report (the parent)

The report uses the same data souce, FLOW, as the crosstab tutorial report. We create a dataset, Regions, using this SQL:

```
select 
	identifier as metric,
	functional as column1,
	regionid as row1
from ghana
```
![Screenshot][100]

Create the data cube:

![Screenshot][110]

Set up the crosstab:

![Screenshot][120]

Check that the report looks ok:

![Screenshot][130]

### Create the district level reort (the child)

Very similar, we use the same data source and just change the query a little:

```
select 
	identifier as metric,
	functional as column1,
	districtid as row1
from ghana
where regionid = ?
```

![Screenshot][140]

Note the placeholder "?". This is how we drive what region to display data for.

The data cube is very similar, the only difference being that the row data is the districts instead of the regions:

![Screenshot][150]

We need a parameter to drive the child report district selection:

```
Brong Ahafo
Northern
Upper West
```

![Screenshot][160]

Note that Brong Ahafo is set as Default. While strictly not necessary, this allows us to test the data set by opening the Preview Results tab and seeing the data for Brong Ahafo. Set the default using the button below the Values box.

We now link the parameter to the data set. Open the dataset and select the Parameters tab:

![Screenshot][170]

Click New... and in the popup selec the Region parameter (should be the only choice) in the Linked to Report Parameter select:

![Screenshot][180]

The crosstab is very similar to the region level crosstab:

![Screenshot][190]

We can now test that all is well:

![Screenshot][200]

The child report should display the region it's displaying data for. Create a header showing the parameter choice by adding a Dynamic Text widget above the crosstab widget. Set the expression to

```
"Pump status for: " + params["Region"].value
```

![Screenshot][210]

Now the report tells you what you're seeing:

![Screenshot][220]

### Linking the reports

To link the reports we want to be able to select one of the districts in the parent and be shown the child report for that district. This is done by adding hyperlinks to the region names in the parent report. Unfortunately the links creted out of the box in the Eclipse BIRT designer won't work when deploying to ReportServer so we have to create the link in the designer and then deploy without being able to test first.

Returning to the parent report we select the Region element of the crosstab and then open the Hyperlink tab in the properties below:

![Screenshot][230]

Click the Edit... button and enter:

```
'reportexport?key=district_pump_status&p_Region=' + escape(data["Region"])
```

### Deploying to ReportServer

Create both reports on ReportServer. Set the key field on the District level (child) report to "district_pump_status". This is the way the report is identified in the link we constructed above:

![Screenshot][240]

Add a ReportServer parameter to the District level report. Set Name and Key to Region: 

![Screenshot][250]

Set it to a BIRT datasource, PARAMETER Type, Name Region:

![Screenshot][260]

Now run the report, select HTML format (Links don't work in PDFs (yet)):

![Screenshot][270]

In the HTML report clicking on the Northern region you will be shown the district report for the northern region:

![Screenshot][280]

![Screenshot][290]

### Analysis of the URL

The URL constructed to link the reports contains three elements:

  * the server location: ```'reportexport```
  * the report identity: ```?key=district_pump_status```
  * the parameter choice: ```&p_Region=' + escape(data["Region"])```

reportexport is one of the ReportServer locations for access to reports via URL. The key query parameter identifies a report via the Key field we entered [above](#deploying-to-reportserver). Finally the p_Region parameter identifies the BIRT parameter Region and links it to how parameters are used in ReportServer by prepending "p_" to the parameter name.



[100]: img/100.png
[110]: img/110.png
[120]: img/120.png
[130]: img/130.png
[140]: img/140.png
[150]: img/150.png
[160]: img/160.png
[170]: img/170.png
[180]: img/180.png
[190]: img/190.png
[200]: img/200.png
[210]: img/210.png
[220]: img/220.png
[230]: img/230.png
[240]: img/240.png
[250]: img/250.png
[260]: img/260.png
[270]: img/270.png
[280]: img/280.png
[290]: img/290.png

