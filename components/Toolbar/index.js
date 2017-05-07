import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { colors, sizes } from '../constants';

const Wrapper = glamorous.div({
  border: `2px solid ${colors.black}`,
  boxShadow: `0 0.1rem 0.6rem ${colors.black}`,
  fill: '#000',
  backgroundColor: colors.tools,
  position: 'absolute',
  width: '50px',
  left: sizes.overlayPadding,
  top: sizes.overlayPadding,
});

const Toolbar = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
);
Toolbar.propTypes = {
  children: PropTypes.node,
};

export default Toolbar;
