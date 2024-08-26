import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

import { ComicService } from '../../services/comic.service';
import { Comic } from '../../interfaces/Comic';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
     selector: 'app-comic',
     standalone: true,
     imports: [MatCardModule, MatTableModule, MatButtonModule, 
          MatIconModule, MatProgressSpinnerModule, MatPaginatorModule, 
          MatTooltipModule, NgIf, RouterLink],
     templateUrl: './comic.component.html',
     styleUrl: './comic.component.css'
})
export class ComicComponent {


     private comicService = inject(ComicService)
     private _snackBar = inject(MatSnackBar)
     horizontalPosition: MatSnackBarHorizontalPosition = 'right';
     verticalPosition: MatSnackBarVerticalPosition = 'top';

     comics: Comic[] = []
     displayedColumns: string[] = ['image', 'title', 'description', 'actions']
     activeSpinner : boolean = true
     activePaginator : boolean = false

     constructor() {
          this.GetAllComics(5,0)
     }

     length = 0;
     pageSize = 0;
     pageIndex = 0;
     pageSizeOptions = [5, 10, 15];
   
     hidePageSize = false;
     showPageSizeOptions = true;
     showFirstLastButtons = true;
     disabled = false;
   
     pageEvent?: PageEvent;

     GetAllComics(limit: number, offset:number){
          this.activeSpinner = true
          this.comicService.getAllComics(limit, offset).subscribe({
               next: (data) => {
                    if (data.data) {
                         this.length = data.data.total
                         this.pageSize = data.data.limit
                         this.comics = data.data.items
                         this.activeSpinner = false
                         this.activePaginator = true
                    }
                    else{
                         this.showSnackBar("Error al obtener los datos.")
                         this.activeSpinner = false
                    }
               },
               error: (err) => {
                    this.showSnackBar(err.error.returnMessage)
                    this.activeSpinner = false
               }
          })
     }

     handlePageEvent(e: PageEvent) {
          this.pageEvent = e
          this.pageIndex = e.pageIndex
          this.GetAllComics(e.pageSize,e.pageIndex*e.pageSize)
     }

     addFavorite(comic:Comic){
          this.comicService.addFavoriteComic(comic).subscribe({
               next: (data) =>{
                    if(data.isSuccess){
                         this.showSnackBar(data.returnMessage)
                    }else{
                         this.showSnackBar("No se pudo guardar el comic en favoritos.")
                    }
               },
               error:(error) =>{
                    this.showSnackBar("Ya está en la lista de favoritos. Detalle: "+error.error.returnMessage)
               }
          })
     }

     showSnackBar(msj: string){
          this._snackBar.open(msj, "Ok", {horizontalPosition: this.horizontalPosition,
               verticalPosition: this.verticalPosition,duration: 3000})
     }
}