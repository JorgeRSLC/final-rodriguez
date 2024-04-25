import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  // Establishing a socket connection with the server
  private socket = io.connect('https://tic-tac-toe-api-0oae.onrender.com');

  // Method to listen for 'scoreUpdated' events from the server
  listenForScoreUpdates(): Observable<any> {
    return new Observable(observer => {
      // Using socket.io's 'on' method to listen for 'scoreUpdated' events
      this.socket.on('scoreUpdated', (data: any) => {
        // When a 'scoreUpdated' event is received, the observer's 
        // 'next' method is called with the received data
        observer.next(data);
      });
    });
  }
}