import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';

import { MatCardModule } from '@angular/material/card'
import { MatTableModule, MatTableDataSource } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

import { ComicService } from '../../services/comic.service';
import { Comic } from '../../interfaces/Comic';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
     selector: 'app-favorite',
     standalone: true,
     imports: [MatCardModule, MatTableModule, MatButtonModule, 
          MatIconModule, MatProgressSpinnerModule, MatPaginatorModule, 
          MatTooltipModule, NgIf, RouterLink],
     templateUrl: './favorite.component.html',
     styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements AfterViewInit {

     private comicService = inject(ComicService)
     private router = inject(Router)
     private _snackBar = inject(MatSnackBar)
     horizontalPosition: MatSnackBarHorizontalPosition = 'right';
     verticalPosition: MatSnackBarVerticalPosition = 'top';

     comics: Comic[] = []
     displayedColumns: string[] = ['image', 'title', 'description', 'actions']
     dataSource = new MatTableDataSource<Comic>(this.comics);
     activeSpinner : boolean = true
     activePaginator : boolean = false

     constructor() {
          this.geFavoriteComics()
     }

     geFavoriteComics(){
          this.activeSpinner = true
          this.comicService.getFavoriteComics().subscribe({
               next: (data) => {
                    if (data.data) {
                         this.comics = data.data
                         this.activeSpinner = false
                         this.activePaginator = true
                         this.dataSource = new MatTableDataSource<Comic>(this.comics);
                         this.dataSource.paginator = this.paginator;
                    }
                    else{
                         this.showSnackBar("Error al obtener los datos.")
                    }
               },
               error: (error) => {
                    this.showSnackBar(error.error.returnMessage)
               }
          })
     }

     goIndex(){
          this.router.navigate(['inicio'])
     }

     @ViewChild(MatPaginator)
     paginator!: MatPaginator;

     ngAfterViewInit() {
          this.dataSource.paginator = this.paginator;
     }

     showSnackBar(msj: string){
          this._snackBar.open(msj, "Ok", {horizontalPosition: this.horizontalPosition,
               verticalPosition: this.verticalPosition,duration: 3000})
     }
}