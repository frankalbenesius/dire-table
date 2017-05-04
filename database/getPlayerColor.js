import difference from 'lodash/difference';
import { colors as allColors } from '../components/constants';

const colors = allColors.player;

export default (isGm, currentColors) => {
  if (isGm) {
    return allColors.gm;
  }
  const available = difference(colors, currentColors);
  if (available.length === 0) return allColors.gray;
  const color = available[Math.floor(Math.random() * available.length)];
  return color;
};
