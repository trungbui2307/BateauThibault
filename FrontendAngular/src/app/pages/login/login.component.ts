import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = '';

  password = '';

  constructor(
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onUsernameChange(event: any) {
    this.username = event.target.value;
  }

  onPasswordChange(event: any) {
    this.password = event.target.value;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  login(event: any) {
    event.preventDefault();
    if (this.username.length === 0) {
      this.openSnackBar("Username n'est pas vide", 'ERROR!');
      return;
    }

    if (this.password.length === 0) {
      this.openSnackBar("Mot de passe n'est pas vide", 'ERROR!');
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      (res) => {
        this.authService.storeToken(res);
      },
      (err) => {
        this.openSnackBar("Username or password wrong! Please try again!", 'ERROR!');
      }
    );
  }
}
