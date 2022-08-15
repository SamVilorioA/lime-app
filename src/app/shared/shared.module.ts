import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemQuantityComponent } from './components/item-quantity/item-quantity.component';
import { SimplePageComponent } from './components/simple-page/simple-page.component';
import { TitleComponent } from './components/title/title.component';
import { WordWrapPipe } from './pipes/word-wrap.pipe';

//angular material
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [ItemQuantityComponent, SimplePageComponent, TitleComponent, WordWrapPipe],
  imports: [
    CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatMenuModule, RouterModule
  ],
  exports: [
    CommonModule, ItemQuantityComponent, MatButtonModule, MatIconModule, MatSnackBarModule, 
    MatTooltipModule, SimplePageComponent, TitleComponent, WordWrapPipe
  ]
})
export class SharedModule { }