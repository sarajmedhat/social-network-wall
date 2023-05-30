import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    this.userService
      .getUser(this.loginForm.value.email)
      .then((res: any) => {
        console.log(res);
        if (res.length == 0) {
          console.log('account does not exist');
          this.snackbar.open('account does not exist', 'ok');
        } else {
          if (res[0].password === this.loginForm.value.password) {
            console.log('matched password');
            this.snackbar.open('matched password', 'ok');
            this.userService.user = res[0];
            localStorage.setItem('user', JSON.stringify(res[0]));
            this.router.navigate(['/posts']);
          } else {
            console.log('password not matched');
            this.snackbar.open('password not matched', 'ok');
          }
        }
      })
      .catch((err) => console.log(err));
  }
}
