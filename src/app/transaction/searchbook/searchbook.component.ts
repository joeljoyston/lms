import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookDetails } from '../../shared/book.model';
import { DbserviceService } from '../../shared/dbservice.service';
import { map, take } from 'rxjs/operators';
import { AuthserviceService } from '../../shared/authservice.service';
import { Subscription } from 'rxjs';
import { UserDetails } from '../../shared/user.model';


@Component({
  selector: 'app-searchbook',
  templateUrl: './searchbook.component.html',
  styleUrls: ['./searchbook.component.css']
})
export class SearchbookComponent implements OnInit, OnDestroy {

  bookDetails : BookDetails[] =[];
  searchClicked : boolean = false;
  defaultCategory : string ="bookTitle";
  selectedBookId : number=-1;
  selectedBookStatus : string ='N';
  userName : string='';
  baseURL : string ="https://my-json-server.typicode.com/joeljoyston/lms";
  

  constructor(private dbs: DbserviceService,
              private authService : AuthserviceService) { }

  ngOnInit(): void {
    this.userName = this.authService.userName;
  }

  ngOnDestroy() {
  }

  onSubmit(searchForm : NgForm){
    this.searchClicked = false;
    this.bookDetails=[];
    console.log(searchForm.value.searchCategory);
    const url = this.baseURL + "/books" + "?" + searchForm.value.searchCategory + "=" + searchForm.value.searchVal;
    this.dbs.fetchData(url)
    .subscribe(responseData => {   
        for(const key in responseData) {
          this.bookDetails.push(responseData[key]);
        }   
      }      
    );   
    this.searchClicked = true;
  }

  onSelectBook(event:any) {
    this.selectedBookId=event.target.id;
    console.log(this.selectedBookId);
    this.selectedBookStatus=this.bookDetails[event.target.id].status;
    console.log(this.selectedBookStatus);
  }

  onBorrowBook() {    
    console.log("User " + this.userName + " wants to borrow " + this.bookDetails[this.selectedBookId].bookTitle);
    const issueUrl = this.baseURL + "/issue";
    const issueDate = new Date();
    let returnDate = new Date();
    returnDate = new Date(returnDate.setDate(issueDate.getDate()+5));
    //returnDate = returnDate.setDate(issueDate.getDate()+5);
    const issueDetails ={
      "userName" : this.userName,
      "bookId" : this.bookDetails[this.selectedBookId].bookId,
      "issueDate" : issueDate.toDateString(),
      "returnDate": returnDate.toDateString(),
      "actualReturnDate":''
    };
    this.dbs.postData(issueUrl,issueDetails);

    /* Code to update status of the book */

    this.bookDetails[this.selectedBookId].status='B';
    const booksUrl = this.baseURL + "/books/" + this.bookDetails[this.selectedBookId].id;
    this.dbs.updateData(booksUrl,this.bookDetails[this.selectedBookId]);
  }


}
