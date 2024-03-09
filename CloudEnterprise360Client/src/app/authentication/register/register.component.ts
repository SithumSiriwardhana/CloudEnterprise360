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

  get f() { return this.registerForm.controls; }

  register(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.subscriptions.add(
      this.authenticationService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response); // Consider replacing this with a more user-friendly action.
          this.registerForm.reset();
          this.submitted = false;
          // Optionally redirect the user or display a success message.
        },
        error: (error) => {
          this.errorMessages = [error.error || 'An unknown error occurred. Please try again later.'];
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
