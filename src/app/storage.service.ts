import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { Player } from './player';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private playersSubject = new BehaviorSubject<Player[]>(this.getPlayersFromLocalStorage());
  private urlScores = 'https://tic-tac-toe-api-0oae.onrender.com/get-score';
  private urlUpdate = 'https://tic-tac-toe-api-0oae.onrender.com/update-score';

  private globalLeaderBoardUpdated = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  getGlobalData(): Observable<any> {
    return this.http.get(this.urlScores)
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

  updateLocalLeaderBoard(playerId: string, score: number): void {
    let players: Player[] = JSON.parse(localStorage.getItem('players') || '[]');
    players.forEach(player => {
      if (player.playerId === playerId) {
        player.score = score;
      }
    });
    localStorage.setItem('players', JSON.stringify(players));
    this.playersSubject.next(players);
  }

  refreshPlayers(): void {
    const players: Player[] = this.getPlayersFromLocalStorage();
    this.playersSubject.next(players);
  }

  listenForStorageChanges(): Observable<any> {
    return fromEvent(window, 'storage');
  }

  // Add a method to emit the update event
  updateGlobalLeaderBoard(playerId: string, score: number): Promise<void> {
    const playerData = { 'playerId': playerId, 'score': score };
    return this.http.post(this.urlUpdate, playerData).toPromise()
      .then(response => {
        console.log(response);
        localStorage.setItem('globalLeaderBoardUpdated', Date.now().toString());
        // Emit the update event
        this.globalLeaderBoardUpdated.next();
      })
      .catch(error => {
        console.error('Error updating global leaderboard:', error);
      });
  }

  // Add a method to get the Observable of the Subject
  getGlobalLeaderBoardUpdated() {
    return this.globalLeaderBoardUpdated.asObservable();
  }
}