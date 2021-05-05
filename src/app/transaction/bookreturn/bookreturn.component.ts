import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthserviceService } from '../../shared/authservice.service';
import { BookDetails } from '../../shared/book.model';
import { DbserviceService } from '../../shared/dbservice.service';
import { IssueDetails } from '../../shared/issue.model';

@Component({
  selector: 'app-bookreturn',
  templateUrl: './bookreturn.component.html',
  styleUrls: ['./bookreturn.component.css']
})
export class BookreturnComponent implements OnInit, OnDestroy {
  
  userName : string='';
  issueDetails : IssueDetails[]=[];
  baseURL : string ="https://my-json-server.typicode.com/joeljoyston/lms";
  
  userSub = new Subscription();
  getReqSub = new Subscription();
  issueId : number=-1;

  

  constructor(private dbs : DbserviceService,
              private authService : AuthserviceService) { 
                
              }

  ngOnInit(): void {
    
    console.log("Accessing the username of AuthService" + this.authService.userName);
    this.userName = this.authService.userName;
    this.loadBorrowedBookDetails();

  }

  loadBorrowedBookDetails() {
    this.issueDetails=[];
    const url = this.baseURL + "/issue?userName=" + this.userName +"&actualReturnDate=";
    console.log(url);
    this.dbs.fetchIssueData(url).
    subscribe(responseData => {
      for(const key in responseData) {
        this.issueDetails.push(responseData[key]);
        console.log(this.issueDetails[0].bookId);
      }
      
    });
    
  }

  selectBook(event:any){
    this.issueId = event.target.id;
  }

  returnBook() {
    
    this.issueDetails[this.issueId].actualReturnDate = new Date();
    const url= this.baseURL + "/issue/" + this.issueDetails[this.issueId].id;
    
    this.dbs.updateIssueData(url,this.issueDetails[this.issueId])
    .subscribe(responseData => {
      
      console.log(this.issueDetails[this.issueId]);
      console.log("Size of Issue Details Array" + this.issueDetails.length);
      this.retrieveBookDetails();
    });    
  }

  private retrieveBookDetails() {
    let borrowedBookDetails : BookDetails[]=[];
    console.log(this.issueId);
    console.log(this.issueDetails[this.issueId]);
    const url= this.baseURL + "/books?bookId=" + this.issueDetails[this.issueId].bookId;
    console.log(url);
    this.dbs.fetchData(url)
    .subscribe(responseData =>{
        for(const key in responseData) {
          borrowedBookDetails.push(responseData[key]); 
        }        
        borrowedBookDetails[0].status='A';  
        console.log(borrowedBookDetails[0].bookId);
        this.updateBookDetails(borrowedBookDetails[0]);   
        
    });

   
    
  }

  updateBookDetails(book : BookDetails){
    const url = this.baseURL + "/books/" + book.id;
    console.log(url);
    this.dbs.updateData(url,book);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


}
