import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ActivatedRoute, Router } from '@angular/router';
import { PaypalPaymentService } from '../../../../data/services/paypal-payment.service';
import { OrderService } from '../../../../data/services/order.service';
import { CartService } from '../../../../data/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateOrderParams } from 'src/app/data/models/order';
@UntilDestroy({ checkProperties: true})
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  disableButton = true;
  constructor( private route: ActivatedRoute, private router: Router, private payments: PaypalPaymentService,
    private orders: OrderService, private cart: CartService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  placeOrder(){
    this.disableButton = true;
    this.orders.updateOrder({ id: this.cart.orderId, place: true}, [UpdateOrderParams.place]).subscribe(
      () => {
        this.snackBar.open('Your order has been successfully placed.', 'Close', {duration: 3000});
        this.cart.clearCart();
        setTimeout(() => this.router.navigateByUrl('/'), 4000);
      }, () => {
        this.snackBar.open('There was a problem placing your order.', 'Close', { duration: 8000});
        this.disableButton=false;
      }
    )
  }
}
