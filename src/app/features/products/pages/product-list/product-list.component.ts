import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SkuService } from '../../../../data/services/sku.service';
import { HeaderService } from '../../../../core/services/header.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Sku } from 'src/app/data/models/sku';

@UntilDestroy({ checkProperties: true})
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  cols = 4; length = 0; pageIndex = 0; pageSize = 20; pageSizeOptions: number[] = [5, 10, 20];
  pageEvent!: PageEvent|void;
  products: Sku[] = [];
  constructor(private breakpointObserver: BreakpointObserver, private skus: SkuService,
    private router: Router, private header: HeaderService) { }

  ngOnInit(): void {
    this.getProducts(1, 20);
    this.header.setHeaderButtonsVisibility(true);
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).subscribe(result => {
      if(result.matches){
        if(result.breakpoints[ '(max-width: 599.98px) and (orientation: portrait)'] || result.breakpoints['(max-width: 599.98px) and (orientation: landscape)']){
          this.cols = 1;
        }
        else if(result.breakpoints['(min-width: 1280px) and (orientation: portrait)'] || result.breakpoints['(min-width: 1280px) and (orientation: landscape)']){
          this.cols = 4;
        }
        else {
          this.cols = 3;
        }
      }
    });
  }
  private getProducts( page: number, pageSize: number){
    this.skus.getSkus(page, pageSize).subscribe( skus => {
      this.products = skus;
      this.length = skus[0].__collectionMeta.recordCount;
    },
    err => this.router.navigateByUrl('/error'));
  }
  getNextPage( event: PageEvent){
    this.getProducts(event.pageIndex + 1, event.pageSize);
  }
  trackSkus(index: number, item: Sku){
    return `${item.id}-${index}`;
  }
}
