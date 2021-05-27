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
      winnerCombinations: []
    }
  }

  jumpTo(step) {
    const squares = this.state.history[step].squares
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      winnerCombinations: (calculateWinner(squares) && calculateWinner(squares).combination) || [],
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
      winnerCombinations: []
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
    if (calculateWinner(squares)) {
      this.setState({
        winnerCombinations: calculateWinner(squares).combination
      })
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;

    if (!winner) {
      status = `Следующий ход: ${this.state.xIsNext ? 'X' : 'O'}`
    }
    if (winner && winner.player) {
      status = `Победа достается "${winner.player}"`
    }
    if (!winner && !current.squares.includes(null)) {
      status = `Победила дружба!`
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
          <p style={{cursor: "pointer"}}
             onClick={e => e.preventDefault()}>
            {desc}
          </p>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board winnerCombinations={this.state.winnerCombinations} squares={current.squares} onClick={(i) => this.handleClick(i)}/>
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