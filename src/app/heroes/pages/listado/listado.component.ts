import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    `
      table {
        width: 100%;
      }
    `,
  ],
})
export class ListadoComponent implements OnInit {
  heroes: Heroe[] = [];

  displayedColumns: string[] = [
    'id',
    'superhero',
    'alter_ego',
    'character',
    'publisher',
  ];

  dataSource: Heroe[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((resp) => {
      this.heroes = resp;
      this.dataSource = resp;
      console.log(resp);
    });
  }
}
