import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket = io.connect('https://tic-tac-toe-api-0oae.onrender.com');

  listenForScoreUpdates(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('scoreUpdated', (data: any) => {
        observer.next(data);
      });
    });
  }
}
