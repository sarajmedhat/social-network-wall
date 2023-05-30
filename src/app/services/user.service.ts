import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any;
  email: any;

  constructor(private http: HttpClient) {}
  public createNewUser(dataobj: any) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/users', dataobj).subscribe(
        {
          next : res => resolve(res),
          error : error => reject(error)
        }
      )})
  }

  public getUser(email: any) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/users?email=' + email).subscribe(
        {
          next : res => resolve(res),
          error : error => reject(error)
        }
      )})
  }
}
