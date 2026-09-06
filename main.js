const WIDTH = Math.max(screen.width, screen.height);
const HEIGHT = Math.min(screen.width, screen.height);

const cnv = document.createElement("canvas");
const ctx = cnv.getContext("2d");

cnv.width = WIDTH;
cnv.height = HEIGHT;

cnv.style.position = "absolute";
cnv.style.left = "0px";
cnv.style.top = "0px";

ctx.font = "50px bold Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

document.body.appendChild(cnv);

ctx.fillStyle = "#000000";

ctx.fillText("hello world", 50, 50);
/*

const WIDTH = Math.max(screen.width, screen.height);
const HEIGHT = Math.min(screen.width, screen.height);

class Ball {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.r = 10;
		this.d = this.r * 2;

		this.velX = Math.random() * 2 - 1;
		this.velY = 0;
		this.accY = 1;

		this.red = Math.floor(Math.random() * 255); 
		this.green = Math.floor(Math.random() * 255); 
		this.blue = Math.floor(Math.random() * 255); 
		this.alpha = Math.random() * 0.5 + 0.5;

		this.color = "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
	}

	toDelete(boxes) {
		const y = boxes[0].y + boxes[0].h2 / 2;
		const w2 = boxes[0].w2;
		const xl = this.x - this.r;
		const xr = this.x + this.r;

		if (this.y > HEIGHT) return "off";

		for (let box of boxes) {
			if (this.y > y && xl > box.x - w2 && xr < box.x + w2) {
				return "caught";
			}
		}

		return "valid";
	}

	update() {
		this.x += this.velX;

		this.y += this.velY;
		this.velY += this.accY;
	}

	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.r, this.y - this.r, this.d, this.d);
	}
}

class Box {
	constructor(x, note) {
		this.note = note;

		this.x = x;
		this.y = 500;
		this.w = 100;
		this.w2 = this.w / 2;
		this.h = 125;
		this.h2 = this.h / 2;
	}

	draw(ctx) {
		ctx.strokeStyle = "#ff0000";

		ctx.beginPath();
		ctx.moveTo(this.x + this.w2, this.y - this.h2);
		ctx.lineTo(this.x + this.w2, this.y + this.h2);
		ctx.lineTo(this.x - this.w2, this.y + this.h2);
		ctx.lineTo(this.x - this.w2, this.y - this.h2);

		ctx.stroke();

		ctx.fillStyle = "#ff0000";
		ctx.fillText(this.note, this.x, this.y);
	}
}

const balls = [];

const cnv = document.createElement("canvas");
const ctx = cnv.getContext("2d");

cnv.width = WIDTH;
cnv.height = HEIGHT;

cnv.style.position = "absolute";
cnv.style.left = "0px";
cnv.style.top = "0px";

ctx.font = "50px bold Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

document.body.appendChild(cnv);

let frequency = -1;
let pitch = -1;

let score = 0;

const boxes = [];

boxes[0] = new Box(WIDTH / 6, "C");
boxes[1] = new Box(WIDTH / 6 * 2, "D");
boxes[2] = new Box(WIDTH / 6 * 3, "E");
boxes[3] = new Box(WIDTH / 6 * 3.5, "F");
boxes[4] = new Box(WIDTH / 6 * 4.5, "G");

let ID;
const loop = () => {
	ID = requestAnimationFrame(loop);

	if (ID % 2 == 0) {
		if (pitch != -1) {
			const x = (pitch - 58) * WIDTH / 12;
			balls.push(new Ball(x, 50));
		};
	}

	for (let i = balls.length - 1; i >= 0; i--) {
		const destiny = balls[i].toDelete(boxes);

		if (destiny == "off") {
			balls.splice(i, 1);
		} else if (destiny == "caught") {
			balls.splice(i, 1);
			score++;
		}
	}

	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	for (let box of boxes) {
		box.draw(ctx);
	}

	for (let ball of balls) {
		ball.update();
		ball.draw(ctx);
	}

	ctx.fillStyle = "#ffffff";
	ctx.fillText(score, WIDTH / 2, HEIGHT * 0.8);
}

const startMic = async () => {
	const stream = await navigator.mediaDevices.getUserMedia({audio: true});
	const audioCtx = new AudioContext();
	const sampleRate = audioCtx.sampleRate;
	const source = audioCtx.createMediaStreamSource(stream);

	await audioCtx.audioWorklet.addModule("audio_worklet.js");

	const workletNode = new AudioWorkletNode(audioCtx, "audio_worklet");

	workletNode.port.onmessage = (event) => {
		frequency = event.data;
		pitch = frequency == -1 ? -1 : 12 * Math.log2(frequency / 440) + 69;
	}

	source.connect(workletNode);

	console.log("Mic caricato");
}


let started = false;
window.addEventListener("click", async () => {
    if (started) return;
    started = true;

    try {
        await startMic();

        if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
        }

        loop();
    } catch (err) {
		ctx.fillStyle = "#000000";
        ctx.fillText(err, 0, 0);
        started = false;
    }
});

*/
