import { Component, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatTabChangeEvent } from '@angular/material';
import { Router } from '@angular/router';
import { SalesBillComponent, ProductElement } from '../sales-bill/sales-bill.component';
import { TaskService } from 'src/app/shared/broadcast-service/task.service';

@Component({
  selector: 'app-sales-tab',
  templateUrl: './sales-tab.component.html',
  styleUrls: ['./sales-tab.component.css']
})

export class SalesTabComponent {
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;
  billNo: any = 1;

  productList: ProductElement[] = [
    { slNo: 1, code: '', productName: '', qty: null, free: null, tax: null, mrp: null, unitPrice: null, netAmount: null },
  ];
  arr: any[] = [{ productList: this.productList }]

  tabs = [{ id: 0, name: 'Bill 1', products: this.productList, content: null }];
  selected = new FormControl(0);
  tabIndex: any = 0;
  view: ViewRef;
  dynamicTabs: SalesBillComponent[] = [];

  addTab() {
    const productList1: ProductElement[] = [
      { slNo: 1, code: '', productName: '', qty: null, free: null, tax: null, mrp: null, unitPrice: null, netAmount: null },
    ];
    this.arr.push({ productList: productList1 });
    this.tabs.splice(this.tabs.length, 0, { id: this.billNo, products: this.arr[this.tabs.length]['productList'], name: 'Bill' + (this.tabs.length + 1), content: this.vc });
    this.selected.setValue(this.tabs.length - 1);
  }

  onTabChange(event: MatTabChangeEvent) {
    if (event.index === this.tabs.length) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    if (this.tabs.length === 1) {
      this.tabs = [];
      this.taskService.clearTask(this.router.url);

    } else {
      if (this.selected.value === index) {
        if (index === this.tabs.length - 1) {
          this.selected.setValue(this.tabs.length - 2);
        } else {
          this.selected.setValue(index);
        }
      }
      this.tabs.splice(index, 1);
      let count = 0;
      this.tabs.map((x, i) => {
        if (i <= this.tabs.length - 1) {
          count = i + 1;
          this.tabs[i]['name'] = 'Bill ' + count;
        }
      })
      this.arr.splice(index, 1);
    }
  }

  constructor(public dialog: MatDialog, private router: Router, private taskService: TaskService) {
  }
}



