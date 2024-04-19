import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameService } from './game.service';
import { HttpClientModule } from '@angular/common/http';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, 
    LeaderBoardComponent, GameBoardComponent, TicTacToeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [GameService]
})
export class AppComponent {
  title = 'final-rodriguez';
}
