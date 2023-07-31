import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout/logout.component";
import {PageNotFoundComponent} from "./errors/page-not-found/page-not-found.component";
import {LancamentosRoutingModule} from "./lancamentos/lancamentos-routing.module";
import {PessoasRoutingModule} from "./pessoas/pessoas-routing.module";
import {NotAuthorizedComponent} from "./errors/not-authorized/not-authorized.component";
import {DashboardRoutingModule} from "./dashboard/dashboard-routing.module";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: "full" },
    { path: '', loadChildren: () => PessoasRoutingModule},
  { path: '', loadChildren: () => LancamentosRoutingModule},
  { path: '', loadChildren: () => DashboardRoutingModule},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'page-not-found', component: PageNotFoundComponent},
  { path: 'not-authorized', component: NotAuthorizedComponent},
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
