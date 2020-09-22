export const splitByLength = (input, len) => input.match(new RegExp(`.{1,${len}}(?=(.{${len}})+(?!.))|.{1,${len}}$`, 'g'));

export const addComma = (number) => {
  const num = number.toString().includes('.') ? number.toString().split('.')[0] : number.toString();
  return splitByLength(num, 3).join(',');
};

export const cardNum = (num) => splitByLength(num, 4).join(' ');

export const randNum = (n) => Math.round(Math.random() * n);

export const genUniqueNumber = (d, arr) => {
  let inArray = true;
  let g;

  while (inArray) {
    g = randNum(d);
    inArray = arr.includes(g);
  }

  return g;
};

export const randWord = (length) => {
  let consonants = 'bcdfghjlmnpqrstv';
  let vowels = 'aeiou';
  const rand = (limit) => Math.floor(Math.random() * limit);
  let i;
  let word = '';
  const newLength = parseInt(length, 10);
  consonants = consonants.split('');
  vowels = vowels.split('');
  for (i = 0; i < newLength / 2; i += 1) {
    const randConsonant = consonants[rand(consonants.length)];
    const randVowel = vowels[rand(vowels.length)];
    word += i === 0 ? randConsonant.toUpperCase() : randConsonant;
    word += i * 2 < newLength - 1 ? randVowel : '';
  }
  return word;
};

export const sortNumAsc = (array) => array.sort((a, b) => a - b);

export const strToNum = (string) => {
  if (typeof string !== 'string') return 'This function accepts only a string';

  const arr = string.toLowerCase().split('');
  const guide = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26
  };

  return Number(arr.map((i) => guide[i]).join(''));
};

export const toSplittedString = (str) => {
  let inputString = str;
  const positions = [];
  for (let i = 0; i < inputString.length; i += 1) {
    if (inputString[i].match(/[A-Z]/) != null) {
      positions.push(i);
    }
  }
  for (let index = 0; index < positions.length; index += 1) {
    const ind = positions[index] + index;
    inputString = inputString.splice(ind, 0, ' ');
  }

  return inputString.toLowerCase();
};

export const unique = (array) => array
  .filter((value, index, self) => self.indexOf(value) === index);
