// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './demo/shared/shared.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
