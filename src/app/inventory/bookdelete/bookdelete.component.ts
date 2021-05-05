import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookDetails } from '../../shared/book.model';
import { DbserviceService } from '../../shared/dbservice.service';

@Component({
  selector: 'app-bookdelete',
  templateUrl: './bookdelete.component.html',
  styleUrls: ['./bookdelete.component.css']
})
export class BookdeleteComponent implements OnInit {

  bookDeleteForm : FormGroup;
  bookDetails : BookDetails[]=[];
  searchBookId : string='';  
  disableBookId : boolean = false;
  baseURL : string = "https://my-json-server.typicode.com/joeljoyston/lms";

  constructor(private dbs : DbserviceService) {
    this.bookDeleteForm = new FormGroup({
      'bookId': new FormControl(null, Validators.required),
      'bookTitle' : new FormControl(null, Validators.required),
      'author' : new FormControl(null, Validators.required),
      'isbn' : new FormControl(null, Validators.required),
      'publisher' : new FormControl(null, Validators.required),
      'publishYear' : new FormControl(null, Validators.required),
      'category' : new FormControl(null, Validators.required),
      'rackno' : new FormControl(null, Validators.required),
      'status' : new FormControl(null, Validators.required)
    });
   }

  ngOnInit(): void {
  }

  loadBookDetails() {
    this.bookDetails=[];
    console.log(this.bookDeleteForm.value.bookId);
    const url = this.baseURL + "/books?bookId=" + this.bookDeleteForm.value.bookId;
    
    this.dbs.fetchData(url)
    .subscribe(responseData => {   
        for(const key in responseData) {                  
          this.bookDetails.push(responseData[key]);          
        }   
        
        if(this.bookDetails.length > 0){    
        this.bookDeleteForm.controls.bookTitle.setValue(this.bookDetails[0].bookTitle);
        this.bookDeleteForm.controls.author.setValue(this.bookDetails[0].author);
        this.bookDeleteForm.controls.isbn.setValue(this.bookDetails[0].isbn);
        this.bookDeleteForm.controls.publisher.setValue(this.bookDetails[0].publisher);
        this.bookDeleteForm.controls.publishYear.setValue(this.bookDetails[0].publishYear);
        this.bookDeleteForm.controls.category.setValue(this.bookDetails[0].category);
        this.bookDeleteForm.controls.status.setValue(this.bookDetails[0].status);
        this.bookDeleteForm.controls.rackno.setValue(this.bookDetails[0].rackno);
      }     
      else {
        alert("The Book you are searching for does not exist  ");
      } 
      }
     
    );   
    
    this.disableBookId = true;
  }

  onDelete() {
    const bookId = this.bookDeleteForm.value.bookId;
    const bookTitle = this.bookDeleteForm.value.bookTitle;
    //const url = "http://localhost:3000/books/" + this.bookDetails[0].id;
    const url = this.baseURL + "/books/1";
    if(confirm("Are you sure you want to delete the details of this book " + bookId + " : " + bookTitle)){
      this.dbs.deleteData(url)
      .subscribe(responseData => {
        console.log("Book Deleted" + this.bookDetails[0].id);
      });

      
    }
    else {
      console.log("Book Not Deleted");
    }
  }

  onReset() {
    if(confirm("Are you sure you want to reset the form?")){
      this.disableBookId = false;
      this.bookDeleteForm.reset();
    }
  }

}
