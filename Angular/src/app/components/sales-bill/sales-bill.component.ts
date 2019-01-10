import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductListComponent } from '../product-list/product-list.component';
import { Router } from '@angular/router';

import { SqlService } from 'src/app/shared/data-service/sql.service';

export interface ProductElement {
  slNo: Number;
  code: string;
  productName: string;
  qty: Number;
  free: Number;
  tax: Number;
  mrp: number;
  unitPrice: Number;
  netAmount: Number;
}

const ELEMENT_DATA: ProductElement[] = [
  { slNo: 1, code: '', productName: '', qty: null, free: null, tax: null, mrp: null, unitPrice: null, netAmount: null },
];

@Component({
  selector: 'app-sales-bill',
  templateUrl: './sales-bill.component.html',
  styleUrls: ['./sales-bill.component.css']
})
export class SalesBillComponent implements OnInit {

  data: any;

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
  @Input() products: ProductElement;
  constructor(public dialog: MatDialog, private router: Router, private sqlService: SqlService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.sqlService.getProductByName(1, 'Lu').subscribe(data => {
      let resources = data[0]["ProductName"];
      alert(resources);
      //alert(JSON.stringify(data.ProductName))
    });
  }

  openProducts() {
    const dialogRef = this.dialog.open(ProductListComponent);

    dialogRef.afterClosed().subscribe(result => {
      alert('Dialog result: ${result}');
    });
  }
}
