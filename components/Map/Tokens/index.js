import React from 'react'
import Token from './Token'

const Tokens = ({ tokens, mapUtils }) => (
  <g>
    {tokens.map((token, i) => (
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
