import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickupCallCardComponent } from './pickup-call-card/pickup-call-card.component';
import { IonicModule } from '@ionic/angular';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    PickupCallCardComponent,
    ErrorMessageComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PickupCallCardComponent,
    ErrorMessageComponent,
    LoadingComponent,
  ]
})
export class ComponentsModule { }
