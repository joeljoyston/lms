import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from './user.model';
import { map, tap } from "rxjs/operators";
import { BookDetails } from './book.model';
import { Subject } from 'rxjs';
import { IssueDetails } from './issue.model';



@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  
  

  constructor(private http:HttpClient) {
    
   }

  fetchIssueData(url : string) {
    return this.http.get<IssueDetails[]>(url);
  }

  fetchData(url : string) {
    return this.http.get<BookDetails[]>(url);
  }

  fetchSingleBook(url : string) {
    return this.http.get<BookDetails>(url);
  }

  postData(url : string, reqBody : object) {
    this.http.post(url, reqBody)
    .subscribe(responseData => {
        console.log(responseData);
    });
  }

  updateData(url: string, reqBody: object) {
    this.http.put(url,reqBody)
    .subscribe(responseData =>{
        console.log(responseData);
    });
  }

  updateIssueData(url: string, reqBody: object) {
    return this.http.put(url,reqBody);
    
  }

  deleteData(url : string) {
    return this.http.delete(url);
  }

}
