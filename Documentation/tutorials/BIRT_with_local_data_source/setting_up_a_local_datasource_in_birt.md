# Setting up a local datasource in BIRT

To be able to easily work with "real" data in BIRT we have a script that can take a CSV file and turn it into a SQLite database. SQLite is a file based database, meaning all you need is a file with the data to be able to use it. This makes it ideal for development work such as creating BIRT report templates. When you're ready to test the report on RepotServer the same data will be there as the CSV import script also creates a table in ReportSerer.

### Getting the SQLite file and the BIRT report template

As we're not yet sure it's worth automating this process, for now we will handle the transformation of a CSV data set by hand. What we need is a CSV file, the name of which will be the name of the database tables created. Example: a CSV file the named **benin.csv** will result in the creation of a **benin** table that you will work with both in BIRT and ReportServer.

### Setting up the blank template in BIRT

For this tutorial you need two files, **blank_for_use_with_ghana.rptdesign** and **ghana.sqlite**, they can be found [here as a zip file](birt_ghana.zip). When working with other datasets, you will get a similar pair of files named after the name of the CSV file you provided.

There are a few steps needed to be able to work with a template with a datasource in BIRT.

  1. Place the blank report template and the SQLite file somewhere
  1. Complete the setup of the datasource
  1. Start designing!

#### Get the files in place

Unzip the files and place them where you want to work with them. The BIRT workspace is a good starting point. Here is my workspace, which will be used as an example in the following:

![Screenshot][100]

I've created a folder, ghana, within the workspace and put the .zip there. Then I unzip to get both files in place:

![Screenshot][110]

After starting Eclipse BIRT designer, find and open blank_for_use_with_ghana.rptdesign. Now, this isn't a very impressive template:

![Screenshot][120]

But that's the point! This is a clean slate but with the infrastructure (almost) setup to be able to work with the data from the CSV. We just need to get the link to the database completed.

### Configure the datasource

To be able to work with SQLite databases BIRT needs a driver. You'll only need to set up the driver once in BIRT, after that new reports linked to a SQLite database will work without this step. You can get the driver [here](https://bitbucket.org/xerial/sqlite-jdbc/downloads/sqlite-jdbc-3.7.2.jar) 

When you've downloaded the driver, open the FLOW datasource by right-clicking and selecting Edit (or double-clicking on it) in the outline:

![Screenshot][130]

Click on Manage drivers... 

![Screenshot][140]

In the popup click Add...

![Screenshot][150]

Find the downloaded SQLite driver file (sqlite-jdbc-3.7.2.jar). The Manage JDBC Drivers dialog should now look like this:

![Screenshot][160]

Click OK to return to the Edit Data Source window. You should now see the version of the driver in the Driver class field:

![Screenshot][170]

In the Database URL field, replace FULL_PATH_HERE with the full path to where you put the ghana.sqlite file. Example: I put the file in /Users/gabriel/git/birt/ghana so the URL is 

	jdbc:sqlite:/Users/gabriel/git/birt/ghana/ghana.sqlite 
	
If you're on a windows machine the drive letter must be included, e.g.

	jdbc:sqlite:C:\Users\gabriel\Documents\birt\ghana\ghana.sqlite.

Pressing the Test connection... button should greet you with a Connection successful popup.

![Screenshot][180]

With the data source set up you should now be able to preview the data in the pre-configured data set. Open Data sets in the outline and double click on the ghana data set to edit:

![Screenshot][190]

As you can see the SQL query selects all the data. This can of course be changed to fit the needs of the report but shows the general way of providing data to the report through a query.

To preview the data click on Preview Results in the left hand part of the window and you should see 	about half a dozen columns and 20 rows of the dataset.

![Screenshot][200]

### Deploying to ReportServer

When deploying a template set up with a SQLite database this way the data source needs to be re-configured before uploading the template to ReportServer. This is unfortunate, and I'm investigating ways to fix this, but for now this manual step is needed.

#### Edit the datasource

When running the report on ReportServer we're using the Postgres database there. When a CSV file is imported, the import script creates both the SQLite database file and a table in the FLOW database on ReportServer with the same name. So to run the report on ReportServer we need to point to the Postgres FLOW database.

Open the FLOW data source for editing and change Driver Class to Postgres:

![Screenshot][210]

The Database URL when using Postgres should be

	jdbc:postgresql://localhost:5432/flow
	
The Postgres data connection also needs a user name and password. Contact the DASH team for details:

![Screenshot][220]

#### Two datasources, one local one for the server

(Note: I haven't tested this fully, so if it doesn't work holler!) 

Having to change the data source for use locally and on ReportServer is messy and I'll see if I can make this problem go away. In the mean time one small simplification might be to create two data sources, FLOW_SERVER and FLOW_LOCAL or some such and set them up to use Postgres and SQLite respectively. Then you only need to change the data source used by the data set depending on where you're currently running the report:

![Screenshot][230]
![Screenshot][240]


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


