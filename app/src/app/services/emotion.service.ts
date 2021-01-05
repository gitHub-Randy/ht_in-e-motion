import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { choosenEmotions } from '../interfaces/chosenEmotions';

const API_URL = 'http://localhost:8080/emotion/chosenEmotions';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmotionService {

  constructor(private http: HttpClient) { }

  addNewEmotion(newEmotions: choosenEmotions[]): Observable<any> {
    console.log(newEmotions);
    
    return this.http.post(`${API_URL}`,newEmotions, httpOptions)
  }

}
