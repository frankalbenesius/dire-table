import React from 'react'
import Token from './Token'

// place tokens on the map biggest to smallest
const bySize = (a, b) => b.size - a.size

const Tokens = ({ tokens, mapUtils }) => (
  <g>
    {Object.values(tokens).sort(bySize).map((token, i) => (
      <Token
        key={i}
        id={token.id}
        player={token.player}
        icon={token.icon}
        {...mapUtils.toCircle(token.location, token.size)}
      />
    ))}
  </g>
  )
Tokens.propTypes = {
  tokens: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  mapUtils: React.PropTypes.shape({
    toCircle: React.PropTypes.func,
  }),
}

export default Tokens
