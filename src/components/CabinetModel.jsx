// src/components/CabinetModel.js
import React, { useState, useEffect, Suspense } from 'react';
import { useTexture } from '@react-three/drei';
import TexturedCabinet from './TexturedCabinet';

function CabinetModel({ config, showDimensions, mainRef, handleRef, legRef }) {
  const [appliedTexture, setAppliedTexture] = useState(null);
  const textureMap = useTexture({
    map: config.texture ? `/colors/${config.texture}` : '/colors/Amber.png',
  });

  useEffect(() => {
    setAppliedTexture(textureMap.map);
  }, [config.texture]);

  return (
    <Suspense fallback={null}>
      <TexturedCabinet 
        config={config} 
        showDimensions={showDimensions} 
        mainRef={mainRef}
        handleRef={handleRef}
        legRef={legRef}
      />
    </Suspense>
  );
}

export default CabinetModel;