#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_amp;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    float r = 0.5 + 0.5 * sin(u_time + st.x * 10.0 + u_amp * 5.0);
    float g = 0.5 + 0.5 * sin(u_time + st.y * 10.0 + u_amp * 10.0);
    float b = 0.5 + 0.5 * sin(u_time + (st.x + st.y) * 10.0);
    gl_FragColor = vec4(r, g, b, 1.0);
}
