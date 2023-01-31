import { Component, OnInit } from '@angular/core';
import { setDefaultOptions, loadModules } from 'esri-loader';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    setDefaultOptions({ css: true });
    // this will lazy load the ArcGIS API
    // and then use Dojo's loader to require the classes
    loadModules(['esri/views/MapView', 'esri/WebMap', "esri/widgets/Compass"])
      .then(([MapView, WebMap, Compass]) => {
        // then we load a web map from an id
        const webmap = new WebMap({
          portalItem: { // autocasts as new PortalItem()
            id: 'f2e9b762544945f390ca4ac3671cfa72'
          }
        });
        // and we show that map in a container w/ id #viewDiv
        const view = new MapView({
          map: webmap,
          container: 'viewDiv'
        });

        let compass = new Compass({
          view: view
        });

        // adds the compass to the top left corner of the MapView
        view.ui.add(compass, "top-left");
      })
      .catch(err => {
        // handle any errors
        console.error(err);
      });
  }
  title = 'ESriLoader';
}
