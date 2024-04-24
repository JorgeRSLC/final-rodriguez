import { Component, Input } from '@angular/core';
import { AiPlayerService } from '../ai-player.service';
import { CommonModule } from '@angular/common';
import { Player } from '../player';

@Component({
  selector: 'app-rock-paper-scissor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rock-paper-scissor.component.html',
  styleUrl: './rock-paper-scissor.component.css'
})
export class RockPaperScissorComponent {

  @Input() mainPlayer!: Player;
  roundWinner: string = '';
  playerMove: string = '';
  gameWinner: string = '';
  computerMove: string = '';
  gameStarted: boolean = false;
  roundsFinished: boolean = true;

  playerMovePromise!: Promise<void>;
  playerMoveResolve!: () => void;
  constructor(private aiPlayerService: AiPlayerService) {
    this.resetPlayerMovePromise();
   }

   resetPlayerMovePromise() {
    this.playerMovePromise = new Promise<void>(resolve => {
      this.playerMoveResolve = resolve;
    });
  }

  async playGame() {
    this.roundsFinished = false;
    this.gameStarted = true;
    this.gameWinner = '';
    const results = [];
    for (let i = 0; i < 3; i++) {
      await this.playerMovePromise; // Wait for the player to make a move
      const playerMove = this.playerMove;
      const computerMove = await this.getComputerMoveWithDelay();
      this.computerMove = computerMove;
      const roundWinner = this.getRoundWinner(playerMove, computerMove);
      this.roundWinner = roundWinner;
      if(roundWinner === 'tie') {
        i--;
        continue;
      }
      results.push(roundWinner);    
      this.resetPlayerMovePromise(); // Reset the promise for the next round
      sessionStorage.setItem('roundResults', JSON.stringify(results));
    }
    this.roundsFinished = true;
    this.gameWinner = this.getGameWinner();
  }

  getGameWinner(): string {
    const results = JSON.parse(sessionStorage.getItem('roundResults') || '[]');
    const playerScore = results.filter((result: string) => result === 'player').length;
    const computerScore = results.filter((result: string) => result === 'computer').length;
    let winner: string;
    if (playerScore > computerScore) {
      winner = 'player';
    } else if (playerScore < computerScore) {
      winner = 'computer';
    } else {
      winner = 'tie';
    }
  
    // Clear session storage and roundWinner after determining the winner
    sessionStorage.removeItem('roundResults');
    this.roundWinner = '';
  
    return winner;
  }

  getPlayerMove(): string {
    return this.playerMove;
  }

  setPlayerMove(move: string): void {
    this.playerMove = move;
    this.playerMoveResolve(); // Resolve the promise when the player makes a move
  }

  getComputerMoveWithDelay(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        const move = this.aiPlayerService.computerPlay();
        resolve(move);
      }, 3000);
    });
  }

  getRoundWinner(playerMove: string, computerMove: string): string {
    // Implement this method to determine the winner 
    if (playerMove === computerMove) {
      return 'tie';
    } else if (
      (playerMove === 'rock' && computerMove === 'scissor') ||
      (playerMove === 'scissor' && computerMove === 'paper') ||
      (playerMove === 'paper' && computerMove === 'rock')
    ) {
      return 'player';
    } else {
      return 'computer';
    }
  }
}
