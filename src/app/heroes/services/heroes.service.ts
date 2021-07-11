import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.apiUrl}/heroes`);
  }

  getHeroePorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.apiUrl}/heroes/${id}`);
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(
      `${this.apiUrl}/heroes?q=${termino}&_limit=6`
    );
  }

  agregarHeroe( heroe: Heroe): Observable<Heroe>{
    return this.http.post<Heroe>(`${this.apiUrl}/heroes/`, heroe)
  }

  actualizarHeroe( heroe: Heroe): Observable<Heroe>{
    return this.http.put<Heroe>(`${this.apiUrl}/heroes/${heroe.id}`, heroe)
  }

  eliminarHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/heroes/${id}`);
  }
}
