const isStar = (pattern: string, index: number) => {
  return pattern[index + 1] === '*';
};

const isValidChar = (char: string, patternChar: string) => {
  return [char, '.'].includes(patternChar);
};

const isSameStar = (pattern: string, index: number) => {
  return pattern[index] === pattern[index + 2] && isStar(pattern, index + 2);
};

const isRemainingOnlyStars = (pattern: string) => {
  let i = 0;
  while (i < pattern.length) {
    if (!isStar(pattern, i)) {
      return false;
    }
    i += 2;
  }
  return true;
};

const isMatch = (s: string, pattern: string): boolean => {
  if (s === pattern) return true;

  let i = 0;
  let j = 0;
  const skipped: string[] = [];
  // while (j < pattern.length && i < s.length) {
  while (j < pattern.length) {
    if (isStar(pattern, j)) {
      if (isSameStar(pattern, j)) {
        pattern = pattern.substring(j + 2);
        continue;
      }
      if (s[i] && isValidChar(s[i], pattern[j])) {
        skipped.push(pattern[j]);
        do {
          i++;
        } while (s[i] && isValidChar(s[i], pattern[j]));
      }
      // if (!isValidChar(s[i], pattern[j]) && isValidChar(s[i - 1], pattern[j])) {
      if (
        pattern[j] === pattern[j + 2]
        //|| skipped[0] === pattern[j]
        //|| skipped[0] === pattern[j + 2]
      ) {
        i--;
      }
      pattern = pattern.substring(j + 2);
      continue;
    }
    if (s[i] && isValidChar(s[i], pattern[j])) {
      // while (skipped.length > 0) {
      //   if (skipped[0] === s[0]) {
      //     do {
      //       s = s.substring(1);
      //     } while (skipped[0] === s[0]);
      //     skipped.shift();
      //   } else {
      //     return false;
      //   }
      // }
      // i = 0;
      // pattern = pattern.substring(j + 1);
      // continue;
      s = s.substring(0, i) + s.substring(i + 1);
      pattern = pattern.substring(j + 1);
      while (skipped.length > 0 && s.length) {
        if (s[0] && skipped[0] && isValidChar(s[0], skipped[0])) {
          do {
            s = s.substring(1);
          } while (s[0] && skipped[0] && isValidChar(s[0], skipped[0]));
        } else {
          return false;
        }
        skipped.shift();
      }
      i = 0;
      continue;
    }
    if (skipped.length > 0 && pattern.length > 0) {
      do {
        if (isValidChar(s[0], pattern[0])) {
          s = s.substring(1);
          pattern = pattern.substring(1);
        } else {
          if (s[0] && skipped[0] && isValidChar(s[0], skipped[0])) {
            do {
              s = s.substring(1);
            } while (s[0] && skipped[0] && isValidChar(s[0], skipped[0]));
          } else {
            return false;
          }
          skipped.shift();
        }
      } while (skipped.length > 0);
      continue;
    }
    // if (isStar(pattern, j)) {
    //   pattern = pattern.substring(0, j) + pattern.substring(j + 2);
    //   continue;
    // }
    return false;
  }
  i = 0;
  while (skipped.length > 0 && s.length) {
    // while (skipped.length > 0) {
    if (s[i] && isValidChar(s[i], skipped[0])) {
      do {
        i++;
      } while (s[i] && isValidChar(s[i], skipped[0]));
      s = s.substring(i);
    }
    skipped.shift();
  }

  if (s.length > 0 || !isRemainingOnlyStars(pattern)) return false;
  // if (s.length > 0) return false;
  return true;
};

console.log(`1 - ${false === isMatch('aa', 'a') ? 'SUCESSO' : 'FAIL'}`);
console.log(`2 - ${true === isMatch('aa', 'a*') ? 'SUCESSO' : 'FAIL'}`);
console.log(`3 - ${true === isMatch('ab', '.*') ? 'SUCESSO' : 'FAIL'}`);
console.log(
  `4 - ${true === isMatch('mississippi', 'mis*is*ip*.') ? 'SUCESSO' : 'FAIL'}`
);
console.log(
  `5 - ${false === isMatch('mississippi', 'mis*is*p*.') ? 'SUCESSO' : 'FAIL'}`
);
console.log(`6 - ${true === isMatch('aab', 'c*a*b') ? 'SUCESSO' : 'FAIL'}`);
console.log(`7 - ${false === isMatch('aaa', 'a*b') ? 'SUCESSO' : 'FAIL'}`);
console.log(`8 - ${true === isMatch('aaa', 'a*a') ? 'SUCESSO' : 'FAIL'}`);
console.log(`9 - ${false === isMatch('abcd', 'd*') ? 'SUCESSO' : 'FAIL'}`);
console.log(`10 - ${false === isMatch('aaa', 'ab*a') ? 'SUCESSO' : 'FAIL'}`);
console.log(`11 - ${false === isMatch('abcd', 'd*') ? 'SUCESSO' : 'FAIL'}`);
console.log(`12 - ${false === isMatch('ab', '.*c') ? 'SUCESSO' : 'FAIL'}`);
console.log(`13 - ${true === isMatch('aaa', 'ab*ac*a') ? 'SUCESSO' : 'FAIL'}`);
console.log(
  `14 - ${true === isMatch('aaca', 'ab*a*c*a') ? 'SUCESSO' : 'FAIL'}`
);
console.log(`15 - ${false === isMatch('a', 'ab*a') ? 'SUCESSO' : 'FAIL'}`);
console.log(`16 - ${true === isMatch('aaa', 'ab*a*c*a') ? 'SUCESSO' : 'FAIL'}`);
console.log(`17 - ${true === isMatch('bbbba', '.*a*a') ? 'SUCESSO' : 'FAIL'}`);
console.log(
  `18 - ${false === isMatch('aaba', 'ab*a*aa*a*c*a') ? 'SUCESSO' : 'FAIL'}`
);
console.log(
  `19 - ${false === isMatch('aaba', 'ab*a*c*a') ? 'SUCESSO' : 'FAIL'}`
);
console.log(`20 - ${true === isMatch('a', '.*.') ? 'SUCESSO' : 'FAIL'}`);
console.log(`21 - ${false === isMatch('a', '.*..a*') ? 'SUCESSO' : 'FAIL'}`);
console.log(`22 - ${true === isMatch('ab', '.*..') ? 'SUCESSO' : 'FAIL'}`);
