var Publication = new Interface('Publication', [
  'getIsbn',
  'setIsbn',
  'getTitle',
  'setTitle',
  'getAuthor',
  'setAuthor',
  'display'
]);
var Book = function(isbn, title, author) {
  //...
}; // implements Publication
implements(Book, Publication); /* Library interface. */

var Library = new Interface('Library', [
  'findBooks',
  'checkoutBook',
  'returnBook'
]); /* PublicLibrary class. */

var PublicLibrary = function(books) {
  //...
}; // implements Library
implements(PublicLibrary, Library);

PublicLibrary.prototype = {
  findBooks: function(searchString) {
    //...
  },
  checkoutBook: function(book) {
    //...
  },
  returnBook: function(book) {
    //...
  }
}; /* PublicLibraryProxy class, a useless proxy. */

var PublicLibraryProxy = function(catalog) {
  this.library = new PublicLibrary(catalog);
}; // implements Library
implements(PublicLibraryProxy, Library);

PublicLibraryProxy.prototype = {
  findBooks: function(searchString) {
    return this.library.findBooks(searchString);
  },
  checkoutBook: function(book) {
    return this.library.checkoutBook(book);
  },
  returnBook: function(book) {
    return this.library.returnBook(book);
  }
};
