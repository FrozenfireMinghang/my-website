// 背景 canvas 气泡 + 渐变绘制
const canvas = document.getElementById("bubbles");
const ctx = canvas.getContext("2d");
let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const bubbles = Array.from({ length: 50 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 8 + 2,
  speed: Math.random() * 1 + 0.5
}));

function draw() {
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, '#a2eafc');
  gradient.addColorStop(1, '#61d4b3');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "rgba(255,255,255,0.3)";
  for (const b of bubbles) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
    b.y -= b.speed;
    if (b.y < -10) {
      b.y = h + 10;
      b.x = Math.random() * w;
    }
  }
  requestAnimationFrame(draw);
}
draw();

// 点击水波纹
document.addEventListener("click", function(e) {
  const ripple = document.createElement("div");
  ripple.className = "ripple";
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1000);
});
