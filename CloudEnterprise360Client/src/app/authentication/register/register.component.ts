import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  submitted = false;
  errorMessages: string[] = [];
  private subscriptions = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^([\\w\\.\\-]+)@([\\w\\-]+)((\\.(\\w){2,3})+)$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    });
  }

  get f()
  {
    return this.registerForm.controls;
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.registerForm.get(controlName);
    if (control?.errors) {

      if (controlName === "firstName" || controlName === "lastName") {
        if (control.errors['required']) {
          if (controlName === "firstName") {
            return 'First name is required';
          } else if (controlName === "lastName") {
            return 'Last name is required';
          }
        }
        if (control.errors['minlength']) { // Use 'minlength' instead of 'min'
          return 'Minimum length is three characters';
        }
        if (control.errors['maxlength']) { // Use 'maxlength' instead of 'max'
          return 'Maximum length is fifteen characters';
        }
      }

      if (controlName === "email") {
        if (control.errors['required']) {
          return 'Email is required';
        }
        if (control.errors['email']) {
          return 'Please enter a valid email address.';
        }
        if (control.errors['pattern']) {
          return 'Email format is invalid.';
        }
      }

      if (controlName === "password") {
        if (control.errors['required']) {
          return 'Password is required';
        }
        if (control.errors['minlength']) { // Use 'minlength' instead of 'min'
          return 'Minimum length is six characters';
        }
        if (control.errors['maxlength']) { // Use 'maxlength' instead of 'max'
          return 'Maximum length is fifteen characters';
        }
      }
    }
    return null;
  }



  register(): void {
    this.submitted = true;

    //if (this.registerForm.invalid) {
    //  return;
    //}

    this.subscriptions.add(
      this.authenticationService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response); // Consider replacing this with a more user-friendly action.
          this.registerForm.reset();
          this.submitted = false;
          // Optionally redirect the user or display a success message.
        },
        error: (error) => {
          // Clear existing error messages or initialize it as an empty array.
          this.errorMessages = [];

          // If 'error.error.errors' exists and is an array, use it as the error messages.
          if (Array.isArray(error.error.errors)) {
            this.errorMessages = error.error.errors;
          }
            // If 'error.error' exists and is an array, use it as the error messages.
          else if (error.error.length > 0 && Array.isArray(error.error)) {
            for (let i = 0; i < error.error.length; i++) {
              if (error.error[i].description) {
                this.errorMessages.push(error.error[i].description);
              }
            }
          }
          else if (error.error) {
            this.errorMessages.push(error.error);
          }
          // If neither of the above, add a generic error message.
          else {
            this.errorMessages.push('An unknown error occurred. Please try again later.');
          }
        }
      })
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
