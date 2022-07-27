import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';
import { LineItem } from '../models/line-item';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LineItemService {
  private url: string = `${environment.apiUrl}/api/line_items`;
  constructor(private http: HttpClient, private eh: HttpErrorHandlerService) { }
  createLineItem(lineItem: LineItem): Observable<LineItem>{
    return this.http.post<LineItem>(this.url, lineItem).pipe(catchError(this.eh.handleError));
  }
  getLineItem(id: string): Observable<LineItem>{
    return this.http.get<LineItem>(`${this.url}/${id}`).pipe(catchError(this.eh.handleError));
  }
  updateLineItem(id: string, quantity: number): Observable<LineItem>{
    return this.http.patch<LineItem>(`${this.url}/${id}`, {quantity: quantity}).pipe(catchError(this.eh.handleError));
  }
  deleteLineItem(id: string): Observable<LineItem>{
    return this.http.delete<LineItem>(`${this.url}/${id}`).pipe(catchError(this.eh.handleError));
  }
}
