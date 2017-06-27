import {Routes} from "@angular/router";
import {RepoDetailComponent} from "./components/repo-detail/repo-detail.component";
import {UserComponent} from "./components/user/user.component";
import {ReposComponent} from "./components/repos/repos.component";
import {SearchComponent} from "./components/search/search.component";
export const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: ':username',
    component: UserComponent,
    children: [
      {
        path: '',
        component: ReposComponent
      },
      {
        path: ':repo',
        component: RepoDetailComponent
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/'
  }
];
