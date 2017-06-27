import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {USER_ACTIONS, UserState} from "../../store/reducers/user.reducer";
import {User} from "../../store/reducers/search.reducer";
import {back} from "@ngrx/router-store";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  public paramsSubscription: Subscription;
  public user: Observable<User>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params
      .subscribe(params => this.store.dispatch(USER_ACTIONS.LOAD_USER(params['username'])));
    this.user = this.store.select('user').map((state: UserState) => state.user);
  }

  back() {
    this.store.dispatch(back());
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.store.dispatch(USER_ACTIONS.RESET());
  }
}
