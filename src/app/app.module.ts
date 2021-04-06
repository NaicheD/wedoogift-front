import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {Level1Component} from "./component/level1/level1.component";
import {Level2Component} from "./component/level2/level2.component";
import {Level3Component} from "./component/level3/level3.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalculatorUiService} from "./ui-service/calculator.ui-service";
import {CalculatorHttpService} from "./http-service/calculator.http-service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {WedoogiftInterceptor} from "./interceptor/wedoogift.interceptor";

const appRoutes: Routes = [
  {path: '', redirectTo: 'level1', pathMatch: 'full'},
  {path: 'level1', component: Level1Component},
  {path: 'level2', component: Level2Component},
  {path: 'level3', component: Level3Component}
];

@NgModule({
  declarations: [
    AppComponent,
    Level1Component,
    Level2Component,
    Level3Component
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [
    CalculatorUiService,
    CalculatorHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WedoogiftInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
