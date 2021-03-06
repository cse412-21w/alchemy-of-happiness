/** Wenxuan Qi
 * Economy + Trust vs Happiness Score
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
  }
};

vl.register(vega, vegaLite, options);

d3.csv(happinessData).then(function(data){
  data.forEach(function(d) {
    happinessArray.push(d);
    if (!yearSet.includes(d.year)) {
      yearSet.push(d.year);
    }
  })
  drawGDPVegaLite();
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
  
function drawGDPVegaLite() {
  return vl.markPoint({filled:true})
    .data(happinessArray)
    .transform(
      vl.groupby('Country')
        .aggregate(vl.average('Happiness_Score').as('Average_Happiness_Score'), vl.average('Economy').as('Average_GDP'))  
    )
    .encode(
      vl.x().fieldQ('Average_GDP'),
        vl.y().fieldQ('Average_Happiness_Score'),
      vl.tooltip(['Country','Average_GDP', 'Average_Happiness_Score'])
    )
    .width(500)
    .height(400)
    .render()
    .then(viewElement => {
      document.getElementById('GDPview').appendChild(viewElement);
    });
}