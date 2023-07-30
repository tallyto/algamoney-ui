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
    const { sub } = this.authService.decodePayloadJWT()

     return sub
  }

  handlerMenu(){
      this.exibindoMenu = !this.exibindoMenu
  }
}
