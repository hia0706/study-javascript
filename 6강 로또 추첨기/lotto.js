const $form = document.querySelector("#form");
const $result = document.querySelector("#result");
const $bonus = document.querySelector("#bonus");

// 당첨 번호 함수
function drawBall($target, value) {
  const $ball = document.createElement("div");
  $ball.className = 'ball';
  $ball.textContent = value;
  $target.appendChild($ball);
}

const setTimeoutPromise = (ms) => new Promise((resolve, reject) => {
  setTimeout(resolve, ms);
})

async function handdleSubmit(e) {
  e.preventDefault();
  // 검사
  const string = e.target.input.value; // '1,2,3,4,5,6'
  if (!string.trim()) {
    return alert('숫자를 입력하세요');
  }
  const myNumbers = string.split(',').map((v) => parseInt(v.trim()));
  // [1,2,3,4,5,6]
  if (myNumbers.length !== 6) {
    return alert('숫자를 6개를 입력하세요.');
  }
  if (new Set(myNumbers).size !== 6) {
    return alert('중복된 숫자를 입력했습니다.');
  }
  if (myNumbers.find((v) => v > 45 || v < 1)) {
    return alert('1부터 45까지 입력할 수 있습니다.');
  }
  const lottoNumber = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (lottoNumber.length) {
    const random = Math.floor(Math.random() * lottoNumber.length); // 무작위 인덱스 뽑기
    const spliceArray = lottoNumber.splice(random, 1); // 뽑은 값 새로운 배열에 저장
    const value = spliceArray[0]; // 새로운 배열에 들어 있는 값 꺼내기
    shuffle.push(value); // 꺼낸 값을 shuffle 배열에 넣기
  }
  console.log(shuffle);
  const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
  const bonus = shuffle[6];
  console.log(winBalls, bonus);
  // 당첨 번호 타이머
  for (let i = 0; i < winBalls.length; i++) {
    await setTimeoutPromise(1000);
    drawBall($result, winBalls[i]);
  }
  await setTimeoutPromise(1000);
  drawBall($bonus, bonus);
}

$form.addEventListener("submit", handdleSubmit);