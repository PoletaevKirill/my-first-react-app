import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
  isActiveSquare = i =>  this.props.winnerCombinations && this.props.winnerCombinations.includes(i) ? 'active' : ''
  renderBoard() {
    const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    return (
      rows.map((row, rowIndex) => {
        return (
          <div className="board-row" key={rowIndex.toString()}>
            {
              row.map(i => <Square
                key={'col_' + i.toString()}
                className={this.isActiveSquare(i)}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
              />)
            }
          </div>
        )
      })
    )
  }

  render() {
    return (
      this.renderBoard()
    );
  }
}
