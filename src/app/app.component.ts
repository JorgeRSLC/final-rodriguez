import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameService } from './game.service';
import { StorageService } from './storage.service';
import { HttpClientModule } from '@angular/common/http';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { RockPaperScissorComponent } from './rock-paper-scissor/rock-paper-scissor.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule,
    LeaderBoardComponent, GameBoardComponent, RockPaperScissorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [GameService, StorageService]
})
export class AppComponent {
  title = 'final-rodriguez';
  startGame: boolean = false;
}
