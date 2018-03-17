import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMultilangInputComponent } from "./admin-multilang-input.component";
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AdminMultilangInputComponent
  ],
  exports :[
    AdminMultilangInputComponent
  ]
})
export class AdminMultilangInputModule { }
