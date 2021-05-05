import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookDetails } from '../../shared/book.model';
import { DbserviceService } from '../../shared/dbservice.service';

@Component({
  selector: 'app-bookadd',
  templateUrl: './bookadd.component.html',
  styleUrls: ['./bookadd.component.css']
})
export class BookaddComponent implements OnInit {

  baseURL : string ="https://my-json-server.typicode.com/joeljoyston/lms";

  constructor(private dbs : DbserviceService) { }

  ngOnInit(): void {
  }

  onSubmit(bookAddForm : NgForm){
    const reqBody ={
      "bookId" : bookAddForm.value.bookId,
      "bookTitle" : bookAddForm.value.bookTitle,
      "author" : bookAddForm.value.author,
      "isbn" : bookAddForm.value.isbn,
      "publisher": bookAddForm.value.publisher,
      "publishYear" : bookAddForm.value.publishYear,
      "category": bookAddForm.value.category,
      "rackno": bookAddForm.value.rackno,
      "status": "A"
    };

    const url =this.baseURL + "/books";

    this.dbs.postData(url,reqBody);
    alert("Book Added Successfully");
    bookAddForm.resetForm();

  }

}
