import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import mapSrc from "./imageMap.jpeg";
import depthSrc from "./depthMap.png";
import styled from "styled-components";
import { createRef, useEffect, useState } from "react";
import vertex2 from "./vertex2.glsl";
import frag2 from "./frag2.glsl";

let a = 0;

class World {
  constructor() {
    this.setup();

    this.addObject();
  }

  setContainer(container) {
    this.container = container;
    this.container.appendChild(this.renderer.domElement);
    this.resize();

    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener(
      "deviceorientation",
      this.onDeviceOrientation.bind(this)
    );
  }

  onDeviceOrientation({ alpha, beta, gamma }) {
    const rotatedY =
      //   Math.min(Math.max(parseInt(Math.floor(gamma + 45)), 0), 90) / 90;
      Math.min(Math.max(parseInt(Math.floor(gamma)), -45), 45) / 90;
    const rotatedX =
      Math.min(Math.max(parseInt(Math.floor(beta)), -45), 45) / 90;
    // if (a % 9 === 0) {
    //   //   console.log({ alpha, beta, gamma });
    //   console.log({ rotatedX, rotatedY });
    // }
    // a++;

    // const x = clientX / this.width - 0.5;
    // const y = -clientY / this.height + 0.5;
    this.material.uniforms.uMouse.value.x = rotatedX;
    this.material.uniforms.uMouse.value.y = rotatedY;
    // if (this.material) {
    // //   this.material.uniforms.uMouse.value.y = y;
    // }
  }

  setup() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.camera = new THREE.PerspectiveCamera(65, 2, 0.1, 1000);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.camera.position.z = 50;

    // this.addBlink();
  }

  async load() {
    this.textureLoader = new THREE.TextureLoader();
    let isMap = false;
    let isDepth = false;

    await new Promise((res) => {
      this.textureLoader.load(mapSrc, (texture) => {
        this.material.uniforms.uMap.value = texture;
        isMap = true;
        if (isDepth) {
          res();
        }
      });
      this.textureLoader.load(depthSrc, (texture) => {
        this.material.uniforms.uDepth.value = texture;
        isDepth = true;
        if (isMap) {
          res();
        }
      });
    });
  }

  addObject() {
    this.geometry = new THREE.PlaneGeometry(1, 1);

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uMap: { value: null },
        uDepth: { value: null },
        uMouse: { value: new THREE.Vector2() },
      },
      transparent: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  addBlink() {
    const geometry = new THREE.PlaneGeometry(300, 300);
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex2,
      fragmentShader: frag2,
    });
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.z = 0.1;
    // mesh.rotation.x = -Math.PI / 2;
    this.scene.add(mesh);
  }

  onMouseMove({ clientX, clientY }) {
    const x = clientX / this.width - 0.5;
    const y = -clientY / this.height + 0.5;
    if (this.material) {
      this.material.uniforms.uMouse.value.x = x;
      this.material.uniforms.uMouse.value.y = y;
    }
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    if (this.height > this.width) {
      return;
    }
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.camera.fov =
      (360 / Math.PI) * Math.atan(this.height / (2 * this.camera.position.z));
    if (this.mesh) {
      if (this.width / this.height > 1.784) {
        this.mesh.scale.set(this.width, this.width / 1.784, 1);
      } else {
        this.mesh.scale.set(this.height * 1.784, this.height, 1);
      }
    }

    this.camera.updateProjectionMatrix();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

const world = new World();

export const Experience = ({ setLoaded }) => {
  const ref = createRef();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    world.setContainer(ref.current);
  }, []);

  useEffect(() => {
    const func = async () => {
      await world.load();
      setIsLoaded(true);
      setLoaded(true);
      world.render();
    };
    func();
  }, []);

  return (
    <Wrapper>
      {!isLoaded && <Loader>Loading...</Loader>}
      <Container ref={ref}></Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;
const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
`;

const Loader = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
