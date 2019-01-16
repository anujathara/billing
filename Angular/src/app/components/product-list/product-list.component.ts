import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SqlService } from 'src/app/shared/data-service/sql.service';
import { MatTableDataSource, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';

import {DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  rows = [];
  temp = [];

  columns = [
    { prop: 'SerialNumber', name: 'Sl.No.' },
    { prop: 'ProductCode' },
    { prop: 'ProductName' }
  ];

  searchProduct = '';
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.rows = this.data.productList;
    this.temp  = this.rows;
    
    // this.dataSource.paginator = this.matPaginator;
    // this.dataSource.data = this.data.productList;
    // this.dataSource.filterPredicate = (data, filter) =>
    //   data.ProductName.toLowerCase().indexOf(filter) !== -1
    //   && data.ProductCode.toString().toLowerCase().indexOf('') !== -1
    //   && data.SerialNumber.toString().toLowerCase().indexOf('') !== -1
  }

  applyFilter(filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    const val = filterValue.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.ProductName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    temp.map((x,i) =>  {
      return x.SerialNumber = i + 1;
    });
    this.rows = temp;
    this.table.offset = 0;
  }
}

