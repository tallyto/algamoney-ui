import { NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LancamentosModule} from "./lancamentos/lancamentos.module";
import {PessoasModule} from "./pessoas/pessoas.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {AuthErrorInterceptor} from "./interceptors/auth-error.interceptor";
import { LogoutComponent } from './logout/logout/logout.component';
import {PasswordModule} from "primeng/password";
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import {ToastModule} from "primeng/toast";
import { NotAuthorizedComponent } from './errors/not-authorized/not-authorized.component';
import {MessageModule} from "primeng/message";
import {PanelModule} from "primeng/panel";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    PageNotFoundComponent,
    NotAuthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    FormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
    MessageModule,
    PanelModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true },
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
