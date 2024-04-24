import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { StorageService } from '../storage.service';
import { Player } from '../player';
import { CommonModule } from '@angular/common';
import { LeaderBoardComponent } from '../leader-board/leader-board.component';
import { RockPaperScissorComponent } from '../rock-paper-scissor/rock-paper-scissor.component';
import { TicTacToeComponent } from '../tic-tac-toe/tic-tac-toe.component';


@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, LeaderBoardComponent, RockPaperScissorComponent,
    TicTacToeComponent
  ],
  templateUrl: './game-board.component.html', 
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent implements OnInit{

  mainPlayer!: Player;

  constructor(private gameService: GameService, private localStorageService: StorageService) { 
    this.gameService.startGame().subscribe((data: { playerId: string; score: number; }) => {
      this.mainPlayer = new Player(data.playerId, data.score);
      this.localStorageService.updateLocalStorage(this.mainPlayer);
    });
  }

  ngOnInit(): void {
      
  }
}