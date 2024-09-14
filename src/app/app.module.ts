// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './demo/shared/shared.module';
import { MessageService } from 'primeng/api';

import { I18NextModule } from 'angular-i18next';
import { I18N_PROVIDERS } from './i18n/i18n-provider';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule, I18NextModule.forRoot()],
  providers: [MessageService, I18N_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {}
