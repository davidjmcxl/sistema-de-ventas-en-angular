import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleSupervisorGuard implements CanActivate ,CanLoad{
  constructor(private authService:AuthService,private router:Router){

  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.user.rol===1||this.authService.user.rol===2){
      return true;
    }
    this.router.navigateByUrl('/dashboard');
    return false;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.user.rol===1||this.authService.user.rol===2){
        return true;
      }
      this.router.navigateByUrl('/dashboard');
      return false;
  }

}
