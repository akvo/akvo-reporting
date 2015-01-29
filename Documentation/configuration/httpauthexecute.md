##  Httpauthexecute.cf

To view or embed reports without being logged into the Report Server the file 'httpauthexecute.cf' needs to be updated with the details for each report.

The file can be found under 'Administration/File System/FileServer Root/etc/misc' when logged into the ReportServer Admin.

```
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <servlet>
    <httpauthexecute>
      <username>test</username>
      <password>test1</password>
      <registered>
        <ids>3931</ids>
        <ids>5593</ids>
        <ids>7089</ids>
        <ids>7244</ids>
        <keys/>
      </registered>
      <executeuser>
        <id>133297</id>
      </executeuser>
    </httpauthexecute>
  </servlet>
</configuration>
```

This also works with keys that can be set for a report in the Reportmanager interface: 

```
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <servlet>
    <httpauthexecute>
      <username>test</username>
      <password>test1</password>
      <registered>
        <keys>report17</keys>
        <keys>report4711</keys>
      </registered>
      <executeuser>
        <id>133297</id>
      </executeuser>
    </httpauthexecute>
  </servlet>
</configuration>
```
