// Type declarations for GLSL imports
declare module "*.glsl" {
  const content: string;
  export default content;
}

declare module "*.vert" {
  const content: string;
  export default content;
}

declare module "*.frag" {
  const content: string;
  export default content;
}

// Global p5 instance type
import type p5 from "p5";

declare global {
  interface Window {
    p5: typeof p5;
  }
}
