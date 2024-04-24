export class Player {
    playerId: string;
    alias: string;
    score: number;
  
    constructor(playerId: string, score: number) {
      this.playerId = playerId;
      this.score = score;
      this.alias = playerId.slice(-4);
    }
  }