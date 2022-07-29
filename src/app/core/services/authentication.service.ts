import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandlerService } from '../../shared/services/http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string = `${environment.apiUrl}/oauth/token`;
  constructor(private http: HttpClient, private eh: HttpErrorHandlerService) { }
  getClientSession(): Observable<object>{
    return this.http.post<object>(this.url, { grantType: 'client_credentials'}).pipe(catchError(this.eh.handleError));
  }
  login(email: string, password: string): Observable<object>{
    return this.http.post<object>(this.url, {username: email, password: password, grantType: 'password'}).pipe(catchError(this.eh.handleError));
  }
}
