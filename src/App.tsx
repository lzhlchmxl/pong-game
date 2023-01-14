import { useState } from "react";
import Canvas from "./Canvas";

function App() {

  class player {
    width: number;
    height: number;
    color: string;
    x: number;
    y: number;
    moveUp: boolean;
    moveDown: boolean;
    score: number;

    constructor(width: number, height: number, color:string, x: number, y: number, moveUp: boolean, moveDown: boolean, score: number) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.moveUp = moveUp;
      this.moveDown = moveDown;
      this.score = score;
    }
  }

  class ball {
    width: number;
    height: number;
    color: string;
    x: number;
    y: number;
    xSpeed: number;
    ySpeed: number;

    constructor(width: number, height: number, color:string, x: number, y: number, xSpeed: number, ySpeed: number) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.x = x;
      this.y = y;
      this.xSpeed = xSpeed;
      this.ySpeed = ySpeed;
    }
  }
 
  const p1 = new player(10, 100, "red", 20, 150, false, false, 0);
  const p2 = new player(10, 100, "blue", 770, 150, false, false, 0);
  
  const initialX = (Math.random() > 0.5 ? 1 : -1) * (3 + Math.floor(Math.random()*2));
  const initialY = (Math.random() > 0.5 ? 1 : -1) * Math.sqrt(25 - initialX^2);
  const b = new ball(10, 10, "white", 395, 195, initialX, initialY);

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
      p1.moveUp = true;
      break;
      case "ArrowDown":
      p1.moveDown = true;
      break;
      case "w":
      p2.moveUp = true;
      break;
      case "s":
      p2.moveDown = true;
      break;
    }
  })
  document.addEventListener('keyup', (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
      p1.moveUp = false;
      break;
      case "ArrowDown":
      p1.moveDown = false;
      break;
      case "w":
      p2.moveUp = false;
      break;
      case "s":
      p2.moveDown = false;
      break;
    }
  })

  const [scores, setScores] = useState({p1: 0, p2: 0});

  const draw = (ctx: CanvasRenderingContext2D) => {
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (p1.moveUp && p1.y > 0) {
      p1.y-=4;
    }

    if (p1.moveDown && p1.y < (ctx.canvas.height - p1.height)) {
      p1.y+=4;
    }
    if (p2.moveUp && p2.y > 0) {
      p2.y-=4;
    }

    if (p2.moveDown && p2.y < (ctx.canvas.height - p2.height)) {
      p2.y+=4;
    }

    // ball hits top or bottom edge
    if (b.y <= 0 || b.y >= (ctx.canvas.height - b.height)) {
      b.ySpeed = 0 - b.ySpeed;
    }

    // ball hits left or right edge
    if (b.x <= 0 || b.x >= (ctx.canvas.width - b.width)) {
      b.xSpeed = 0 - b.xSpeed;
      if (b.x <= 0) {
        setScores({...scores, p2: scores.p2+1});
      } else {
        setScores({...scores, p1: scores.p1+1});
      }
    }

    // ball hits left paddle 
    if ((b.x <= p1.x + p1.width) 
        && (
          (b.y >= p1.y) && (b.y + b.height <= p1.y + p1.height)
          )
        ) {
          b.xSpeed = 0 - b.xSpeed;
    }

    // ball hits right paddle 
    if ((b.x + b.width >= p2.x) 
        && (
          (b.y >= p2.y) && (b.y + b.height <= p2.y + p2.height)
          )
        ) {
          b.xSpeed = 0 - b.xSpeed;
    }

    b.y += b.ySpeed;
    b.x += b.xSpeed;

    ctx.fillStyle = p1.color;
    ctx.fillRect(p1.x, p1.y, p1.width, p1.height);

    ctx.fillStyle = p2.color;
    ctx.fillRect(p2.x, p2.y, p2.width, p2.height);

    ctx.fillStyle = b.color;
    ctx.fillRect(b.x, b.y, b.width, b.height);
  }; 

  return (
    <div className="relative text-gray-200 font-bold flex justify-center">
      <div className="absolute top-5">{scores.p1} : {scores.p2}</div>
      <Canvas draw={draw} height={400} width={800} />
    </div>
  );
}

export default App;
