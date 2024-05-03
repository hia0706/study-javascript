const $form = document.querySelector("#form");
const $result = document.querySelector("#result");
const $bonus = document.querySelector("#bonus");

// 당첨 번호 함수
function drawBall($target, value) {
  const $ball = document.createElement("div");
  $ball.className = 'ball';
  $ball.textContent = value;
  $target.appendChild($ball);

  ballColor($ball, value);
}

function ballColor($target, value) {
  if (value < 10) { // red , white
    $target.style.backgroundColor = 'red';
    $target.style.color = 'white';
  } else if (value < 20) { // orange
    $target.style.backgroundColor = 'orange';
  } else if (value < 30) { // yello
    $target.style.backgroundColor = 'yellow';
  } else if (value < 40) { // blue , white
    $target.style.backgroundColor = 'blue';
    $target.style.color = 'white';
  } else if (value >= 40) { // green , white
    $target.style.backgroundColor = 'red';
    $target.style.color = 'white';
  }
}

const setTimeoutPromise = (ms) => new Promise((resolve, reject) => {
  setTimeout(resolve, ms);
});

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

  // alert -> 보너스 숫자 버그 해결
  await setTimeoutPromise(0);

  // 등 수 표시
  let count = 0;
  myNumbers.forEach((my) => {
    if (winBalls.includes(my)) {
      count++;
    }
  });
  if (count === 6) {
    alert('1등! 로또 당첨 축하드립니다!');
  } else if (count === 5) {
    if (myNumbers.includes(bonus)) {
      alert('2등! 비록 보너스 공이지만 6개를 맞추셨네요!');
    } else {
    alert('3등! 아쉽지만 축하드립니다!');
    }
  } else if (count === 4) {
    alert('4등! 5만원! 축하드립니다.');
  } else if (count === 3) {
    alert('5등! 5천원! 다음 기회를 노리세요!');
  } else {
    alert('아쉽지만 꽝이에요. 운이 없었네요');
  }

}

$form.addEventListener("submit", handdleSubmit);