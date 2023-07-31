import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {SharedModule} from "../shared/shared.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {PanelModule} from "primeng/panel";
import {ChartModule} from "primeng/chart";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    PanelModule,
    ChartModule,
    ButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    InputTextModule,
    PaginatorModule,
    TableModule,
    TooltipModule
  ]
})
export class DashboardModule { }
