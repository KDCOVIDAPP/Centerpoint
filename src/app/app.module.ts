import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { MbaiBodyComponent } from './mbai-body/mbai-body.component';
import { QRCodeModule } from 'angularx-qrcode';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { Ng5SliderModule } from 'ng5-slider';
import { RxTranslateModule } from '@rxweb/translate';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MbaiBodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    QRCodeModule,
    Ng5SliderModule,
    RxTranslateModule.forRoot({cacheLanguageWiseObject:true, cacheActiveLanguageObject:true,  preloadingStrategy:true,
      filePath:"nikecenter/assets/i18n/{{language-code}}/{{translation-name}}.json",
      }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// mbqlite/
// nikecenter
