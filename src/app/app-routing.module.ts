import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'login', loadChildren: './page/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './page/signup/signup.module#SignupPageModule' },
  { path: 'welcome', loadChildren: './page/welcome/welcome.module#WelcomePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
