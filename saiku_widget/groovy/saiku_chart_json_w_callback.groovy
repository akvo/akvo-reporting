import javax.inject.Inject;
import javax.inject.Provider;
import javax.servlet.http.HttpServletRequest

import net.datenwerke.rs.core.service.reportmanager.engine.CompiledReport;
import net.datenwerke.rs.core.service.reportmanager.engine.basereports.CompiledJsonReport;
import net.datenwerke.rs.core.service.reportmanager.engine.config.ReportExecutionConfig;
import net.datenwerke.rs.core.service.reportmanager.exceptions.ReportExecutorException;
import net.datenwerke.hookhandler.shared.hookhandler.HookHandlerService;
import net.datenwerke.rs.saiku.server.rest.objects.resultset.QueryResult;
import net.datenwerke.rs.saiku.server.rest.util.RestUtil;
import net.datenwerke.rs.saiku.service.saiku.reportengine.output.object.CompiledRSSaikuReport;

import org.codehaus.jackson.map.ObjectMapper;
import org.olap4j.CellSet;
import org.saiku.olap.dto.SaikuDimensionSelection;
import org.saiku.olap.dto.resultset.CellDataSet;

import net.datenwerke.rs.saiku.service.saiku.reportengine.hooks.SaikuOutputGeneratorProviderHook;
import net.datenwerke.rs.saiku.service.saiku.reportengine.hooks.adapter.SaikuOutputGeneratorProviderHookAdapter;
import net.datenwerke.rs.saiku.service.saiku.reportengine.output.generator.SaikuOutputGeneratorImpl;

class CompiledJSONSaikuReport extends CompiledJsonReport implements CompiledRSSaikuReport {

	CompiledJSONSaikuReport(String report) {
		super(report);
	}

	public CompiledJSONSaikuReport() {
		super("");
	}

}


def HOOK_NAME = "MY_ADDITIONAL_GENERATOR"
String OUTPUT_FORMAT_CHART_JSON = "SAIKU_CHART_JSON";


/* specify the generator */
class SaikuChartJSONOutputGenerator extends SaikuOutputGeneratorImpl {

	final Provider<HttpServletRequest> provider;
	
	@Inject
	SaikuChartJSONOutputGenerator(HookHandlerService hookHandler, Provider<HttpServletRequest> httpServletRequestProvider) {
	  super(hookHandler);
	  this.provider = httpServletRequestProvider;
	 }
	

	CompiledRSSaikuReport exportReport(CellDataSet cellDataSet,
			CellSet cellset, List<SaikuDimensionSelection> filters,
			String outputFormat, ReportExecutionConfig... configs)
			throws ReportExecutorException {
		
		QueryResult queryResult = RestUtil.convert(cellDataSet);

		ObjectMapper om = new ObjectMapper();
		String json;
		try {
			json = om.writeValueAsString(queryResult);
		} catch (Exception e) {
			throw new ReportExecutorException(e);
		} 
		
		try {
			return new CompiledJSONSaikuReport(this.provider.get().getParameter("callback") + "(" + json +")");
		} catch (Exception e) {
			throw new ReportExecutorException(e);
		}
	}

	String[] getFormats() {
      return ["SAIKU_CHART_JSON"];
	}

	CompiledReport getFormatInfo() {
		return new CompiledJSONSaikuReport();
	}

}

/* specify provider */
def provider = [
	provideGenerators : { ->
		return [GLOBALS.getInstance(SaikuChartJSONOutputGenerator.class)]
	}
] as SaikuOutputGeneratorProviderHookAdapter

/* plugin hook */

GLOBALS.services.callbackRegistry.attachHook(HOOK_NAME, SaikuOutputGeneratorProviderHook.class, provider)
