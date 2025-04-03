import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";
import * as dat from "dat.gui";
import gsap from "gsap";


import brush from "/burash.png";
import texture from "/texture/6.jpg";
class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.scene1 = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor("#111", 1);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.appendChild(this.renderer.domElement);

    this.baseTexture = new THREE.WebGLRenderTarget(
      this.width,this.height, {
        minFilter : THREE.LinearFilter,
        migFilter : THREE.LinearFilter,
        format : THREE.RGBAFormat
      }
    )

    var frustumSize = this.height;
    var aspect = this.width / this.height;
    this.camera = new THREE.OrthographicCamera(
      frustumSize * aspect / - 2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      frustumSize / - 2,
      -1000,
      1000
    )
    this.camera.position.set(0, 0, 2);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.time = 0;
    this.isPlaying = true;
    this.mouse = new THREE.Vector2(0,0);
    this.prevMouse = new THREE.Vector2(0,0);
    this.currentWave = 0;

    this.addObjects();
    this.mouseEvent();
    this.resize();
    this.render();
    this.setupResize();
    this.settings();
  }

  mouseEvent() {

    window.addEventListener("mousemove", (e)=>{
       this.mouse.x = e.clientX - this.width/2;
       this.mouse.y = this.height/2 - e.clientY;
    })
  }

  addObjects() {

    this.imgGeo = new THREE.PlaneGeometry(this.width, this.height, 50,50);
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        uDisplacement : {value : 0},
        uTexture : {value :  new THREE.TextureLoader().load(texture)},
        resolution: { type: "v4", value: new THREE.Vector4() },
        uvRate1: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });


    this.max = 100;
    this.geometry = new THREE.PlaneGeometry(50,50 );
    this.meshes = []
    for(let i=0 ; i< this.max ; i++) {
      let m = new THREE.MeshBasicMaterial({
        map : new THREE.TextureLoader().load(brush),
        transparent: true,
        blending : THREE.AdditiveBlending,
        depthTest : false,
        depthWrite : false
      });
      let mesh = new THREE.Mesh(
        this.geometry , m
      )
      mesh.visible= false
      mesh.rotation.z = 2 * Math.PI * Math.random();
      this.scene.add(mesh);
      this.meshes.push(mesh)
    }
    
    
    this.plain = new THREE.Mesh(this.imgGeo, this.material);
    this.scene1.add(this.plain);
  }

  settings() {
    this.settings = {
        howmuchrgb: 1,
    };
    this.gui = new dat.GUI();
    this.gui.add(this.settings, "howmuchrgb", 0, 1, 0.01);
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  stop() {
    this.isPlaying = false;
  }

  play() {
    if (!this.isPlaying) {
      this.render();
      this.isPlaying = true;
    }
  }

  setNewWave(x,y,index) {
    let mesh = this.meshes[index];
    mesh.visible = true;
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.material.opacity = 0.5;
    mesh.scale.x = mesh.scale.y = 0.2
  }

  trackMousePos() {
    if(Math.abs(this.mouse.x - this.prevMouse.x) < 4 && Math.abs(this.mouse.y - this.prevMouse.y) < 4) {
      //nothing
    }else {
      this.setNewWave(this.mouse.x,this.mouse.y,this.currentWave)
      this.currentWave = (this.currentWave + 1) % this.max;
      console.log(this.currentWave)
    }
    this.prevMouse.x = this.mouse.x;
    this.prevMouse.y = this.mouse.y;

   }

  render() {
    this.trackMousePos();
    if (!this.isPlaying) return;
    this.time += 0.001;
    this.material.uniforms.time.value = this.time;   
   this.renderer.setRenderTarget(this.baseTexture);
   this.renderer.render(this.scene, this.camera);
   this.material.uniforms.uDisplacement.value = this.baseTexture.texture
   this.renderer.setRenderTarget(null);
   this.renderer.clear();
   this.renderer.render(this.scene1, this.camera);
   
   
    this.meshes.forEach((mesh)=>{
      if(mesh.visible) {
        mesh.rotation.z += 0.02;
        mesh.material.opacity *= 0.96
        mesh.scale.x = 0.982 * mesh.scale.x+ 0.2;
        mesh.scale.y = mesh.scale.x
        if(mesh.material.opacity < 0.002) { mesh.visible = false}
      }
    })
    requestAnimationFrame(this.render.bind(this));
  }
}


new Sketch({
  dom: document.querySelector(".canvas"),
});
