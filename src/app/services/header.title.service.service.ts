import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderTitleServiceService {
  title = new BehaviorSubject('Initial Title');
  setTitle(title: string) {
    this.title.next(title);
  }
  constructor() { }
}
