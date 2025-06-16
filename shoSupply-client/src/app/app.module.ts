import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { RouterModule } from '@angular/router';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { WorkshopsComponent } from './pages/workshops/workshops.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SliderComponent } from './components/slider/slider.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    AboutUsComponent,
    TeachersComponent,
    WorkshopsComponent,
    ContactComponent,
    SliderComponent
  ],
  imports: [AppComponent, BrowserModule, AppRoutingModule, RouterModule, MatIconModule],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
