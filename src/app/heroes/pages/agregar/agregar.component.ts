import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img{
        width:100%;
        border-radious: 5%;
      };
      .mat-spinner {
        display: block;
        position: fixed;
        z-index: 1031;
        top: 50%;
        right: 50%; 
        margin-top: -..px; /* half of the elements height */
        margin-right: -..px; /* half of the elements widht */
      };     
    `
  ],    
})

export class AgregarComponent implements OnInit {


  loading: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  publishers = [
    {
      id: 'Dc Comics',
      desc: 'Dc - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    
    if( !this.router.url.includes('editar')){
        return;
    }
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=> this.heroesService.getHeroePorId(id))
      )
    .subscribe( (heroe) => this.heroe = heroe);
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }
    if (this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe(()=> {  
        this.mostrarSnackBar("Heroe Actualizado");
        this.router.navigate([`/heroes/${this.heroe.id}`]);
        })   
    }else{
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
        this.mostrarSnackBar("Heroe Creado");
        this.router.navigate(['/heroes/editar', heroe.id])
      });
    }
  }

  borrar(){

    const dialog = this.dialog.open(ConfirmarComponent,{
      width:'250px',
      data: this.heroe 
    })

    dialog.afterClosed().subscribe(
      (result) => {
        if(result){
          this.heroesService.eliminarHeroe(this.heroe.id!)
            .subscribe(() => {
              this.mostrarSnackBar("Heroe Borrado");
              this.router.navigate(['/heroes'])
            });
        }
      }
    )


  }

  mostrarSnackBar(mensaje: string): void{
    this.snackBar.open( mensaje, 'Ok', {
      duration: 3500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

}
