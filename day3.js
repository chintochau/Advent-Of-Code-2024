//read input from "day3input.txt"
const fs = require("fs");
const input = fs.readFileSync("day3input.txt", "utf-8");

const part1 = () => {
  const regex = /mul\(\d+,\d+\)/g;
  const matches = input.match(regex);
  if (!matches) {
    return;
  }
  const numbers = matches.map(parseMulToArrayOfTwoNumbers);

  const result = numbers.reduce((a, b) => {
    return a + b[0] * b[1];
  }, 0);

  console.log(result);
};

const part2 = () => {
  const regex = /mul\(\d+,\d+\)|don't\(\)|do\(\)/g;
  const matches = input.match(regex);
  if (!matches) {
    return;
  }

  let shouldCount = true;
  let actualCountNumberArray = [];
  
  matches.forEach((x) => {
    if (x === "don't()") {
      shouldCount = false;
    } else if (x === "do()") {
      shouldCount = true;
    } else if (shouldCount) {
      actualCountNumberArray.push(parseMulToArrayOfTwoNumbers(x));
    }
  });
  
  const result = actualCountNumberArray.reduce((a, b) => {
    return a + b[0] * b[1];
  }, 0);

  console.log(result);
};

const parseMulToArrayOfTwoNumbers = (x) => {
  const subArray = x.replace("mul(", "").replace(")", "").split(",");
  return [parseInt(subArray[0]), parseInt(subArray[1])];
};

part1()
part2();
