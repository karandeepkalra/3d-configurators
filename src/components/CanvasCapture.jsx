// src/components/CanvasCapture.js
import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

function CanvasCapture() {
  const { gl, scene, camera } = useThree();
  
  useEffect(() => {
    gl.captureFrame = () => {
      gl.render(scene, camera);
      return gl.domElement.toDataURL('image/png');
    };
  }, [gl, scene, camera]);
  
  return null;
}

export default CanvasCapture;