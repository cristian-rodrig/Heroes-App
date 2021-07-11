import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../pages/interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable , of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = environment.apiUrl;
  private _auth: Auth | undefined;
  
  get auth():Auth{
    return { ...this._auth! }
  }

  constructor(private http: HttpClient) { }

  login(){
    return this.http.get<Auth>(`${this.baseURL}/usuarios/1`)
            .pipe(
              tap(auth => this._auth = auth),
              tap(auth => localStorage.setItem('Id(token)', auth.id))
            )
  }

  logout(){
    this._auth= undefined;
  }

  isAuntenticate(): Observable<boolean>{
    if ( !localStorage.getItem('Id(token)')){
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseURL}/usuarios/1`)
        .pipe(
          map( auth => {
            console.log('map', auth)
            this._auth = auth; 
            return true;
          })
        )
  }
}
