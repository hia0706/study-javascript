const $input = document.querySelector("#input");
const $form = document.querySelector("#form");
const $logs = document.querySelector("logs");

const numbers = []; // [1, 2, 3, 4, 5, 6, 7, 8, 9]
for (let n = 0; n <= 9; n++) {
  numbers.push(n + 1);
}

const answer = [];
for (let n = 0; n < 4; n++) { // 네 번 반복
  const index = Math.floor(Math.random() * (numbers.length));
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}
console.log(answer);
