import React from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BoxGeometry, DoubleSide, MeshBasicMaterial, TextureLoader } from "three";

const Card = () => {
  const textureLoader = new TextureLoader();
  const textureFront = textureLoader.load("/static/images/card-1.png");
  const textureBack = textureLoader.load("/static/images/card-2.png"); // 사용자가 작성한 편지 이미지?
  const geometry = new BoxGeometry(0.8 * 3, 1.4 * 3, 0.1);
  const materials = [
    new MeshBasicMaterial({ color: "white" }),
    new MeshBasicMaterial({ color: "white" }),
    new MeshBasicMaterial({ color: "white" }),
    new MeshBasicMaterial({ color: "white" }),
    new MeshBasicMaterial({ side: DoubleSide, map: textureFront }),
    new MeshBasicMaterial({ side: DoubleSide, map: textureBack }),
  ];

  return <mesh geometry={geometry} material={materials}></mesh>;
};

function CardRotator() {
  return (
    <Wrapper>
      <Canvas>
        <OrbitControls autoRotate={true} enableRotate={true} enableZoom={false} enablePan={false} rotateSpeed={2.0} />
        <ambientLight intensity={1} />
        <Card />
      </Canvas>
    </Wrapper>
  );
}

export default CardRotator;

const Wrapper = styled.div`
  width: 100%;
  height: 60vh;
  z-index: 1;
`;
