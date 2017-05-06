import React from 'react';
import glamorous from 'glamorous';

import { colors } from '../constants';

const Blackout = glamorous.div({
  width: '100%',
  height: '100%',
  backgroundColor: colors.background,
  textAlign: 'center',
  fontFamily: 'Vulf Mono Italic',
});

// const Text = glamorous.div({
//   color: 'white',
// });

const Connecting = () => (
  <Blackout>
    {/* <Text>Connecting To Dire Table...</Text> */}
  </Blackout>
);

export default Connecting;
