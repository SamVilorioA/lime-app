import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormControl, Validators } from '@angular/forms';
import { OrderService } from '../../../../data/services/order.service';
import { CustomerService } from 'src/app/data/services/customer.service';
import { CartService } from '../../../../data/services/cart.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateOrderParams } from 'src/app/data/models/order';
@UntilDestroy({ checkProperties: true})
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor( private orders: OrderService, private customers: CustomerService, 
    private cart: CartService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.customers.getCurrentCustomer().subscribe(customer=>this.email.setValue(customer.email))
  }
  addCustomerEmail(){
    this.orders.updateOrder({id: this.cart.orderId, customerEmail: this.email.value},
      [UpdateOrderParams.customerEmail]).subscribe(() => this.router.navigateByUrl('/billing-address'),
      err=>this.snackBar.open('There was a problem adding your email to the order.', 'Close', {duration:8000}))
  }
}
