const btnShow = document.querySelector('#rule-btn');
const btnHide = document.querySelector('#close-btn');
const showRule = document.querySelector('#rule');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowCount = 5;
const brickColumnCount = 9;

// Create ball prop
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
};

// Create paddle prop
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0
};

// Create bricks prop
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  left: 45,
  top: 60,
  visible: true
};

/*
Túm cái quần lại là mình phải làm sao cho tạo ra cái [[{}, {}, {}, {}, {}, {}, {}, {}, {}], [9], [9], [9], [9]]
Tại mỗi arr nhỏ sẽ gồm 9 obj mỗi obj sẽ chứa thông tin để tạo 1 cái brick gồm vị trí offsetLeft, offsetTop
Phải làm sao cho arr nhỏ 1 mỗi brick sẽ có offsetLeft thay đổi theo vị trí ta muốn, nhưng offsetTop ko đổi
------------------------ 2 offsetLeft thay đổi --------------------, nhưng offsetTop ko đổi
-------------------------5 ----------------------------------------------------------------
Mặc dù cố định trong mỗi array, Nhưng sau mỗi lần loop qua 1 array nhỏ thì offsetTop sẽ thay đổi theo vị trí ta muốn 
*/
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const fromLeft = j * (brickInfo.w + brickInfo.padding) + brickInfo.left;
    const fromTop = i * (brickInfo.h + brickInfo.padding) + brickInfo.top;
    bricks[i][j] = { fromLeft, fromTop, ...brickInfo };
  }
}

// Draw bricks on canvas
function drawBricks() {
  bricks.forEach(row =>
    row.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.fromLeft, brick.fromTop, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    })
  );
}

// Draw a ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Draw a paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Draw score
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  // Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision (right/left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // ball.dx  = ball.dx -1
  }
  //  Wall collision (top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }
  // Paddle collision
  if (
    // ball.x - ball.size > paddle.x &&
    ball.x > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }
  // Brick collision
  bricks.forEach(row => {
    row.forEach(brick => {
      if (brick.visible) {
        if (
          //hehe cái này tạm thời chưa thông để đó trước rãnh coi lại sau tập trung vào hiệu quả
          // ko hiểu tại sao nó lại trừ cho ball size thiệt tình
          // ball.x - ball.size > brick.fromLeft && //left brick side
          ball.x > brick.fromLeft &&
          ball.x + ball.size < brick.fromLeft + brick.w && // right brick side
          ball.y + ball.size > brick.fromTop && // top brick side
          // ball.y - ball.size < brick.fromTop + brick.h // bottom brickside
          ball.y < brick.fromTop + brick.h
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });

  // Hit bottom wall - Lose
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

// Increase score
function increaseScore() {
  score++;
  if (score % (brickColumnCount * brickRowCount) === 0) {
    showAllBricks();
  }
}

// Make all bricks appear
function showAllBricks() {
  bricks.forEach(row => row.forEach(brick => (brick.visible = true)));
  drawNewGame();
}

// drawNewGame
function drawNewGame() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

// Draw everything
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// Update canvas drawing and animation
function update() {
  movePaddle();
  moveBall();

  // Draw everything
  draw();

  requestAnimationFrame(update);
}

update();

function keyDown(e) {
  if (e.key === 'ArrowRight' || e.key === 'Right') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
    paddle.dx = -paddle.speed;
  }
}
function keyUp(e) {
  if (
    e.key === 'ArrowRight' ||
    e.key === 'Right' ||
    e.key === 'ArrowLeft' ||
    e.key === 'Left'
  ) {
    paddle.dx = 0;
  }
}

// Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Show Rules and close event handlers
btnShow.addEventListener('click', function() {
  showRule.classList.add('show');
});
btnHide.addEventListener('click', function() {
  showRule.classList.remove('show');
});
