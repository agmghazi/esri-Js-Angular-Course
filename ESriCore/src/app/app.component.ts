import { Component, OnInit } from '@angular/core';
import esriConfig from "@arcgis/core/config.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ESriCore';

  ngOnInit(): void {
    esriConfig.assetsPath = "./assets";
  }
}


