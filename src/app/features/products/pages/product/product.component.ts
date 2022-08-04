import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SkuService } from '../../../../data/services/sku.service';
import { HeaderService } from '../../../../core/services/header.service';
import { OrderService } from '../../../../data/services/order.service';
import { LineItemService } from '../../../../data/services/line-item.service';
import { CartService } from '../../../../data/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, mergeMap } from 'rxjs/operators';
import { Order } from 'src/app/data/models/order';
import { Sku } from 'src/app/data/models/sku';
import { Location } from '@angular/common';
@UntilDestroy({ checkProperties: true})
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: string = '';
  product!: Sku;
  quantity: number = 0;
  constructor(private route: ActivatedRoute, private skus: SkuService,
    private location: Location, private router: Router, private header: HeaderService,
    private orders: OrderService, private lineItems: LineItemService, private cart: CartService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(mergeMap(params => {
      const id = params.get('id')
      this.id = id ? id:'';
      return this.skus.getSku(this.id);
    }), map((sku) => {
      this.product=sku;
    })).subscribe({
      error: (err) => this.router.navigateByUrl('/error')
    });
    this.header.setHeaderButtonsVisibility(true);
  }
  addItemToCart(){
    if( this.quantity > 0){
      if(this.cart.orderId == ''){
        this.orders.createOrder().pipe(mergeMap((order: Order) =>{
          this.cart.orderId = order.id || '';
          return this.lineItems.createLineItem({
            orderId: order.id,
            name: this.product.name,
            imageUrl: this.product.imageUrl,
            quantity: this.quantity,
            skuCode: this.product.code
          });
        })).subscribe( () => {
          this.cart.incrementItemCount(this.quantity);
          this.showSuccessSnackBar();
        }, err => this.showErrorSnackBar());
      }else{
        this.lineItems.createLineItem({
          orderId: this.cart.orderId,
          name: this.product.name,
          imageUrl: this.product.imageUrl,
          quantity: this.quantity,
          skuCode: this.product.code
        }).subscribe(
          () =>{
            this.cart.incrementItemCount(this.quantity);
            this.showSuccessSnackBar();
          },
          err => this.showErrorSnackBar()
        );
      }
    } else {
      this.snackBar.open('Select a quantity greater than 0.', 'Close', { duration: 8000});
    }
  }
  setQuantity(no: number){
    this.quantity = no;
  }
  goBack(){
    this.location.back();
  }
  private showSuccessSnackBar(){
    this.snackBar.open('Item successfully added to cart.', 'Close', { duration: 8000});
  }
  private showErrorSnackBar(){
    this.snackBar.open('Failed to add your item to the cart.', 'Close', {duration: 8000});
  }
}
