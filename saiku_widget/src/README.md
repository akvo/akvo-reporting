#Notes on the ReportServer Saiku chart widget

The chart widget runs on top of a bunch of libraries. These are notes about the implementation of getting all deps into one javascript bundle, using gulp and browserify.

## Building

Using gulp and browserify all the javascript needed to display a ReportServer dynamic list chart on a third party web page is assembled.

To build the javascript file you need node installed. Steps to build:

  * Check out the code (akvo-reporting repo)
  * cd into the root directory of the widget (currently akvo-reporting/saiku_widget)
  * execute ```npm install```
  * execute ```gulp --production```
  
The result javascript bundle file is akvo-reporting/saiku_widget/dist/chart.js. When developing the software further you'll want to be able to build the bundle without minification, this is done by running only ```gulp```. The resulting javascript and source map then ends up in dev/.

To add new script to the bundle you have to add them into the package.json file. In addition to browserfy we use browserify-shim to get all libraries to import and export relevant objects. See the browserify and browserify-shim docs. [Browserify](http://browserify.org/) [browserify-shim](https://github.com/thlorenz/browserify-shim).

## Notes on the individual files

In ReportServer the chart is delivered as a full web page with a number of javascript and css dependencies that are loaded as individual files. The gulp script, using browserify and browserify-shim bundle all of those dependencies into one file, chart.js that includes all that is needed to display a chart with data from a ReportServer dynamic list report. 

The following is a list of all the original files, where they are in the ReportServer file tree and any special notes for the file. All paths relative to akvo-reporting/saku_widget.

**src/jquery.1.7.2.js** original **jquery.js** from the [download of the 1.7.2 tag of	 the jquery github repo](https://github.com/jquery/jquery/releases/tag/1.7.2)

**src/jquery-ui.1.10.3.js** original: jquery-ui/jquery-ui.js from the node checkout ```npm install jquery-ui@1.10.4```. Note the version diff between the file name and the checkout! Also note that the first line, require('jquery'), is commented out to work with browserify.

**src/purl.2.3.1.js** original: /ReportServer/war/resources/js/purl.js v2.3.1

**underscore** original: /ReportServer/war/saiku/js/backbone/underscore.js 1.1.6. Installed via NPM, "underscore": "1.1.6" in package.json

**src/backbone-json2.js** original: /ReportServer/war/saiku/js/backbone/json2.js

**backbone** original: /ReportServer/war/saiku/js/backbone/backbone.js 0.5.3. Installed via NPM, "backbone": "0.5.3" in package.json.

**src/protovis.3.3.0.js** original: /ReportServer/war/resources/saiku/js/saiku/plugins/CCC_Chart/protovis.js This is taken directly from RS. I first tried using the protovis from github, but that version 3.3 *is not the same!*

**src/protovis-msie.js** original: /ReportServer/war/resources/saiku/js/saiku/plugins/CCC_Chart/protovis-msie.js

**src/tipsy.js** original: /ReportServer/war/resources/saiku/js/saiku/plugins/CCC_Chart/tipsy.js. First and last line edited comapred to original to get the correct version of jQuery into the tipsy closure. Browserify-shim should fix this, but somehow tipsy runs on the gobal jQuery without this fix. Github repo: [https://github.com/jaz303/tipsy](https://github.com/jaz303/tipsy)

**src/ccc_chart-def.js** original: /ReportServer/war/resources/saiku/js/saiku/plugins/CCC_Chart/def.js

**src/ccc_chart-pvc-r2.0.js** original: /ReportServer/war/resources/saiku/js/saiku/plugins/CCC_Chart/pvc-r2.0.js. I've run this file through a de-minifier to be able to look at the code (somewhat).

**src/settings.js** original: /ReportServer/war/saiku/js/saiku/Settings.js

**src/ccc_chart-plugin.js** original: /ReportServer/war/resources/saiku/js/saiku/plugins/CCC_Chart/plugin.js

**src/main.js** original: /ReportServer/war/resources/saiku/charttemplate.html. This is a re-work of the .html template that ReportServer delivers to render a full web page with a chart.

**src/css/tipsy.css** original: /ReportServer/war/resources/saiku/js/saiku/plugins/CCC_Chart/tipsy.css the original CSS used by tipsy. This is only included for reference, the styling is now added using script, the addStyles() function in src/main.js.

**saiku-chart-widget.js** This file is the assembly of all the component libraries and is the file the gulpfile points to for assembling it all.

Note on the protovis and CCC chart files. I've now found a github repo with CCC that includes (probably) all the files: [https://github.com/webdetails/ccc](https://github.com/webdetails/ccc) but I've not searched for the exact matching commit in that codebase.








