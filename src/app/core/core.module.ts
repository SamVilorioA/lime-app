import { NgModule } from '@angular/core';
import { ErrorComponent } from './components/error/error.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [ErrorComponent, HeaderComponent, NotFoundComponent],
  imports: [
    RouterModule.forChild([
      {path: '404', component: NotFoundComponent},
      {path: 'error', component: ErrorComponent},
      {path: '**', redirectTo: '/404'}
    ]),
    MatBadgeModule,
    SharedModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
