import { Component, OnInit } from '@angular/core';

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
  selector: 'app-list-order-form',
  templateUrl: './list-order-form.component.html',
  styleUrls: ['./list-order-form.component.css']
})
export class  ListOrderFormComponent implements OnInit {

  productCount: number = 1;
  data: any;

  displayedColumns: string[] = [
    'billNo',
    'date',
    'customer',
    'duedate',
    'duetime',
    'amount',
    'advance',
    'payment',
    'status',
    'delivery',
    'total',
    'salebillamt',
  ];

 

  constructor() {
  }

  ngOnInit() {
    }
  
  
}

