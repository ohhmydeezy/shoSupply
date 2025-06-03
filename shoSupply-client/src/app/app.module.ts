import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [AppComponent, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
