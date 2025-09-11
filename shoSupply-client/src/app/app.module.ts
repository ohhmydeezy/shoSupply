import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { WorkshopsComponent } from './pages/workshops/workshops.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SliderComponent } from './components/slider/slider.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    
    SliderComponent,
    
  ],
  imports: [
    ContactComponent,
    TeachersComponent,
    WorkshopsComponent,
    FooterComponent,
    AboutUsComponent,
    NavComponent,
    AppComponent,
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    MatIconModule,
    RouterOutlet,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
