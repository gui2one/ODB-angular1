import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMultilangInputComponent } from "./admin-multilang-input.component";

import {  CKEditorComponent} from "ngx-ckeditor";
import {  CKEditorModule } from "ngx-ckeditor";
@NgModule({
  imports: [
    CommonModule,
    CKEditorModule
  ],
  declarations: [
    AdminMultilangInputComponent
  ],
  exports :[
    AdminMultilangInputComponent,
    CKEditorComponent
  ]
})
export class AdminMultilangInputModule { }
