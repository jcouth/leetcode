const isValidChar = (currentChar: string, currentPatternChar: string) => {
  return [currentChar, '.'].includes(currentPatternChar);
};

const isStar = (currentPatternChar: string) => {
  return currentPatternChar === '*';
};

const isValidStar = (
  currentChar: string,
  pattern: string,
  patternIndex: number
) => {
  return isValidChar(currentChar, pattern[patternIndex - 1]);
};

const isPreviousStarStillValid = (
  currentChar: string,
  pattern: string,
  patternIndex: number
) => {
  return isValidStar(currentChar, pattern, patternIndex - 1);
};

const isSkippableChar = (pattern: string, patternIndex: number) => {
  return isStar(pattern[patternIndex + 1]);
};

const validate = (
  currentChar: string,
  pattern: string,
  patternIndex: number
): [boolean, number, boolean?] => {
  const currentPattern = pattern[patternIndex];
  if (isValidChar(currentChar, pattern[patternIndex])) {
    return [true, 1];
  }
  if (isStar(pattern[patternIndex])) {
    if (isValidStar(currentChar, pattern, patternIndex)) {
      return [true, 1];
    }
    if (isPreviousStarStillValid(currentChar, pattern, patternIndex)) {
      return [true, 0];
    }
    return [true, 1, true];
  }
  if (isSkippableChar(pattern, patternIndex)) {
    return [true, 2, true];
  }
  return [false, 0];
};

const validateRemainingPattern = (
  currentChar: string,
  pattern: string,
  patternIndex: number
): [boolean, number] => {
  const currentPattern = pattern[patternIndex];
  if (
    isStar(pattern[patternIndex]) &&
    isValidStar(currentChar, pattern, patternIndex)
  ) {
    return [true, 0];
  }
  if (
    isValidChar(currentChar, pattern[patternIndex]) &&
    isStar(pattern[patternIndex - 1]) &&
    isValidStar(currentChar, pattern, patternIndex - 1)
  ) {
    return [true, 0];
  }
  if (isSkippableChar(pattern, patternIndex)) {
    return [true, 1];
  }
  return [false, 0];
};

const isMatch = (s: string, pattern: string): boolean => {
  if (s === pattern) return true;
  if (!pattern.includes('*') && s.length !== pattern.length) return false;

  let matches = true;
  let j = 0;
  let isValid: boolean;
  let increment: number;
  let keepI: boolean | undefined;
  for (let i = 0; i < s.length; i++) {
    [isValid, increment, keepI] = validate(s[i], pattern, j);
    if (!isValid) {
      matches = false;
      break;
    } else {
      j += increment;
      if (keepI) {
        i--; // to keep I
      }
    }
  }

  const lastCharacter = s[s.length - 1];
  for (j; j < pattern.length; j++) {
    [isValid, increment] = validateRemainingPattern(lastCharacter, pattern, j);
    if (!isValid) {
      matches = false;
      break;
    }
    j += increment;
  }

  return matches;
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
