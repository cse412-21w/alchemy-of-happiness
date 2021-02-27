/**
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
*/





/** Wenxuan Qi
 * Economy + Trust vs Happiness Score
 * The above code is the original code in this file.
 */ 
import happinessData from '../static/happiness_percentage1.csv'
"use strict";

var happinessArray = [];
var yearSet = [];
//var regionSet = [];
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
    happinessArray.push(d);
    if (!yearSet.includes(d.year)) {
      yearSet.push(d.year);
    }
    //if (!regionSet.includes(d.Region)) {
      //regionSet.push(d.Region);
    //}
  })
  drawScatterVegaLite();
})

function drawScatterVegaLite() {
  const selection2 = vl.selectSingle('happiness')
    .fields('year')
    .init({year: yearSet[0]})
    .bind(vl.radio(yearSet));
  
  return vl.markPoint({filled:true})
    .data(happinessArray)
    .select(selection2)
    .encode(
      vl.x().fieldQ('Economy'),
      vl.y().fieldQ('Happiness_Score'),
      vl.size().fieldQ('Trust_Government_Corruption')
               .legend({symbolOpacity: 0.7}),
      vl.color().fieldN('Region')
               .legend({symbolOpacity: 1}),
      vl.opacity().if(selection2).value(0.1),
      vl.tooltip(['Happiness_Score', 'Economy', 'Trust_Government_Corruption', 'Region'])
    )
    .width(500)
    .height(500)
    .render()
    .then(viewElement => {
      document.getElementById('view').appendChild(viewElement);
    });
}

