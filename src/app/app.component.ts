import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "./store/app.reducer";
import {LoaderState} from "./store/reducers/loader.reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public showLoading: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.showLoading = this.store.select('loader')
      .debounceTime(100)
      .map((state: LoaderState) => state.active);
  }
}
