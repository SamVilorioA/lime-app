import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodesComponent } from './pages/codes/codes.component';
import { EmptyComponent } from './pages/empty/empty.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { RouterModule } from '@angular/router';
import { EmptyCartGuard } from 'src/app/core/guards/empty-cart.guard';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule} from '@angular/material/menu'
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CodesComponent, EmptyComponent, SummaryComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '', canActivate: [EmptyCartGuard], children:[
          {path: 'cart', component: SummaryComponent},
          {path: 'codes', component: CodesComponent}
        ]
      },
      { path: 'empty', component: EmptyComponent}
    ]),
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule
  ]
})
export class CartModule { }
