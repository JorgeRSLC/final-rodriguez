import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameService } from './game.service';
import { HttpClientModule } from '@angular/common/http';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { GameBoardComponent } from './game-board/game-board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, 
    LeaderBoardComponent, GameBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [GameService]
})
export class AppComponent {
  title = 'final-rodriguez';
}
