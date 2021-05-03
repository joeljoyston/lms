import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InventoryComponent } from './inventory/inventory.component';
import { TransactionComponent } from './transaction/transaction.component';
import { BookaddComponent } from './inventory/bookadd/bookadd.component';
import { LoginComponent } from './login/login.component';
import { SearchbookComponent } from './transaction/searchbook/searchbook.component';
import { BookeditComponent } from './inventory/bookedit/bookedit.component';
import { BookreturnComponent } from './transaction/bookreturn/bookreturn.component';
import { BookdeleteComponent } from './inventory/bookdelete/bookdelete.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InventoryComponent,
    TransactionComponent,
    BookaddComponent,
    SearchbookComponent,
    LoginComponent,
    BookeditComponent,
    BookreturnComponent,
    BookdeleteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
