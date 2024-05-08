import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SendService {

  private dataSource = new BehaviorSubject<any>(null);

  data = this.dataSource.asObservable();

  constructor() { }

  setData(data: string) {
    this.dataSource.next(data);
  }
  
}
