# Jasper Reports dev log

## Installing and setup

#### Set up a Jasper Server

Follow [these](http://www.idryman.org/blog/2014/02/26/setting-up-jasper-server-on-linux/) instuctions to set up a server on an RSR vagrant box. Currently at step 10 (inclusive), but haven't tested or used it.

### Jasper Studio

[Download](http://community.jaspersoft.com/download) Jaspersoft Studio v5.6.2 for Mac. Use [this](http://community.jaspersoft.com/questions/825596/jaspersoft-aws-ssh-connection-mysql) answer to hook up an RSR DB running on the vagrant box. Use [this](https://community.jaspersoft.com/questions/541671/problem-jdbc-mysql-connections) to add a MySQL DB connector. 


### Jasper server API play

Wiggling out a PDF using the following steps:

GET [http://localhost:8080/jasperserver/rest_v2/resources](http://localhost:8080/jasperserver/rest_v2/resources), HTTP headers: ```Accept: application/json``` returns all the available resources like so:

```
{
   "resourceLookup":
   [
       {
           "version": 0,
           "permissionMask": 1,
           "creationDate": "2014-11-06T16:42:34",
           "updateDate": "2013-10-21T21:26:09",
           "label": "Accounts Report",
           "description": "All Accounts Report",
           "uri": "/reports/samples/AllAccounts",
           "resourceType": "reportUnit"
       },
       {
           "version": 0,
           "permissionMask": 1,
           "creationDate": "2014-11-06T16:42:33",
           "updateDate": "2014-09-08T23:16:34",
           "label": "Analysis Components",
           "description": "Analysis Components",
           "uri": "/analysis",
           "resourceType": "folder"
       },
       ...
       {
           "version": 1,
           "permissionMask": 1,
           "creationDate": "2014-11-13T10:20:33",
           "updateDate": "2014-11-13T10:24:23",
           "label": "RSR simple report",
           "description": "",
           "uri": "/reports/Blank_A4_2",
           "resourceType": "reportUnit"
       },
       ...
    ]
}
```

Here we see the RSR simple report and the URI is ```/reports/Blank_A4_2```.

Using this info we POST to [http://localhost:8080/jasperserver/rest_v2/reportExecutions](http://localhost:8080/jasperserver/rest_v2/reportExecutions) with basic HTTP auth header for the jasperadmin acount, along with ```Content-Type: application/xml``` and ```Accept: application/json``` the following XML blob:

```
<reportExecutionRequest>
    <reportUnitUri>/reports/Blank_A4_2</reportUnitUri>
    <async>true</async>
    <freshData>true</freshData>
    <saveDataSnapshot>false</saveDataSnapshot>
    <outputFormat>pdf</outputFormat>
    <interactive>true</interactive>
    <ignorePagination>true</ignorePagination>    
</reportExecutionRequest>
```

where we specify the URI in &lt;reportUnitUri&gt; and set PDF as the &lt;outputFormat&gt;.

Now there's a little dance to actually get the report. The reason for this is that generating the PDF might take some time, and we can't download it before it's ready. 

TODO: There is an *interactive* parameter in the XML, check if setting it to false lets you wait for the PDF creation in the request (Not that this necessarily is a good idea...)

The response to the POST looks like this:

```
    {
       "status": "queued",
       "requestId": "9c2bd1d2-a70d-4c20-ad68-755b11a0de02",
       "reportURI": "/reports/Blank_A4_2",
       "exports":
       [
           {
               "id": "b381ca75-c3d4-487b-8d50-a4452aac4b8b",
               "status": "queued"
           }
       ]
    }


```

Here we see a requestID and an exports.id. We also see that the export is queued. We can now inquire about the status of the report generation using GET [http://localhost:8080/jasperserver/rest_v2/reportExecutions/9c2bd1d2-a70d-4c20-ad68-755b11a0de02/status/](http://localhost:8080/jasperserver/rest_v2/reportExecutions/9c2bd1d2-a70d-4c20-ad68-755b11a0de02/status/) using the requestID in the request. Supplying ```Accept: application/json``` in this request returns:

```
    {
       "value": "ready"
    }
```

There is also a more detailed response using [http://localhost:8080/jasperserver/rest_v2/reportExecutions/9c2bd1d2-a70d-4c20-ad68-755b11a0de02](http://localhost:8080/jasperserver/rest_v2/reportExecutions/9c2bd1d2-a70d-4c20-ad68-755b11a0de02) (Just skip /status/) looking like this:

```
    {
       "status": "ready",
       "totalPages": 1,
       "requestId": "9c2bd1d2-a70d-4c20-ad68-755b11a0de02",
       "reportURI": "/reports/Blank_A4_2",
       "exports":
       [
           {
               "id": "b381ca75-c3d4-487b-8d50-a4452aac4b8b",
               "status": "ready",
               "outputResource":
               {
                   "contentType": "application/pdf",
                   "fileName": "Blank_A4_2.pdf",
                   "outputFinal": true
               }
           }
       ]
    }
```

I think this resource is more useful when the format is more complex, like HTML or a JS chart etc.

Ok, the report's been generated, let's get it.

Using both the requestID and the exports.id we call GET [localhost:8080/jasperserver/rest_v2/reportExecutions/9c2bd1d2-a70d-4c20-ad68-755b11a0de02/exports/b381ca75-c3d4-487b-8d50-a4452aac4b8b/outputResource](localhost:8080/jasperserver/rest_v2/reportExecutions/9c2bd1d2-a70d-4c20-ad68-755b11a0de02/exports/b381ca75-c3d4-487b-8d50-a4452aac4b8b/outputResource)

and get ourselves a PDF!

To summarize (skipping the base Jasper server URI, e.g. http://localhost:8080/jasperserver):

 * [/rest_v2/resources](/rest_v2/resources) lists the server's resources.
 * POST to [/rest_v2/reportExecutions](/rest_v2/reportExecutions) the XML spec for the report you want
 * Using the ```requestID``` returned by the POST, chck that the report is ready calling [/rest_v2/reportExecutions/{requestId}/status/](/rest_v2/reportExecutions/{requestId}/status/)
 * Finally get the report calling GET [/rest_v2/reportExecutions/{requestId}/exports/{exports.id}/outputResource](/rest_v2/reportExecutions/{requestId}/exports/{exports.id}/outputResource)


### Installing the server

* apt-get install nano
* apt-get install aptitude
* aptitude install openjdk-7-jdk
* Put ```deb http://apt.postgresql.org/pub/repos/apt/ squeeze-pgdg main 9.4``` into /etc/apt/sources.list.d/pgdg.list
* after aptitude update do
* aptitude install postgresql-9.4
