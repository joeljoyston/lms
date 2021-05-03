import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookaddComponent } from './inventory/bookadd/bookadd.component';
import { BookdeleteComponent } from './inventory/bookdelete/bookdelete.component';
import { BookeditComponent } from './inventory/bookedit/bookedit.component';
import { LoginComponent } from './login/login.component';
import { AuthguardService } from './shared/authguard.service';
import { BookreturnComponent } from './transaction/bookreturn/bookreturn.component';
import { SearchbookComponent } from './transaction/searchbook/searchbook.component';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'addBook', component:BookaddComponent},
  {path:'editBook', component:BookeditComponent},
  {path:'deleteBook', component:BookdeleteComponent},
  {path:'borrow',component:SearchbookComponent},
  {path:'return',component:BookreturnComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
