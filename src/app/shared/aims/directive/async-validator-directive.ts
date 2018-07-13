import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import "rxjs/add/operator/debounceTime";
import "rxjs/Rx";

@Directive({
  selector: '[asyncUsernameExistValidator]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ExistValidatorDirective, multi: true}]
})
export class ExistValidatorDirective implements Validator {
    @Input() getInputValue: string;

    validate(control: AbstractControl): any {
      // return this.getInputValue ? characterValidator(new RegExp(this.getInputValue, 'i'))(control)
      //                           : null;
    }
}

/**
* 检测名称是否已存在
*/
export function existValidator(getService: any): any {
    return (control: AbstractControl): {[key: string]: any} => {
        return getService.checkExsit(control.value)
            .then(retMsg => {
                if (retMsg.msg === 'success') {
                    return retMsg.isExist === 1? {'existValidator': {value: control.value}}: null;
                }           
            });
    };
}
