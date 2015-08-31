package myscripts

import net.datenwerke.rs.core.service.datasourcemanager.entities.DatasourceDefinition;
import net.datenwerke.rs.core.service.datasourcemanager.DatasourceService;
import net.datenwerke.rs.base.service.datasources.definitions.DatabaseDatasource;
import net.datenwerke.rs.core.service.datasourcemanager.entities.AbstractDatasourceManagerNode;
import net.datenwerke.rs.core.service.datasourcemanager.entities.DatasourceFolder;
import net.datenwerke.dbpool.config.ConnectionPoolConfig;
import net.datenwerke.dbpool.DbPoolService;
import java.sql.Connection;
import java.util.concurrent.Future;
import groovy.sql.Sql;
import net.datenwerke.rs.base.service.dbhelper.db.PostgreSQL;


String seedName = "RSR"; //"ReportServer Data Source"

DatasourceService datasourceService = GLOBALS.getRsService(DatasourceService.class);
DbPoolService dbPoolService = GLOBALS.getRsService(DbPoolService.class);

DatasourceDefinition rsds = datasourceService.getDatasourceByName(seedName);

tout.println ();
tout.println ('Seed Datasource is ' + seedName );
tout.println ('  URL: ' + rsds.getUrl() );
tout.println ('  Username: ' + rsds.getUsername() );
tout.println ('  Password: ' + rsds.getPassword() );





ConnectionPoolConfig cpc = ((DatabaseDatasource)rsds).getConnectionConfig();
Future<Connection> futureConnection = dbPoolService.getConnection(cpc);

Connection con = futureConnection.get();

DatasourceFolder folder = datasourceService.getDatasourceFolderByName('Auto'); 
    if (folder != null) {    
        tout.println ("Auto Folder exists" );
    } else {
        tout.println ("No Auto folder" );
        folder = new DatasourceFolder(); 
        folder.setName("Auto");
        AbstractDatasourceManagerNode root = datasourceService.getRoots().get(0);
        root.addChild(folder);
        datasourceService.persist(folder);
    }

tout.println ('Databases ending in "reports":');

new Sql( con ).eachRow("SELECT datname FROM pg_database WHERE datname LIKE '%reports'") { row ->
    String sourceName = "Auto_" + row.datname;
 	//look it up - see if it already exists
 	DatasourceDefinition newds = datasourceService.getDatasourceByName(sourceName);
    if (newds == null) {
    
        tout.println (row.datname + " (unknown)" );
        
        //Create it
        
        String url = "jdbc:postgresql://psql:5432/" + row.datname;
        String username = row.datname;
        String password = "password";
        String dbHelperName = PostgreSQL.DB_DESCRIPTOR;
        
        DatabaseDatasource rsDataSource = new DatabaseDatasource();
        rsDataSource.setDatabaseDescriptor(dbHelperName);
        rsDataSource.setUrl(url);
        rsDataSource.setName(sourceName);
        rsDataSource.setUsername(username);
        rsDataSource.setPassword(password);
        folder.addChild(rsDataSource);
        datasourceService.persist(rsDataSource);
        
        
        tout.println (row.datname + "...created" );
        
    } else {
    
        tout.println (row.datname + " (known)" );
    }
}