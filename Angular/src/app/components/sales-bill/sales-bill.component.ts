import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductListComponent } from '../product-list/product-list.component';
import { Router } from '@angular/router';

import {DatatableComponent} from '@swimlane/ngx-datatable';

import { SqlService } from 'src/app/shared/data-service/sql.service';

export interface ProductElement {
  SerialNumber: Number;
  ProductCode: string;
  ProductName: string;
  qty: Number;
  free: Number;
  tax: Number;
  mrp: number;
  unitPrice: Number;
  netAmount: Number;
}

const ELEMENT_DATA: ProductElement[] = [
  { SerialNumber: 1, ProductCode: '', ProductName: '', qty: null, free: null, tax: null, mrp: null, unitPrice: null, netAmount: null },
];

@Component({
  selector: 'app-sales-bill',
  templateUrl: './sales-bill.component.html',
  styleUrls: ['./sales-bill.component.css']
})
export class SalesBillComponent implements OnInit {

  data: any;
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  displayedColumns: string[] = [
    'slNo',
    'code',
    'productName',
    'qty',
    'free',
    'tax',
    'mrp',
    'unitPrice',
    'netAmount',
  ];

  dataSource = ELEMENT_DATA;

  selected = new FormControl(0);
  @Input() tabid: any;
  @Input() products: ProductElement [];
  @Input() productList: any = [];

  //productList: any = [];

  constructor(public dialog: MatDialog, private router: Router, private sqlService: SqlService) {

  }

  ngOnInit() {
    // this.sqlService.getProductList().subscribe(datas => {
    //   this.productList = datas;
    // });
  }

  getData(): void {
    // this.sqlService.getProductByName(1, 'Lu').subscribe(data => {
    //   let resources = data[0]["ProductName"];
    //   //alert(resources);
    //   //alert(JSON.stringify(data.ProductName))
    // });
  }
  
  openProducts() {
    let dialogHeight = (window.innerHeight * 90) / 100;
    const dialogRef = this.dialog.open(ProductListComponent, {
      width: '60%',
      height: dialogHeight + 'px',
      data: { productList: this.productList, dialogHeight:  dialogHeight},
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.products[this.products.length - 1]['ProductName'] = result.ProductName;
      this.products[this.products.length - 1]['ProductCode'] = result.ProductCode;
     alert(result.ProductName);
    });

  }
}
