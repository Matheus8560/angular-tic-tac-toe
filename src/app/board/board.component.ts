import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  tiles: string[] = [];
  player: "X" | "O" = "X";
  winner: string | null = null;
  victories: { x: number, o: number } = { x: 0, o: 0 };

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.tiles = Array(9).fill('');
    this.winner = null;
    this.player = "X";
  }

  handleMove(id: number) {
    if (!this.tiles[id] && !this.winner) {
      this.tiles.splice(id, 1, this.player);
      this.player = this.player == "X" ? "O" : "X";
      this.winner = this.calcWinner();
    }
  }

  calcWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.tiles[a] &&
        this.tiles[a] === this.tiles[b] &&
        this.tiles[a] === this.tiles[c]
      ) {
        this.tiles[a] == "X" ? this.victories.x ++ : this.victories.o ++;
        return this.tiles[a];
      }
    }
    return null;
  }
}
