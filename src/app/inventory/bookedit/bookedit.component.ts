import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { BookDetails } from 'src/app/shared/book.model';
import { DbserviceService } from 'src/app/shared/dbservice.service';

@Component({
  selector: 'app-bookedit',
  templateUrl: './bookedit.component.html',
  styleUrls: ['./bookedit.component.css']
})
export class BookeditComponent implements OnInit {

  bookDetails : BookDetails[]=[];
  searchBookId : string='';
  bookEditForm : FormGroup;
  disableBookId : boolean = false;

 
  constructor(private dbs : DbserviceService) { 
    this.bookEditForm = new FormGroup({
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

  loadBookDetails(){
    this.bookDetails=[];
    console.log(this.bookEditForm.value.bookId);
    const url = "http://localhost:3000/books?bookId=" + this.bookEditForm.value.bookId;
    
    this.dbs.fetchData(url)
    .subscribe(responseData => {   
        for(const key in responseData) {          
          this.bookDetails.push(responseData[key]);          
        }   
        
        if(this.bookDetails.length >0) {
                
        this.bookEditForm.controls.bookTitle.setValue(this.bookDetails[0].bookTitle);
        this.bookEditForm.controls.author.setValue(this.bookDetails[0].author);
        this.bookEditForm.controls.isbn.setValue(this.bookDetails[0].isbn);
        this.bookEditForm.controls.publisher.setValue(this.bookDetails[0].publisher);
        this.bookEditForm.controls.publishYear.setValue(this.bookDetails[0].publishYear);
        this.bookEditForm.controls.category.setValue(this.bookDetails[0].category);
        this.bookEditForm.controls.status.setValue(this.bookDetails[0].status);
        this.bookEditForm.controls.rackno.setValue(this.bookDetails[0].rackno);
        this.disableBookId = true;
        }
        else {
          alert("Book Not Found");
        }
      }      
    );   
    
    
  }

  onSubmit(){
    const reqBody ={
      "bookId" : this.bookEditForm.value.bookId,
      "bookTitle" : this.bookEditForm.value.bookTitle,
      "author" : this.bookEditForm.value.author,
      "isbn" : this.bookEditForm.value.isbn,
      "publisher": this.bookEditForm.value.publisher,
      "publishYear" : this.bookEditForm.value.publishYear,
      "category": this.bookEditForm.value.category,
      "rackno": this.bookEditForm.value.rackno,
      "status": this.bookEditForm.value.status
    };

    const url ="http://localhost:3000/books/" + this.bookDetails[0].id;
    this.dbs.updateData(url,reqBody);
    this.disableBookId=false;
    this.bookDetails=[];
    alert("Book Details updated successfully...");
    this.bookEditForm.reset();
  }

  onReset() {
    if(confirm("Are you sure you want to reset the form?")){
      this.disableBookId = false;
      this.bookEditForm.reset();
    }
    
  }
}
