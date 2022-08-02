import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WordWrapPipe } from './pipes/word-wrap.pipe';
import { ProductComponent } from './features/pages/product/product.component';
import { ProductListComponent } from './features/pages/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WordWrapPipe,
    ProductComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
