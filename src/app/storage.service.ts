import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { Player } from './player';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // BehaviorSubject holding the players data from local storage
  private playersSubject = new BehaviorSubject<Player[]>(this.getPlayersFromLocalStorage());
  private urlScores = 'https://tic-tac-toe-api-0oae.onrender.com/get-score';
  private urlUpdate = 'https://tic-tac-toe-api-0oae.onrender.com/update-score';

  // Subject to trigger when the global leaderboard is updated
  private globalLeaderBoardUpdated = new Subject<void>();

  constructor(private http: HttpClient) {}

  // Method to get global data from an API
  getGlobalData(): Observable<any> {
    return this.http.get(this.urlScores)
  }

  // Method to update local storage with new player data
  updateLocalStorage(player: Player): void {
    let players: Player[] = JSON.parse(localStorage.getItem('players') || '[]');
    players.push(player);
    localStorage.setItem('players', JSON.stringify(players));
    this.playersSubject.next(players);
  }

  // Method to get players data from local storage
  getPlayersFromLocalStorage(): Player[] {
    return JSON.parse(localStorage.getItem('players') || '[]');
  }

  // Method to get the Observable of the playersSubject
  getPlayersSubject(): Observable<Player[]> {
    return this.playersSubject.asObservable();
  }

  // Method to update local leaderboard with new score for a player
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

  // Method to refresh players data from local storage
  refreshPlayers(): void {
    const players: Player[] = this.getPlayersFromLocalStorage();
    this.playersSubject.next(players);
  }

  // Method to listen for changes in local storage
  listenForStorageChanges(): Observable<any> {
    return fromEvent(window, 'storage');
  }

  // Method to update global leaderboard and trigger an event
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

  // Method to get the Observable of the globalLeaderBoardUpdated Subject
  getGlobalLeaderBoardUpdated() {
    return this.globalLeaderBoardUpdated.asObservable();
  }
}