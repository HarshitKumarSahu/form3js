import { Renderer, Vec2, Vec4, Geometry, Texture, Program, Mesh, Flowmap } from "./src/index.js";
import fragmentShader from "./shaders/fragment.glsl"; // Ensure file exists as fragment.glsl
import vertexShader from "./shaders/vertex.glsl";

const windowWidth = window.innerWidth;

if(windowWidth >= 600) {
  const _size = [5000, 5500];
const container = document.querySelector(".main");

container.querySelectorAll(".img").forEach((imgElement) => {
  const renderer = new Renderer({ dpr: 2 });
  const gl = renderer.gl;
  imgElement.appendChild(gl.canvas); // Append WebGL canvas to the <div class="img">

  const originalImg = imgElement.querySelector("img");  
  originalImg.style.display = "none";

  let aspect = 1;
  const mouse = new Vec2(-1);
  const velocity = new Vec2();

  function resize() {
    const rect = imgElement.getBoundingClientRect();
    gl.canvas.width = rect.width * 2.0;
    gl.canvas.height = rect.height * 2.0;
    gl.canvas.style.width = `${rect.width}px`;
    gl.canvas.style.height = `${rect.height}px`;

    const imageAspect = _size[0] / _size[1];
    const canvasAspect = rect.width / rect.height;
    let a1, a2;
    if (canvasAspect > imageAspect) {
      a1 = imageAspect / canvasAspect;
      a2 = 1.0;
    } else {
      a1 = 1.0;
      a2 = canvasAspect / imageAspect;
    }

    mesh.program.uniforms.res.value = new Vec4(rect.width, rect.height, a1, a2);
    renderer.setSize(rect.width, rect.height);
    aspect = rect.width / rect.height;
  }

  const flowMap = new Flowmap(gl, {
    falloff: 0.3,
    dissipation: 0.92,
    alpha: 0.5,
  });


  const geometry = new Geometry(gl, {
    position: {
      size: 2,
      data: new Float32Array([-1, -1, 3, -1, -1, 3]),
    },
    uv: {
      size: 2,
      data: new Float32Array([0, 0, 2, 0, 0, 2]),
    },
  });

  const texture = new Texture(gl, {
    minFilter: gl.LINEAR,
    magFilter: gl.LINEAR,
  });
  texture.image = originalImg;

  const program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uWater: { value: texture },
      res: { value: new Vec4(window.innerWidth, window.innerHeight, 1, 1) },
      tFlow: flowMap.uniform,
    },
  });

  const mesh = new Mesh(gl, { geometry, program });

  window.addEventListener("resize", resize, false);
  resize();

  const isTouchCapable = "ontouchstart" in window;
  if (isTouchCapable) {
    imgElement.addEventListener("touchstart", updateMouse, false);
    imgElement.addEventListener("touchmove", updateMouse, { passive: false });
  } else {
    imgElement.addEventListener("mousemove", updateMouse, false);
  }

  let lastTime;
  const lastMouse = new Vec2();
  function updateMouse(e) {
    e.preventDefault();
    const rect = imgElement.getBoundingClientRect();
    let x, y;

    if (e.changedTouches && e.changedTouches.length) {
      x = e.changedTouches[0].pageX - rect.left;
      y = e.changedTouches[0].pageY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    mouse.set(x / rect.width, 1.0 - y / rect.height);

    if (!lastTime) {
      lastTime = performance.now();
      lastMouse.set(x, y);
    }
    const deltaX = x - lastMouse.x;
    const deltaY = y - lastMouse.y;

    lastMouse.set(x, y); // Fixed from lastMouse(x, y)

    const time = performance.now();
    const delta = Math.max(10.4, time - lastTime);
    lastTime = time;
    velocity.x = deltaX / delta;
    velocity.y = deltaY / delta;
    velocity.needsUpdate = true;
  }

  function update(t) {
    requestAnimationFrame(update);
    if (!velocity.needsUpdate) {
      mouse.set(-1);
      velocity.set(0);
    }
    velocity.needsUpdate = false;

    flowMap.mouse.copy(mouse);
    flowMap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1);
    flowMap.update();

    program.uniforms.uTime.value = t * 0.01;
    renderer.render({ scene: mesh });
  }
  requestAnimationFrame(update);
});
}
