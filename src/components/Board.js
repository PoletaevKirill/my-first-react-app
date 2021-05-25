import React from "react";
import Square from "./Square";

export default class Board extends React.Component {
  renderSquare(i) {
    return (<Square
      key={'col_' + i.toString()}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />);
  }

  renderBoard() {
    const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    return (
      <div>
        {
          rows.map((row, rowIndex) => {
            return (
              <div className="board-row" key={rowIndex.toString()}>
                {
                  row.map(i => this.renderSquare(i))
                }
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    return (
      this.renderBoard()
    );
  }
}
