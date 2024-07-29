import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Book {
  id: any;
  title: string;
  author: string;
  publishYear: number;
  description: string;
  image: string;
  showDetails: boolean;
}

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit {
  bookForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  bookId: number;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishYear: ['', [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
    this.bookId = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      // console.log(params['id']);
      
      this.loadBookData();
    });
  }

  loadBookData() {
    this.bookService.getBook(this.bookId).subscribe({
      next: (book: Book) => {
        this.bookForm.patchValue(book);
      },
      error: (error) => {
        this.errorMessage = 'Error loading book data. Please try again.';
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const updatedBook: Book = {
        ...this.bookForm.value,
        id: this.bookId,
        showDetails: false 
      };
      this.bookService.updateBook(updatedBook).subscribe({
        next: (updatedBook) => {
          this.successMessage = 'Book updated successfully!';
          this.errorMessage = '';
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/books']);
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = 'Error updating book. Please try again.';
          this.successMessage = '';
          setTimeout(() => this.errorMessage = '', 5000);
        }
      });
    }
  }
}