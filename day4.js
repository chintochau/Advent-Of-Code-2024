import fs from "fs";
let testingInput;
const input = testingInput || fs.readFileSync("day4input.txt", "utf-8");

const turnInputToArray = () => {
  let firstArray = input.split("\n");
  return firstArray.map((x) => x.split(""));
};

const searchArray = (inputArray) => {
  let count = 0;
  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray[i].length; j++) {
      if (inputArray[i][j] === "X") {
        count += searchHorizontalAndVertical(inputArray, i, j);
        count += searchDiagonal(inputArray, i, j);
      }
    }
  }
  console.log("count for Part1:",count);

};

const searchHorizontalAndVertical = (inputArray, startI, startJ) => {
  let count = 0;
  const isValidIndex = (i, j) =>
    i >= 0 && i < inputArray.length && j >= 0 && j < inputArray[i].length;
  if (
    isValidIndex(startI, startJ) &&
    isValidIndex(startI + 3, startJ) &&
    inputArray[startI][startJ] === "X" &&
    inputArray[startI + 1][startJ] === "M" &&
    inputArray[startI + 2][startJ] === "A" &&
    inputArray[startI + 3][startJ] === "S"
  ) {
    count++;
  }
  if (
    isValidIndex(startI, startJ) &&
    isValidIndex(startI - 3, startJ) &&
    inputArray[startI][startJ] === "X" &&
    inputArray[startI - 1][startJ] === "M" &&
    inputArray[startI - 2][startJ] === "A" &&
    inputArray[startI - 3][startJ] === "S"
  ) {
    count++;
  }
  if (
    isValidIndex(startI, startJ) &&
    isValidIndex(startI, startJ + 3) &&
    inputArray[startI][startJ] === "X" &&
    inputArray[startI][startJ + 1] === "M" &&
    inputArray[startI][startJ + 2] === "A" &&
    inputArray[startI][startJ + 3] === "S"
  ) {
    count++;
  }
  if (
    isValidIndex(startI, startJ) &&
    isValidIndex(startI, startJ - 3) &&
    inputArray[startI][startJ] === "X" &&
    inputArray[startI][startJ - 1] === "M" &&
    inputArray[startI][startJ - 2] === "A" &&
    inputArray[startI][startJ - 3] === "S"
  ) {
    count++;
  }
  return count;
};

const searchDiagonal = (inputArray, startI, startJ) => {
  let count = 0;
  const isValidIndex = (i, j) =>
    i >= 0 && i < inputArray.length && j >= 0 && j < inputArray[i].length;
  if (
    isValidIndex(startI, startJ) &&
    isValidIndex(startI + 3, startJ + 3) &&
    inputArray[startI][startJ] === "X" &&
    inputArray[startI + 1][startJ + 1] === "M" &&
    inputArray[startI + 2][startJ + 2] === "A" &&
    inputArray[startI + 3][startJ + 3] === "S"
  ) {
    count++;
  }
  if (
    isValidIndex(startI, startJ) &&
    isValidIndex(startI - 3, startJ - 3) &&
    inputArray[startI][startJ] === "X" &&
    inputArray[startI - 1][startJ - 1] === "M" &&
    inputArray[startI - 2][startJ - 2] === "A" &&
    inputArray[startI - 3][startJ - 3] === "S"
  ) {
    count++;
  }
  if (
    isValidIndex(startI, startJ) &&
    isValidIndex(startI - 3, startJ + 3) &&
    inputArray[startI][startJ] === "X" &&
    inputArray[startI - 1][startJ + 1] === "M" &&
    inputArray[startI - 2][startJ + 2] === "A" &&
    inputArray[startI - 3][startJ + 3] === "S"
  ) {
    count++;
  }
  if (
    isValidIndex(startI, startJ) &&
    isValidIndex(startI + 3, startJ - 3) &&
    inputArray[startI][startJ] === "X" &&
    inputArray[startI + 1][startJ - 1] === "M" &&
    inputArray[startI + 2][startJ - 2] === "A" &&
    inputArray[startI + 3][startJ - 3] === "S"
  ) {
    count++;
  }
  return count;
};

// Searching for part 2

const searchArrayForPart2 = (inputArray) => {
  let count = 0;
  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray[i].length; j++) {
      if (inputArray[i][j] === "A") {
        count += searchHorizontalAndVerticalAndDiagonalForPart2(inputArray, i, j);
      }
    }
  }
  console.log("count for Part2:",count);
};

const searchHorizontalAndVerticalAndDiagonalForPart2 = (
  inputArray,
  startI,
  startJ
) => {
  let count = 0;
  const isValidIndex = (i, j) =>
    i >= 0 && i < inputArray.length && j >= 0 && j < inputArray[i].length;

  if (
    isValidIndex(startI, startJ) &&
    isValidIndex(startI - 1, startJ - 1) &&
    isValidIndex(startI + 1, startJ + 1) &&
    isValidIndex(startI - 1, startJ + 1) &&
    isValidIndex(startI + 1, startJ - 1)
  ) {
    if (
      inputArray[startI][startJ] === "A" &&
      inputArray[startI - 1][startJ - 1] === "M" &&
      inputArray[startI + 1][startJ + 1] === "S"
    ) {
      count++;
    }
    if (
      inputArray[startI][startJ] === "A" &&
      inputArray[startI - 1][startJ + 1] === "M" &&
      inputArray[startI + 1][startJ - 1] === "S"
    ) {
      count++;
    }
    if (
      inputArray[startI][startJ] === "A" &&
      inputArray[startI + 1][startJ - 1] === "M" &&
      inputArray[startI - 1][startJ + 1] === "S"
    ) {
      count++;
    }
    if (
      inputArray[startI][startJ] === "A" &&
      inputArray[startI + 1][startJ + 1] === "M" &&
      inputArray[startI - 1][startJ - 1] === "S"
    ) {
      count++;
    }
  } else {
    return 0;
  }
  return count === 2 ? 1 : 0;
};

const part1 = () => {
  const inputArray = turnInputToArray(input);
  searchArray(inputArray);
};

const part2 = () => {
  const inputArray = turnInputToArray(input);
  searchArrayForPart2(inputArray);
};

part1();
part2();
