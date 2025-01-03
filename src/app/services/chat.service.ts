// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChatService {
//   private apiUrl = 'https://api.openai.com/v1/chat/completions';
//   private apiKey = 'your_actual_openai_api_key_here'; // Replace with your actual API key
//   constructor(private http: HttpClient) {}

//   getResponse(prompt: string): Observable<any> {
//     const headers = {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer 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`
//     };

//     const body = {
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: 'You are a customer experience helper and recommendation bot.' },
//         { role: 'user', content: prompt }
//       ]
//     };    

//     return this.http.post(this.apiUrl, body, { headers });
//   }

//   saveConversation(conversation: { userMessage: string; botResponse: string }): Observable<any> {
//     const url = 'https://localhost:44348/api/Chat/SaveConversation';
//     return this.http.post(url, conversation);
//   }
  
  
// }
