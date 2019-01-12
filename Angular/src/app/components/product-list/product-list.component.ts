import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SqlService } from 'src/app/shared/data-service/sql.service';
import { MatTableDataSource, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';


export interface ProductElement {
  SerialNumber: Number;
  ProductCode: string;
  ProductName: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = [
    'slNo',
    'code',
    'productName'
  ];
  dataSource = new MatTableDataSource<ProductElement>();
  searchProduct = '';
  @ViewChild(MatPaginator) matPaginator: MatPaginator;

  constructor(private sqlService: SqlService,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.data = this.data.productList;
    this.dataSource.filterPredicate = (data, filter) =>
    data.ProductName.toLowerCase().indexOf(filter) !== -1
    && data.ProductCode.toString().toLowerCase().indexOf('') !== -1
    && data.SerialNumber.toString().toLowerCase().indexOf('') !== -1
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // this.dataSource = [];
    // this.searchProduct = newValue;
    // if (newValue.length > 0) {
    //   this.sqlService.getProductByName(1, newValue).subscribe(datas => {
    //     datas.map((data, i) => {
    //       if (i === 0) {
    //         this.dataSource = [];
    //       }
    //       this.dataSource.push({ slNo: i + 1, code: data.ProductCode, productName: data.ProductName });
    //       //const productObj: ProductElement = {
    //       // slNo: i,
    //       // code: data.PROD_CODE,
    //       // productName: data.ProductName,
    //       //}
    //       //this.dataSource.push(productObj);
    //     }
    //     )
    //   });
    // }
  }
}


