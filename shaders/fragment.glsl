precision highp float;
precision highp int;

uniform float uTime;
uniform vec4 res;
uniform sampler2D uWater;
uniform sampler2D tFlow;
varying vec2 vUv;
uniform vec2 uSize;
uniform vec2 uBox;

vec2 cover(vec2 uv, vec2 uTextureSize, vec2 uPlaneResolution) {
    vec2 tempUV = uv - vec2(0.5);

    float planeAspect = uPlaneResolution.x / uPlaneResolution.y;
    float textureAspect = uTextureSize.x / uTextureSize.y;

    if (planeAspect < textureAspect) {
        tempUV = tempUV * vec2(planeAspect / textureAspect, 1.0);
    } else {
        tempUV = tempUV * vec2(1.0, textureAspect / planeAspect);
    }

    tempUV += 0.5;
    return tempUV;
}

void main() {
   vec2 uv = cover(vUv, uSize, uBox);
  vec3 flow = texture2D(tFlow, uv).rgb;
  vec2 myUV = uv - flow.xy * 0.3;
  vec3 tex = texture2D(uWater, myUV).rgb;
  gl_FragColor = vec4(tex, 1.0);
}