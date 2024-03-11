import React, { useRef } from "react";
import EarthDayMap from "../../assets/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/8k_earth_normal_map.jpg";
import EarthClouds from "../../assets/8k_earth_clouds.jpg";
/* import EarthNightMap from "../../assets/8k_earth_nightmap.jpg"; */
import EarthSpecularMap from "../../assets/8k_earth_specular_map.jpg";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

const Earth = (props) => {
  const [DayMap, /* NightMap, */ SpecularMap, CloudMap, NormalMap] = useLoader(
    TextureLoader,
    [
      EarthDayMap /* , EarthNightMap */,
      EarthSpecularMap,
      EarthClouds,
      EarthNormalMap,
    ]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsed / 6;
    cloudsRef.current.rotation.y = elapsed / 4;
  });

  return (
    <>
      <ambientLight intensity={2} />
      {/* <pointLight color="#f6f3ea" position={[6, 0, 6]} intensity={70} /> */}
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[3.04, 47, 47]} />
        <meshPhongMaterial
          map={CloudMap}
          opacity={0.5}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef}>
        <sphereGeometry args={[3, 40, 40]} />
        <meshPhongMaterial specularMap={SpecularMap} />
        <meshStandardMaterial
          map={DayMap}
          normalMap={NormalMap}
          metalness={0.4}
          roughness={0.7}
        />
        <OrbitControls enableZoom={false} />
      </mesh>
    </>
  );
};

export default Earth;
