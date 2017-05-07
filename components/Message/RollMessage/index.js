import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { colors, sizes } from '../../constants';

const RollFormula = glamorous.div({
  color: colors.black,
  display: 'inline-block',
  cursor: 'default',
  ':hover': {
    textDecoration: 'underline',
  },
});
const RollEvaluation = glamorous.div({
  color: colors.black,
  maxHeight: '7.2rem', // 8 times line height of a Message
  paddingBottom: '0.3rem',
  overflowY: 'auto',
});
const RollValue = glamorous.div({
  color: colors.text,
  fontSize: '1rem',
  fontFamily: 'Vulf Mono Bold',
});

const handleFormulaClick = (formula, onFormulaClick) => (e) => {
  e.preventDefault();
  onFormulaClick(formula);
};

const Roll = ({ roll, fromPlayer, onFormulaClick }) => {
  const RollWrapper = glamorous.div({
    border: `1px solid ${fromPlayer.color}`,
    borderRadius: sizes.radius,
    padding: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: colors.white,
  });
  return (
    <RollWrapper>
      <RollFormula onClick={handleFormulaClick(roll.formula, onFormulaClick)}>
        {roll.formula}
      </RollFormula>
      <RollEvaluation>{roll.evaluation}</RollEvaluation>
      <RollValue>{roll.value}</RollValue>
    </RollWrapper>
  );
};
Roll.propTypes = {
  fromPlayer: PropTypes.object,
  roll: PropTypes.object,
  onFormulaClick: PropTypes.func,
};

export default Roll;
