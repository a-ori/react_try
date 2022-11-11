import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  // ボタンの表示（クリック時）
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
/*
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({ value: 'X' })}
      >
        {this.state.value}
      </button>
    );
  }
}
*/

class Board extends React.Component {
  // 初期値を設定
  constructor(props) {
    super(props);
    this.state = {
      // □の初期値
      squares: Array(9).fill(null),
      // 先行(true)or後攻（false）を判断する
      xIsNext: true,
    };
  }

  // □をクリックした場合の動作
  handleClick(i) {
    const squares = this.state.squares.slice();
    // 先行の場合X、後攻の場合O
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      //状態を保持
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
    /*
    squares[i] = 'X';
    this.setState({ squares: squares });
    */
  }

  renderSquare(i) {
    // □の中をボタンで表示する
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
    //return <Square value={this.state.squares[i]} />;
  }

  // ボードを表示する
  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    //const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  // 全体を表示
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
// メイン処理
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}