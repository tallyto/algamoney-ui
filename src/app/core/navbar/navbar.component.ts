import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  exibindoMenu = false;

  constructor(private authService: AuthService) {
  }

  getUserName(){
    return this.authService.decodePayloadJWT() && this.authService.decodePayloadJWT().sub
  }

  hasPermition(permition: string) {
    return  this.authService.hasPermition(permition)
  }

  handlerMenu(){
      this.exibindoMenu = !this.exibindoMenu
  }
}
