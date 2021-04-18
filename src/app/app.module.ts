import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListenerService } from './listener.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [ListenerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
