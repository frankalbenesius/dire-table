import React from 'react'
import css from 'next/css'
import { colors, zIndexes } from '../../constants'

const style = {
  main: css({
    backgroundColor: colors.black,
    flex: '1',
    overflow: 'auto',
    zIndex: zIndexes.map,
  }),
}

class Frame extends React.Component {
  componentDidMount() {
    // center the board to the middle of the mapWindow for intuitive scrolling
    const mapWindowHeightPx = this.mapWindow.offsetHeight
    const mapWindowWidthPx = this.mapWindow.offsetWidth
    this.mapWindow.scrollTop = this.props.centerPx - (mapWindowHeightPx / 2)
    this.mapWindow.scrollLeft = this.props.centerPx - (mapWindowWidthPx / 2)
  }
  render() {
    return (
      <div ref={(c) => { this.mapWindow = c }} className={style.main}>
        { this.props.children }
      </div>
    )
  }
}
Frame.propTypes = {
  centerPx: React.PropTypes.number,
  children: React.PropTypes.element,
}

export default Frame
