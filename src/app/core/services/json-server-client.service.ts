import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JsonServerClientService {
  private readonly url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(this.url + endpoint);
  }

  post<T>(endpoint: string, object: T): Observable<T> {
    const body = this.getRequestBody(object);
    const options = this.getRequestOptions();

    return this.http.post<T>(this.url + endpoint, body, options);
  }

  put<T>(endpoint: string, object: T): Observable<T> {
    const body = this.getRequestBody(object);
    const options = this.getRequestOptions();

    return this.http.put<T>(this.url + endpoint, body, options);
  }

  delete(endpoint: string): Observable<{}> {
    return this.http.delete<{}>(endpoint);
  }

  private getRequestOptions(): { [option: string]: any } {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  private getRequestBody(model: any): any {
    return JSON.stringify(model);
  }
}
