import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {environment} from "../environments/environment";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import 'hammerjs';

import { AppComponent } from './app.component';
import {StoreModule} from "@ngrx/store";
import {appReducer} from "./store/app.reducer";
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { ReposComponent } from './components/repos/repos.component';
import { RepoDetailComponent } from './components/repo-detail/repo-detail.component';
import { UserComponent } from './components/user/user.component';
import {RouterModule} from "@angular/router";
import {routes} from "./app.routes";
import {
  MdProgressBarModule, MdCardModule, MdAutocompleteModule, MdInputModule,
  MdToolbarModule, MdButtonModule
} from "@angular/material";
import {appEffects} from "./store/app.effects";
import {RouterStoreModule} from "@ngrx/router-store";

const optionalModules = [];
if(!environment.production) {
  optionalModules.push(StoreDevtoolsModule.instrumentOnlyWithExtension({
    maxAge: 10
  }));
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    ReposComponent,
    RepoDetailComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    StoreModule.provideStore(appReducer),
    RouterStoreModule.connectRouter(),
    ...optionalModules,
    ...appEffects,
    MdProgressBarModule,
    MdCardModule,
    MdInputModule,
    MdAutocompleteModule,
    MdToolbarModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
