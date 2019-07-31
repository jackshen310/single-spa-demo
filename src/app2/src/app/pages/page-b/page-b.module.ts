import { NgModule } from '@angular/core';
import { PageBRoutingModule } from './page-b-routing.module';

import { PageBComponent } from './page-b.component';

@NgModule({
  imports: [PageBRoutingModule],
  declarations: [PageBComponent],
  exports: [PageBComponent],
})
export class PageBModule {}
