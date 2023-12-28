//DTOS(Data Transform Object)

class IssuedBook{
    _id;
    name;
    gerne;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;

    constructor (user){
        this._id = user.IssuedBook._id;
        this.name = user.IssuedBook.name;
        this.gerne = user.IssuedBook.gerne;
        this.publisher = user.IssuedBook.publisher;
        this.price = user.IssuedBook.price;
        this.issuedDate = user.issuedDate;
        this.issuedBy = user.name;
        this.returnDate = user.returnDate;

    }
}

module.exports = IssuedBook;