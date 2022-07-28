import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';
import { Observable } from 'rxjs';
import { Sku } from '../models/sku';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkuService {
  private url: string = `${environment.apiUrl}/api/skus`;
  constructor( private http: HttpClient, private eh: HttpErrorHandlerService) { }
  getSku(id: string): Observable<Sku>{
    return this.http.get<Sku>(`${this.url}/${id}`).pipe(catchError(this.eh.handleError));
  }
  getSkus(page: number, pageSize: number): Observable<Sku[]>{
    return this.http.get<Sku[]>( this.url, {
      params: {'page': page.toString(), 'pageSize': pageSize.toString()}}).pipe(catchError(this.eh.handleError));
  }
}
