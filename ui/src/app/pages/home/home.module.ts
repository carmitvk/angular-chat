import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from 'src/app/core/layout/footer/footer.component';
import { HeaderComponent } from 'src/app/core/layout/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
  ],
})
export class HomeModule { }
