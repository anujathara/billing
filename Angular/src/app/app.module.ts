import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { SalesBillComponent } from './components/sales-bill/sales-bill.component';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SalesTabComponent } from './components/sales-tab/sales-tab.component';
import { TaskService } from './shared/broadcast-service/task.service';
import { TaskBarComponent } from './components/task-bar/task-bar.component';

import { HttpClientModule } from '@angular/common/http';
import { SqlService } from './shared/data-service/sql.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SalesBillComponent,
    HomeComponent,
    ProductListComponent,
    SalesTabComponent,
    TaskBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    AppRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    MatTabsModule,

    HttpClientModule
  ],
  entryComponents: [ProductListComponent, SalesBillComponent],

  providers: [TaskService, SqlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
