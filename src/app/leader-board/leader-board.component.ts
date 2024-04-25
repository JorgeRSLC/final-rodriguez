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
      this.storageService.getGlobalData().subscribe((fetchedPlayers: any[]) => {
        this.players = fetchedPlayers.map(fetchedPlayer => new Player(fetchedPlayer.playerId, fetchedPlayer.score));
      });    
      // Subscribe to the update event
      this.storageService.getGlobalLeaderBoardUpdated().subscribe(() => {
        this.storageService.getGlobalData().subscribe((fetchedPlayers: any[]) => {
          this.players = fetchedPlayers.map(fetchedPlayer => new Player(fetchedPlayer.playerId, fetchedPlayer.score));
        });
      });
          // Listen for the storage event
    window.addEventListener('storage', (event) => {
      if (event.key === 'globalLeaderBoardUpdated') {
        this.storageService.getGlobalData().subscribe((fetchedPlayers: any[]) => {
          this.players = fetchedPlayers.map(fetchedPlayer => new Player(fetchedPlayer.playerId, fetchedPlayer.score));
        });
      }
    });
      this.socketIoService.listenForScoreUpdates().subscribe(data => {
        this.storageService.getGlobalData().subscribe((fetchedPlayers: any[]) => {
          this.players = fetchedPlayers.map(fetchedPlayer => new Player(fetchedPlayer.playerId, fetchedPlayer.score));
        });
    });
    }else {
      this.storageService.refreshPlayers();
      this.storageService.getPlayersSubject().subscribe((players: Player[]) => {
        this.players = players;
      });
    }
  
    // Listen for the storage event
    this.storageSubscription = this.storageService.listenForStorageChanges().subscribe(() => {
      this.storageService.refreshPlayers();
    });
  }

  ngOnDestroy(): void { // Implement the ngOnDestroy method
    if (this.storageSubscription) {
      this.storageSubscription.unsubscribe();
    }
  }
}