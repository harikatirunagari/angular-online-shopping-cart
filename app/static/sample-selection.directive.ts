import { Directive,Input } from '@angular/core';
import {AbstractControl,Validator,NG_VALIDATORS,ValidatorFn} from '@angular/forms';
import {ConfiguredEmailDomainValidator} from './configuredEmailDomainValidator';

@Directive({
  selector: '[appSampleSelection]',
  providers:[{
    provide:NG_VALIDATORS,
    useExisting:SampleSelectionDirective,
    multi:true
  }]
})
export class SampleSelectionDirective implements Validator {

  @Input('appSampleSelection') bb:String;
  constructor() { }
  private a:ValidatorFn;
  ngOnChanges(){
    this.a = ConfiguredEmailDomainValidator.emailDomainValidation(this.bb);
  }

  validate(control:AbstractControl){
     //console.log('in sample-selection');  
     return this.a(control);
 }

}
