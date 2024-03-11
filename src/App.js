import { Canvas } from "@react-three/fiber";
import "./App.css";
import styled from "styled-components";
import { Suspense } from "react";
import Earth from "./components/Earth/Earth";
import UpperSection from "./components/UpperSection/UpperSection";

const CanvasContainer = styled.div({
  width: "100%",
  height: "100%",
  color: "red",
});
function App() {
  return (
    <CanvasContainer>
      <UpperSection />
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </CanvasContainer>
  );
}

export default App;
