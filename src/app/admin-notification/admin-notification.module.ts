import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNotificationComponent } from "./admin-notification.component";
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AdminNotificationComponent,
  ],
  exports:[AdminNotificationComponent]
})
export class AdminNotificationModule { }
