import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByScore',
  standalone: true
})
export class SortByScorePipe implements PipeTransform {

  transform(players: any[]): any[] {
    return players.sort((a, b) => b.score - a.score);
  }

}
