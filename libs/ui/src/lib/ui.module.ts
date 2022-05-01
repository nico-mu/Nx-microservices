import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  declarations: [RegisterComponent, LoginComponent],
  exports: [RegisterComponent, LoginComponent],
  providers: [UserService, AuthService],
})
export class UiModule {}
