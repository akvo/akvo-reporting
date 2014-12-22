### Dataset

Note: this tutorial uses data from the Ghana survey, which currently can be found on the report server. That database is set up as a Data source called FLOW; how that's done is not described here though. 

Start with creating a new dataset from the Ghana FLOW survey data. Right click Data Sets in the outline and select New Data Set. In the New Data Set popup window the FLOW data source should be selected already and the Data Set Type should be SQL Select Query. Set the Data Set Name to Ghana survey:

![Screenshot][20]

We use the following SQL

```
select 
	identifier1 as metric, 
	districtid as column1, 
	councilname as column2, 
	typehp as row1
from ghana
order by councilname
```

Enter it in the Query Text box:
<a href="#SQL"></a>

![Screenshot][30]

The column names are  "translated", using aliases, from the original Ghana table to generic names to be used in the data cube. This is necessary for row1 to allow us to choose the survey field to use, and also is a way to be able to use the data cube with other queries, if the same aliases are used in the SQL. 

Check that the columns show up correctly in the Output columns tab:

![Screenshot][40]

Double check by previewing the data:

![Screenshot][50]

A comment about the metric column. In the crosstab we want to display the amount, i.e. the total count, of some property. This is accomplished by counting the number of unique rows present of the chosen type. For this we need a field that we know is different for every record in the dataset. The survey identifier fits that bill perfectly.

The resulting dataset in the outline: 

![Screenshot][60]

### Data cube

Now we create a data cube. Right click on the Data Cubes item in the outline and select New Data Cube. There's not much to do in the first tab, Data set, we'll get back to it later. There is only one dataset, Ghana survey, and it's chosen automatically. The name of the cube could be changed, but I haven't.

![Screenshot][70]

Switch to the second tab, Groups and Summaries:

![Screenshot][80]

Here is where we create the cube. This is done by drag-dropping the Ghana survey fields to the Groups and Summary area in the cube.

Start by dragging column1 and drop it below the Groups folder:

![Screenshot][90]

You're prompted for a name of the new group. Enter Locations:

![Screenshot][100]

Now drag column2 and drop it on the Locations folder:

![Screenshot][110]

You should now have a hierarchy like this:

![Screenshot][120]

Drag row1 below the Groups folder to create a new group.

![Screenshot][130]

Call it Survey field:

![Screenshot][140]

Finally add metric by dragging it to Summary Fields (Measures):

![Screenshot][150]

The final mapping between fields and the data cube:

![Screenshot][160]

As seen in the outline:

![Screenshot][170]

### Parameters

We now need a pair of report parameters. This will allow the user to customize the report by selecting 1) the field in the survey which is measured, and 2) the district for which the data is shown.

#### Survey field parameter

In the outline, right click on the Report Parameters item below the Data Cubes. Select New Parameter. You'll be rewarded with this dialog:

![Screenshot][180]

Top left fields: Enter Survey field as Name. Enter a suitable Prompt text, like "Please choose the survey field to display as row data". Data type stays as String. Set Display type to List box.

Now we need to enter the choices for the list box. In the Selection list values section of the dialog box, the radio buttons at the top should be set to Static. Then click the New... button to the right:

![Screenshot][190]

A secondary dialog pops up and we enter a Display text, "Water source type" and a value, "typesource". typesource is one of the column names in the ghana database table that we want to be able to choose as the data to show in the crosstab. The display text is what is shown in the list box when choosing survey field to display.

Clicking OK in the New Selection Choice dialog saves it to the Values list in the Selection list values part of the New Parameter dialog. Repeat this for the other survey fields, using this data

```
Display text: Pump type Value: typehp
Display text: Construction year Value: yearconst
Display text: Donor organisation Value: impldonor
Display text: Implementing organisation Value: implproject
Display text: Is it working? Value: functional
```

to end up with the following:

![Screenshot][200]

#### District parameter

Note: The District parameter needs to be created differently when using ReportServer. See [below]().

Now we create a second parameter. In the New parameter dialog, Name it District, Prompt "Please select the district", keep Data type as String choose List box for Display type. However this list box is dynamic and will display all the districts in the Ghana dataset. To accomplish this, in the Selection list valuse section, set the Dynamic radio button. This automatically chooses the Ghana dataset since it's the only game in town. Choose column1 (which is mapped to the districtid column in the ghana table) for both Select value column and Select display text. At the bottom of the dialog, in the Sort section set column1 to Sort by, Ascending.:

![Screenshot][210]

If all is well we should now see two Report parameters in the outline:

![Screenshot][215]

### Testing the parameters

Let's test that the two parameter we've created actually work. To do this, drag the paramters from the outline onto the blank report:

![Screenshot][220]

Now we can run the report! There's no data yet linked to the report, but we'll get confirmation that the parameters work as expected. From the Run meny select View Report/As PDF:


![Screenshot][230]

If our parameters work as they should we see a dialog box with two list boxes:

![Screenshot][240]

Choose Pump type for now and a district and we should see something like this:

![Screenshot][250]

typehp is the column name for pump types and the selected district should be shown.

### Crosstab

Time to create the crosstab! 

Delete the two paramter fields from the report so it's blank again. Then find the Crosstab widget in the palette and drag it to the report:

![Screenshot][260]

We see a rectangle with areas onto which we drag data fields to create the crosstab. Those fields come from the data cube. Open the data cube in the outline if it isn't open already, and drag column2 to the top left rectangle (Where it says "Drop data field(s) to define data columns here"):

![Screenshot][270]

Click on the *icon at the far right* of the [column2] box in the report and select Show/Hide Group Levels from the popu menu:

![Screenshot][280]

In the Show/Hide Group Levels dialog check the column1 box to add it to the columns that will be shown in the crosstab report:

![Screenshot][290]

Drag row1 to the area in the crosstab that says "Drop data field(s) to define rows here":

![Screenshot][300]

Drag metric to the area on the crosstab that says "Drop data field(s) to be summarized here":

![Screenshot][310]

### Filtering on district

We now have all the basic fields in place for the crosstab. At this point you can test running the report, but the result, if it "works" is going to be quite messy because we do not yet filter the report data on a district. Time to fix that. Double click on the data cube in the outline, or right click on it and select Edit. In the Data Cube Builder dialog click the Filter... button:

![Screenshot][320]

In the Filter dialog box click Add...:

![Screenshot][330]

Finally we get to where we can set the filter. In the New Filter Condition choose column1 in the first list box: 

![Screenshot][340]

Select Equal to from the second list box:

![Screenshot][350]

And in the third list box click on Build expression:

![Screenshot][360]

We are greeted with a fourth(!) level of dialog box, the Expression Builder (JavaScript). In the Category box, lower left, click Report Parameters. In Sub-Category, select ---All---. In Double Click to instert, double click on District to get it inserted in the top expressions box:

![Screenshot][370]

Results in New Filter Condition dialog:

![Screenshot][380]

Results in Filter dialog: 

![Screenshot][390]

Now we can try running the report and see results for one district. As above, choose View Report from the Run menu. Select Pump type for the survey field to display (explanation in next section) and a district:

![Screenshot][400]

If all goes well the result should look loke this:

![Screenshot][410]

### Choose survey field

There is a large problem remaining. Regardless of the survey field chosen as report parameter, the pump types is shown. This is because the [original SQL query](#SQL) sets row1 to represent typehp. But we want row1 to be set dynamically depending on the choice made when running the report. To do this we create a small script that is run just before calling the database. 

In the Outline, select the Ghana survey data set. Select the Script tab below the report view. At the top there is a list box labelled Script, select the beforeOpen event. In the text box below enter the following snippet:
```
this.queryText = this.queryText.replace("typehp", params["Survey field"].value);

```

![Screenshot][440]

With this little hack we're replacing "typehp" with the column name chosen using the Survey field report parameter in the SQL query we use to retrieve the data. (I messed around a long time with proper SQL placeholders trying to use them to set the selected field in the 
SQL, but apparently they can only be used in the WHERE part of a query.)

Now we can make arbitrary selections for both parameters:

![Screenshot][450]

And see the resulting crosstab report:

![Screenshot][460]

### Labelling

I won't go into much detail about formatting, but we'll make the report look at least marginally better by adding proper labels to the table header. Delete the static text metric in the left hand column:

![Screenshot][470]

Replace column1 with District in the left hand column:

![Screenshot][480]

![Screenshot][490]

Replace the top column2 with Council in the left hand column:
	
![Screenshot][500]

### Survey field dynamic label

We want the label for the chosen survey field to be shown in the table header. Delete the lower static text field in the left hand column named column2:

![Screenshot][510]

From the palette drag a Dynamic Text widget to the empty spot where the column2 label used to be:

![Screenshot][515]

In the expression builder that pops up when you drop the dynamic text widget enter 
```
params["Survey field"].displayText
```
(This can't be accomplished using the boxes at the bottom of the dialog. You can only get to ```params["Survey field"].value```):

![Screenshot][520]

Test by running a report:

![Screenshot][530]
![Screenshot][540]

### Alternative header layout

An alternative to deleting the ```metric``` static text and replacing ```column2``` with Council is to hide one row of the header. Select the Crosstab widget. In the General section of the Properties there's a Hide Measure Header checkbox:

![Screenshot][550]

This will hide the Council label too however.

### Metric totals

Finally we add cells showing the summation of a row or a column. Click on the icon to the far left in the [column1] cell. Select Totals from the popup:

![Screenshot][560]

In the Totals dialog, check the Grand Totals checkbox for metric, both for the Column area:

![Screenshot][570]

and the Row area:

![Screenshot][580]

This expands the crosstab with a Grand Total row and column. Delete the ```metric``` static text:

![Screenshot][590]

Run a report:

![Screenshot][600]
![Screenshot][610]

## Deploying the report to ReportServer

To provide web access to the running of the report we will use ReportServer. Here I will only make a quick walkthrough of setting up the report on ReportServer with emphasis on the somewhat tricky config of the report parameters. There is a lot of documentation about ReportServer for more in-depth knowledge.

### Setup

In the Reportmanager, create a new folder. Right click on the Report Root (or a sub-folder) and select Insert/Folder:

![Screenshot][620]

Edit a folder name and description and save using Apply:

![Screenshot][630]

Right click the newly created folder and  select Insert/Birt report: 

![Screenshot][640]

Edit the report Name and Description:

![Screenshot][650]

Click the magnifying glass in the Datasource drop down. In the popup widow find and select the FLOW datasource by double-clicking on it in the left hand column so that it shows up to the right. Apply to save:

![Screenshot][660]

Upload the report template by clicking the Browse... button:

![Screenshot][670]

Find the template on your local file system and upload it. Save the new report using Apply:

![Screenshot][680]

### Report parameters

At the bottom of the screen click the Parameters tab:

![Screenshot][690]

Click on the Parameter button and select Datasource Parameter: 

![Screenshot][700]

Edit the newly created parameter by either double clicking on the icon to the left or by clicking on the row of the parameter or select it and click the Edit button:

![Screenshot][710]

Enter "Survey field" in the Name field. This is the parameter label shown when creating the report. Enter "Survey_field" in the Key field. The key is the name of the [parameter created](#parameters) in the report template and has to match exactly.

![Screenshot][720]

Click on the Specific Properties menu item to the left. Click on the magnifying glass to the left in the Datasource field. Find and select the BIRT datasource by double clicking it in the left hand column to move it to the right. Save using Apply.

![Screenshot][730]

In Parameter Properties the Report field should be set to Flow tutorial already. Set the Type to PARAMETER. The Name should be set to Survey_field already. (Interface note: yes, it's confusing that the Key field from the Parameter Properties view is labelled Name in the Specific Properties view...) 

In the lower part of the view we only need to set the Selecten(!) mode to Single selection

![Screenshot][740]

For the second parameter, District, there's a littel more work needed to get things working with ReportServer. When we created the parameter in the Eclipse BIRT report designer, we could use data from our Ghana survey dataset, specifying the column to use filter to get only unique values. With ReportServer this doesn't  quite work, I'm not sure if this is a bug in ReportServeror not. Anyway there's a workaround.

To get the District parameter working we need to create a dataset that provides exactly what's needed for the dropdown. So we go back to the BIRT designer. Start by creating a new dataset, name it District and set the query to

```sql
select distinct districtid
from ghana
where districtid is not null
order by districtid
```

![Screenshot][750]

Check that we get the expected list using the preview tab:

![Screenshot][760]

Now save the report and [upload it]() to the ReportServer again, replacing the existing Flow tutorial report design. We can now create the District parameter.

Go back to the Parameters tab in the report and create a new Datasource parameter, set the Name and Key to District:

![Screenshot][770]

Switch to the Specific Properties, select the BIRT datasource as above. Report should be Flow tutorial already, make sure Type is DATASET and Name is District. In the lower part set Selecten mode to Single selection. Save it all using Apply:

![Screenshot][780]

If all's well we should now be greeted with the drop downs when we run the report:

![Screenshot][790]

And be able to view the dataset in many ways

![Screenshot][800]


[10]: img/10.jpg
[20]: img/20.jpg
[30]: img/30.jpg
[40]: img/40.jpg
[50]: img/50.jpg
[60]: img/60.jpg
[70]: img/70.jpg
[80]: img/80.jpg
[90]: img/90.png
[100]: img/100.jpg
[110]: img/110.png
[120]: img/120.jpg
[130]: img/130.png
[140]: img/140.jpg
[150]: img/150.png
[160]: img/160.jpg
[170]: img/170.jpg
[180]: img/180.png
[190]: img/190.png
[200]: img/200.png
[210]: img/210.png
[215]: img/215.png
[220]: img/220.png
[230]: img/230.png
[240]: img/240.png
[250]: img/250.png
[260]: img/260.png
[270]: img/270.png
[280]: img/280.png
[290]: img/290.png
[300]: img/300.png
[310]: img/310.png
[320]: img/320.png
[330]: img/330.png
[340]: img/340.png
[350]: img/350.png
[360]: img/360.png
[370]: img/370.png
[380]: img/380.png
[390]: img/390.png
[400]: img/400.png
[410]: img/410.png
[420]: img/420.png
[430]: img/430.png
[440]: img/440.png
[450]: img/450.png
[460]: img/460.png
[470]: img/470.png
[480]: img/480.png
[490]: img/490.png
[500]: img/500.png
[510]: img/510.png
[515]: img/515.png
[520]: img/520.png
[530]: img/530.png
[540]: img/540.png
[550]: img/550.png
[560]: img/560.png
[570]: img/570.png
[580]: img/580.png
[590]: img/590.png
[600]: img/600.png
[610]: img/610.png
[620]: img/620.png
[630]: img/630.png
[640]: img/640.png
[650]: img/650.png
[660]: img/660.png
[670]: img/670.png
[680]: img/680.png
[690]: img/690.png
[700]: img/700.png
[710]: img/710.png
[720]: img/720.png
[730]: img/730.png
[740]: img/740.png
[750]: img/750.png
[760]: img/760.png
[770]: img/770.png
[780]: img/780.png
[790]: img/790.png
[800]: img/800.png
