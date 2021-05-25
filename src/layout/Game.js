import React from "react";
import Board from "../components/Board";
import {calculateWinner} from "../helpers/game";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  restartGame() {
    const squares = Array(9).fill(null)
    this.setState({
      history: [{
        squares: squares
      }],
      xIsNext: true,
      stepNumber: 0,
    })
  }


  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;

    if (winner === 'draw') {
      status = `Победила дружба!`
    }
    if (winner && winner !== 'draw') {
      status = `Победа достается "${winner}"`
    }
    if (!winner) {
      status = `Следующий ход: ${this.state.xIsNext ? 'X' : 'O'}`
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Перейти к ходу #' + move :
        null;

      return (
        Boolean(move)
        &&
        <li key={move}
            onClick={() => this.jumpTo(move)}>
          <p style={{cursor:"pointer"}}
             onClick={e => e.preventDefault()}>
            {desc}
          </p>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <button type={"button"} onClick={() => this.restartGame()}>Начать сначала</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}