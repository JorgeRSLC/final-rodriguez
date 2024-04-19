import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AiPlayerService {

  constructor() { }

  computerPlay(): string {
    const choices = ['paper', 'rock', 'scissor'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
}
