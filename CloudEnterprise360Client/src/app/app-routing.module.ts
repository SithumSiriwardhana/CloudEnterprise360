import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';

const routes: Routes = [

  { path: '', component: HomeComponent },

  //Implementing lazy loading by following format
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule) },

  { path: 'not-found', component: NotFoundComponent },

  // Wildcard route for a 404 page should be the last
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
