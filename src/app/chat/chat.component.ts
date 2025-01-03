// import { Component, OnInit } from '@angular/core';
// import { ChatService } from '../services/chat.service';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent implements OnInit {
//   // messages: { text: string; sender: 'user' | 'bot' }[] = [];
//   // userMessage: string = '';

//   userMessage: string = '';
//   messages: string[] = [];

//   constructor(private chatService: ChatService) {}

//   ngOnInit(): void {}

//   sendMessage() {
//     if (this.userMessage.trim()) {
//       this.messages.push(this.userMessage);
//       this.userMessage = '';
//     }

//   // sendMessage(): void {
//   //   if (this.userMessage.trim()) {
//   //     this.messages.push({ text: this.userMessage, sender: 'user' });
  
//   //     this.chatService.getResponse(this.userMessage).subscribe((response) => {
//   //       const botResponse = response;
  
//   //       this.messages.push({ text: botResponse, sender: 'bot' });
  
//   //       this.chatService
//   //         .saveConversation({ userMessage: this.userMessage, botResponse })
//   //         .subscribe(() => console.log('Conversation saved.'));
//   //     });
  
//   //     this.userMessage = '';
//   //   }
//   // }
  
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  userMessage: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.sendMessage();
  }

  // sendMessage(): void {
  //   if (this.userMessage.trim()) {
  //     this.messages.push({ text: this.userMessage, sender: 'user' });

  //     this.chatService.getResponse(this.userMessage).subscribe((response) => {
  //       this.messages.push({ text: response.message , sender: 'bot' });
  //     });

  //     this.userMessage = '';
  //   }
  // }

  sendMessage(): void {
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, sender: 'user' });
  
      this.chatService.getResponse(this.userMessage).subscribe((response) => {
        const botResponse = response;
  
        this.messages.push({ text: botResponse, sender: 'bot' });
  
        this.chatService
          .saveConversation({ userMessage: this.userMessage, botResponse })
          .subscribe(() => console.log('Conversation saved.'));
      });
  
      this.userMessage = '';
    }
  }
  
}
