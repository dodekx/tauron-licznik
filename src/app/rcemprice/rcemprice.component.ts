import { Component } from '@angular/core';
import {
  getRCEmMonthlyPricesAsTable,

} from "../energy-summary-list/net-billing-monthly-price-const";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-rcem-price',
  templateUrl: './rcemprice.component.html',
  styleUrls: ['./rcemprice.component.scss'],
  standalone: true,
  imports: [
    MatListModule,
    MatCardModule,
    CommonModule,
    MatSort,
    MatPaginator,
    MatTableModule,
    ]
})
export class RCEMPriceComponent   {
  monthlyPrices =  new MatTableDataSource(getRCEmMonthlyPricesAsTable()) ;
  displayedColumns: string[] = ['year', 'price'];

}
