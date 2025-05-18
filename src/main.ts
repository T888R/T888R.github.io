import p5 from "p5";
import { vertexShader, fragmentShader } from "./shaders.ts";

console.log("Shaders loaded successfully");

class ShaderSketch {
  private p5Instance: p5;
  private shader: p5.Shader;
  private startTime: number;

  constructor(p5Instance: p5) {
    this.p5Instance = p5Instance;
    this.startTime = Date.now();
  }

  setup() {
    const p = this.p5Instance;

    // Create canvas
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    console.log("Creating shader...");

    // Create shader
    try {
      this.shader = p.createShader(vertexShader, fragmentShader);
      console.log("Shader created successfully");
    } catch (error) {
      console.error("Error creating shader:", error);
      return;
    }

    // Use the shader
    p.shader(this.shader);

    console.log("Shader setup complete");
  }

  draw() {
    const p = this.p5Instance;

    if (!this.shader) {
      p.background(255, 0, 0); // Red background if shader failed
      return;
    }

    // Calculate time since start
    const elapsed = (Date.now() - this.startTime) / 1000.0;

    // Set shader uniforms
    this.shader.setUniform("u_resolution", [p.width, p.height]);
    this.shader.setUniform("u_mouse", [p.mouseX, p.height - p.mouseY]);
    this.shader.setUniform("u_time", elapsed);

    // Draw a rectangle covering the entire canvas
    p.rect(-p.width / 2, -p.height / 2, p.width, p.height);
  }

  windowResized() {
    const p = this.p5Instance;
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
}

// Create the p5 sketch
const sketch = (p: p5) => {
  let shaderSketch: ShaderSketch;

  p.setup = () => {
    shaderSketch = new ShaderSketch(p);
    shaderSketch.setup();
  };

  p.draw = () => {
    shaderSketch.draw();
  };

  p.windowResized = () => {
    shaderSketch.windowResized();
  };
};

// Initialize p5
// @ts-ignore: Added this to supress error
new p5(sketch, "sketch-container");
