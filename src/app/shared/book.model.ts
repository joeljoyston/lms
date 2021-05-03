export class BookDetails{
    bookId : number;
    bookTitle : string;
    author : string;
    isbn : string;
    publisher : string;
    publishYear : number;
    category : string;
    rackno : number;
    status : string;
    id:number;

    constructor(
        bookId : number,
        bookTitle : string,
        author : string,
        isbn : string,
        publisher : string,
        publishYear : number,
        category : string,
        rackno : number,
        status : string,
        id:number
    ){
        this.bookId =bookId;
        this.bookTitle = bookTitle;
        this.author = author;
        this.isbn = isbn;
        this.publisher = publisher;
        this.publishYear = publishYear;
        this.category = category;
        this.rackno = rackno;
        this.status = status;
        this.id=id;
    }
}