// type ValidateReturnProps = [boolean, number, boolean?];

const isValidChar = (a: string, b: string) => {
  return [a, '.'].includes(b);
};

const validate = (
  s: string,
  p: string,
  i: number,
  j: number
): [boolean, number, boolean?] => {
  if (isValidChar(s[i], p[j])) {
    return [true, 1];
  }
  if (p[j] === '*') {
    if (isValidChar(s[i], p[j - 1])) {
      if (j + 1 < p.length) {
        if (isValidChar(s[i], p[j + 1])) {
          if (i + 1 < s.length) {
            if (isValidChar(s[i + 1], p[j + 1])) {
              console.log('\there 1');
              return [true, 0];
            }
          } else {
            console.log({
              i,
              j,
              si: s[i],
              pj: p[j],
              pj1: p[j + 1],
              plen: p.length,
            });
            if (!isValidChar(s[i], p[j + 1]) || j + 1 !== p.length - 1) {
              console.log('here');
              return [false, 0];
            }
          }
          console.log('\there 2');
          return [true, 2];
        }
        if (i + 1 === p.length - 1) {
          console.log({
            i,
            j,
            si: s[i],
            pj: p[j],
            pj1: p[j + 1],
            plen: p.length,
          });
          if (!isValidChar(s[i + 1], p[j + 1]) || j + 1 !== p.length - 1) {
            console.log('here 2');
            return [false, 0];
          }
        }
        console.log('\there 3');
        return [true, 1];
      }
      return [true, 0];
    }
    return [false, 0];
  }
  if (j + 1 < p.length && p[j + 1] === '*') {
    console.log('\there 4');
    return [true, 2, true];
  }
  console.log('here 3');
  return [false, 0];
};

const isMatch = (s: string, p: string): boolean => {
  if (s === p) return true;
  if (!p.includes('*') && s.length !== p.length) return false;

  let matches = true;
  let j = 0;
  let increment: number;
  let isValid: boolean;
  let keepI: boolean | undefined;
  for (let i = 0; i < s.length; i++) {
    console.log({ i, j, si: s[i], pj: p[j], slen: s.length, plen: p.length });
    [isValid, increment, keepI] = validate(s, p, i, j);
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

  return matches;
};

console.log(isMatch('aa', 'a*'));
