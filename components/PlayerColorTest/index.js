import React from 'react';
import glamorous from 'glamorous';

import { colors } from '../constants';

const unitSize = 5; // rem
const TokenTestWrapper = glamorous.div({
  width: `${unitSize * 5}rem`,
  position: 'absolute',
  display: 'flex',
  flexWrap: 'wrap',
  left: `${unitSize * 2}rem`,
  top: `${unitSize}rem`,
});
const TokenTestColor = glamorous.div({
  borderRadius: '100rem',
  width: `${unitSize - 1}rem`,
  height: `${unitSize - 1}rem`,
  marginRight: '1rem',
  marginBottom: '1rem',
  display: 'inline-block',
  boxShadow: `0 3px 1px ${colors.black}`,
});
const MessageTestWrapper = glamorous.div({
  position: 'absolute',
  left: `${unitSize * 8}rem`,
  top: `${unitSize}rem`,
  backgroundColor: colors.chat,
});
const MessageTestColor = glamorous.div({
  padding: '0.4rem',
  fontSize: '1.2rem',
  fontFamily: 'Vulf Mono Bold',
});

const Toolbar = () => (
  <div>
    <TokenTestWrapper>
      {colors.player.map(c => <TokenTestColor style={{ backgroundColor: c }} />)}
    </TokenTestWrapper>
    <MessageTestWrapper>
      {colors.player.map((c, i) => (
        <MessageTestColor style={{ color: c }}>Player {i}</MessageTestColor>
      ))}
    </MessageTestWrapper>
  </div>
);

export default Toolbar;
