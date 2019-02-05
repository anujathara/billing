import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatInput, MatTableDataSource } from '@angular/material';
import { ProductListComponent } from '../product-list/product-list.component';

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

@Component({
  selector: 'app-sales-bill',
  templateUrl: './sales-bill.component.html',
  styleUrls: ['./sales-bill.component.css']
})
export class SalesBillComponent implements OnInit {


  productCount: number = 1;
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

  selected = new FormControl(0);
  @ViewChild('qtyInput') qtyInput: ElementRef;
  @Input() tabid: any;
  @Input() products: ProductElement [];
  @Input() productList: any = [];
  dataSource: any;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.products);
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
      this.products[this.products.length - 1]['ProductCode'] = result.ProductCode;
      this.products[this.products.length - 1]['ProductName'] = result.ProductName;
      this.qtyInput.nativeElement.focus();
    });
  }

  addProduct() {
    this.productCount++;
    this.products.push({ SerialNumber: this.productCount, ProductCode: '', ProductName: '', qty: null, free: null, tax: null, mrp: null, unitPrice: null, netAmount: null });
    this.dataSource = new MatTableDataSource(this.products);

  }
}
