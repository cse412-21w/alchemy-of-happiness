import sunshineData from '../static/sunshine.csv'    // import dataset
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables

var sunshineArray = [];   // used to store data later
var citySet = [];

const options = {
  config: {
    // Vega-Lite default configuration
  },
  init: (view) => {
    // initialize tooltip handler
    view.tooltip(new vegaTooltip.Handler().call);
  },
  view: {
    // view constructor options
    // remove the loader if you don't want to default to vega-datasets!
    //   loader: vega.loader({
    //     baseURL: "",
    //   }),
    renderer: "canvas",
  },
};

vl.register(vega, vegaLite, options);

// Again, We use d3.csv() to process data
d3.csv(sunshineData).then(function(data) {
  data.forEach(function(d){
    sunshineArray.push(d);
    if (!citySet.includes(d.city)) {
      citySet.push(d.city);
    }
  })
  drawBarVegaLite();
});


function drawBarVegaLite() {
  // var sunshine = add_data(vl, sunshine.csv, format_type = NULL);
  // your visualization goes here
  vl.markBar({filled:true, color:'teal'})
  .data(sunshineArray)
  .encode(
      vl.x().fieldN('month').sort('none'),
      vl.y().fieldQ('sunshine'),
      vl.tooltip(['sunshine']),
  )
  .width(450)
  .height(450)
  .render()
  .then(viewElement => {
    // render returns a promise to a DOM element containing the chart
    // viewElement.value contains the Vega View object instance
    document.getElementById('view').appendChild(viewElement);
  });
}



/** Wenxuan Qi
 * Unfinished Part
 * The above code is the original code in this file.
 * 
import happinessData from '../static/happiness_percentage.csv'
"use strict";

var happinessArray = [];
const options = {
  config: {
    // Vega-Lite default configuration
  },
  init: (view) => {
    // initialize tooltip handler
    view.tooltip(new vegaTooltip.Handler().call);
  },
  view: {
    // view constructor options
    // remove the loader if you don't want to default to vega-datasets!
    //   loader: vega.loader({
    //     baseURL: "",
    //   }),
    renderer: "canvas",
  },
};

vl.register(vega, vegaLite, options);

d3.csv(happinessData).then(function(data){
  data.forEach(function(d) {
    d["Happiness.Score"] = Number(d["Happiness.Score"]);
    d["Trust..Government.Corruption."] = Number(d["Trust..Government.Corruption."]);
    happinessArray.push(d);
  })
  drawScatterVegaLite();
})

function drawScatterVegaLite() {
  vl.markPoint({filled:true, color:'teal'})
    .data(happinessArray)
    .encode(
      vl.x().fieldQ('Economy..GDP.per.Capita.'),
      vl.y().fieldQ('Happiness.Score')
    )
    .render()
    .then(viewElement => {
      document.getElementById('view').appendChild(viewElement);
    });
}
 */
