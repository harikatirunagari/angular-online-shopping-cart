import {FormControl,ValidatorFn} from '@angular/forms';


export class ConfiguredEmailDomainValidator{
  static emailDomainValidation(requiredDomain):ValidatorFn{
    //console.log('in em' + requiredDomain);
    return (control:FormControl) => {
      if(!control.value) {return null;}
       //console.log('in emerter');
      
      let mail = control.value;
      [,mail] = mail.split('@');      

      if(!mail) {console.log('no mail');return null;}     
      if(mail.indexOf(requiredDomain) == -1){
        return {
            emailDomain: {
              'domain':requiredDomain,
              'valid':false
            }
          }
        }

         
      }
    
    

   
  
  }
}
