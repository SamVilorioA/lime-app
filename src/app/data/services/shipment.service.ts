import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';
import { Observable } from 'rxjs';
import { Shipment } from '../models/shipment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private url: string = `${environment.apiUrl}/api/shipments`;
  constructor(private http: HttpClient, private eh: HttpErrorHandlerService) { }
  getShipment(id: string): Observable<Shipment>{
    return this.http.get<Shipment>(`${this.url}/${id}`).pipe(catchError(this.eh.handleError));
  }
  updateShipment(id: string, shippingMethodId: string): Observable<Shipment>{
    return this.http.patch<Shipment>(`${this.url}/${id}`, {shippingMethodId: shippingMethodId}).pipe(catchError(this.eh.handleError));
  }
}
