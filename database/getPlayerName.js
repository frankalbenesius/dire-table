import difference from 'lodash/difference';

const names = [
  'Donut',
  'Penguin',
  'Stumpy',
  'Whicker',
  'Shadow',
  'Howard',
  'Wilshire',
  'Darling',
  'Disco',
  'Jack',
  'The Bear',
  'Sneak',
  'The Big L',
  'Whisp',
  'Wheezy',
  'Crazy',
  'Goat',
  'Pirate',
  'Saucy',
  'Hambone',
  'Butcher',
  'Walla Walla',
  'Snake',
  'Caboose',
  'Sleepy',
  'Killer',
  'Stompy',
  'Mopey',
  'Dopey',
  'Weasel',
  'Ghost',
  'Dasher',
  'Grumpy',
  'Hollywood',
  'Tooth',
  'Noodle',
  'King',
  'Cupid',
  'Prancer',
];

export default (currentNames) => {
  const available = difference(names, currentNames);
  if (available.length === 0) return 'NO MORE NAMES!';
  const name = available[Math.floor(Math.random() * available.length)];
  return name;
};
