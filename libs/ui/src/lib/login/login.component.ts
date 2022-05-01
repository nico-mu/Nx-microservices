import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'swipper-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl?: string;
  submitted = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get formControls() {
    return this.loginForm.controls;
  }

  isValidForm(name: string) {
    return this.formControls[name].errors ? false : true;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm?.invalid) {
      return;
    }
    this.authService
      .loginWithName(
        this.formControls['username'].value,
        this.formControls['password'].value
      )
      .subscribe((data) => {
        if (data.id) {
          this.router.navigate([this.returnUrl]);
        }
      });
  }
}
