// Compound Interests
/*
********************************
        * Compound Interest
        *********  A = P (1 + r/n) ^ nt **********
        * P is the principal amount.
        * r is the annual interest rate.
        * t is the time the money is invested or borrowed for.
        * n is the number of times that interest is compounded per unit t,
            for example if interest is compounded monthly and t is in years
            then the value of n would be 12. If interest is compounded quarterly and
            t is in years then the value of n would be 4.

        * Simple Interest
         ******** i = p * r * t *************
********************************
*/

// type stringOrNo = number | string;

export const calculateSimpleInterest = (p: number, r: number, t: number) => {
  // A = P (1 + r/n) ^ nt
  r = r / 100; // this will transform 8% to 0.08
  // uncomment this line to calculate interests monthly
  // return (p + (p * r * t)) / t;
  // prettier-ignore
  return (p + (p * r)) / t;
};
