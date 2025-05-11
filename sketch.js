let theShader;
let mic, amp;

function preload() {
  theShader = loadShader("shader.vert", "shader.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // Audio input setup
  mic = new p5.AudioIn();
  mic.start();

  amp = new p5.Amplitude();
  amp.setInput(mic);
}

function draw() {
  shader(theShader);

  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("u_time", millis() / 1000.0);
  theShader.setUniform("u_amp", amp.getLevel());

  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
