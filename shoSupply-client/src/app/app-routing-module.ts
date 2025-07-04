import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { WorkshopsComponent } from './pages/workshops/workshops.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'About-Us', component: AboutUsComponent },
  { path: 'Teachers', component: TeachersComponent },
  { path: 'Workshops', component: WorkshopsComponent },
  { path: 'Contact-Us', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
