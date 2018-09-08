import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import { Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable()
export class ChatService {
  private postSubscription;

  constructor(private parseService: ParseService) {
    this.postSubscription = this.parseService.postsSubscription();
  }

  startUpdate(): Observable<any> {
    return new Observable(observer => {
      this.postSubscription.on('create', (posts) => {
        let message = new Message();
        let user = posts.get('user');
        let from = posts.get('from');
        message.body = posts.get('message');
        message.user = from !== null ? from : 'Anonymous';
        message.me = user !== null ? (user.id === this.parseService.currentUser.id) : false;
        observer.next(message);
      })
    });
  }

  stopUpdate() {
    this.postSubscription.unsubscribe()
  }

  sendMessage(message: string) : Observable<boolean> {
    return this.parseService.sendMessage(message)
  }
}
