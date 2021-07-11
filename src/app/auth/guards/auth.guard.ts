import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad , CanActivate{

  constructor( private authService: AuthService,
              private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     
      // if(this.authService.auth.id){
        //   return true;
        // }
        // console.log('bloqueado por el auth-guard CanActivate');
        // return false;
        
        return this.authService.isAuntenticate()
          .pipe(
            tap(isAutenticated => {
              if(!isAutenticated){
                this.router.navigate(['./auth/login'])
              }
            } )
          )
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean  {
      console.log(route, segments);

      return this.authService.isAuntenticate()
      .pipe(
        tap(isAutenticated => {
          if(!isAutenticated){
            this.router.navigate(['./auth/login'])
          }
        } )
      )

      // if(this.authService.auth.id){
      //   return true;
      // }
      // console.log('bloqueado por el auth-guard CanLoad');
      // return false;
  }
}
