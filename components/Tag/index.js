import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { colors } from '../constants';

const TagWrapper = glamorous.span({
  fontFamily: 'Vulf Mono Light Italic',
  color: colors.black,
  marginLeft: '0.4em',
});

const Tag = ({ children }) => (
  <TagWrapper>
    {'('}{children}{')'}
  </TagWrapper>
);
Tag.propTypes = {
  children: PropTypes.node,
};

export default Tag;
