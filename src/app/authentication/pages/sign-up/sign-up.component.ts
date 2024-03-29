import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { Md5 } from 'ts-md5';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public emailAddress: FormControl;
  public password: FormControl;
  public hashedPassword: any;
  public isSubmitted: boolean;
  public isLoading: boolean;

  form = new FormGroup({
    emailAddress: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.emailAddress = new FormControl();
    this.password = new FormControl();
    this.hashedPassword = '';
    this.isSubmitted = false;
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get formInput(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    this.isLoading = true;
    const md5 = new Md5();
    this.hashedPassword = md5.appendStr(this.formInput['password'].value).end();

    // this.authService
    //   .authenticate(this.formInput['emailAddress'].value, this.hashedPassword)
    //   .pipe(
    //     catchError((err: HttpErrorResponse) => {
    //       this.onReset();
    //       this.toastr.warning('Authentication failed', 'Error');
    //       return throwError(() => err);
    //     })
    //   ).subscribe({
    //     next: (res) => {
    //       this.isLoading = false;
    //       this.authService.redirectToHome(); // intenta nuevamente -> AuthGuard
    //     }
    //   })
  }

  onReset(): void {
    this.isSubmitted = false;
    this.form.reset();
  }
}
