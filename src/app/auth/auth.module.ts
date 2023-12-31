import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [CommonModule, AngularMaterialModule, FormsModule],
  exports: [],
})
export class AuthModule {}
