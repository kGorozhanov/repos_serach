import {Component, OnInit, OnDestroy} from '@angular/core';
import {Repo, UserState, USER_ACTIONS} from "../../store/reducers/user.reducer";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit, OnDestroy {
  public repos: Observable<Repo[]>;
  private paramsSubscription: Subscription;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    this.paramsSubscription = this.route.parent.params
      .subscribe(params => this.store.dispatch(USER_ACTIONS.LOAD_REPOS(params['username'])));
    this.repos = this.store.select('user').map((state: UserState) => state.repos);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
