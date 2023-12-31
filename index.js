let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

class VerticalText {
  constructor(font, fontSize, text, x, y) {
    this.font = fontSize + 'px  ' + font;
    this.text = text;
    this.x = x;
    this.y = y;
    this.lineHeight = fontSize;
    this.gravity = 0.9;
    this.speed = 4 * this.gravity;
    this.color = "lime"; // Change text color to green
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = -this.text.length * this.lineHeight;
    }
  }

  drawVerticalText() {
    ctx.font = this.font;
    ctx.fillStyle = this.color; // Set text color
    for (let i = 0; i < this.text.length; i++) {
      ctx.fillText(this.text[i], this.x, this.y + i * this.lineHeight);
    }
  }
}

const texts = [
  new VerticalText('monospace', 10, '2024', 0, 60),
  new VerticalText('monospace', 18, 'New year', 25, 0),
  new VerticalText('monospace', 34, '2024', 60, 0),
  new VerticalText('monospace', 34, 'Zambia', 100, 0),
  new VerticalText('monospace', 10, 'Dev', 140, 0),
  new VerticalText('monospace', 20, 'superninjaX2', 180, 0),
  new VerticalText('monospace', 50, 'HOPE', 220, 0),
  new VerticalText('monospace', 10, 'Happy', 260, 0),
  new VerticalText('monospace', 20, '2024', 280, 0),
  new VerticalText('monospace', 10, 'hell yah i hate 2023', 320, 0),
];

class HugeText {
  constructor() {
    this.color = "#fff";
    this.font = "40px Monospace"; // Fix the font format
    this.text = "2024";
    this.x = 20;
    this.y = canvas.height / 2;
    this.index = 0;
    this.typingSpeed = 50; // Adjust the typing speed
    this.partialText = "";
  }

  update() {
    if (this.index < this.text.length) {
      this.partialText += this.text.charAt(this.index);
      this.index++;
    } else {
      // Reset the animation when it completes
      this.index = 0;
      this.partialText = "";
    }
  }

  draw() {
    ctx.font = this.font;
    ctx.fillStyle = this.color;

    // Center the text vertically
    const textWidth = ctx.measureText(this.partialText).width;
    const centerX = (canvas.width - textWidth) / 2;

    ctx.fillText(this.partialText, centerX, this.y);
  }
}

const hugeText = new HugeText();

function loop() {
  ctx.fillStyle = "black"; // Set background color to black
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const text of texts) {
    text.update();
    text.drawVerticalText();
  }

  hugeText.update();
  hugeText.draw();

  requestAnimationFrame(loop);
}

loop();
