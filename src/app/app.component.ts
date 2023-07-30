import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {

  constructor(private route: Router) {
  }
  title = 'algamoney-ui';

  showNavbar(){
    return this.route.url !== '/login'
  }

}


