## JDBC Driver installation on BIRT Designer

To allow BIRT Designer to communicate correctly with a database setup as as the 'Data Source' you will need to have a JDBC driver installed.  BIRT Designer requires JDBC4 for a PostgreSQL database.

### Download the jar file

You can download the file from https://jdbc.postgresql.org/download.html

![JDBC](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/JDBC_Driver_for_BIRT/img/70.png?raw=true "JDBC")

Save the file and make a note of the location.

![save](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/JDBC_Driver_for_BIRT/img/80.png?raw=true "Save")

To find out more about the various flavours (1-4) JDBC is available in please skip to the [notes](#notes) area at the end of the document.

### Install the driver

This tutorial assumes that you have a template with a configured PostgreSQL 'Data Source' in place.

Ensure that you are in the 'Data explorer' perspective of your project.

Open 'Data Sources' and right click on your data source.  In this case it is 'FLOW'.

![Select Data Source](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/JDBC_Driver_for_BIRT/img/10.png?raw=true "Data Source")

Select 'edit' from the pop-up menu.

![Edit](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/JDBC_Driver_for_BIRT/img/20.png?raw=true "edit")

Select 'Manage Drivers'

![Manage](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/JDBC_Driver_for_BIRT/img/40.png?raw=true "Manage drivers")

Select 'Add'

![Add](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/JDBC_Driver_for_BIRT/img/60.png?raw=true "Add Driver")

Browse to the .jar file you downloaded at the [beginning of the tutorial](#download-the-jar-file) 

![Browse](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/JDBC_Driver_for_BIRT/img/110.png?raw=true "browse")

If you receive the below warning, select 'Open'

![Sure](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/JDBC_Driver_for_BIRT/img/120.png?raw=true "Sure")

You should now see the driver listed in the 'Manage JDBC Drivers' window.  Select 'Ok'.

![Window](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/JDBC_Driver_for_BIRT/img/130.png?raw=true "window")

The new driver will now be visible as the 'Driver Class'. 

![Class](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/JDBC_Driver_for_BIRT/img/150.png?raw=true "Class")

### Test connection

To ensure that the driver was installed correctly and that the 'Data Source' can be reached we need to select 'Test Connection'.

![Test](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/JDBC_Driver_for_BIRT/img/170.png?raw=true "Test")

If your driver installed correctly and your database details are correct you should receive the below.  Select 'Ok'.

![Success](https://raw.githubusercontent.com/akvo/akvo-reporting/master/Documentation/tutorials/JDBC_Driver_for_BIRT/img/180.png?raw=true "Success")


### Notes

The JDBC drivers come in four flavours or categories numbered 1-4, which are explained below:

1.  JDBC-ODBC bridge plus ODBC driver: The JavaSoft bridge product provides JDBC access via ODBC drivers. Note that ODBC binary code, and in many cases database client code, must be loaded on each client machine that uses this driver. As a result, this kind of driver is most appropriate on a corporate network where client installations are not a major problem, or for application server code written in Java in a three-tier architecture.
2.  Native-API partly-Java driver: This kind of driver converts JDBC calls into calls on the client API for Oracle, Sybase, Informix, DB2, or other DBMS. Note that, like the bridge driver, this style of driver requires that some binary code be loaded on each client machine.
3.  JDBC-Net pure Java driver: This driver translates JDBC calls into a DBMS-independent net protocol which is then translated to a DBMS protocol by a server. This net server middleware is able to connect its pure Java clients to many different databases. The specific protocol used depends on the vendor. In general, this is the most flexible JDBC alternative. It is likely that all vendors of this solution will provide products suitable for intranet use. In order for these products to also support Internet access, they must handle the additional requirements for security, access through firewalls, and so forth, that the Web imposes.
4.  Native-protocol pure Java driver: This kind of driver converts JDBC calls into the network protocol used by DBMSs directly. This allows a direct call from the client machine to the DBMS server and is an excellent solution for intranet access. Since many of these protocols are proprietary, the database vendors themselves will be the primary source. Several database vendors have these in progress. (**This is the one BIRT uses.**)

