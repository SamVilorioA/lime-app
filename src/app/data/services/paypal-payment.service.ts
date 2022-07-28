import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandlerService } from '../../shared/services/http-error-handler.service';
import { PaypalPayment } from '../models/paypal-payment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaypalPaymentService {
  private url: string = `${environment.apiUrl}/api/paypal_payments`;
  constructor(private http: HttpClient, private eh: HttpErrorHandlerService) { }
  createPaypalPayment( payment: PaypalPayment): Observable<PaypalPayment>{
    return this.http.post<PaypalPayment>(this.url, payment).pipe(catchError(this.eh.handleError));
  }
  getPaypalPayment(id: string): Observable<PaypalPayment>{
    return this.http.get<PaypalPayment>(`${this.url}/${id}`).pipe(catchError(this.eh.handleError));
  }
  updatePaypalPayment(id: string, paypalPayerId: string): Observable<PaypalPayment>{
    return this.http.patch<PaypalPayment>( `${this.url}/${id}`, {paypalPayerId: paypalPayerId}).pipe(catchError(this.eh.handleError));
  }
}