import { Component, Input , SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tile } from '../tile';
import { FormsModule } from '@angular/forms';
import { Player } from '../player';
import { StorageService } from '../storage.service';
import { SocketIoService } from '../socket-io.service';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css'
})
export class TicTacToeComponent {

  @Input() mainPlayer!: Player;
  board: Tile[];
  gameStarted: boolean = false;
  winner: string = '';
  winnerSet: boolean = false;
  isComputerPlaying: boolean = false;
  
  constructor(private storageService: StorageService, 
   private socketIoService: SocketIoService) {
    
    this.board = [];
    for (let i = 0; i < 9; i++) {
      this.board.push(new Tile('open', i));
    }
  }
  ngOnInit() {
    // this.socketIoService.listenForScoreUpdates().subscribe(data => {
    //   // Update the mainPlayer's score
    //   this.mainPlayer.score = data.score;
  
    //   // Update the global leaderboard
    //   this.storageService.updateGlobalLeaderBoard(this.mainPlayer.playerId, this.mainPlayer.score);
    // });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['mainPlayer'] && changes['mainPlayer'].currentValue) {
      await this.storageService.updateGlobalLeaderBoard(this.mainPlayer.playerId, 
        this.mainPlayer.score);
    }
  }

  startGame() {
    this.gameStarted = true;
  }

  userChoice(tile: Tile) {
    if (this.isComputerPlaying) return;
    if (tile.value === 'open') {
      tile.value = 'X';
      this.computerChoice();
    }
    this.checkWinner();
  }

  computerChoice() {
    this.isComputerPlaying = true;
    if(this.winnerSet) return;
    const openTiles = this.board.filter(tile => tile.value === 'open');
    if (openTiles.length > 0) {
      const randomTile = openTiles[Math.floor(Math.random() * openTiles.length)];
      setTimeout(() => {
        if(this.winnerSet) return;
        randomTile.value = 'O';
        this.checkWinner();
        this.isComputerPlaying = false;
      }, 2000);
    }
  }
  
  async checkWinner(): Promise<string> {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let combination of winningCombinations) {
      if (
        this.board[combination[0]].value === this.board[combination[1]].value &&
        this.board[combination[1]].value === this.board[combination[2]].value
      ) {
        if (this.board[combination[0]].value === 'X') {
          this.mainPlayer.score++;
          await this.storageService.updateLocalLeaderBoard(this.mainPlayer.playerId, 
                this.mainPlayer.score);
          await this.storageService.updateGlobalLeaderBoard(this.mainPlayer.playerId,
                this.mainPlayer.score);
          this.winner = 'player';
          this.winnerSet = true;
          return this.winner;
        } else if (this.board[combination[0]].value === 'O') {
          this.winner = 'computer';
          this.winnerSet = true;
          return this.winner;
        }
      }
    }
  
    if (this.board.every(tile => tile.value !== 'open')) {
      this.winner = 'tie';
      this.winnerSet = true;
      return this.winner;
    }
    this.winner = 'no winner yet';
    return this.winner;
  }
  
  resetBoard() {
    this.board = [];
    for (let i = 0; i < 9; i++) {
      this.board.push(new Tile('open', i));
    }
    this.gameStarted = false;
    this.winner = '';
    this.winnerSet = false;
    this.isComputerPlaying = false;
  }

}
