import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SqlService {
  constructor(private http: HttpClient) { }
  getProductByName(SearchType: number, SearchText: string): Observable<any> {
    return this.http.post("http://localhost:5000/getProductByName", {searchType: SearchType, searchText: SearchText}, {responseType: 'json'}).pipe(
      catchError(this.handleError('get'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      alert(error.message);
      console.error(error);

      //  this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}