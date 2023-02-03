import { Component, createNgModuleRef, OnInit } from '@angular/core';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Legend from "@arcgis/core/widgets/Legend";
import LayerList from "@arcgis/core/widgets/LayerList";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import Compass from "@arcgis/core/widgets/Compass";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import LabelClass from "@arcgis/core/layers/support/LabelClass";

@Component({
  selector: 'app-first-map',
  templateUrl: './first-map.component.html',
  styleUrls: ['./first-map.component.scss']
})
export class FirstMapComponent implements OnInit {
  mapEvent: any
  constructor() { }

  ngOnInit(): void {
    let myMap = new Map({
      basemap: "osm"
    });

    (window as any)._map = myMap

    let view = new MapView({
      map: myMap,
      container: "viewDiv",
      center: [43.539686537733914, 24.37241011569452],
      zoom: 5,
    });


    (window as any)._view = view


    let citiesRenderer: any = {
      type: "simple",  // autocasts as new SimpleRenderer()
      symbol: {
        type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
        size: 6,
        color: "black",
        outline: {  // autocasts as new SimpleLineSymbol()
          width: 0.5,
          color: "white"
        }
      }
    };

    view.when(() => {



      const fLayer: any = new FeatureLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
        layerId: 1,
        opacity: 1,
        legendEnabled: false,
        id: "fLayer",
        editingEnabled: true,
        displayField: "areaname",
        labelsVisible: false
      });


      const statesLabelClass = new LabelClass({
        labelExpressionInfo: { expression: "$feature.areaname" },
        symbol: {
          type: "text",  // autocasts as new TextSymbol()
          color: "red",
          haloSize: 1,
          haloColor: "white"
        }
      });

      fLayer.labelingInfo = [statesLabelClass];


      // fLayer.featureReduction = {
      //   type: "cluster",
      //   clusterRadius: 100,
      //   renderer:citiesRenderer
      // };

      ///////////////////////////////////////////////////////////////////////////////////
      fLayer.queryExtent().then(function (results: any) {
        view.goTo(results.extent);
      });


      fLayer.when(function () {
        view.extent = fLayer.fullExtent;
      });

      let legend = new Legend({
        view: view
      });

      view.ui.add(legend, "bottom-right");


      let layerlist = new LayerList({
        view: view
      });

      view.ui.add(layerlist, "top-right");



      let layerCensus = new MapImageLayer({
        url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer",
        id: "layerCensus"
      });

      myMap.addMany([fLayer]);
      // myMap.addMany([layerCensus, fLayer]);

      let compass = new Compass({
        view: view
      });

      // adds the compass to the top left corner of the MapView
      view.ui.add(compass, "top-left");

      this.mapEvent = view.on('click', (event) => {
        const screenPoint = {
          x: event.x,
          y: event.y
        };

        view.hitTest(screenPoint).then((result) => {
          console.log(result);

        })
      })

    })
  }
}
