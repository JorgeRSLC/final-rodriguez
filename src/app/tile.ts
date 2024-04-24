export class Tile {

    selected: boolean;
    value: string;
    position: number;

  constructor(value: string, position: number) {
    this.selected = false;
    this.value = value;
    this.position = position;
  }
}