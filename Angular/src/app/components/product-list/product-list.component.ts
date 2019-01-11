import { Component, OnInit } from '@angular/core';
import { SqlService } from 'src/app/shared/data-service/sql.service';


export interface ProductElement {
  slNo: Number;
  code: string;
  productName: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  data: any;

  displayedColumns: string[] = [
    'slNo',
    'code',
    'productName'
  ];

  dataSource: ProductElement[] =  [
    { slNo: 1, code: '', productName: '' },
  ];

  searchProduct = '';

  constructor(private sqlService: SqlService) { }

  ngOnInit() {
  }

  searchProductChange(newValue) {
    this.dataSource = [{ slNo: 1, code: '', productName: '' }];
    this.searchProduct = newValue;
    this.sqlService.getProductByName(1, newValue).subscribe(datas => {
      datas.map((data, i) => {
        this.dataSource.push({ slNo: i, code: data.PROD_CODE, productName: data.ProductName });
        //const productObj: ProductElement = {
         // slNo: i,
         // code: data.PROD_CODE,
         // productName: data.ProductName,
        //}
        //this.dataSource.push(productObj);
      }
      )
    });
  }
}


