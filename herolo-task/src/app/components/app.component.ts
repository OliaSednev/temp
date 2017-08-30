import {Component, OnInit, TemplateRef} from '@angular/core';

import {BooksService} from '../services/books.service';

import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/modal-options.class';

import {Book} from '../models/app.models';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    books: Book[];
    selectedBook: Book;
    editedBook: Book;

    public modalRef: BsModalRef;

    constructor(private booksService: BooksService,
                private modalService: BsModalService) {
    }

    ngOnInit() {
        this.booksService.getBooks().subscribe(books => {
            this.books = books;
        });
    }

    public openModal(template: TemplateRef<any>, book: Book) {

        this.selectedBook = book;
        this.editedBook = {
            id: book.id,
            autuor: book.autuor,
            authorRef: book.authorRef,
            date: book.date,
            title: book.title,
            image: book.image
        };

        this.modalRef = this.modalService.show(template);
    }

    saveEdit() {
        this.selectedBook.id = this.editedBook.id;
        this.selectedBook.autuor = this.editedBook.autuor;
        this.selectedBook.image = this.editedBook.image;
        this.selectedBook.authorRef = this.editedBook.authorRef;
        this.selectedBook.date = this.editedBook.date;
        this.selectedBook.title = this.editedBook.title;
        this.selectedBook.image = this.editedBook.image;

        if (!this.selectedBook.id) {
            this.selectedBook.id = this.getNewGuid();
            this.books.push(this.selectedBook);
            this.selectedBook = null;
        }

        this.modalRef.hide();
    }

    S4() {
        return ( ( (1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    getNewGuid(): string {

        const guid = (this.S4() + this.S4() + '-' + this.S4() + '-4' + this.S4()
          .substr(0, 3) + '-' + this.S4() + '-' + this.S4() + this.S4() + this.S4())
          .toLowerCase();

        return guid;
    }

    onFileSelected(event) {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();
        const imgtag = <HTMLImageElement>document.getElementById('myimage');
        imgtag.title = selectedFile.name;

        const self = this;
        reader.onload = function (event) {
            imgtag.src = reader.result;
            // event.target.result;
            self.editedBook.image = imgtag.src;
        };

        reader.readAsDataURL(selectedFile);
    }

    addBook(template: TemplateRef<any>) {
        this.selectedBook = {};
        this.editedBook = {};
        this.modalRef = this.modalService.show(template);
    }

    deleteBook(book: Book) {

        if (prompt(`Are you sure you want to delete the book?`, book.title)) {
            this.books.splice(this.books.findIndex(bookItem => bookItem.id === book.id), 1);
        }
    }
}
