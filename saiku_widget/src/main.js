// src/main.js

var main = function($) {

  $(function(){

    function addStyles() {
      /*  Styles for tooltips of the charts. Taken from
          /ReportServer/war/resources/saiku/js/saiku/plugins/CCC_Chart/tipsy.css
      */
      var styles = [
        ".tipsy { pointer-events: none; padding: 5px; font-size: 10px; font-family: Arial,Helvetica,sans-serif; position: absolute; z-index: 100000; }",
        ".tipsy-inner { padding: 5px 8px 4px 8px; background-color: black; color: white; max-width: 200px; text-align: center; }",
        ".tipsy-inner { border-radius: 3px; -moz-border-radius:3px; -webkit-border-radius:3px; }",
        ".tipsy-arrow { position: absolute; width: 0; height: 0; line-height: 0; border: 5px dashed #000; }",
        ".tipsy-n .tipsy-arrow { top: 0px; left: 50%; margin-left: -5px; border-bottom-style: solid; border-top: none; border-left-color: transparent; border-right-color: transparent; }",
        ".tipsy-nw .tipsy-arrow { top: 0; left: 10px; border-bottom-style: solid; border-top: none; border-left-color: transparent; border-right-color: transparent;}",
        ".tipsy-ne .tipsy-arrow { top: 0; right: 10px; border-bottom-style: solid; border-top: none;  border-left-color: transparent; border-right-color: transparent;}",
        ".tipsy-s .tipsy-arrow { bottom: 0; left: 50%; margin-left: -5px; border-top-style: solid; border-bottom: none;  border-left-color: transparent; border-right-color: transparent; }",
        ".tipsy-sw .tipsy-arrow { bottom: 0; left: 10px; border-top-style: solid; border-bottom: none;  border-left-color: transparent; border-right-color: transparent; }",
        ".tipsy-se .tipsy-arrow { bottom: 0; right: 10px; border-top-style: solid; border-bottom: none; border-left-color: transparent; border-right-color: transparent; }",
        ".tipsy-e .tipsy-arrow { right: 0; top: 50%; margin-top: -5px; border-left-style: solid; border-right: none; border-top-color: transparent; border-bottom-color: transparent; }",
        ".tipsy-w .tipsy-arrow { left: 0; top: 50%; margin-top: -5px; border-right-style: solid; border-left: none; border-top-color: transparent; border-bottom-color: transparent;  }"
      ]
      $("<style>")
        .prop("type", "text/css")
        .html(styles.join(""))
        .appendTo("head");
    }

    addStyles();


    function renderChart(chart) {
      return function(data) {
        // HTML structure for the chart
        // From /ReportServer/war/resources/saiku/charttemplate.html
        $("#" + chart.ID).html('<div class="workspace_inner"><div class="query_toolbar"><div class="render_chart on" ></div></div><div class="workspace_toolbar"></div><div class="workspace_editor"><div id="mdx_editor" class="mdx_input hide"></div><span class="editor_info hide"></span></div><div id="query_processing" class="query_processing" style="display:none;"><span class="processing_image">&nbsp;&nbsp;</span> <span class="i18n">Running query...</span>  [&nbsp;<a class="cancel i18n" href="#cancel">Cancel</a>&nbsp;]</div><div class="workspace_results_info" align="right" ></div><div class="workspace_results" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%;"></div></div>');

        /* setup mock objects */
        var Result = Backbone.Model.extend({hasRun: function(){return true}, lastresult: function(){ return data}});
        var DummyQuery = Backbone.Model.extend({result: new Result(), setProperty: function(a,b){}});
        var DummyQueryToolbar = Backbone.View.extend();
        var DummyWorkspace = Backbone.View.extend({
          query: new DummyQuery(),
          querytoolbar: new DummyQueryToolbar({el: $("#" + chart.ID + " .query_toolbar")}),
          processing: $('<div />'),
          adjust: function(){}
        });

        var chartView = new Chart({workspace: new DummyWorkspace({el: $("#" + chart.ID)})});
        /* stackedBar, bar, multiplebar, line, pie, heatgrid, steckedBar100, area, dot, waterfall */
        if (chart.type) {
          chartView[chart.type]();
        }
        else {
          chartView["line"]();
        };
        // experimental customization
        if (chart.colors) {
          chartView.cccOptions.colors = chart.colors
        }
        chartView.cccOptions.colors.legendFont = "20px serif";
        chartView.render_view();
        chartView.show();
      };
    };

    function getSaikuJSON(chart) {
      var rs_uri = "http://127.0.0.1:8888/reportserver/";
      var key = chart["reportKey"];
      var saiku_chart_path = "httpauthexport?key=" + key + "&format=SAIKU_CHART_JSON&type=line&user=test&password=test1&callback=?";
      var chart_json_url = rs_uri + saiku_chart_path;
      $.ajax({
        url: chart_json_url
      , success: renderChart(chart)
      , dataType : 'jsonp'
      , crossDomain: true
      , jsonp: "callback"
      });
    };

    for (var i=0; i< akvoChartConfig.length; i++) {
      getSaikuJSON(akvoChartConfig[i])
    }

  });
}

module.exports = main;
