import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class EventsService {
  dataSource: EventEmitter<any> = new EventEmitter();
  // private dataSource = new Subject<any>();
  constructor() {}
  notify(data: any) {
    this.dataSource.emit(data);
  }

  getNotice(): Subject<any> {
    return this.dataSource;
  }
}
