export class Player {
    playerID: string;
    alias: string;
    score: number;
  
    constructor(playerID: string, score: number) {
      this.playerID = playerID;
      this.score = score;
      this.alias = playerID.slice(-4);
    }
  }