import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { Player } from '../player';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-leader-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leader-board.component.html',
  styleUrl: './leader-board.component.css'
})
export class LeaderBoardComponent implements OnInit {
  @Input() isGlobal: boolean = false;
  players: Player[] = [];
  title = '';

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.title = this.isGlobal ? 'Global Leader Board' : 'Local Leader Board';

    if (this.isGlobal) {
      this.gameService.getGlobalData().subscribe((data: any[]) => {
        this.players = data.map((playerData: { playerId: string; score: number; }) => 
          new Player(playerData.playerId, playerData.score));
      });
    } else {
      this.gameService.getPlayersSubject().subscribe((players: Player[]) => {
        this.players = players;
      });
    }
  }
}
