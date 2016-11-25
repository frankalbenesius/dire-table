import React from 'react'
import css from 'next/css'

const gridPath = cellSize => [
    'M', cellSize, 0,
    'L', 0, 0,
    'L', 0, cellSize,
  ].join(' ');

const Grid = ({ cellSize }) => {
  return (
    <g>
      <defs>
        <pattern id='gridPattern' width={cellSize} height={cellSize} patternUnits='userSpaceOnUse'>
          <path d={gridPath(cellSize)} fill='none' stroke='#000' strokeWidth='1' strokeOpacity='0.5'/>
        </pattern>
      </defs>
      <rect id='grid' width='100%' height='100%' fill='url(#gridPattern)'></rect>
    </g>
  );
}

const Board = ({ children, cellSize, boardWidthPx}) => {
  const originMarkerPath = (width) => {
    const center = width / 2;
    return [
      'M', center - 5, center - 5,
      'L', center + 5, center + 5,
      'M', center + 5, center - 5,
      'L', center - 5, center + 5,
    ].join(' ');
  };
  return (
    <svg width={boardWidthPx} height={boardWidthPx} className={style.svg}>
      <rect id='boardBackground' width='100%' height='100%' className={style.board} ></rect>
      { children }
      <path d={originMarkerPath(boardWidthPx)} fill='none' stroke='#000' strokeWidth='1' strokeOpacity='0.5'/>
    </svg>
  );
}

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardWidthPx: props.boardSize * props.cellSize + 1 // +1px for final cell stroke
    };
  }
  componentDidMount() {
    // center the board to the middle of the mapWindow for intuitive scrolling
    const mapWindowHeightPx = this.refs.mapWindow.offsetHeight;
    const mapWindowWidthPx = this.refs.mapWindow.offsetWidth;
    this.refs.mapWindow.scrollTop = (this.state.boardWidthPx / 2) - (mapWindowHeightPx / 2);
    this.refs.mapWindow.scrollLeft = (this.state.boardWidthPx / 2) - (mapWindowWidthPx / 2);
  }
  render() {
    return (
      <div ref='mapWindow' className={style.main}>
        <Board cellSize={this.props.cellSize} boardWidthPx={this.state.boardWidthPx} >
          {/* <Areas /> */}
          {/* <Tokens /> */}
          {/* <Fog /> */}
          <Grid cellSize={this.props.cellSize} />
        </Board>
      </div>
    )
  }
}
Map.defaultProps = {
  cellSize: 75,
  boardSize: 30,
};

const style = {
  main: css({
    backgroundColor: 'AliceBlue',
    flex: '1',
    overflow: 'auto',
  }),
  svg: css({
    margin: '0 auto', // still need to find a way to center board vertically at small board sizes
    display: 'block', // necessary to get rid of extra space from inline elements
  }),
  board: css({
    fill: 'Gainsboro',
  }),
};
