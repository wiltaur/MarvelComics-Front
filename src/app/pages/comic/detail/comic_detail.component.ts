import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'

import {MatCardModule} from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

import { ComicService } from '../../../services/comic.service'
import { Comic } from '../../../interfaces/Comic'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-comic-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatGridListModule, MatFormFieldModule, RouterLink, NgIf],
  templateUrl: './comic_detail.component.html',
  styleUrl: './comic_detail.component.css'
})
export default class ComicDetailComponent implements OnInit {
    private _snackBar = inject(MatSnackBar)
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    private comicService = inject(ComicService)
    comic: Comic = {
        id: '',
        title: '',
        description: '',
        image: '',
        printPrice: 0,
        publishDate: '',
        creators: []
    }
    writer: string = ''
    editor: string = ''
    penciler: string = ''
    isUploaded: boolean = false
    activeSpinner: boolean = true

    id?:string | null

    constructor(
        private route: ActivatedRoute
    ){}

    ngOnInit() {  
        this.id = this.route.snapshot.paramMap.get('id')
        if(this.id)
            this.GetComicById(Number(this.id))
    }  

    GetComicById(id: number){
        this.activeSpinner = true

        this.comicService.getComicById(id).subscribe({
             next: (data) => {
                  if (data.data) {
                    this.comic = data.data
                    this.comic.publishDate = this.comic.publishDate.substring(0,10)
                    this.setCreators()
                    this.isUploaded = true
                    this.activeSpinner = false
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

   setCreators(){
        this.comic.creators.forEach(c => {
            switch(c.role){
                case 'writer':
                    this.writer += c.name+', '
                    break;
                case 'editor':
                    this.editor += c.name+', '
                    break;
                case 'penciler':
                    this.penciler += c.name+', '
                    break;
                case 'penciler (cover)':
                    this.penciler = c.name+', '
                    break;
            }
        });
   }

   showSnackBar(msj: string){
    this._snackBar.open(msj, "Ok", {horizontalPosition: this.horizontalPosition,
         verticalPosition: this.verticalPosition,duration: 3000})
}
}