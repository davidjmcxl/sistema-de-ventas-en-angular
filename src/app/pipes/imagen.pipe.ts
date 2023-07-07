import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const base_url=environment.base_url;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string="", tipo:'users'|'providers'|'customers' |'products '): string {
    if(img==""||!img)
      {
        return `${base_url}/uploads/${tipo}/no-image`
      } else if(img){
        return `${base_url}/uploads/${tipo}/${img}`
      }
      else
      {
        return `${base_url}/uploads/${tipo}/no-image`
      }
  }

}
