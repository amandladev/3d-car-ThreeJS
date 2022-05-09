import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './style.css';
import { Ground } from './Ground';
import { Car } from './Car';
import { Rings } from './Rings';
import { Boxes } from './Boxes';
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing';
import { FloatingGrid } from './FloatingGrid';

function CarShow() {
  return ( 
    <>
    {//Orbit Controls is a component that helps us to control the camera around the fixed points in target.
    //In this case the target it's the center of the scene, but a little higher because 0.35 it's in the Y AXI.
    }
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45}/>
    {//PerspectiveCamera is the camera that we use in this project.
    //FOV(Field of View) is the angle of the camera
    }
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]}/>

    {//let color = new Color(0, 0, 0);
    //This is bascially how to do this ^^ in three js, but we can use it in react too.
    //We also attach this color to the canvas background || canvas.style.backgroundColor = color;
      }
      <color args={[0, 0, 0]} attach="background"/>

    <CubeCamera resolution={256} frames={Infinity}>
      {(texture) => (
        <>
          <Environment map={texture} />
          <Car/>
        </>
      )}
    </CubeCamera>
    
    <Rings />
    <Boxes />
    <FloatingGrid />
    {//let spotlight = new SpotLight();
      //spotlight.intensity = 1.5;
      //spotlight.position.set(5, 5, 0);  ...
      }
      <spotLight 
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight 
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground/>

      <EffectComposer> 
        {
          <>
          <Bloom
            blendFunction={BlendFunction.ADD}
            intensity={1.3}
            width={300}
            height={300}
            kernelSize={5}
            luminanceSmoothing={0.0025}
            liminanceThreshold={0.15} />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={[0.0005, 0.0012]} />
          </>
        }
      </EffectComposer>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
       {// We use Suspense because we want to load the three.js library asynchronously (textures, models, etc).
}
      <Canvas shadows>
        <CarShow/>     
      </Canvas>
    </Suspense>
  );
}

export default App;
