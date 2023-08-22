import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidFieldService {

  constructor() { }
  isValidField( field: string ,form:FormGroup): boolean | null|undefined {
    if(!field){
      return null;}

    return form.controls[field].errors
      && form.controls[field].touched;}

  getFieldError( field: string ,form:FormGroup): string | null {

    if ( !form.controls[field] ) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
      }
    }

    return null;
  }
}
