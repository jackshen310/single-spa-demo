import { NgModule } from '@angular/core';
import { PageARoutingModule } from './page-a-routing.module';

import { PageAComponent } from './page-a.component';


@NgModule({
  imports: [PageARoutingModule],
  declarations: [PageAComponent],
  exports: [PageAComponent]
})
export class PageAModule { }
