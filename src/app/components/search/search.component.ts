import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {User, SearchState, SEARCH_ACTIONS} from "../../store/reducers/search.reducer";
import {AppState} from "../../store/app.reducer";
import {Store} from "@ngrx/store";
import {go} from "@ngrx/router-store";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public user: FormControl;
  public userSubscription: Subscription;
  public users: Observable<User[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.users = this.store.select('search').map((state: SearchState) => state.users);
    this.user = new FormControl(null);
    this.userSubscription = this.user
      .valueChanges
      .debounceTime(500)
      .subscribe(value => {
        if(value && typeof value === 'string') {
          this.store.dispatch(SEARCH_ACTIONS.LOAD_USERS(this.user.value));
        } else if (typeof value === 'object' && value.login) {
          this.store.dispatch(go([`/${value.login}`]));
        }
      });
  }

  displayFn(user: User) {
    return user ? user.login : user;
  }

  ngOnDestroy() {
    this.store.dispatch(SEARCH_ACTIONS.RESET());
  }
}
