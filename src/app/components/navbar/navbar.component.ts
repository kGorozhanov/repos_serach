import {Component, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../../store/reducers/search.reducer";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() user: User;
  @Output() back = new EventEmitter();
}
