import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



const API_URL = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const textHttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'text/html' })
};
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }
  
  testGet() {
    return this.http.get(API_URL, httpOptions);
  }
}
