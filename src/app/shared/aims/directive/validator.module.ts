import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //表单验证
import { ForbiddenValidatorDirective } from './validator-directive';
import { ExistValidatorDirective } from './async-validator-directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ForbiddenValidatorDirective, ExistValidatorDirective],
  exports: [ForbiddenValidatorDirective, ExistValidatorDirective]
})
export class ValidatorModule { }
