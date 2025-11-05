import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthSigninComponent } from './auth-signin/auth-signin.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { LoginService } from './services/login.service';
import { UnAuthGuard } from './guard/un-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AuthSigninComponent,
    canActivate: [UnAuthGuard]
  },
  {
    path: 'register',
    component: AuthSignupComponent,
    canActivate: [UnAuthGuard]
  }
];

@NgModule({
  declarations: [
    AuthSigninComponent,
    AuthSignupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [LoginService]
})
export class UnAuthModule { }