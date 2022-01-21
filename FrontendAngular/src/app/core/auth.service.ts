import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public API_URL: string = 'http://ec2-35-181-151-14.eu-west-3.compute.amazonaws.com:8000/api/v1/login';

  constructor(public http: HttpClient) {}
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken') || undefined;
    // Check whether the token is expired and return
    // true or false
    return token !== undefined;
  }

  public storeToken(token: AuthToken){
    localStorage.setItem('accessToken', token.access);
  }

  public login(username: string, password: string): Observable<AuthToken> {
    return this.http.post<AuthToken>(
      this.API_URL,
      {
        username,
        password,
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}

interface AuthToken {
  access: string;
  refresh: string;
}
