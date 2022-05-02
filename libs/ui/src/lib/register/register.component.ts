import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Prisma } from '@prisma/client';
import { AuthService } from '../auth.service';

@Component({
  selector: 'swipper-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  returnUrl?: string;
  submitted = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get formControls() {
    return this.registerForm.controls;
  }

  isValidForm(name: string) {
    return this.formControls[name].errors ? false : true;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm?.invalid) {
      return;
    }
    this.authService
      .register({
        email: this.formControls['email'].value,
        name: this.formControls['username'].value,
        password_hash: this.formControls['password'].value,
      } as Prisma.UserCreateInput)
      .subscribe((data) => {
        if (data.id) {
          this.router.navigate([this.returnUrl]);
        }
      });
  }
}
