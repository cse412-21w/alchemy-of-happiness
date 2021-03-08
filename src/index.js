new fullpage('#fullPage', {
        licenseKey: '3B260588-D40B40CC-9E84CF5D-1BAC5B3D',
        autoScrolling: true,
        navigation: true,
        loopBottom: true,
        sectionsColor: ['#C0C0C0','#C0C0C0','#C0C0C0','#C0C0C0']
    })

/** Wenxuan Qi
 * Economy + Trust vs Happiness Score
 * The above code is the original code in this file.
 */ 
import happinessData from '../static/happiness_percentage1.csv'
"use strict";

var happinessArray = [];
var yearSet = [];
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
    .height(300)
    .render()
    .then(viewElement => {
      document.getElementById('view').appendChild(viewElement);
    });
}
