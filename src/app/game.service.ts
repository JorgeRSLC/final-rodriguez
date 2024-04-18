import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private urlScores = 'https://tic-tac-toe-api-0oae.onrender.com/get-score';
  private urlStartGame = 'https://tic-tac-toe-api-0oae.onrender.com/start-game';
  private playersSubject = new BehaviorSubject<Player[]>(this.getPlayersFromLocalStorage());

  constructor(private http: HttpClient) { }

  getGlobalData(): Observable<any> {
    return this.http.get(this.urlScores)
  }

  startGame(): Observable<any> {
    return this.http.get(this.urlStartGame)
  }

  updateLocalStorage(player: Player): void {
    let players: Player[] = JSON.parse(localStorage.getItem('players') || '[]');
    players.push(player);
    localStorage.setItem('players', JSON.stringify(players));
    this.playersSubject.next(players);
  }

  getPlayersFromLocalStorage(): Player[] {
    return JSON.parse(localStorage.getItem('players') || '[]');
  }

  getPlayersSubject(): Observable<Player[]> {
    return this.playersSubject.asObservable();
  }
}