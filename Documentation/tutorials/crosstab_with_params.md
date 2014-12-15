### Dataset

Start with creating a new dataset from the Ghana FLOW survey data:

![Screenshot][20]

We use the following SQL

```
select 
	identifier as metric, 
	districtid as column1, 
	councilname as column2, 
	typehp as row1
from ghana
order by councilname
```

Enter it in the Query Text box:
<a href="SQL"></a>

![Screenshot][30]

The column names are  "translated", using aliases, from the original Ghana table to generic names to be used in the data cube. This is necessary for row1 to allow us to choose the survey field to use, and also is a way to be able to use the data cube with other queries, if the same aliases are used in the SQL. 

Check that the columns show up correctly in the Output columns tab:

![Screenshot][40]

Double check by previewing the data:

![Screenshot][50]

A comment about the metric column. In the crosstab we want to display the amount, i.e. the total count of some property. This is accomplished by counting the number of unique rows present of the chosen type. For this we need a field that we know is different for every record in the dataset. The survey identifier fits that bill perfectly.

The resulting dataset in the outline: 

![Screenshot][60]

### Data cube

Now we create a data cube. Right click on the Data Cubes item in the outline and select New Data Cube. There's not much to do in the first tab, Data set, we'll get back to it later. There is only one dataset, Ghana survey, and it's chosen automatically. The name of the cube could be changed, but I haven't.

![Screenshot][70]

Switch to the second tab, Groups and Summaries:

![Screenshot][80]

Here is where we create the cube. This is done by drag-dropping the Ghana survey fields to the Groups and Summary fields in the cube.

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

Finally add metric by dragging it to Summary fields:

![Screenshot][150]

The final mapping between fields and the data cube:

![Screenshot][160]

As seen in the outline:

![Screenshot][170]

### Parameters

We now need a pair of report parameters. This will allow the user to customize the report by selecting 1) the district for which the data is shown, and 2) the field in the survey which is measured.  In the outline, right click on the Report Parameters item below the Data Cubes. Select New Parameter. You'll be rewarded with this dialog:

![Screenshot][180]

Top left fields: Enter Survey field as Name. Enter a suitable Prompt text, like "Please choose the survey field to display as row data". Data type stays as String. Set Display type to List box.

Now we need to enter the choices for the list box. In the Selection list values section of the dialog box, the radio buttons at the top should be set to Static. Then click the New... button to the right:

![Screenshot][190]

A secondary dialog pops up and we enter a Display text, "Water source type" and a value, "typesource". typesource is one of the column names in the ghana database table that we want to be able to choose as the data to show in the crosstab. The display text is what is shown in the list box for choosing survey field to display.

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

Note: The District parameter needs to be created differently when using ReportServer. See [below]().

Now we create a second parameter. In the New parameter dialog, Name it District, Prompt "Please enter district", keep Data type as String choose List box for Display type. However this list box is dynamic and will display all the districts in the Ghana dataset. To accomplish this, in the Selection list valuse section, set the Dynamic radio button. This automatically chooses the Ghana dataset since it's the only game in town. Choose column1 (which is mapped to the districtid column in the ghana table) for both Select value column and Select display text. At the bottom of the dialog, in the Sort section set column1 to Sort by, Ascending:

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

We are greeted with a fourth(!) level of dialog box, the Expression builder (JavaScript). In the Category box, lower left, click Report Parameters. In Sub-Category, select ---All---. In Double Click to instert, double click on District to get it inserted in the top expressions box:

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

![Screenshot][450]

We can now run the report and choose both the field from the survey and the district from the survey:

![Screenshot][460]

### Labelling

I won't go into much detail about formatting, but we'll make the table look at least marginally better by adding proper labels to the table header. Delete the static text metric in the left hand column:

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
(This can't be accomplished using the boxes at the bottom of the dialog. You can only get to ```params["District"].value```):

![Screenshot][520]

Test by running a report:

![Screenshot][530]
![Screenshot][540]

### Alternative header layout

An alternative to deleting the ```metric``` static text and replacing ```column2``` with Council is to hide on row of the header. Select the Crosstab widget. In the General section of the Properties there's a Hide Measure Header checkbox:

![Screenshot][550]

This will hide the Council label too however.

### Metric totals

Finally we add cells showing the summation of a row or a column. Click on the icon to the far left in the [column1] cell. select Totals from the popup:

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


[10]: 10.jpg
[20]: 20.jpg
[30]: 30.jpg
[40]: 40.jpg
[50]: 50.jpg
[60]: 60.jpg
[70]: 70.jpg
[80]: 80.jpg
[90]: 90.png
[100]: 100.jpg
[110]: 110.png
[120]: 120.jpg
[130]: 130.png
[140]: 140.jpg
[150]: 150.png
[160]: 160.jpg
[170]: 170.jpg
[180]: 180.png
[190]: 190.png
[200]: 200.png
[210]: 210.png
[215]: 215.png
[220]: 220.png
[230]: 230.png
[240]: 240.png
[250]: 250.png
[260]: 260.png
[270]: 270.png
[280]: 280.png
[290]: 290.png
[300]: 300.png
[310]: 310.png
[320]: 320.png
[330]: 330.png
[340]: 340.png
[350]: 350.png
[360]: 360.png
[370]: 370.png
[380]: 380.png
[390]: 390.png
[400]: 400.png
[410]: 410.png
[420]: 420.png
[430]: 430.png
[440]: 440.png
[450]: 450.png
[460]: 460.png
[470]: 470.png
[480]: 480.png
[490]: 490.png
[500]: 500.png
[510]: 510.png
[515]: 515.png
[520]: 520.png
[530]: 530.png
[540]: 540.png
[550]: 550.png
[560]: 560.png
[570]: 570.png
[580]: 580.png
[590]: 590.png
[600]: 600.png
[610]: 610.png
