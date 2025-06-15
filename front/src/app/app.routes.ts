import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { InstitutionsComponent } from './components/institutions/institutions.component';
import { DonationsComponent } from './components/donations/donations.component';
import { FoodsComponent } from './components/foods/foods.component';
import { PeopleComponent } from './components/people/people.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'vendors', component: VendorsComponent },
  { path: 'institutions', component: InstitutionsComponent },
  { path: 'donations', component: DonationsComponent },
  { path: 'foods', component: FoodsComponent },
  { path: 'people', component: PeopleComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
