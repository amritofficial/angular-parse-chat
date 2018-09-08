import { Component, OnInit, NgZone } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = []
  constructor(private chatService: ChatService, private zone: NgZone) { }

  private messageValue = "";

  ngOnInit() {
    this.chatService.startUpdate()
      .subscribe(message => {
        this.zone.run(() => {
          this.messages.unshift(message);
        })
      })
  }

  ngOnDestroy() {
    this.chatService.stopUpdate();
  }

  sendMessage(message: string) {
    this.chatService.sendMessage(message)
      .subscribe(success => {
        console.log(success)
      }, error => {
        alert(error)
      }, () => {
        this.messageValue = ''
      })
  }

  getMessageClass(message) {
    if (message.me) {
      return 'right'
    } else {
      return 'left'
    }
  }


}
