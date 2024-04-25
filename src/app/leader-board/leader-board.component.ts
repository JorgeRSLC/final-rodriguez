import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../storage.service';
import { Player } from '../player';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs'; 
import { SortByScorePipe } from '../sort-by-score.pipe';
import { SocketIoService } from '../socket-io.service';

@Component({
  selector: 'app-leader-board',
  standalone: true,
  imports: [CommonModule, SortByScorePipe],
  templateUrl: './leader-board.component.html',
  styleUrl: './leader-board.component.css'
})
export class LeaderBoardComponent implements OnInit {
  @Input() isGlobal: boolean = false;
  players: Player[] = [];
  title = '';
  storageSubscription!: Subscription;

  constructor( private storageService: StorageService, 
    private socketIoService: SocketIoService) { }

  ngOnInit(): void {
    this.title = this.isGlobal ? 'Persistence Leader Board' : 'Local Leader Board';
  
    if (this.isGlobal) {
      // Subscribing to an Observable from the storage service to get global data
      this.storageService.getGlobalData().subscribe((fetchedPlayers: any[]) => {
        this.players = fetchedPlayers.map(fetchedPlayer => new Player(fetchedPlayer.playerId, 
          fetchedPlayer.score));
      });    
      // Subscribing to an Observable from the storage service to listen for 
      // global leaderboard updates
      this.storageService.getGlobalLeaderBoardUpdated().subscribe(() => {
        this.storageService.getGlobalData().subscribe((fetchedPlayers: any[]) => {
          this.players = fetchedPlayers.map(fetchedPlayer => new Player(fetchedPlayer.playerId, 
            fetchedPlayer.score));
        });
      });
      // Listening for the 'storage' event to update the global leaderboard
      window.addEventListener('storage', (event) => {
        if (event.key === 'globalLeaderBoardUpdated') {
          this.storageService.getGlobalData().subscribe((fetchedPlayers: any[]) => {
            this.players = fetchedPlayers.map(fetchedPlayer => new Player(fetchedPlayer.playerId, 
              fetchedPlayer.score));
          });
        }
      });
      // Subscribing to an Observable from the socket.io service to listen for
      // score updates
      this.socketIoService.listenForScoreUpdates().subscribe(data => {
        this.storageService.getGlobalData().subscribe((fetchedPlayers: any[]) => {
          this.players = fetchedPlayers.map(fetchedPlayer => new Player(fetchedPlayer.playerId, 
            fetchedPlayer.score));
        });
      });
    } else {
      this.storageService.refreshPlayers();
      // Subscribing to an Observable from the storage service to get local players data
      this.storageService.getPlayersSubject().subscribe((players: Player[]) => {
        this.players = players;
      });
    }
  
    // Subscribing to an Observable from the storage service to listen for storage changes
    this.storageSubscription = this.storageService.listenForStorageChanges().subscribe(() => {
      this.storageService.refreshPlayers();
    });
  }

  ngOnDestroy(): void { // Implement the ngOnDestroy method
    // Unsubscribing from the storageSubscription when the component is destroyed
    if (this.storageSubscription) {
      this.storageSubscription.unsubscribe();
    }
  }
}