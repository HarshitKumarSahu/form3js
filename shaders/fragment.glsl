// precision highp float;
// precision highp int;

// uniform float uTime;
// uniform vec4 res;
// uniform sampler2D tWater;
// uniform sampler2D tFlow;
// varying vec2 vUv;

// void main() {
//   vec3 flow = texture2D(tFlow, vUv).rgb;

//   vec2 myUV = vUv - flow.xy * 0.3;

//   vec3 tex = texture2D(tWater, myUV).rgb;

//   gl_FragColor = vec4(tex, 1.);
// }

precision highp float;
precision highp int;

uniform float uTime;
uniform vec4 res;
uniform sampler2D uWater;
uniform sampler2D tFlow;
varying vec2 vUv;

void main() {
  vec3 flow = texture2D(tFlow, vUv).rgb;
  vec2 myUV = vUv - flow.xy * 0.3;
  vec3 tex = texture2D(uWater, myUV).rgb;
  gl_FragColor = vec4(tex, 1.0);
}