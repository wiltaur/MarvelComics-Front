import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccessService } from '../../services/access.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/User';

import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { IdType } from '../../interfaces/IdType';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule,ReactiveFormsModule,NgFor, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

     idTypes: IdType[] = []
     private accesoService = inject(AccessService)
     private _snackBar = inject(MatSnackBar)
     horizontalPosition: MatSnackBarHorizontalPosition = 'right';
     verticalPosition: MatSnackBarVerticalPosition = 'top';

     constructor() {
          this.accesoService.getIdTypes().subscribe({
               next: (data) => {
                    if (data.isSuccess && data.data.length > 0) {
                         this.idTypes = data.data
                    }
               },
               error: (error) => {
                    this.showSnackBar(error.error.returnMessage)
               }
          })
     }

     items = [...new Array(10)].map((v, i) => ({
          id: i,
          name: `item ${i}`,
        }));
      
     selectedIdType: any

     private router = inject(Router);
     public formBuild = inject(FormBuilder);

     public formRegistro: FormGroup = this.formBuild.group({
          tipoIdentificacion: ['',Validators.required],
          identificacion: ['',Validators.required],
          nombre: ['',Validators.required],
          correo: ['',Validators.required],
          clave: ['',Validators.required]
     })

     register(){
          if(this.formRegistro.invalid) return;

          const objeto:User = {
               idUser: this.formRegistro.value.identificacion,
               idType: this.selectedIdType.idType,
               name: this.formRegistro.value.nombre,
               email: this.formRegistro.value.correo,
               password: this.formRegistro.value.clave
          }

          this.accesoService.registerUser(objeto).subscribe({
               next: (data) =>{
                    if(data.isSuccess){
                         this.showSnackBar(data.returnMessage)
                         this.router.navigate([''])
                    }else{
                         this.showSnackBar("No se pudo registrar")
                    }
               },
               error:(error) =>{
                    this.showSnackBar(error.error.returnMessage)
               }
          })
     }

     showSnackBar(msj: string){
          this._snackBar.open(msj, "Ok", {horizontalPosition: this.horizontalPosition,
               verticalPosition: this.verticalPosition,duration: 3000})
     }

     goBack(){
          this.router.navigate([''])
     }
}