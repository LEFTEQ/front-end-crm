import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../../../environments/environment';


export const TOKEN_NAME = 'token';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


interface SIGNin {
  message: string;
  error: string;
  token: string;
  status: number;
}

interface SIGNup {
  message: string;
  error: string;
  name: string;
  status: number;
}

@Injectable()
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];
  tokenSingle: string;

  constructor(private http: HttpClient) {
  }


  public onSignIn(email: string, password: string) {
    return this.http.post<SIGNin>(environment.apiUrl + '/user/signin',
      {email: email, password: password},
      httpOptions);
  }

  public onSignUp(username: string, email: string, password: string) {
    return this.http.post<SIGNup>(environment.apiUrl + '/user/signup',
      {username: username, email: email, password: password},
      httpOptions);
  }

  setTokenSingle(tokenSingle) {
    this.tokenSingle = tokenSingle;
  }

  getToken(): string {
    if (localStorage.getItem(TOKEN_NAME)) {
      return localStorage.getItem(TOKEN_NAME);
    } else {
      return this.tokenSingle;
    }

  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token): Date {
    let decoded = token;
    const base64Url = decoded.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    decoded = JSON.parse(window.atob(base64));
    if (decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);

    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  logout(){
    localStorage.removeItem(TOKEN_NAME);
    this.tokenSingle = '';
  }
}
