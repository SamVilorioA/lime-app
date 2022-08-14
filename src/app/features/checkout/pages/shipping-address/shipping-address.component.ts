import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AddressService } from 'src/app/data/services/address.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/core/services/session.service';
import { OrderService } from 'src/app/data/services/order.service';
import { CartService } from 'src/app/data/services/cart.service';
import { Router } from '@angular/router';
import { CustomerAddressService } from 'src/app/data/services/customer-address.service';
import { Order, UpdateOrderParams } from 'src/app/data/models/order';
import { Observable, iif, concat, combineLatest } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Address } from 'src/app/data/models/address';
@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {
  showAddresses: boolean = false;
  sameBillingAddressAsShipping: boolean = false;
  selectedCustomerAddressId: string = '';
  constructor( private addresses: AddressService, private snackBar: MatSnackBar,
    private session: SessionService, private orders: OrderService, private cart: CartService,
    private router: Router, private customerAddresses: CustomerAddressService) { }

  ngOnInit(): void {
    this.session.loggedInStatus.subscribe( status => this.showAddresses = status)
  }
  updateShippingAddress(address: Address){
    if(this.showAddresses && this.selectedCustomerAddressId){
      this.cloneAddress();
    }else if( address.firstName && address.lastName && address.line1 && address.city
      && address.zipCode && address.stateCode && address.countryCode && address.phone){
        this.createAddress(address)
      }else{
        this.snackBar.open('Check your address. Some fields are missing.', 'Close');
      }
  }
  setCustomerAddress(customerAddressId: string){
    this.selectedCustomerAddressId = customerAddressId;
  }
  setSameBillingAddressAsShipping(change: boolean){
    this.sameBillingAddressAsShipping=change;
  }
  private createAddress( address: Address){
    this.addresses.createAddress(address).pipe(
      concatMap( address => {
        const update = this.updateOrderObservable({ id: this.cart.orderId, shippingAddressId: address.id},
          [UpdateOrderParams.shippingAddress]);
        if( this.showAddresses){
          return combineLatest([ update, this.customerAddresses.createCustomerAddress(address.id || '', '')]);
        }else {
          return update;
        }
      })
    ).subscribe(
      () => this.showSuccessSnackBar(),
      err => this.showErrorSnackBar()
    )
  }
  private cloneAddress(){
    this.updateOrderObservable({
      id: this.cart.orderId,
      shippingAddressCloneId: this.selectedCustomerAddressId}, [UpdateOrderParams.shippingAddressClone]
      ).subscribe(
        () => this.showSuccessSnackBar(),
        err => this.showErrorSnackBar()
      );
  }
  private updateOrderObservable(order: Order, updateParams: UpdateOrderParams[]): Observable<any>{
    return iif(() => this.sameBillingAddressAsShipping,
    concat([
      this.orders.updateOrder(order, updateParams),
      this.orders.updateOrder(order, [UpdateOrderParams.billingAddressSameAsShipping])
    ]),
    this.orders.updateOrder(order, updateParams))
  }
  private showErrorSnackBar(){
    this.snackBar.open('There was a problem creating your address.', 'Close', {duration: 8000});
  }
  private showSuccessSnackBar(){
    this.snackBar.open('Shipping address successfully added. Redicting...', 'Close', {duration: 3000});
    setTimeout(() => {
      this.router.navigateByUrl('/shipping-methods')
    }, 4000);
  }
}
