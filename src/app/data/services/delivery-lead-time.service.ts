import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';
import { Observable } from 'rxjs';
import { DeliveryLeadTime } from '../models/delivery-lead-time';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeliveryLeadTimeService {
  private url: string = `${environment.apiUrl}/api/delivery_lead_times`;
  constructor( private http: HttpClient, private eh: HttpErrorHandlerService) { }
  getDeliveryLeadTimes(): Observable<DeliveryLeadTime[]>{
    return this.http.get<DeliveryLeadTime[]>(this.url).pipe(catchError(this.eh.handleError));
  }
}
