import { Component, OnInit, AfterViewChecked, ViewChild, Inject, ElementRef, ViewChildren, ViewContainerRef, QueryList } from '@angular/core';
import { SqlService } from 'src/app/shared/data-service/sql.service';
import { MatTableDataSource, MatPaginator, MAT_DIALOG_DATA, MatInput, MatTableModule, MatRow } from '@angular/material';

import { DatatableComponent, DataTableBodyRowComponent } from '@swimlane/ngx-datatable';


export interface ProductElement {
  SerialNumber: number;
  ProductCode: string;
  ProductName: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, AfterViewChecked {

  focused: ProductElement;
  highlightedRows = [];
  dataSource = new MatTableDataSource<ProductElement>();

  displayedColumns: string[] = [
    'slNo',
    'code',
    'productName'
  ];

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

  @ViewChild("matTable") matTable: ElementRef<MatTableModule>;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;

  @ViewChildren('matrow', { read: ViewContainerRef }) rows2: QueryList<ViewContainerRef>;

  selectedRowIndex: number = -1;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {



    this.rows = this.data.productList;
    this.temp = this.rows;

    if (this.rows.length > 0) {
      this.selected[0] = this.rows[0];
    }
    this.searchInput.focus();

    this.dataSource.paginator = this.matPaginator;
    this.dataSource.data = this.data.productList;
    this.dataSource.filterPredicate = (data, filter) =>
      data.ProductName.toLowerCase().indexOf(filter) !== -1
      && data.ProductCode.toString().toLowerCase().indexOf('') !== -1
      && data.SerialNumber.toString().toLowerCase().indexOf('') !== -1;
    document.querySelector('mat-table').scrollBy(0, 10000);

    this.focused = this.dataSource.data[0];
    this.highlightedRows = [];
    this.highlightedRows.push(this.focused);

  }

  ngAfterViewChecked() {


    // let indexstr = "1";
    // let row = this.rows2.find(row => row.element.nativeElement.getAttribute('position') === indexstr); 
    // if (row != null)
    // {
    //   let rect = row.element.nativeElement.getBoundingClientRect();
    //   if ((rect.y <= 0) || ((rect.y+rect.height) > 21))
    //   {
    //     row.element.nativeElement.scrollIntoView(false, {behavior: 'instant'});
    //   }
    // }
  }

  applyFilter(event, filterValue: string) {
    //this.selectedRowIndex = 30;
    //this.matTable.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start'});
   // event.preventDefault();
   // event.stopPropagation();


    if (event.keyCode == 38) // Up
    {
      this.keydown(event);
    }
    else if (event.keyCode == 40) // Down
    {
      this.keydown(event);
    }
    else  // Other
    {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.filteredData.map((x, i) => {
        return x.SerialNumber = i + 1;
      });
      this.highlightedRows = [];
      this.highlightedRows.push(this.dataSource.filteredData[0]);
      this.focused = this.dataSource.filteredData[0];
    }
    event.preventDefault();
    event.stopPropagation();



    //this.keydown(event);

    // if(event.code === 'ArrowDown') {
    //   this.selected[0] = this.rows[this.table.bodyComponent.getRowIndex(this.selected[0]) + 1];
    //   this.table.recalculate();
    //   this.table.bodyComponent.recalcLayout();

    //   this.table.bodyComponent.updateIndexes();

    //   this.table.activate;
    // } else if(event.code === 'ArrowUp') {
    //   this.selected[0] = this.rows[this.table.bodyComponent.getRowIndex(this.selected[0]) - 1];
    // } else {

    // const val = filterValue.toLowerCase();
    // const temp = this.temp.filter(function (d) {
    //   return d.ProductName.toLowerCase().indexOf(val) !== -1 || !val;
    // });

    // temp.map((x, i) => {
    //   return x.SerialNumber = i + 1;
    // });
    // this.rows = temp;
    // //this.table.offset = 0;

    // this.selected[0] = this.rows[0];
    // }
  }

  onSelect({ selected }) {
    // this.selected = selected;
    //alert(this.table.offset);
  }

  onActivate(event) {

    if (event.type == "keydown" && event.event.code == "ArrowDown") {
      if ((this.table.bodyComponent.getRowIndex(event.row) + 1) == (this.table.limit * (this.table.offset + 1))) {
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
    //  alert(event);
  }

  selectedRow(row: ProductElement) {
    this.selectedRowIndex = row.SerialNumber;
  }

  scroll(event) {
    alert(event);
  }

  getPosition(row: ProductElement): number {
    return row.SerialNumber;
  }

  recTrackBy(index: number, item: ProductElement) {
    return item.ProductName;
  }

  switchRow(row: ProductElement) {
    let x: number = this.highlightedRows.indexOf(row);
    if (x != -1)
      this.highlightedRows.splice(x, 1);
    else {
      this.highlightedRows = [];
      this.highlightedRows.push(row);
      this.focused = row;
    }
  }

  keydown(event: KeyboardEvent) {
    let rect = event.target.getBoundingClientRect();
    let x: number = this.dataSource.filteredData.indexOf(this.focused);
    let l: number = this.dataSource.filteredData.length;
    if (event.keyCode == 38) // Up
    {
      if (x > 0) {
        this.focused = this.dataSource.filteredData[x - 1];
        this.highlightedRows = [];
        this.highlightedRows.push(this.focused);
      }
    }
    else if (event.keyCode == 40) // Down
    {
      if (x < l - 1) {
        this.focused = this.dataSource.filteredData[x + 1];
        this.highlightedRows = [];
        this.highlightedRows.push(this.focused);
      }
    }
    if (this.focused != null) {
      this.showElement(this.focused.SerialNumber, rect.height);
    }
  }

  showElement(index: number, height: number) {
    let found: boolean = false;
    let indexstr = index.toString();
    let row = this.rows2.find(row => row.element.nativeElement.getAttribute('position') === indexstr);
    if (row != null) {
      let rect = row.element.nativeElement.getBoundingClientRect();
      if ((rect.y <= 0) || ((rect.y + rect.height) > height)) {
        row.element.nativeElement.scrollIntoView(false, { behavior: 'instant' });
      }
      return;
    }
    console.log('not found');
  }
}

