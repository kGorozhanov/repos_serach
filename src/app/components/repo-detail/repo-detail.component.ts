import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {REPO_ACTIONS, RepoState} from "../../store/reducers/repo.reducer";
import 'rxjs/add/operator/combineLatest'

@Component({
  selector: 'app-repo-detail',
  templateUrl: './repo-detail.component.html',
  styleUrls: ['./repo-detail.component.scss']
})
export class RepoDetailComponent implements OnInit, OnDestroy {
  private paramsSubscription: Subscription;
  public readme: Observable<any>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    this.paramsSubscription = this.route.parent.params
      .combineLatest(this.route.params, (parent, child) => {
        return {
          username: parent['username'],
          repo: child['repo']
        }
      })
      .subscribe(data => this.store.dispatch(REPO_ACTIONS.LOAD(data)));
    this.readme = this.store.select('repo').map((state: RepoState) => state.readme);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.store.dispatch(REPO_ACTIONS.RESET());
  }
}
