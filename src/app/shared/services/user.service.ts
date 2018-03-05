import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders, HttpRequest} from '@angular/common/http';
import {environment} from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

export interface USER {
  id: number;
  username: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }
  // current logged user
  public getUser() {
    return this.http.get(environment.apiUrl + '/user/getuser');
  }
}
