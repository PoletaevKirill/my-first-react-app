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

  renderBoard(x = 3, y = 3) {
    let index = 0
    return (
      <div>
        {
          Array(x).fill(null).map((row, rowIndex) => {
            return (
              <div className="board-row" key={rowIndex.toString()}>
                {
                  Array(y).fill(null).map(_ => {
                    return this.renderSquare(index++)
                  })
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
      this.renderBoard(3, 3)
    );
  }
}
