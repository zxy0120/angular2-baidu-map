import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/**
* 输入字符格式检测，如输入正则为 /^[A-Za-z0-9@._-]+$/i
*/
export function characterValidator(getReg: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const forbidden = !getReg.test(control.value);
        return forbidden ? {'characterValidator': {value: control.value}} : null;
    };
}

/**
* 输入字符格式检测，可以为空
*/
export function nullAllowedCharacterValidator(getReg: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        if (!control.value) {
            return null;
        }
        const forbidden = !getReg.test(control.value);
        return forbidden ? {'characterValidator': {value: control.value}} : null;
    };
}


/**
* 最大输入长度检测
*/
export function maxlengthValidator(getLen): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const forbidden = control.value && control.value.length > getLen;
        return forbidden ? {'maxlengthValidator': {value: control.value}} : null;
    };
}

/**
* 固定输入长度检测
*/
export function lengthValidator(getLen): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        const forbidden = control.value && control.value.length !== getLen;
        return forbidden ? {'lengthValidator': {value: control.value}} : null;
    };
}

@Directive({
    selector: '[appForbiddenName]',
    providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenValidatorDirective implements Validator {  
    @Input() getInputValue: string;

    validate(control: AbstractControl): {[key: string]: any} {
        return this.getInputValue ? characterValidator(new RegExp(this.getInputValue, 'i'))(control): null;
    }
}

