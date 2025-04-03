import React, { useEffect } from 'react';
import { useGLTF, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import Dimension from '../assets/Dimension';
function TexturedCabinet({ config, showDimensions,mainRef, handleRef, legRef } ) {
  
  
  const { scene: cabinetScene } = useGLTF('/main.glb');
  const handlePath = `/handle-${config.handleType}.glb`;
  const { scene: handleScene } = useGLTF(handlePath);
  const legPath = `/leg-${config.legType}.glb`;
  const { scene: legScene } = useGLTF(legPath);
  
  // Always define texture paths, but it might be an empty object
  const texturePaths = {};
  if (config.texture) {
    texturePaths.cabinetTexture = `/colors/${config.texture}`;
  }
  const textureResult = useTexture(texturePaths);
  
  // This runs when the component mounts and whenever the config changes
  useEffect(() => {
    // Deep clone the scenes to avoid modifying the cached originals
    const cabinetClone = cabinetScene.clone(true);
    const handleClone = handleScene.clone(true);
    const legClone = legScene.clone(true);
    
    // Create texture map if texture is specified
    let textureMap = null;
    
    if (config.texture && textureResult.cabinetTexture) {
      textureMap = textureResult.cabinetTexture;
      // Ensure texture is properly configured
      textureMap.encoding = THREE.sRGBEncoding;
      textureMap.wrapS = THREE.RepeatWrapping;
      textureMap.wrapT = THREE.RepeatWrapping;
      
      // Flip the texture vertically by setting a negative Y repeat value
      textureMap.repeat.set(1, -1);
      
      // You may need to offset the texture to maintain proper positioning
      textureMap.offset.set(0, 1);
      
      textureMap.needsUpdate = true;
    }
    
    cabinetClone.traverse((node) => {
      if (node.isMesh) {
        const newMaterial = new THREE.MeshStandardMaterial();
    
        if (node.material) {
          Object.assign(newMaterial, node.material);
        }
    
        // Apply texture to all cabinet parts (update condition as needed)
        if (node.name.includes(node.name) || node.name.includes('frame') || node.name.includes('panel')) {
          if (textureMap) {
            newMaterial.map = textureMap;
            
            // If you need to flip UVs directly at the geometry level
            if (node.geometry && node.geometry.attributes.uv) {
              const uv = node.geometry.attributes.uv;
              for (let i = 0; i < uv.count; i++) {
                // Flip the V coordinate (1 - v)
                uv.array[i * 2 + 1] = 1 - uv.array[i * 2 + 1];
              }
              uv.needsUpdate = true;
            }
            
            newMaterial.needsUpdate = true;
          } else {
            newMaterial.color.set(config.color);
          }
        }
    
        newMaterial.roughness = 0.7;
        newMaterial.metalness = 0.3;
        node.material = newMaterial;
      }
    });
    
    // Update handle materials
    handleClone.traverse((node) => {
      if (node.isMesh) {
        const newMaterial = new THREE.MeshStandardMaterial();
        
        if (node.material) {
          if (Array.isArray(node.material)) {
            Object.assign(newMaterial, node.material[0]);
          } else {
            Object.assign(newMaterial, node.material);
          }
        }
        
        let handleColorHex = '#C0C0C0';
        if (config.handleColor === 'gold') handleColorHex = '#FFD700';
        else if (config.handleColor === 'black') handleColorHex = '#000000';
        else if (config.handleColor === 'bronze') handleColorHex = '#CD7F32';
        
        newMaterial.color.set(handleColorHex);
        newMaterial.metalness = 0.8;
        newMaterial.roughness = 0.2;
        node.material = newMaterial;
      }
    });
    
    // Update leg materials
    legClone.traverse((node) => {
      if (node.isMesh) {
        const newMaterial = new THREE.MeshStandardMaterial();
        
        if (node.material) {
          if (Array.isArray(node.material)) {
            Object.assign(newMaterial, node.material[0]);
          } else {
            Object.assign(newMaterial, node.material);
          }
        }
        
        newMaterial.color.set(config.legColor);
        newMaterial.metalness = 0.6;
        newMaterial.roughness = 0.3;
        node.material = newMaterial;
      }
    });
    
    // Update refs with processed clones
    if (mainRef.current) {
      // Replace the existing scene with the new one
      while (mainRef.current.children.length > 0) {
        mainRef.current.remove(mainRef.current.children[0]);
      }
      mainRef.current.add(cabinetClone);
    }
    
    if (handleRef.current) {
      while (handleRef.current.children.length > 0) {
        handleRef.current.remove(handleRef.current.children[0]);
      }
      handleRef.current.add(handleClone);
    }
    
    if (legRef.current) {
      while (legRef.current.children.length > 0) {
        legRef.current.remove(legRef.current.children[0]);
      }
      legRef.current.add(legClone);
    }
    
    // Cleanup function
    return () => {
      // Dispose of cloned materials to prevent memory leaks
      cabinetClone.traverse((node) => {
        if (node.isMesh && node.material) {
          if (Array.isArray(node.material)) {
            node.material.forEach(material => material.dispose());
          } else {
            node.material.dispose();
          }
        }
      });
      
      handleClone.traverse((node) => {
        if (node.isMesh && node.material) {
          if (Array.isArray(node.material)) {
            node.material.forEach(material => material.dispose());
          } else {
            node.material.dispose();
          }
        }
      });
      
      legClone.traverse((node) => {
        if (node.isMesh && node.material) {
          if (Array.isArray(node.material)) {
            node.material.forEach(material => material.dispose());
          } else {
            node.material.dispose();
          }
        }
      });
    };
  }, [cabinetScene, handleScene, legScene, config, textureResult]);
  
  let scale = 1;
  if (config.size === 'small') scale = 0.8;
  else if (config.size === 'large') scale = 1.2;
  
  // Cabinet dimensions based on size
  const dimensions = {
    width: 1.2 * scale,
    height: 0.8 * scale,
    depth: 0.5 * scale
  };
  const widthStart = [-dimensions.width/2, 0, -dimensions.depth/2];
  const widthEnd = [dimensions.width/2, 0, -dimensions.depth/2];
  
  const heightStart = [-dimensions.width/2, 0, -dimensions.depth/2];
  const heightEnd = [-dimensions.width/2, dimensions.height, -dimensions.depth/2];
  
  const depthStart = [-dimensions.width/2, 0, -dimensions.depth/2];
  const depthEnd = [-dimensions.width/2, 0, dimensions.depth/2];
  
  return (
    <group>
      <group ref={mainRef} scale={scale} position={[0, 0, 0]} />
      <group ref={handleRef} scale={scale} position={[0, 0, 0]} />
      <group ref={legRef} scale={scale} position={[0, 0, 0]} />
      
      {/* Dimensions */}
      {showDimensions && (
        <>
          <Dimension 
            start={widthStart} 
            end={widthEnd} 
            visible={showDimensions}
          />
          
          <Dimension 
            start={heightStart} 
            end={heightEnd} 
            visible={showDimensions}
          />
          
          <Dimension 
            start={depthStart} 
            end={depthEnd} 
            visible={showDimensions}
          />
        </>
      )}
      
      {/* Add a DOM overlay for dimension text */}
      {showDimensions && (
        <Html
          position={[0, dimensions.height/2, 0]}
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          <div style={{
            position: 'absolute', 
            top: '10px', 
            left: '10px', 
            background: 'rgba(0,0,0,0.6)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '14px'
          }}>
            <div>Width: {dimensions.width.toFixed(2)}m</div>
            <div>Height: {dimensions.height.toFixed(2)}m</div>
            <div>Depth: {dimensions.depth.toFixed(2)}m</div>
          </div>
        </Html>
      )}
    </group>

  );
}
export default TexturedCabinet;