import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PageResponseBookResponse, BookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { BookCardComponent } from "../../components/book-card/book-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [BookCardComponent, CommonModule, RouterModule],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent {
  bookResponse: PageResponseBookResponse = {

  };
  page = 0;
  size = 3;
  pages: any = [];
  // message = '';
  // level: 'success' | 'error' = 'success';

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService.findAllBooksByOwner({
      page: this.page,
      size: this.size
    })
      .subscribe({
        next: (books) => {
          this.bookResponse = books;
          this.pages = Array(this.bookResponse.totalPages)
            .fill(0)
            .map((x, i) => i);
        }
      });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = this.bookResponse.totalPages as number - 1;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  get isLastPage() {
    return this.page === this.bookResponse.totalPages as number - 1;
  }
  shareBook(book: BookResponse) {
    this.bookService.updateShareableStatus({ 'book-id': book.id as number }).subscribe({
      next: () => {
        // book.shareable = !book.shareable;
        //also i can call this.findAllBooks();
        this.findAllBooks();
      }
    });
  }
  editBook(book: BookResponse) {
    this.router.navigate(['books',
      'manage', book.id]);
  }
  archiveBook(book: BookResponse) {
    this.bookService.updateArchivedStatus({ 'book-id': book.id as number }).subscribe({
      next: () => {
        // book.shareable = !book.shareable;
        //also i can call this.findAllBooks();
        this.findAllBooks();
      }
    });
  }
}
