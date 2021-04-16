//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

var data = require("./avg-soldAbove.geo.json");

var mapElement = document.querySelector("leaflet-map");

if (mapElement) {
  var L = mapElement.leaflet;
  var map = mapElement.map;

  map.scrollWheelZoom.disable();

  var focused = false;

  var all = "avg_soldAbove";

  var commafy = s => (s * 1).toLocaleString().replace(/\.0+$/, "");

  data.features.forEach(function(f) {
	["avg_soldAbove"].forEach(function(prop) {
		f.properties[prop] = (f.properties[prop] * 100).toFixed(1);
	});
	["total_sold"].forEach(function(prop) {
		f.properties[prop] = commafy ((f.properties[prop]));
	});
});


  var onEachFeature = function(feature, layer) {
    layer.bindPopup(ich.popup(feature.properties))
    layer.on({
      mouseover: function(e) {
        layer.setStyle({ weight: 2, fillOpacity: .9 });
      },
      mouseout: function(e) {
        if (focused && focused == layer) { return }
        layer.setStyle({ weight: 1.5, fillOpacity: 0.6 });
      }
    });
  };

  var getColor = function(d) {
    var value = d[all];
    if (typeof value == "string") {
      value = Number(value.replace(/,/, ""));
    }
    // console.log(value)
    if (typeof value != "undefined") {
      // condition ? if-true : if-false;
     return value >= 80.1 ? '#002755' :
     		value >= 60.1 ? '#00518f' :
            value >= 40.1 ? '#0076c3' :
            value >= 20.1 ? '#67b0d3' :
            value >= 0.1 ? '#cbe8f9' :
             
             'white' ;
    } else {
      return "gray"
    }
  };

  var style = function(feature) {
    var s = {
      fillColor: getColor(feature.properties),
      weight: 1.25,
      opacity: .25,
      color: '#000',
      fillOpacity: 0.6
    };
    return s;
  }

  var geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);

}

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))
};

 map.scrollWheelZoom.disable();