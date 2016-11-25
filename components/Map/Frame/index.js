import React from 'react'
import css from 'next/css'

const style = {
  main: css({
    backgroundColor: 'AliceBlue',
    flex: '1',
    overflow: 'auto',
  }),
};

class Frame extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // center the board to the middle of the mapWindow for intuitive scrolling
    const mapWindowHeightPx = this.refs.mapWindow.offsetHeight;
    const mapWindowWidthPx = this.refs.mapWindow.offsetWidth;
    this.refs.mapWindow.scrollTop = (this.props.boardSizePx / 2) - (mapWindowHeightPx / 2);
    this.refs.mapWindow.scrollLeft = (this.props.boardSizePx / 2) - (mapWindowWidthPx / 2);
  }
  render() {
    return (
      <div ref='mapWindow' className={style.main}>
        { this.props.children }
      </div>
    )
  }
}

export default Frame
