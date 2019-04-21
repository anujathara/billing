import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SalesTabComponent } from './components/sales-tab/sales-tab.component';
import { HomeComponent } from './components/home/home.component';
import { PurchaseEntryComponent } from './components/purchase-entry/purchase-entry.component';

const appRoutes: Routes = [
  { path: 'salesbill', component: SalesTabComponent },

  { path: 'purchaseentry', component: PurchaseEntryComponent}, 
 
  { path: 'home', component: HomeComponent},
  
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
