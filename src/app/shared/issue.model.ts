export class IssueDetails {
    constructor(public  userName : string,
                public  bookId : string,
                public  issueDate : Date,
                public  returnDate : Date,
                public  actualReturnDate : Date,
                public id : string
    ){}
}