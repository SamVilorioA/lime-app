import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerAddress } from '../../../../data/models/customer-address';
import { SessionService } from '../../../../core/services/session.service';
import { CustomerAddressService } from '../../../../data/services/customer-address.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mergeMap } from 'rxjs/operators';
import { iif } from 'rxjs';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  addresses: CustomerAddress[] = [];
  @Output() setAddressEvent = new EventEmitter<string>();
  constructor( private session: SessionService, private customerAddresses: CustomerAddressService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.session.loggedInStatus.pipe(mergeMap(status => iif(() => status,
    this.customerAddresses.getCustomerAddresses()))).subscribe( addresses => {
      if(addresses.length){
        this.addresses = addresses
      }
    }, err => this.snackBar.open('There was a problem getting your existing addresses.', 'Close', {duration: 8000}))
  }
  setAddress(change: MatRadioChange){
    this.setAddressEvent.emit(change.value);
  }
}
