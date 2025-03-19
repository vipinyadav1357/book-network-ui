import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookRequest } from '../../../../services/models';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { BookService } from '../../../../services/services';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent {
  selectedPicture: string | undefined;
  errorMsg: Array<string> = [];
  selectedBookCover: any;
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ''
  };

  constructor(private bookService: BookService, private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if (bookId) {
      this.bookService.findBookById({ 'id': bookId }).subscribe({
        next: (book) => {

          this.bookRequest = {
            id: book.id,
            authorName: book.authorname as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            title: book.title as string,
            shareable: book.shareable
          }
          if (book.cover) {
            this.selectedPicture = 'data:image/jpg;base64,' + book.cover;
          }
        }
      });
    }
  }
  onFileSelected(file: any) {
    // const input = file.target as HTMLInputElement;
    // if (input.files && input.files.length > 0) {
    //   const file = input.files[0];
    //   this.selectedBookCover = file; // Get file name
    //   this.selectedPicture = URL.createObjectURL(file) as string; // Show preview
    //   console.log(this.selectedPicture);
    //   console.log(this.selectedBookCover);
    // }


    this.selectedBookCover = file.target.files[0];
    console.log(this.selectedBookCover);
    if (!this.selectedBookCover) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.selectedPicture = fileReader.result as string;
      // console.log(this.selectedPicture);
    };
    fileReader.readAsDataURL(this.selectedBookCover);
    console.log(this.selectedPicture);
    console.log(this.selectedBookCover);
  }

  // onFileDeselected() {
  //   this.selectedPicture = undefined;
  //   this.selectedBookCover = undefined;
  // }

  // onFileUpload() {
  //   if (!this.selectedBookCover) {
  //     this.errorMsg.push('Please select a file');
  //     return;
  //   }
  //   this.errorMsg = [];
  // }
  saveBook() {
    this.errorMsg = [];
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next: (bookId) => {
        this.bookService.uploadBookCoverPiture({
          'book-id': bookId,
          body: {
            file: this.selectedBookCover
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/books/my-books']);
          }
        });
      },
      error: (err) => {
        console.log(err.error.validationErrors);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }
}

