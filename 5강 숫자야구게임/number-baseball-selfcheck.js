const $input = document.querySelector("#input");
const $form = document.querySelector("#form");
const $logs = document.querySelector("#logs");

const numbers = []; // [1, 2, 3, 4, 5, 6, 7, 8, 9]
for (let n = 0; n < 9; n++) {
  numbers.push(n + 1);
}

const answer = [];
for (let n = 0; n < 4; n++) { // 네 번 반복
  const index = Math.floor(Math.random() * (numbers.length));
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}
console.log(answer);

const tries = [];

function checkInput(input) { // 검사하는 코드
  if (input.length !== 4) { // 길이가 4가 맞는지?
    return alert('4자리 숫자를 입력해주세요.');
  }
  if (new Set(input).size !== 4) { // 중복 값이 있는지?
    return alert('중복되지 않게 입력해주세요.');
  }
  if (tries.includes(input)) { // 이미 시도한 값은 아닌지?
    return alert('이미 시도한 값입니다.');
  }
  return true;
}

// 실패 함수
function defited() {
  $logs.appendChild(document.createTextNode(`패배! 정답은 ${answer.join('')}`));
  $form.removeEventListener("submit", handleSubmit);
}

let out = 0;
function handdleSubmit(e) {
  e.preventDefault();
  const value = $input.value;
  $input.value = '';
  // 오류 발생
  if (!checkInput(value)) {
    return;
  }
  // 문제 없음
  if (answer.join('') === value) { // [3, 1, 4, 6] -> '3146' 으로 변환 # join() : 배열을 문자열로 변환하는 함수
    $logs.textContent = '홈런!';
    return;
  }
  if (tries.length >= 9) {
    defited();
    return;
  }
  // 몇 볼 몇 스트라이크인지 검사
  let strike = 0;
  let ball = 0;
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);
    if (index > -1) { // 일치하는 숫자 발견
      if (index === i) { // 자릿수 같을 때
        strike += 1;
      } else { // 숫자만 같을 때
        ball += 1;
      }
    }
  }
  if (strike === 0 && ball === 0) {
    out++;
    $logs.append(`${value}: 아웃`, document.createElement('br'));
  } else {
    $logs.append(`${value}: ${strike} 스트라이크 ${ball} 볼`, document.createElement('br'));
  }
  if (out === 3) {
    defited();
    return;
  }
  tries.push(value);
}

$form.addEventListener("submit", handdleSubmit);