import * as React from 'react';
import { Board } from './Board';

export interface GameProps {
  // TODO
}

export interface GameState {
  history: Array<any>;
  stepNumber: number;
  xIsNext: boolean;
}

export class Game extends React.Component<GameProps, GameState> {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: [
          null, null, null,
          null, null, null,
          null, null, null
        ]
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step: number) {
    this.setState({
      history: this.state.history,
      stepNumber: step,
      xIsNext: (step % 2) ? false : true
    });    
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status: string;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`; 
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        `Move #${move}` :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: number) => this.handleClick(i)}
            status={status}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
        <ol>{moves}</ol>
      </div>
    );
  }
}

function calculateWinner(squares: Array<any>) {
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
      squares[a] && squares[a] === 
      squares[b] && squares[a] ===
      squares[c]
    ) {
      return squares[a];
    }
  }
}
