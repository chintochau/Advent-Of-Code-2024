import fs from "fs";
const input = fs.readFileSync("day5input.txt", "utf-8");

const turnInputToArray = (input) => {
  const array = input.split("\n\n");
  const rules = array[0].split("\n").map((x) => x.split("|"));
  const updates = array[1].split("\n").map((x) => x.split(","));
  return [rules, updates];
};

const isFollowingRules = (rules, update) => {
  const shouldPrint = rules.map((rule) => isFollowingThisRule(rule, update));
  return !shouldPrint.includes(false);
};

const isFollowingThisRule = (rule, update) => {
  const index1 = update.indexOf(rule[0]);
  const index2 = update.indexOf(rule[1]);
  if (index1 == -1 || index2 == -1) {
    return true;
  } else if (index1 > index2) {
    return false;
  }
  return true;
};

const fixTheUpdate = (rules, update) => {
  let newUpdate = [...update];
  while (!isFollowingRules(rules, newUpdate)) {
    rules.forEach((rule) => {
      if (!isFollowingThisRule(rule, newUpdate)) {
        newUpdate = fixUpdateBasedOnRule(rule, newUpdate);
      }
    });
  }
  return newUpdate;
};

const fixUpdateBasedOnRule = (rule, update) => {
  const index1 = update.indexOf(rule[0]);
  const index2 = update.indexOf(rule[1]);
  return swap(update, index1, index2);
};

const swap = (array, index1, index2) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
  return array;
};

const part1 = () => {
  const [rules, updates] = turnInputToArray(input);
  let numberArray = [];
  updates.forEach((x) => {
    if (isFollowingRules(rules, x)) {
      numberArray.push(parseInt(x[(x.length - 1) / 2]));
    }
  });
  console.log(numberArray);
  console.log(numberArray.reduce((a, b) => a + b, 0));
};

const part2 = () => {
  const [rules, updates] = turnInputToArray(input);
  let incorrectNumberArray = [];
  updates.forEach((x) => {
    if (!isFollowingRules(rules, x)) {
      incorrectNumberArray.push(x);
    }
  });
  const fixedArray = incorrectNumberArray.map((x) => {
    return fixTheUpdate(rules, x);
  });
  const numberArray = fixedArray.map((x) => {
    return parseInt(x[(x.length - 1) / 2]);
  });
  console.log(numberArray.reduce((a, b) => a + b, 0));
};

part1();
part2();
