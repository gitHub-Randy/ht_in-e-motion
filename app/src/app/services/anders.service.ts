import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
  
const API_URL = 'https://localhost:8080/emotion/anders/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
export class AndersService {

  constructor(private http: HttpClient) { }


  addAndersChipData(emotionName: String, userId: string): Observable<any>{

    return this.http.post(`${API_URL}`,emotionName, httpOptions)

  }

  getAndersChipData() {
    return this.http.get(API_URL, httpOptions);
  }

  updateAndersChip(emotionName: string,newEmotionName: string) {
    return this.http.put(API_URL, {oldEmotionName: emotionName, newEmotionName: newEmotionName}, httpOptions)
  }


}






