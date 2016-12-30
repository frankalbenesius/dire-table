import React from 'react'
import Token from './Token'

// place tokens on the map biggest to smallest
const bySize = (a, b) => b.size - a.size

const Tokens = ({ tokens, mapUtils }) => (
  <g>
    {tokens.sort(bySize).map((token, i) => (
      <Token
        key={i}
        circle={mapUtils.toCircle(token.location, token.size)}
        player={token.player}
        icon={token.icon}
      />
    ))}
  </g>
)
Tokens.propTypes = {
  tokens: React.PropTypes.arrayOf(React.PropTypes.object),
  mapUtils: React.PropTypes.shape({
    toCircle: React.PropTypes.func,
  }),
}

export default Tokens
