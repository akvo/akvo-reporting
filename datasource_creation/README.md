Automatic creation of data sources
==================================

This groovy script is intended to be put into the internal file system of a ReporServer installation, somewhere under the fileserver/bin directory.
It can be tested by open up the terminal (CTRL+ALT+T)

     cd fileserver/bin
     exec auto_create_sources.groovy

It can then be scheduled to run at regular intervals. E.g:

     scheduleScript execute auto_create_sources.groovy " " every 10 minutes


## Configuration ##

The script looks for datasources with names ending in 'reports'. This may need adjustment. (Remember that the SQL wildcard for a string is '%', not '*'.)

The script needs a 'seed' datasource on the same server as those it should detect. This needs to be configured.

## Todo ##

The debug line outputting the seed db password should be removed.

The script sets up a password for each data source. In a live deployment this should NOT be the same for every data source, and like all secrets must not be stored in a public repository.

