/**
 * @typedef {'fear' | 'doubt' | 'pride'} Burden
 */

/**
 * @typedef {'pure' | 'corrupted'} Morality
 */

/**
 * @typedef {'masc' | 'fem'} Gender
 */

/**
 * @typedef {'none' | 'iron' | 'blessed'} ArmorType
 */

/**
 * @typedef {'none' | 'staff' | 'sword'} WeaponType
 */

/**
 * @typedef {object} Equipment
 * @property {ArmorType} armor
 * @property {WeaponType} weapon
 */

/**
 * @typedef {object} AvatarState
 * @property {string} name
 * @property {Gender} gender
 * @property {'light' | 'tan' | 'brown' | 'dark'} skin
 * @property {'curto' | 'medio' | 'longo'} hair
 * @property {Burden} burden
 * @property {Morality} morality
 * @property {Equipment} equipment
 * @property {number} grace
 */

// Exemplo de estado inicial (não exportado, apenas para referência)
// const initialAvatarState = {
//   name: '',
//   gender: 'nb',
//   burden: 'fear',
//   morality: 'pure',
//   equipment: {
//     armor: 'none',
//     weapon: 'none',
//   },
//   grace: 0,
// };
