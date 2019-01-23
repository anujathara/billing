import { Component, OnInit, AfterViewChecked, ViewChild, Inject, ElementRef } from '@angular/core';
import { SqlService } from 'src/app/shared/data-service/sql.service';
import { MatTableDataSource, MatPaginator, MAT_DIALOG_DATA, MatInput } from '@angular/material';

import { DatatableComponent, DataTableBodyRowComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewChecked {

  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  // columns = [
  //   { prop: 'SerialNumber', name: 'Sl.No.' },
  //   { prop: 'ProductCode' },
  //   { prop: 'ProductName' }
  // ];

  searchProduct = '';
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild(MatInput) searchInput: MatInput;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.rows = this.data.productList;
    this.temp = this.rows;

    if (this.rows.length > 0) {
      this.selected[0] = this.rows[0];
    }
    this.searchInput.focus();

    // this.dataSource.paginator = this.matPaginator;
    // this.dataSource.data = this.data.productList;
    // this.dataSource.filterPredicate = (data, filter) =>
    //   data.ProductName.toLowerCase().indexOf(filter) !== -1
    //   && data.ProductCode.toString().toLowerCase().indexOf('') !== -1
    //   && data.SerialNumber.toString().toLowerCase().indexOf('') !== -1
  }

  ngAfterViewChecked() {

    //alert(this.dialog1.nativeElement.offsetWidth);
    //   this.table.recalculate();

  }

  applyFilter(event, filterValue: string) {
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    if(event.code === 'ArrowDown') {
      this.selected[0] = this.rows[this.table.bodyComponent.getRowIndex(this.selected[0]) + 1];
      this.table.recalculate();
      this.table.bodyComponent.recalcLayout();

      this.table.bodyComponent.updateIndexes();
      
      this.table.activate;
    } else if(event.code === 'ArrowUp') {
      this.selected[0] = this.rows[this.table.bodyComponent.getRowIndex(this.selected[0]) - 1];
    } else {
    
    const val = filterValue.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.ProductName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    temp.map((x, i) => {
      return x.SerialNumber = i + 1;
    });
    this.rows = temp;
    this.table.offset = 0;

    this.selected[0] = this.rows[0];
  }
  }

  onSelect({ selected }) {
    // this.selected = selected;
    //alert(this.table.offset);
  }

  onActivate(event) {

    if (event.type == "keydown" && event.event.code == "ArrowDown") {
      if((this.table.bodyComponent.getRowIndex(event.row)+1) == (this.table.limit * (this.table.offset+1))) {
        this.table.offset++;


        
      }
      this.selected[0] = this.rows[this.table.bodyComponent.getRowIndex(event.row) + 1];
    }
    else if (event.type == "keydown" && event.event.code == "ArrowUp") {
      this.selected[0] = this.rows[this.table.bodyComponent.getRowIndex(event.row) - 1];
    }
   //  event.preventDefault(); 

  }

  onKeypress(event) {
    //  alert(event.key);
  }
  onKeyup(event) {
    // if(event.key);
  }

  onFooterPage(event) {
    alert(event);
  }

}

