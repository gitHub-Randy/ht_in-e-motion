import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const API_URL = 'https://api.tenor.com/v1/search?q=';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GifServiceService {

  constructor(private http: HttpClient) { }



  getGifs(searchTerm): Observable<any>{


    // set the apikey and limit
    var apikey = "EKR1X9BVCG3C";
    var lmt = 8;

    // test search term
    var search_term = searchTerm;

    // using default locale of en_US
    var search_url = API_URL + search_term + "&key=" +
            apikey + "&limit=" + lmt;

    
    return this.http.get(`${search_url}` );



  }
}
