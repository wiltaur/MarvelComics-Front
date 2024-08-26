import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ComicComponent } from './pages/comic/comic.component';
import { authGuard } from './custom/auth.guard';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import ComicDetailComponent from './pages/comic/detail/comic_detail.component';

export const routes: Routes = [
     {path:"", component:LoginComponent},
     {path:"registro", component:RegisterComponent},
     {path:"inicio", component:ComicComponent , canActivate:[authGuard]},
     {path:"comic-detail/:id", component:ComicDetailComponent , canActivate:[authGuard]},
     {path:"favorito", component:FavoriteComponent , canActivate:[authGuard]}
];