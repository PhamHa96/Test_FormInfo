import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ApiService } from './core/services/api.service';
import { InfoService } from './core/services/info.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DatePickerModule
  ],
  providers: [ApiService, InfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
