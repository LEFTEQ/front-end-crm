import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

export interface User {
  username: string;
  id: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }
  // current logged user
  public getUser() {
    const token = this.authService.getToken();
    return this.http.get(environment.apiUrl + '/user/getuser');
  }
}
