import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';

interface Book {
  id: number;
  title: string;
  author: string;
  publishYear: number;
  description: string;
  image: string;
  showDetails: boolean;
}

@Component({
  selector: 'app-delete-book',
  standalone: true,
  imports: [NgIf,RouterLink],
  template: `
    <div class="messages">
  <div *ngIf="successMessage" class="success">{{ successMessage }}</div>
  <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
</div>

<div class="bookdetails">
  <div class="first">
    <img [src]="bookdata[0].image" alt="Book Image">
  </div>
  <div class="mid">
    <h2>{{bookdata[0].title}}</h2>
    <h3>{{bookdata[0].author}}</h3>
    <h4>{{bookdata[0].publishYear}}</h4>
    <h4>{{bookdata[0].description}}</h4>
    <p class="success">Are you sure you want to delete this book...?</p>
    <button (click)="onDeleteBook()">Yes</button>
    <button [routerLink]="['/booklist']">No</button>
  </div>
</div>
`,
  styles: [`
   .messages {
  text-align: center;
  margin-bottom: 20px;
}

.success {
  color: green;
  fontWidth:700;
}

.error {
  color: red;
}

.bookdetails {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin: 20px;
}

.first {
  flex: 1;
  text-align: center;
  margin: 10px;
}

.first img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.mid {
  flex: 2;
  margin: 10px;
}

.mid h2, .mid h3, .mid h4 {
  margin: 10px 0;
}

.mid button {
  margin: 10px 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: green;
  color: white;
  cursor: pointer;
}

.mid button:hover {
  background-color: darkgreen;
}


@media (max-width: 768px) {
  .bookdetails {
    flex-direction: column;
    align-items: center;
  }

  .mid {
    text-align: center;
  }

  .mid button {
    width: 100%;
    max-width: 200px;
  }
}

  `]
})
export class DeleteBookComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';
  bookId: any;
  bookdata: Book[] = [];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookId = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      this.loadBookData();
    });
  }

  loadBookData(): void {
    this.bookService.getBook(this.bookId).subscribe({
      next: (data: Book) => {
        this.bookdata = [data].map(book => ({ ...book, showDetails: false }));
        // console.log(this.bookdata[0].title);

      },
      error: () => {
        this.errorMessage = 'Error loading book data. Please try again.';
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }

  onDeleteBook(): void {
    this.bookService.deleteBook(this.bookId).subscribe({
      next: () => {
        this.successMessage = 'Book deleted successfully';
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/booklist']);
        }, 2000);
      },
      error: () => {
        this.errorMessage = 'Error deleting book. Please try again.';
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }
}
