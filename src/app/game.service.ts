import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private urlStartGame = 'https://tic-tac-toe-api-0oae.onrender.com/start-game';

  constructor(private http: HttpClient) { }

  startGame(): Observable<any> {
    return this.http.get(this.urlStartGame)
  }
}