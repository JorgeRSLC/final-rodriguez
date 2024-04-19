import { Component } from '@angular/core';
import { AiPlayerService } from '../ai-player.service';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css'
})
export class TicTacToeComponent {

  roundWinner: string = '';
  playerMove: string = '';
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

  async playRound() {
    const results = [];
    for (let i = 0; i < 3; i++) {
      await this.playerMovePromise; // Wait for the player to make a move
      const playerMove = this.playerMove;
      const computerMove = await this.getComputerMoveWithDelay();
      const roundWinner = this.getRoundWinner(playerMove, computerMove);
      if(roundWinner === 'tie') {
        i--;
        continue;
      }
      results.push(roundWinner);
      this.roundWinner = roundWinner;
      this.resetPlayerMovePromise(); // Reset the promise for the next round
    }
    sessionStorage.setItem('gameResults', JSON.stringify(results));
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
