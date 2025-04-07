













// // // import React, { useState, useRef, Suspense, useEffect,useMemo } from 'react';
// // // import { Canvas, useThree } from '@react-three/fiber';
// // // import { OrbitControls, useGLTF, Environment, ContactShadows, useTexture, Html} from '@react-three/drei';
// // // import * as THREE from 'three';
// // // import { QRCodeCanvas } from 'qrcode.react';
// // // import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
// // // import Dimension from './assets/Dimension';
// // // import ARViewer from './assets/Ar-viewer';
// // // import { Client, Storage,ID,Permission,Role } from 'appwrite';
// // // import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// // // // Preload all models
// // // import { TextureLoader } from 'three';
// // // useGLTF.preload('/main.glb');
// // // useGLTF.preload('/handle-bar.glb');
// // // useGLTF.preload('/handle-knob.glb');
// // // useGLTF.preload('/leg-C.glb');
// // // useGLTF.preload('/leg-D.glb');
// // // // function TexturedCabinet({ config, showDimensions, mainRef, handleRef, legRef }) {
// // // //   const { scene: cabinetScene } = useGLTF('/main.glb');

// // // //   // Conditionally load handle and leg scenes only if their types are specified
// // // //   const handleScene = config.handleType ? useGLTF(`/handle-${config.handleType}.glb`).scene : null;
// // // //   const legScene = config.legType ? useGLTF(`/leg-${config.legType}.glb`).scene : null;

// // // //   // Texture logic remains conditional
// // // //   const texturePaths = config.texture ? { cabinetTexture: `/colors/${config.texture}` } : {};
// // // //   const textureResult = useTexture(texturePaths);

// // // //   useEffect(() => {
// // // //     const cabinetClone = cabinetScene.clone(true);
// // // //     let handleClone = null;
// // // //     let legClone = null;

// // // //     // Texture application logic
// // // //     let textureMap = null;
// // // //     if (config.texture && textureResult.cabinetTexture) {
// // // //       textureMap = textureResult.cabinetTexture;
// // // //       console.log("Texture loaded:", textureMap);
// // // //       textureMap.encoding = THREE.sRGBEncoding;
// // // //       // textureMap.wrapS = THREE.RepeatWrapping;
// // // //       // textureMap.wrapT = THREE.RepeatWrapping;
// // // //       // textureMap.repeat.set(1, -1);
// // // //       // textureMap.offset.set(0, 1);
// // // //       textureMap.wrapS = THREE.ClampToEdgeWrapping; // Temporarily disable wrapping
// // // //     textureMap.wrapT = THREE.ClampToEdgeWrapping;
// // // //     textureMap.repeat.set(1, 1); // Reset repeat
// // // //     textureMap.offset.set(0, 0); // Reset offset
// // // //     }

// // // //     cabinetClone.traverse((node) => {
// // // //       if (node.isMesh) {
// // // //         const newMaterial = new THREE.MeshStandardMaterial();
// // // //         if (node.material) Object.assign(newMaterial, node.material);
// // // //         if (node.name.includes("565_01") || node.name.includes('frame') || node.name.includes('panel')) {
// // // //           if (textureMap) {
// // // //             newMaterial.map = textureMap;
// // // //             if (node.geometry && node.geometry.attributes.uv) {
// // // //               // const uv = node.geometry.attributes.uv;
// // // //               // for (let i = 0; i < uv.count; i++) {
// // // //               //   uv.array[i * 2 + 1] = 1 - uv.array[i * 2 + 1];
// // // //               // }
// // // //               // uv.needsUpdate = true;
// // // //             }
// // // //             newMaterial.needsUpdate = true;
// // // //           } else {
// // // //             newMaterial.color.set(config.color);
// // // //           }
// // // //         }
// // // //         newMaterial.roughness = 0.7;
// // // //         newMaterial.metalness = 0.3;
// // // //         node.material = newMaterial;
// // // //       }
// // // //     });

// // // //     // Only process handle if handleType is set
// // // //     if (config.handleType && handleScene && handleRef.current) {
// // // //       handleClone = handleScene.clone(true);
// // // //       handleClone.traverse((node) => {
// // // //         if (node.isMesh) {
// // // //           const newMaterial = new THREE.MeshStandardMaterial();
// // // //           if (node.material) {
// // // //             if (Array.isArray(node.material)) Object.assign(newMaterial, node.material[0]);
// // // //             else Object.assign(newMaterial, node.material);
// // // //           }
// // // //           let handleColorHex = '#C0C0C0';
// // // //           if (config.handleColor === 'gold') handleColorHex = '#FFD700';
// // // //           else if (config.handleColor === 'black') handleColorHex = '#000000';
// // // //           else if (config.handleColor === 'bronze') handleColorHex = '#CD7F32';
// // // //           newMaterial.color.set(handleColorHex);
// // // //           newMaterial.metalness = 0.8;
// // // //           newMaterial.roughness = 0.2;
// // // //           node.material = newMaterial;
// // // //         }
// // // //       });
// // // //       while (handleRef.current.children.length > 0) {
// // // //         handleRef.current.remove(handleRef.current.children[0]);
// // // //       }
// // // //       handleRef.current.add(handleClone);
// // // //     }

// // // //     // Only process leg if legType is set
// // // //     if (config.legType && legScene && legRef.current) {
// // // //       legClone = legScene.clone(true);
// // // //       legClone.traverse((node) => {
// // // //         if (node.isMesh) {
// // // //           const newMaterial = new THREE.MeshStandardMaterial();
// // // //           if (node.material) {
// // // //             if (Array.isArray(node.material)) Object.assign(newMaterial, node.material[0]);
// // // //             else Object.assign(newMaterial, node.material);
// // // //           }
// // // //           newMaterial.color.set(config.legColor);
// // // //           newMaterial.metalness = 0.6;
// // // //           newMaterial.roughness = 0.3;
// // // //           node.material = newMaterial;
// // // //         }
// // // //       });
// // // //       while (legRef.current.children.length > 0) {
// // // //         legRef.current.remove(legRef.current.children[0]);
// // // //       }
// // // //       legRef.current.add(legClone);
// // // //     }

// // // //     if (mainRef.current) {
// // // //       while (mainRef.current.children.length > 0) {
// // // //         mainRef.current.remove(mainRef.current.children[0]);
// // // //       }
// // // //       mainRef.current.add(cabinetClone);
// // // //     }

// // // //     return () => {
// // // //       cabinetClone.traverse((node) => {
// // // //         if (node.isMesh && node.material) {
// // // //           if (Array.isArray(node.material)) node.material.forEach(material => material.dispose());
// // // //           else node.material.dispose();
// // // //         }
// // // //       });
// // // //       if (handleClone) {
// // // //         handleClone.traverse((node) => {
// // // //           if (node.isMesh && node.material) {
// // // //             if (Array.isArray(node.material)) node.material.forEach(material => material.dispose());
// // // //             else node.material.dispose();
// // // //           }
// // // //         });
// // // //       }
// // // //       if (legClone) {
// // // //         legClone.traverse((node) => {
// // // //           if (node.isMesh && node.material) {
// // // //             if (Array.isArray(node.material)) node.material.forEach(material => material.dispose());
// // // //             else node.material.dispose();
// // // //           }
// // // //         });
// // // //       }
// // // //     };
// // // //   }, [cabinetScene, handleScene, legScene,config.size, config.color, config.texture, config.handleType, config.handleColor, config.legType, config.legColor, textureResult, mainRef, handleRef, legRef]);
// // // //   let scale = 1;
// // // //   if (config.size === 'small') scale = 0.8;
// // // //   else if (config.size === 'large') scale = 1.2;
  
// // // //   // Cabinet dimensions based on size
// // // //   const dimensions = {
// // // //     width: 1.2 * scale,
// // // //     height: 0.8 * scale,
// // // //     depth: 0.5 * scale
// // // //   };
// // // //   const widthStart = [-dimensions.width/2, 0, -dimensions.depth/2];
// // // //   const widthEnd = [dimensions.width/2, 0, -dimensions.depth/2];
  
// // // //   const heightStart = [-dimensions.width/2, 0, -dimensions.depth/2];
// // // //   const heightEnd = [-dimensions.width/2, dimensions.height, -dimensions.depth/2];
  
// // // //   const depthStart = [-dimensions.width/2, 0, -dimensions.depth/2];
// // // //   const depthEnd = [-dimensions.width/2, 0, dimensions.depth/2];
  
// // // //   return (
// // // //     <group>
// // // //       <group ref={mainRef} scale={scale} position={[0, 0, 0]} />
// // // //       <group ref={handleRef} scale={scale} position={[0, 0, 0]} />
// // // //       <group ref={legRef} scale={scale} position={[0, 0, 0]} />
      
// // // //       {/* Dimensions */}
// // // //       {showDimensions && (
// // // //         <>
// // // //           <Dimension 
// // // //             start={widthStart} 
// // // //             end={widthEnd} 
// // // //             visible={showDimensions}
// // // //           />
          
// // // //           <Dimension 
// // // //             start={heightStart} 
// // // //             end={heightEnd} 
// // // //             visible={showDimensions}
// // // //           />
          
// // // //           <Dimension 
// // // //             start={depthStart} 
// // // //             end={depthEnd} 
// // // //             visible={showDimensions}
// // // //           />
// // // //         </>
// // // //       )}
      
// // // //       {/* Add a DOM overlay for dimension text */}
// // // //       {showDimensions && (
// // // //         <Html
// // // //           position={[0, dimensions.height/2, 0]}
// // // //           style={{
// // // //             width: '100%',
// // // //             height: '100%',
// // // //             pointerEvents: 'none'
// // // //           }}
// // // //         >
// // // //           <div style={{
// // // //             position: 'absolute', 
// // // //             top: '10px', 
// // // //             left: '10px', 
// // // //             background: 'rgba(0,0,0,0.6)',
// // // //             color: 'white',
// // // //             padding: '10px',
// // // //             borderRadius: '5px',
// // // //             fontSize: '14px'
// // // //           }}>
// // // //             <div>Width: {dimensions.width.toFixed(2)}m</div>
// // // //             <div>Height: {dimensions.height.toFixed(2)}m</div>
// // // //             <div>Depth: {dimensions.depth.toFixed(2)}m</div>
// // // //           </div>
// // // //         </Html>
// // // //       )}
// // // //     </group>

// // // //   );
// // // // }
// // // function TexturedCabinet({ config, showDimensions, mainRef, handleRef, legRef }) {
// // //   const { scene: cabinetScene } = useGLTF('/main.glb');
// // //   const handleScene = config.handleType ? useGLTF(`/handle-${config.handleType}.glb`).scene : null;
// // //   const legScene = config.legType ? useGLTF(`/leg-${config.legType}.glb`).scene : null;

// // //   // Memoized materials
// // //   const bodyMaterial = useMemo(() => {
// // //     if (!config.texture) {
// // //       return new THREE.MeshStandardMaterial({
// // //         color: new THREE.Color(config.color),
// // //         roughness: 0.7,
// // //         metalness: 0.3,
// // //       });
// // //     }

// // //     const textureLoader = new TextureLoader();
// // //     const texturePath = `/colors/${config.texture}`;
// // //     const texture = textureLoader.load(texturePath, undefined, undefined, (error) => {
// // //       console.error('Error loading texture:', error);
// // //     });

// // //     if (THREE.SRGBColorSpace !== undefined) {
// // //       texture.colorSpace = THREE.SRGBColorSpace;
// // //     } else {
// // //       texture.encoding = THREE.sRGBEncoding;
// // //     }
// // //     texture.wrapS = THREE.RepeatWrapping;
// // //     texture.wrapT = THREE.RepeatWrapping;
// // //     texture.repeat.set(1, 1);
// // //     texture.flipY = false;
// // //     texture.needsUpdate = true;

// // //     // Load roughness map
// // //     const roughnessMap = textureLoader.load('/RoughnessMap.png', undefined, undefined, (error) => {
// // //       console.error('Error loading roughness map:', error);
// // //     });
// // //     if (roughnessMap) {
// // //       roughnessMap.wrapS = THREE.RepeatWrapping;
// // //       roughnessMap.wrapT = THREE.RepeatWrapping;
// // //       roughnessMap.needsUpdate = true;
// // //     }

// // //     return new THREE.MeshStandardMaterial({
// // //       map: texture,
// // //       roughnessMap: roughnessMap || undefined,
// // //       roughness: roughnessMap ? 1 : 0.8,
// // //       metalness: 0.2,
// // //       envMapIntensity: 1,
// // //     });
// // //   }, [config.texture, config.color]);

// // //   const handleMaterial = useMemo(() => {
// // //     let handleColorHex = '#C0C0C0';
// // //     if (config.handleColor === 'gold') handleColorHex = '#FFD700';
// // //     else if (config.handleColor === 'black') handleColorHex = '#000000';
// // //     else if (config.handleColor === 'bronze') handleColorHex = '#CD7F32';

// // //     return new THREE.MeshStandardMaterial({
// // //       color: new THREE.Color(handleColorHex),
// // //       roughness: 0.4,
// // //       metalness: 0.8,
// // //       envMapIntensity: 1,
// // //     });
// // //   }, [config.handleColor]);

// // //   const legMaterial = useMemo(() => {
// // //     return new THREE.MeshStandardMaterial({
// // //       color: new THREE.Color(config.legColor),
// // //       roughness: 0.3,
// // //       metalness: 0.6,
// // //     });
// // //   }, [config.legColor]);

// // //   useEffect(() => {
// // //     if (mainRef.current) {
// // //       const cabinetClone = cabinetScene.clone(true);
// // //       cabinetClone.traverse((node) => {
// // //         if (node.isMesh && (node.name.includes("565_01") || node.name.includes('frame') || node.name.includes('panel'))) {
// // //           node.material = bodyMaterial.clone();
// // //         }
// // //       });
// // //       while (mainRef.current.children.length > 0) {
// // //         mainRef.current.remove(mainRef.current.children[0]);
// // //       }
// // //       mainRef.current.add(cabinetClone);
// // //     }

// // //     if (handleRef.current && handleScene) {
// // //       const handleClone = handleScene.clone(true);
// // //       handleClone.traverse((node) => {
// // //         if (node.isMesh) {
// // //           node.material = handleMaterial.clone();
// // //         }
// // //       });
// // //       while (handleRef.current.children.length > 0) {
// // //         handleRef.current.remove(handleRef.current.children[0]);
// // //       }
// // //       handleRef.current.add(handleClone);
// // //     }

// // //     if (legRef.current && legScene) {
// // //       const legClone = legScene.clone(true);
// // //       legClone.traverse((node) => {
// // //         if (node.isMesh) {
// // //           node.material = legMaterial.clone();
// // //         }
// // //       });
// // //       while (legRef.current.children.length > 0) {
// // //         legRef.current.remove(legRef.current.children[0]);
// // //       }
// // //       legRef.current.add(legClone);
// // //     }
// // //   }, [cabinetScene, handleScene, legScene, bodyMaterial, handleMaterial, legMaterial, mainRef, handleRef, legRef]);

// // //   let scale = 1;
// // //   if (config.size === 'small') scale = 0.8;
// // //   else if (config.size === 'large') scale = 1.2;

// // //   const dimensions = {
// // //     width: 1.2 * scale,
// // //     height: 0.8 * scale,
// // //     depth: 0.5 * scale,
// // //   };
// // //   const widthStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
// // //   const widthEnd = [dimensions.width / 2, 0, -dimensions.depth / 2];
// // //   const heightStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
// // //   const heightEnd = [-dimensions.width / 2, dimensions.height, -dimensions.depth / 2];
// // //   const depthStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
// // //   const depthEnd = [-dimensions.width / 2, 0, dimensions.depth / 2];
// // //   useEffect(() => {
// // //     if (showDimensions) {
// // //       console.log('Dimensions visible:', dimensions);
// // //     }
// // //   }, [showDimensions, dimensions]);
// // //   return (
// // //     <group>
// // //       <group ref={mainRef} scale={scale} position={[0, 0, 0]} />
// // //       <group ref={handleRef} scale={scale} position={[0, 0, 0]} />
// // //       <group ref={legRef} scale={scale} position={[0, 0, 0]} />
// // //       {showDimensions && (
// // //         <>
// // //           <Dimension start={widthStart} end={widthEnd} visible={showDimensions} />
// // //           <Dimension start={heightStart} end={heightEnd} visible={showDimensions} />
// // //           <Dimension start={depthStart} end={depthEnd} visible={showDimensions} />
// // //           <Html
// // //             // position={[dimensions.width / 2 + 0.5, dimensions.height / 2 + 0.2, 0]} // Top-right corner (adjusted outward)
// // //             // style={{
// // //             //   pointerEvents: 'none',
// // //             // }}
// // //             // zIndexRange={[100, 0]} // Ensure it renders on top
// // //           >
// // //             <div
// // //               style={{
// // //                 position: 'fixed', 
// // //                 top: '120px', 
// // //                 left: '150px', 
// // //                 pointerEvents: 'none',
// // //                 zIndex: 100,
// // //                 background: 'rgba(0, 0, 0, 0.7)',
// // //                 color: 'white',
// // //                 padding: '10px',
// // //                 borderRadius: '5px',
// // //                 fontSize: '16px',
// // //                 maxWidth: '200px', // Responsive max width
// // //                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow for readability
// // //               }}
// // //             >
// // //               <table
// // //                 style={{
// // //                   width: '100%',
// // //                   borderCollapse: 'collapse',
// // //                   fontFamily: 'Arial, sans-serif',
// // //                 }}
// // //               >
// // //                 <thead>
// // //                   <tr>
// // //                     <th style={{ padding: '5px', textAlign: 'left' }}>Dimension</th>
// // //                     <th style={{ padding: '5px', textAlign: 'right' }}>Value (m)</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   <tr>
// // //                     <td style={{ padding: '5px', textAlign: 'left' }}>Width</td>
// // //                     <td style={{ padding: '5px', textAlign: 'right' }}>{dimensions.width.toFixed(2)}</td>
// // //                   </tr>
// // //                   <tr>
// // //                     <td style={{ padding: '5px', textAlign: 'left' }}>Height</td>
// // //                     <td style={{ padding: '5px', textAlign: 'right' }}>{dimensions.height.toFixed(2)}</td>
// // //                   </tr>
// // //                   <tr>
// // //                     <td style={{ padding: '5px', textAlign: 'left' }}>Depth</td>
// // //                     <td style={{ padding: '5px', textAlign: 'right' }}>{dimensions.depth.toFixed(2)}</td>
// // //                   </tr>
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           </Html>
// // //         </>
// // //       )}
// // //     </group>
// // //   );
// // // }
// // // // function CabinetModel({ config, showDimensions,mainRef, handleRef, legRef }) {
// // // //   const [appliedTexture, setAppliedTexture] = useState(null);
// // // //   const textureMap = useTexture({
// // // //     map: config.texture ? `/colors/${config.texture}` : '/colors/Amber.png', // Load dynamically
// // // //   });
// // // //   useEffect(() => {
// // // //     setAppliedTexture(textureMap.map);
// // // //   }, [config.texture]);
  
// // // //   return (
// // // //     <Suspense fallback={null}>
// // // //       <TexturedCabinet config={config} showDimensions={showDimensions} mainRef={mainRef}
// // // //         handleRef={handleRef}
// // // //         legRef={legRef} />
// // // //     </Suspense>
// // // //   );
// // // // }
// // // function CabinetModel({ config, showDimensions, mainRef, handleRef, legRef }) {
// // //   return (
// // //     <Suspense fallback={null}>
// // //       <TexturedCabinet config={config} showDimensions={showDimensions} mainRef={mainRef}
// // //         handleRef={handleRef} legRef={legRef} />
// // //     </Suspense>
// // //   );
// // // }
// // // function CabinetConfigurator() {
// // //   const mainRef = useRef();
// // //   const handleRef = useRef();
// // //   const legRef = useRef();
// // //   const [config, setConfig] = useState({
// // //     size: 'medium',
// // //     color: 'white',
// // //     woodFinish: '#8B4513',
// // //     handleType: '',
// // //     handleColor: 'silver',
// // //     legType: '',
// // //     legColor: '#000000',
// // //     texture: ''
// // //   });
// // //   const [showDimensions, setShowDimensions] = useState(false);
// // //   const [price, setPrice] = useState(200);
// // //   const [originalPrice, setOriginalPrice] = useState(245);
// // //   const [showSizes, setShowSizes] = useState(false);
// // //   const [showTextures, setShowTextures] = useState(false);
// // //   const [showHandleTypes, setShowHandleTypes] = useState(false);
// // //   const [showHandleColors, setShowHandleColors] = useState(false);
// // //   const [showLegTypes, setShowLegTypes] = useState(false);
// // //   const [showLegColors, setShowLegColors] = useState(false);
// // //   const [viewMode, setViewMode] = useState('default');
// // //   const controlsRef = useRef();
// // //   const canvasRef = useRef(null);
// // //   const [screenshotUrl, setScreenshotUrl] = useState(null);
// // //   const [showScreenshotModal, setShowScreenshotModal] = useState(false);
// // //   const [screenshotCanvas, setScreenshotCanvas] = useState(null);
// // //   const [showARViewer, setShowARViewer] = useState(false);
// // //   const [arModelUrl, setArModelUrl] = useState(null);
// // //   const [showQRCode, setShowQRCode] = useState(false); // For displaying QR code

// // //   const location = useLocation();
// // //   // Improved texture list with better file references
// // //   const textures = [
// // //     { id: '', name: 'Solid Color' },
// // //     { id: 'Raya.png', name: 'Natural Wood' },
// // //     { id: 'Empire.png', name: 'White Marble' },
// // //     { id: 'Amber.png', name: 'Polished Concrete' },
// // //     { id: 'Bitmore.png', name: 'Black Leather' }
// // //   ];

// // //   const sizes = [
// // //     { id: 'small', name: 'Small', price: 180 },
// // //     { id: 'medium', name: 'Medium', price: 200 },
// // //     { id: 'large', name: 'Large', price: 240 }
// // //   ];

// // //   const cabinetColors = [
// // //     { id: 'sage', color: '#4b5c4b' },
// // //     { id: 'navy', color: '#1a237e' },
// // //     { id: 'cream', color: '#fff8e1' },
// // //     { id: 'charcoal', color: '#37474f' }
// // //   ];

// // //   const handleTypes = [
// // //     { id: 'bar', name: 'Bar Handle' },
// // //     { id: 'knob', name: 'Knob Handle' }
// // //   ];

// // //   const handleColors = [
// // //     { id: 'silver', name: 'Silver', color: '#C0C0C0' },
// // //     { id: 'gold', name: 'Gold', color: '#FFD700' },
// // //     { id: 'black', name: 'Black', color: '#000000' },
// // //     { id: 'bronze', name: 'Bronze', color: '#CD7F32' }
// // //   ];

// // //   const legTypes = [
// // //     { id: 'C', name: 'Classic Legs' },
// // //     { id: 'D', name: 'Designer Legs' }
// // //   ];

// // //   const legColors = [
// // //     { id: 'black', name: 'Black', color: '#000000' },
// // //     { id: 'silver', name: 'Silver', color: '#C0C0C0' },
// // //     { id: 'gold', name: 'Gold', color: '#FFD700' },
// // //     { id: 'bronze', name: 'Bronze', color: '#CD7F32' }
// // //   ];
// // //   const closeAllDropdowns = () => {
// // //     setShowSizes(false);
// // //     setShowTextures(false);
// // //     setShowHandleTypes(false);
// // //     setShowHandleColors(false);
// // //     setShowLegTypes(false);
// // //     setShowLegColors(false);
// // //   };

// // //   // Toggle functions that close others first
// // //   // const toggleSizes = () => {
// // //   //   closeAllDropdowns();
// // //   //   setShowSizes(prev => !prev);
// // //   // };

// // //   // const toggleTextures = () => {
// // //   //   closeAllDropdowns();
// // //   //   setShowTextures(prev => !prev);
// // //   // };

// // //   // const toggleHandleTypes = () => {
// // //   //   closeAllDropdowns();
// // //   //   setShowHandleTypes(prev => !prev);
// // //   // };

// // //   // const toggleHandleColors = () => {
// // //   //   closeAllDropdowns();
// // //   //   setShowHandleColors(prev => !prev);
// // //   // };

// // //   // const toggleLegTypes = () => {
// // //   //   closeAllDropdowns();
// // //   //   setShowLegTypes(prev => !prev);
// // //   // };

// // //   // const toggleLegColors = () => {
// // //   //   closeAllDropdowns();
// // //   //   setShowLegColors(prev => !prev);
// // //   // };
// // //   const toggleSizes = () => {
// // //     if (showSizes) {
// // //       setShowSizes(false); // If already open, just close it
// // //     } else {
// // //       closeAllDropdowns();
// // //       setShowSizes(true); // Open it after closing others
// // //     }
// // //   };
  
// // //   const toggleTextures = () => {
// // //     if (showTextures) {
// // //       setShowTextures(false);
// // //     } else {
// // //       closeAllDropdowns();
// // //       setShowTextures(true);
// // //     }
// // //   };
  
// // //   const toggleHandleTypes = () => {
// // //     if (showHandleTypes) {
// // //       setShowHandleTypes(false);
// // //     } else {
// // //       closeAllDropdowns();
// // //       setShowHandleTypes(true);
// // //     }
// // //   };
  
// // //   const toggleHandleColors = () => {
// // //     if (showHandleColors) {
// // //       setShowHandleColors(false);
// // //     } else {
// // //       closeAllDropdowns();
// // //       setShowHandleColors(true);
// // //     }
// // //   };
  
// // //   const toggleLegTypes = () => {
// // //     if (showLegTypes) {
// // //       setShowLegTypes(false);
// // //     } else {
// // //       closeAllDropdowns();
// // //       setShowLegTypes(true);
// // //     }
// // //   };
  
// // //   const toggleLegColors = () => {
// // //     if (showLegColors) {
// // //       setShowLegColors(false);
// // //     } else {
// // //       closeAllDropdowns();
// // //       setShowLegColors(true);
// // //     }
// // //   };
 
// // //   function CanvasCapture() {
// // //     const { gl, scene, camera } = useThree();
    
// // //     useEffect(() => {
// // //       // Add a method to the gl object to capture the current frame
// // //       gl.captureFrame = () => {
// // //         gl.render(scene, camera);
// // //         return gl.domElement.toDataURL('image/png');
// // //       };
// // //     }, [gl, scene, camera]);
    
// // //     return null;
// // //   }
  
  
// // //   const toggleDimensions = () => {
// // //     // setShowDimensions(!showDimensions);
// // //     if (!showARViewer)
// // //     setShowDimensions(prevShowDimensions => !prevShowDimensions);
    
  
// // //   };
  
// // //   const handleViewChange = (mode) => {
// // //     setViewMode(mode);
    
// // //     if (controlsRef.current) {
// // //       switch(mode) {
// // //         case 'top':
// // //           controlsRef.current.setAzimuthalAngle(0);
// // //           controlsRef.current.setPolarAngle(0);
// // //           controlsRef.current.update();
// // //           break;
// // //         case 'front':
// // //           controlsRef.current.setAzimuthalAngle(0);
// // //           controlsRef.current.setPolarAngle(Math.PI / 2);
// // //           controlsRef.current.update();
// // //           break;
// // //         case 'side':
// // //           controlsRef.current.setAzimuthalAngle(Math.PI / 2);
// // //           controlsRef.current.setPolarAngle(Math.PI / 2);
// // //           controlsRef.current.update();
// // //           break;
// // //         case 'free':
// // //           controlsRef.current.setAzimuthalAngle(Math.PI / 4);
// // //           controlsRef.current.setPolarAngle(Math.PI / 4);
// // //           controlsRef.current.update();
// // //           break;
// // //         default:
// // //           controlsRef.current.setAzimuthalAngle(Math.PI / 4);
// // //           controlsRef.current.setPolarAngle(Math.PI / 3);
// // //           controlsRef.current.update();
// // //       }
// // //     }
// // //   };
  
// // //   const takeScreenshot = () => {
// // //     const canvas = document.querySelector('canvas');
// // //     if (canvas) {
// // //       // Force a render update
// // //       if (controlsRef.current) {
// // //         controlsRef.current.update();
// // //       }
      
// // //       // Get the WebGL context
// // //       const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
// // //       if (gl) {
// // //         // Ensure we capture the current frame
// // //         gl.render && gl.render();
        
// // //         // Create the screenshot
// // //         const dataUrl = canvas.toDataURL('image/png');
// // //         setScreenshotUrl(dataUrl);
// // //         setShowScreenshotModal(true);
// // //       }
// // //     }
// // //   };
  
// // //   // Download screenshot
// // //   const downloadScreenshot = () => {
// // //     if (screenshotUrl) {
// // //       const link = document.createElement('a');
// // //       link.href = screenshotUrl;
// // //       link.download = `cabinet-config-${new Date().getTime()}.png`;
// // //       document.body.appendChild(link);
// // //       link.click();

// // //       document.body.removeChild(link);
// // //     }
// // //   };
  

// // //   const downloadGLB = () => {
// // //     generateGLB().then((url) => {
// // //       const link = document.createElement('a');
// // //       link.href = url;
// // //       link.download = `cabinet-config-${new Date().getTime()}.glb`;
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       document.body.removeChild(link);
// // //     }).catch((error) => {
// // //       console.error('Download failed:', error);
// // //     });
// // //   };
// // //   const prepareSceneForExport = (group) => {
// // //     group.traverse((node) => {
// // //       if (node.isMesh && node.material) {
// // //         const material = node.material.clone();
// // //         if (material.map) {
// // //           material.map.needsUpdate = true;
// // //         }
// // //         node.material = material;
// // //         node.material.needsUpdate = true;
// // //       }
// // //     });
// // //     return group;
// // //   };
// // //   const client = new Client();
// // // client
// // //   .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
// // //   .setProject('67efeb660016a94a1b36'); // Replace with your project ID

// // // const storage = new Storage(client);
// // // const [fileId, setFileId] = useState(null);
// // // const [appwriteModelUrl, setAppwriteModelUrl] = useState(null);
// // // // Modified function to upload to Appwrite instead of downloading
// // // const saveGLBToAppwrite = () => {
// // //   generateGLB().then((url) => {
// // //     // Fetch the blob from the URL
// // //     fetch(url)
// // //       .then(response => response.blob())
// // //       .then(blob => {
// // //         const fileName = `cabinet-config-${new Date().getTime()}.glb`;
        
// // //         // Create a file object from the blob
// // //         const file = new File([blob], fileName, { type: 'model/gltf-binary' });
        
// // //         // Upload file to Appwrite storage
// // //         storage.createFile(
// // //           '67efec5900294e3b8bf2', // Replace with your Appwrite bucket ID
// // //           ID.unique(), // Use Appwrite's unique ID function or generate your own ID
// // //           file

      
// // //         ).then(response => {
// // //           console.log('File uploaded successfully to Appwrite:', response);
          
// // //           // Clean up the Blob URL after upload
// // //           URL.revokeObjectURL(url);
          
// // //           // You might want to store the file ID in your app state or user data
// // //           const fileId = response.$id;
// // //           setStoredFileId(fileId); // Assuming you have a state variable for this
          
// // //           // Show success message to user
// // //           alert('3D model saved to your account!');
// // //         }).catch(error => {
// // //           console.error('Appwrite upload failed:', error);
// // //           alert('Failed to save the model. Please try again.');
// // //         });
// // //       });
// // //   }).catch((error) => {
// // //     console.error('GLB generation failed:', error);
// // //   });
// // // };
// // // const generateGLB = () => {
// // //   console.log('Generating GLB...');
// // //   const exporter = new GLTFExporter();
// // //   const sceneGroup = new THREE.Group();

// // //   if (!mainRef.current || !handleRef.current || !legRef.current) {
// // //     console.error('Scene refs not ready');
// // //     return Promise.reject('Scene not ready');
// // //   }

// // //   sceneGroup.add(prepareSceneForExport(mainRef.current.clone()));
// // //   sceneGroup.add(prepareSceneForExport(handleRef.current.clone()));
// // //   sceneGroup.add(prepareSceneForExport(legRef.current.clone()));

// // //   const options = {
// // //     binary: true,
// // //     trs: false,
// // //     onlyVisible: true,
// // //     includeCustomExtensions: false,
// // //   };

// // //   return new Promise((resolve, reject) => {
// // //     exporter.parse(
// // //       sceneGroup,
// // //       async (gltf) => {
// // //         try {
// // //           const blob = new Blob([gltf], { type: 'model/gltf-binary' });
// // //           const fileName = `cabinet-config-${new Date().getTime()}.glb`;
// // //           const file = new File([blob], fileName, { type: 'model/gltf-binary' });

// // //           const response = await storage.createFile(
// // //             '67efec5900294e3b8bf2', // Your bucket ID
// // //             ID.unique(),
// // //             file,
// // //             [Permission.read(Role.any())] // Public read access
// // //           );

// // //           console.log('GLB uploaded to Appwrite:', response);
// // //           const newFileId = response.$id;
// // //           setFileId(newFileId); // Update state

// // //           const fileUrl = storage.getFileView('67efec5900294e3b8bf2', newFileId);
// // //           console.log('Generated file URL:', fileUrl);
// // //           setAppwriteModelUrl(fileUrl);
// // //           setArModelUrl(fileUrl);

// // //           // Resolve with both the URL and fileId
// // //           resolve({ url: fileUrl, fileId: newFileId });
// // //         } catch (error) {
// // //           console.error('Error uploading to Appwrite:', error);
// // //           alert('Failed to upload model to Appwrite.');
// // //           reject(error);
// // //         }
// // //       },
// // //       (error) => {
// // //         console.error('Error exporting GLB:', error);
// // //         reject(error);
// // //       },
// // //       options
// // //     );
// // //   });
// // // };
// // //   const openARViewer = async () => {
// // //     try {
// // //       const qrUrl = await generateQRCode();
// // //       if (qrUrl) {
// // //         console.log('QR Code generated successfully:', qrUrl);
// // //       }
// // //     } catch (error) {
// // //       console.error('Failed to open AR viewer:', error);
// // //     }
// // //   };
// // //   // Close AR viewer
// // //   const closeARViewer = () => {
// // //     setShowARViewer(false);
// // //     if (arModelUrl) {
// // //       URL.revokeObjectURL(arModelUrl); // Clean up the Blob URL
// // //       setArModelUrl(null);
// // //     }
// // //   };
// // //   const generateQRCode = async () => {
// // //     console.log('Generating QR Code...');
// // //     try {
// // //       const { url, fileId: generatedFileId } = await generateGLB(); // Get fileId directly from generateGLB
// // //       if (url && generatedFileId) {
// // //         const qrUrl = `${window.location.origin}/ar-view?fileId=${encodeURIComponent(generatedFileId)}`;
// // //         console.log('Generated QR URL with Appwrite fileId:', qrUrl);
// // //         setShowQRCode(true);
// // //         return qrUrl;
// // //       } else {
// // //         console.error('No URL or fileId generated for QR code');
// // //         alert('Failed to generate QR code: No URL or fileId returned');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error generating QR code:', error);
// // //       alert('Failed to generate QR code.');
// // //     }
// // //   };
// // //   useEffect(() => {
// // //     const params = new URLSearchParams(location.search);
// // //     const fileIdFromUrl = params.get('fileId');
// // //     if (fileIdFromUrl && location.pathname === '/ar-view') {
// // //       console.log('Detected QR scan, fetching model with fileId:', fileIdFromUrl);
// // //       const modelUrl = storage.getFileView('67efec5900294e3b8bf2', fileIdFromUrl);
// // //       console.log('Fetched model URL from Appwrite:', modelUrl); // Debug log
// // //       setArModelUrl(modelUrl);
// // //       setShowARViewer(true);
// // //     }
// // //   }, [location]);
// // //   // Close screenshot modal
// // //   const closeScreenshotModal = () => {
// // //     setShowScreenshotModal(false);
// // //   };

// // //   useEffect(() => {
// // //     const basePrice = sizes.find(s => s.id === config.size)?.price || 200;
// // //     let totalPrice = basePrice;
    
// // //       // Add texture pricing
// // //       if (config.texture) {
// // //         totalPrice += 25; // Premium for textured finishes
// // //       }
      
// // //       if (config.handleColor === 'gold') {
// // //         totalPrice += 15;
// // //       } else if (config.handleColor === 'bronze') {
// // //         totalPrice += 10;
// // //       }

// // //       if (config.legType === 'D') {
// // //         totalPrice += 25;
// // //       }
      
// // //       if (config.legColor === '#FFD700') {
// // //         totalPrice += 20;
// // //       } else if (config.legColor === '#CD7F32') {
// // //         totalPrice += 15;
// // //       }
      
// // //       setPrice(totalPrice);
// // //       setOriginalPrice(Math.round(totalPrice * 1.225));
// // //     }, [config]);
    

// // //     // const updateConfig = (key, value) => {
// // //     //   setConfig((prev) => {
// // //     //     const newConfig = { ...prev };
    
// // //     //     if (key === "color" && value !== "") {
// // //     //       // Reset texture ONLY if changing from one color to another, not other settings
// // //     //       if (prev.texture) newConfig.texture = "";
// // //     //     } else if (key === "texture" && value !== "") {
// // //     //       // Reset color ONLY if changing from one texture to another
// // //     //       if (prev.color) newConfig.color = "";
// // //     //     }
    
// // //     //     newConfig[key] = value;
// // //     //     return newConfig;
// // //     //     console.log(arModelUrl);
// // //     //   });
// // //     // };
    

// // //     const updateConfig = (key, value) => {
// // //       console.log(`Updating config: key = ${key}, value = ${value}, caller = `, new Error().stack.split('\n')[2].trim());
// // //       setConfig((prev) => {
// // //         const newConfig = { ...prev };
// // //         if (key === "color" && value !== "") {
// // //           if (prev.texture) newConfig.texture = "";
// // //         } else if (key === "texture" && value !== "") {
// // //           if (prev.color) newConfig.color = "";
// // //         }
// // //         newConfig[key] = value;
// // //         return newConfig;
// // //       });
// // //     };
// // //     useEffect(() => {
// // //       if (showARViewer) {
// // //         setShowDimensions(false); // Hide dimensions when AR viewer is open
// // //       }
// // //     }, [showARViewer]);

// // //   return (
// // //     <div className="min-h-screen flex flex-col">
// // //       <div className="flex flex-1">
// // //         <div className="w-16 border-r">
// // //           <div className="flex flex-col items-center pt-4 gap-4">
// // //             <button 
// // //               className={`p-2 border rounded ${viewMode === 'default' ? 'bg-gray-200' : ''}`}
// // //               onClick={() => handleViewChange('default')}
// // //               title="Default View"
// // //             >
// // //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                 <rect x="3" y="3" width="18" height="18" rx="2" />
// // //               </svg>
// // //             </button>
           
// // // <button 
// // //   className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-4"
// // //   onClick={downloadGLB}
// // //   title="Download GLB"
// // // >
// // //   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
// // //     <polyline points="7 10 12 15 17 10" />
// // //     <line x1="12" y1="15" x2="12" y2="3" />
// // //   </svg>
// // // </button>
// // //             <button 
// // //               className={`p-2 border rounded ${viewMode === 'top' ? 'bg-gray-200' : ''}`}
// // //               onClick={() => handleViewChange('top')}
// // //               title="Top View"
// // //             >
// // //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                 <path d="M3 3h18v18H3z" />
// // //               </svg>
// // //             </button>
            
// // //             <button 
// // //               className={`p-2 border rounded ${viewMode === 'front' ? 'bg-gray-200' : ''}`}
// // //               onClick={() => handleViewChange('front')}
// // //               title="Front View"
// // //             >
// // //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                 <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
// // //               </svg>
// // //             </button>
// // //             <button 
// // //               className={`p-2 border rounded ${viewMode === 'free' ? 'bg-gray-200' : ''}`}
// // //               onClick={() => handleViewChange('free')}
// // //               title="Free View"
// // //             >
// // //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                 <path d="M4 4h16v16H4z" />
// // //                 <path d="M9 9l6 6M15 9l-6 6" />
// // //               </svg>
// // //             </button>
// // //             <button 
// // //               className={`p-2 border rounded ${showDimensions ? 'bg-blue-200' : 'bg-gray-100'} hover:bg-blue-100`}
// // //               onClick={toggleDimensions}
// // //               title="Show Dimensions"
// // //             >
// // //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                 <path d="M2 12h20M12 2v20M20 16v-4M4 8v8M16 4h4M4 20h4" />
// // //               </svg>
// // //             </button>
// // //             <button 
// // //               className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-4"
// // //               onClick={openARViewer}
// // //               title="View in AR"
// // //             >
// // //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                 <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 12 8 7v10l8-5z" />
// // //               </svg>
// // //             </button>
// // //             <button 
// // //               className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-4"
// // //               onClick={takeScreenshot}
// // //               title="Screenshot"
// // //             >
// // //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                 <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
// // //                 <circle cx="12" cy="12" r="3" />
// // //                 <path d="M16.5 7.5h.01" />
// // //               </svg>
// // //             </button>
// // //           </div>
// // //         </div>
        
// // //         <div className="flex-1 flex flex-col md:flex-row">
// // //           <div className="w-full md:w-3/5 h-[50vh] md:h-auto flex items-center justify-center bg-gray-50">
// // //             <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
// // //               <ambientLight intensity={0.5} />
// // //               <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
// // //               <pointLight position={[-10, -10, -10]} intensity={0.5} />
              
// // //               <Suspense fallback={null}>
// // //                 <CabinetModel config={config} showDimensions={showDimensions} mainRef={mainRef}
// // //           handleRef={handleRef}
// // //           legRef={legRef}/>
// // //                 <Environment preset="city" />
// // //                 <ContactShadows opacity={0.5} scale={10} blur={1} far={10} resolution={256} />
// // //                 <CanvasCapture setScreenshotCanvas={setScreenshotCanvas} />
// // //               </Suspense>
              
// // //               <OrbitControls 
// // //                 ref={controlsRef}
// // //                 enablePan={viewMode === 'free'}
// // //                 enableZoom={true}
// // //                 enableRotate={viewMode === 'free' || viewMode === 'default'}
// // //                 minPolarAngle={viewMode === 'top' ? 0 : viewMode === 'front' ? Math.PI / 2 : 0}
// // //                 maxPolarAngle={viewMode === 'top' ? 0 : viewMode === 'front' ? Math.PI / 2 : Math.PI}
// // //               />
// // //             </Canvas>
// // //           </div>
// // //           <div className="w-full md:w-2/5 p-6 overflow-y-auto">
// // //             <h1 className="text-3xl font-normal mb-8">Cabinet Configurator</h1>
            
// // //             <div className="config-select relative mb-6">
// // //               <div 
// // //                 className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
// // //                 onClick={toggleSizes}
// // //               >
// // //                 <span>Size: {sizes.find(s => s.id === config.size)?.name}</span>
// // //                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                   <path d={showSizes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
// // //                 </svg>
// // //               </div>
              
// // //               {showSizes && (
// // //                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
// // //                   {sizes.map((size) => (
// // //                     <div 
// // //                       key={size.id} 
// // //                       className="p-2 hover:bg-gray-100 cursor-pointer"
// // //                       onClick={() => {
// // //                         updateConfig('size', size.id);
// // //                         setShowSizes(false);
// // //                       }}
// // //                     >
// // //                       {size.name} - ${size.price}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
// // //             {showARViewer && (
// // //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //     <div className="bg-white p-4 rounded-lg w-full h-full max-w-4xl max-h-[90vh] overflow-auto">
// // //       <div className="flex justify-between items-center mb-4">
// // //         <h3 className="text-lg font-semibold">View in AR</h3>
// // //         <button onClick={closeARViewer} className="text-gray-500 hover:text-gray-700">
// // //           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //             <path d="M18 6L6 18M6 6l12 12" />
// // //           </svg>
// // //         </button>
// // //       </div>
// // //       {arModelUrl ? (
// // //         <>
// // //           {/* <p>Model URL: {arModelUrl}</p> Debug log */}
// // //           <button slot="ar-button" style={{ position: 'absolute', bottom: '20px', right: '20px', padding: '10px', background: '#000', color: '#fff', borderRadius: '5px' }}>
// // //               Enter AR
// // //             </button>
// // //           <model-viewer
// // //             src={arModelUrl}
// // //             ar
// // //             ar-modes="webxr scene-viewer quick-look"
// // //             camera-controls
// // //             auto-rotate
// // //             style={{ width: '100%', height: '80vh' }}
// // //             ar-placement="floor"
// // //           >
            
// // //           </model-viewer>
// // //         </>
// // //       ) : (
// // //         <p>Loading model or model URL not available...</p>
// // //       )}
// // //           </div>
// // //         </div>
// // //       )}
// // //       {showQRCode && arModelUrl && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //           <div className="bg-white p-4 rounded-lg max-w-md">
// // //             <div className="flex justify-between items-center mb-4">
// // //               <h3 className="text-lg font-semibold">Scan for AR View</h3>
// // //               <button onClick={() => setShowQRCode(false)} className="text-gray-500 hover:text-gray-700">
// // //                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                   <path d="M18 6L6 18M6 6l12 12" />
// // //                 </svg>
// // //               </button>
// // //             </div>
// // //             <QRCodeCanvas
// // //              value={`${window.location.origin}/ar-view?fileId=${encodeURIComponent(fileId)}`}
// // //               size={256}
// // //             />
// // //             <p className="mt-4 text-center">Scan this QR code with your device to view in AR</p>
// // //           </div>
// // //         </div>
// // //       )}
// // //             {showScreenshotModal && (
// // //               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //                 <div className="bg-white p-4 rounded-lg max-w-2xl max-h-[90vh] overflow-auto">
// // //                   <div className="flex justify-between items-center mb-4">
// // //                     <h3 className="text-lg font-semibold">Your Cabinet Screenshot</h3>
// // //                     <button 
// // //                       onClick={closeScreenshotModal}
// // //                       className="text-gray-500 hover:text-gray-700"
// // //                     >
// // //                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                         <path d="M18 6L6 18M6 6l12 12" />
// // //                       </svg>
// // //                     </button>
// // //                   </div>
                  
// // //                   <div className="mb-4">
// // //                     {screenshotUrl && (
// // //                       <img src={screenshotUrl} alt="Cabinet Configuration" className="max-w-full" />
// // //                     )}
// // //                   </div>
                  
// // //                   <div className="flex justify-end">
// // //                     <button
// // //                       onClick={downloadScreenshot}
// // //                       className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
// // //                     >
// // //                       Download
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}
            
// // //             <div className="config-select relative mb-6">
// // //               <div 
// // //                 className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
// // //                 onClick={toggleTextures}
// // //               >
// // //                 <span>Surface Finish: {textures.find(t => t.id === config.texture)?.name || 'Solid Color'}</span>
// // //                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                   <path d={showTextures ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
// // //                 </svg>
// // //               </div>
              
// // //               {showTextures && (
// // //                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
// // //                   {textures.map((texture) => (
// // //                     <div 
// // //                       key={texture.id} 
// // //                       className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
// // //                       onClick={() => {
// // //                         updateConfig('texture', texture.id);
// // //                         setShowTextures(false);
// // //                       }}
// // //                     >
// // //                       {texture.id && (
// // //                         <div className="w-8 h-8 mr-2 border rounded bg-gray-100 overflow-hidden">
                         
// // //                         </div>
// // //                       )}
// // //                       <span>{texture.name}</span>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
            
            
            
// // //             <div className="config-select relative mb-6">
// // //               <div 
// // //                 className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
// // //                 onClick={toggleHandleTypes}
// // //               >
// // //                 <span>Handle Type: {handleTypes.find(type => type.id === config.handleType)?.name}</span>
// // //                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                   <path d={showHandleTypes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
// // //                 </svg>
// // //               </div>
              
// // //               {showHandleTypes && (
// // //                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
// // //                   {handleTypes.map((type) => (
// // //                     <div 
// // //                       key={type.id} 
// // //                       className="p-2 hover:bg-gray-100 cursor-pointer"
// // //                       onClick={() => {
// // //                         updateConfig('handleType', type.id);
// // //                         setShowHandleTypes(false);
// // //                       }}
// // //                     >
// // //                       {type.name}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div> 
// // //              <div className="config-select relative mb-6">
// // //               <div 
// // //                 className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
// // //                 onClick={toggleHandleColors}
// // //               >
// // //                 <div className="flex items-center">
// // //                   <div 
// // //                     className="w-6 h-6 rounded mr-3" 
// // //                     style={{ backgroundColor: handleColors.find(color => color.id === config.handleColor)?.color }}
// // //                   ></div>
// // //                   <span>Handle Color: {handleColors.find(color => color.id === config.handleColor)?.name}</span>
// // //                 </div>
// // //                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                   <path d={showHandleColors ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
// // //                 </svg>
// // //               </div>
              
// // //               {showHandleColors && (
// // //                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
// // //                   {handleColors.map((color) => (
// // //                     <div 
// // //                       key={color.id} 
// // //                       className="p-2 hover:bg-gray-100 cursor-pointer"
// // //                       onClick={() => {
// // //                         updateConfig('handleColor', color.id);
// // //                         setShowHandleColors(false);
// // //                       }}
// // //                     >
// // //                       <div className="flex items-center">
// // //                         <div 
// // //                           className="w-6 h-6 rounded mr-3" 
// // //                           style={{ backgroundColor: color.color }}
// // //                         ></div>
// // //                         <span>{color.name}</span>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
            
// // //             <div className="config-select relative mb-6">
// // //               <div 
// // //                 className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
// // //                 onClick={toggleLegTypes}
// // //               >
// // //                 <span>Leg Type: {legTypes.find(type => type.id === config.legType)?.name}</span>
// // //                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                   <path d={showLegTypes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
// // //                 </svg>
// // //               </div>
              
// // //               {showLegTypes && (
// // //                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
// // //                   {legTypes.map((type) => (
// // //                     <div 
// // //                       key={type.id} 
// // //                       className="p-2 hover:bg-gray-100 cursor-pointer"
// // //                       onClick={() => {
// // //                         updateConfig('legType', type.id);
// // //                         setShowLegTypes(false);
// // //                       }}
// // //                     >
// // //                       {type.name}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             <div className="config-select relative mb-6">
// // //               <div 
// // //                 className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
// // //                 onClick={toggleLegColors}
// // //               >
// // //                 <div className="flex items-center">
// // //                   <div 
// // //                     className="w-6 h-6 rounded mr-3" 
// // //                     style={{ backgroundColor: legColors.find(color => color.name.toLowerCase() === config.legColor.toLowerCase())?.color || config.legColor }}
// // //                   ></div>
// // //                   <span>Leg Color: {legColors.find(color => color.color === config.legColor)?.name || 'Custom'}</span>
// // //                 </div>
// // //                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// // //                   <path d={showLegColors ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
// // //                 </svg>
// // //               </div>
              
// // //               {showLegColors && (
// // //                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
// // //                   {legColors.map((color) => (
// // //                     <div 
// // //                       key={color.id} 
// // //                       className="p-2 hover:bg-gray-100 cursor-pointer"
// // //                       onClick={() => {
// // //                         updateConfig('legColor', color.color);
// // //                         setShowLegColors(false);
// // //                       }}
// // //                     >
// // //                       <div className="flex items-center">
// // //                         <div 
// // //                           className="w-6 h-6 rounded mr-3" 
// // //                           style={{ backgroundColor: color.color }}
// // //                         ></div>
// // //                         <span>{color.name}</span>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </div>
            
// // //             <div className="border-t my-6"></div>
            
// // //             <div className="flex items-center justify-between">
// // //               <div>
// // //                 <p className="text-sm text-gray-600">Product Price</p>
// // //                 <div className="flex items-center">
// // //                   <span className="text-xl font-bold">$ {price}</span>
// // //                   <span className="text-sm text-gray-400 ml-2 line-through">$ {originalPrice}</span>
// // //                 </div>
// // //               </div>
              
// // //               <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
// // //                 Add to cart
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // // function App() {
// // //   return (
// // //     <Router>
// // //       <Routes>
// // //         <Route path="/" element={<CabinetConfigurator />} />
// // //         <Route path="/ar-view" element={<CabinetConfigurator />} />
// // //       </Routes>
// // //     </Router>
// // //   );
// // // }

// // // export default App;


















// // import React, { useState, useRef, Suspense, useEffect, useMemo } from 'react';
// // import { Canvas, useThree } from '@react-three/fiber';
// // import { OrbitControls, useGLTF, Environment, ContactShadows, useTexture, Html } from '@react-three/drei';
// // import * as THREE from 'three';
// // import { QRCodeCanvas } from 'qrcode.react';
// // import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
// // import Dimension from './assets/Dimension';
// // import ARViewer from './assets/Ar-viewer';
// // import { Client, Storage, ID, Permission, Role } from 'appwrite';
// // import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// // // Preload all models
// // import { TextureLoader } from 'three';
// // useGLTF.preload('/main.glb');
// // useGLTF.preload('/handle-bar.glb');
// // useGLTF.preload('/handle-knob.glb');
// // useGLTF.preload('/leg-C.glb');
// // useGLTF.preload('/leg-D.glb');

// // function TexturedCabinet({ config, showDimensions, mainRef, handleRef, legRef }) {
// //   const { scene: cabinetScene } = useGLTF('/main.glb');
// //   const handleScene = config.handleType ? useGLTF(`/handle-${config.handleType}.glb`).scene : null;
// //   const legScene = config.legType ? useGLTF(`/leg-${config.legType}.glb`).scene : null;

// //   // Memoized materials
// //   const bodyMaterial = useMemo(() => {
// //     if (!config.texture) {
// //       return new THREE.MeshStandardMaterial({
// //         color: new THREE.Color(config.color),
// //         roughness: 0.7,
// //         metalness: 0.3,
// //       });
// //     }

// //     const textureLoader = new TextureLoader();
// //     const texturePath = `/colors/${config.texture}`;
// //     const texture = textureLoader.load(texturePath, undefined, undefined, (error) => {
// //       console.error('Error loading texture:', error);
// //     });

// //     if (THREE.SRGBColorSpace !== undefined) {
// //       texture.colorSpace = THREE.SRGBColorSpace;
// //     } else {
// //       texture.encoding = THREE.sRGBEncoding;
// //     }
// //     texture.wrapS = THREE.RepeatWrapping;
// //     texture.wrapT = THREE.RepeatWrapping;
// //     texture.repeat.set(1, 1);
// //     texture.flipY = false;
// //     texture.needsUpdate = true;

// //     const roughnessMap = textureLoader.load('/RoughnessMap.png', undefined, undefined, (error) => {
// //       console.error('Error loading roughness map:', error);
// //     });
// //     if (roughnessMap) {
// //       roughnessMap.wrapS = THREE.RepeatWrapping;
// //       roughnessMap.wrapT = THREE.RepeatWrapping;
// //       roughnessMap.needsUpdate = true;
// //     }

// //     return new THREE.MeshStandardMaterial({
// //       map: texture,
// //       roughnessMap: roughnessMap || undefined,
// //       roughness: roughnessMap ? 1 : 0.8,
// //       metalness: 0.2,
// //       envMapIntensity: 1,
// //     });
// //   }, [config.texture, config.color]);

// //   const handleMaterial = useMemo(() => {
// //     let handleColorHex = '#C0C0C0';
// //     if (config.handleColor === 'gold') handleColorHex = '#FFD700';
// //     else if (config.handleColor === 'black') handleColorHex = '#000000';
// //     else if (config.handleColor === 'bronze') handleColorHex = '#CD7F32';

// //     return new THREE.MeshStandardMaterial({
// //       color: new THREE.Color(handleColorHex),
// //       roughness: 0.4,
// //       metalness: 0.8,
// //       envMapIntensity: 1,
// //     });
// //   }, [config.handleColor]);

// //   const legMaterial = useMemo(() => {
// //     return new THREE.MeshStandardMaterial({
// //       color: new THREE.Color(config.legColor),
// //       roughness: 0.3,
// //       metalness: 0.6,
// //     });
// //   }, [config.legColor]);

// //   useEffect(() => {
// //     if (mainRef.current) {
// //       const cabinetClone = cabinetScene.clone(true);
// //       cabinetClone.traverse((node) => {
// //         if (node.isMesh && (node.name.includes("565_01") || node.name.includes('frame') || node.name.includes('panel'))) {
// //           node.material = bodyMaterial.clone();
// //         }
// //       });
// //       while (mainRef.current.children.length > 0) {
// //         mainRef.current.remove(mainRef.current.children[0]);
// //       }
// //       mainRef.current.add(cabinetClone);
// //     }

// //     if (handleRef.current && handleScene) {
// //       const handleClone = handleScene.clone(true);
// //       handleClone.traverse((node) => {
// //         if (node.isMesh) {
// //           node.material = handleMaterial.clone();
// //         }
// //       });
// //       while (handleRef.current.children.length > 0) {
// //         handleRef.current.remove(handleRef.current.children[0]);
// //       }
// //       handleRef.current.add(handleClone);
// //     }

// //     if (legRef.current && legScene) {
// //       const legClone = legScene.clone(true);
// //       legClone.traverse((node) => {
// //         if (node.isMesh) {
// //           node.material = legMaterial.clone();
// //         }
// //       });
// //       while (legRef.current.children.length > 0) {
// //         legRef.current.remove(legRef.current.children[0]);
// //       }
// //       legRef.current.add(legClone);
// //     }
// //   }, [cabinetScene, handleScene, legScene, bodyMaterial, handleMaterial, legMaterial, mainRef, handleRef, legRef]);

// //   let scale = 1;
// //   if (config.size === 'small') scale = 0.8;
// //   else if (config.size === 'large') scale = 1.2;

// //   const dimensions = {
// //     width: 1.2 * scale,
// //     height: 0.8 * scale,
// //     depth: 0.5 * scale,
// //   };
// //   const widthStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
// //   const widthEnd = [dimensions.width / 2, 0, -dimensions.depth / 2];
// //   const heightStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
// //   const heightEnd = [-dimensions.width / 2, dimensions.height, -dimensions.depth / 2];
// //   const depthStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
// //   const depthEnd = [-dimensions.width / 2, 0, dimensions.depth / 2];

// //   useEffect(() => {
// //     if (showDimensions) {
// //       console.log('Dimensions visible:', dimensions);
// //     }
// //   }, [showDimensions, dimensions]);

// //   return (
// //     <group>
// //       <group ref={mainRef} scale={scale} position={[0, 0, 0]} />
// //       <group ref={handleRef} scale={scale} position={[0, 0, 0]} />
// //       <group ref={legRef} scale={scale} position={[0, 0, 0]} />
// //       {showDimensions && (
// //         <>
// //           <Dimension start={widthStart} end={widthEnd} visible={showDimensions} />
// //           <Dimension start={heightStart} end={heightEnd} visible={showDimensions} />
// //           <Dimension start={depthStart} end={depthEnd} visible={showDimensions} />
// //           <Html>
// //             <div
// //               style={{
// //                 position: 'fixed',
// //                 top: '120px',
// //                 left: '150px',
// //                 pointerEvents: 'none',
// //                 zIndex: 100,
// //                 background: 'rgba(0, 0, 0, 0.7)',
// //                 color: 'white',
// //                 padding: '10px',
// //                 borderRadius: '5px',
// //                 fontSize: '16px',
// //                 maxWidth: '200px',
// //                 boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
// //               }}
// //             >
// //               <table
// //                 style={{
// //                   width: '100%',
// //                   borderCollapse: 'collapse',
// //                   fontFamily: 'Arial, sans-serif',
// //                 }}
// //               >
// //                 <thead>
// //                   <tr>
// //                     <th style={{ padding: '5px', textAlign: 'left' }}>Dimension</th>
// //                     <th style={{ padding: '5px', textAlign: 'right' }}>Value (m)</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   <tr>
// //                     <td style={{ padding: '5px', textAlign: 'left' }}>Width</td>
// //                     <td style={{ padding: '5px', textAlign: 'right' }}>{dimensions.width.toFixed(2)}</td>
// //                   </tr>
// //                   <tr>
// //                     <td style={{ padding: '5px', textAlign: 'left' }}>Height</td>
// //                     <td style={{ padding: '5px', textAlign: 'right' }}>{dimensions.height.toFixed(2)}</td>
// //                   </tr>
// //                   <tr>
// //                     <td style={{ padding: '5px', textAlign: 'left' }}>Depth</td>
// //                     <td style={{ padding: '5px', textAlign: 'right' }}>{dimensions.depth.toFixed(2)}</td>
// //                   </tr>
// //                 </tbody>
// //               </table>
// //             </div>
// //           </Html>
// //         </>
// //       )}
// //     </group>
// //   );
// // }

// // function CabinetModel({ config, showDimensions, mainRef, handleRef, legRef }) {
// //   return (
// //     <Suspense fallback={null}>
// //       <TexturedCabinet config={config} showDimensions={showDimensions} mainRef={mainRef} handleRef={handleRef} legRef={legRef} />
// //     </Suspense>
// //   );
// // }

// // function CabinetConfigurator() {
// //   const mainRef = useRef();
// //   const handleRef = useRef();
// //   const legRef = useRef();
// //   const [config, setConfig] = useState({
// //     size: 'medium',
// //     color: 'white',
// //     woodFinish: '#8B4513',
// //     handleType: '',
// //     handleColor: 'silver',
// //     legType: '',
// //     legColor: '#000000',
// //     texture: ''
// //   });
// //   const [showDimensions, setShowDimensions] = useState(false);
// //   const [price, setPrice] = useState(200);
// //   const [originalPrice, setOriginalPrice] = useState(245);
// //   const [showSizes, setShowSizes] = useState(false);
// //   const [showTextures, setShowTextures] = useState(false);
// //   const [showHandleTypes, setShowHandleTypes] = useState(false);
// //   const [showHandleColors, setShowHandleColors] = useState(false);
// //   const [showLegTypes, setShowLegTypes] = useState(false);
// //   const [showLegColors, setShowLegColors] = useState(false);
// //   const [viewMode, setViewMode] = useState('default');
// //   const controlsRef = useRef();
// //   const [screenshotUrl, setScreenshotUrl] = useState(null);
// //   const [showScreenshotModal, setShowScreenshotModal] = useState(false);
// //   const [showARViewer, setShowARViewer] = useState(false);
// //   const [arModelUrl, setArModelUrl] = useState(null);
// //   const [showQRCode, setShowQRCode] = useState(false);
// //   const [fileId, setFileId] = useState(null);

// //   const location = useLocation();

// //   const textures = [
// //     { id: '', name: 'Solid Color' },
// //     { id: 'Raya.png', name: 'Natural Wood' },
// //     { id: 'Empire.png', name: 'White Marble' },
// //     { id: 'Amber.png', name: 'Polished Concrete' },
// //     { id: 'Bitmore.png', name: 'Black Leather' }
// //   ];

// //   const sizes = [
// //     { id: 'small', name: 'Small', price: 180 },
// //     { id: 'medium', name: 'Medium', price: 200 },
// //     { id: 'large', name: 'Large', price: 240 }
// //   ];

// //   const handleTypes = [
// //     { id: 'bar', name: 'Bar Handle' },
// //     { id: 'knob', name: 'Knob Handle' }
// //   ];

// //   const handleColors = [
// //     { id: 'silver', name: 'Silver', color: '#C0C0C0' },
// //     { id: 'gold', name: 'Gold', color: '#FFD700' },
// //     { id: 'black', name: 'Black', color: '#000000' },
// //     { id: 'bronze', name: 'Bronze', color: '#CD7F32' }
// //   ];

// //   const legTypes = [
// //     { id: 'C', name: 'Classic Legs' },
// //     { id: 'D', name: 'Designer Legs' }
// //   ];

// //   const legColors = [
// //     { id: 'black', name: 'Black', color: '#000000' },
// //     { id: 'silver', name: 'Silver', color: '#C0C0C0' },
// //     { id: 'gold', name: 'Gold', color: '#FFD700' },
// //     { id: 'bronze', name: 'Bronze', color: '#CD7F32' }
// //   ];

// //   const closeAllDropdowns = () => {
// //     setShowSizes(false);
// //     setShowTextures(false);
// //     setShowHandleTypes(false);
// //     setShowHandleColors(false);
// //     setShowLegTypes(false);
// //     setShowLegColors(false);
// //   };

// //   const toggleSizes = () => {
// //     if (showSizes) setShowSizes(false);
// //     else { closeAllDropdowns(); setShowSizes(true); }
// //   };

// //   const toggleTextures = () => {
// //     if (showTextures) setShowTextures(false);
// //     else { closeAllDropdowns(); setShowTextures(true); }
// //   };

// //   const toggleHandleTypes = () => {
// //     if (showHandleTypes) setShowHandleTypes(false);
// //     else { closeAllDropdowns(); setShowHandleTypes(true); }
// //   };

// //   const toggleHandleColors = () => {
// //     if (showHandleColors) setShowHandleColors(false);
// //     else { closeAllDropdowns(); setShowHandleColors(true); }
// //   };

// //   const toggleLegTypes = () => {
// //     if (showLegTypes) setShowLegTypes(false);
// //     else { closeAllDropdowns(); setShowLegTypes(true); }
// //   };

// //   const toggleLegColors = () => {
// //     if (showLegColors) setShowLegColors(false);
// //     else { closeAllDropdowns(); setShowLegColors(true); }
// //   };

// //   function CanvasCapture() {
// //     const { gl, scene, camera } = useThree();
// //     useEffect(() => {
// //       gl.captureFrame = () => {
// //         gl.render(scene, camera);
// //         return gl.domElement.toDataURL('image/png');
// //       };
// //     }, [gl, scene, camera]);
// //     return null;
// //   }

// //   const toggleDimensions = () => {
// //     if (!showARViewer) setShowDimensions(prev => !prev);
// //   };

// //   const handleViewChange = (mode) => {
// //     setViewMode(mode);
// //     if (controlsRef.current) {
// //       switch (mode) {
// //         case 'top':
// //           controlsRef.current.setAzimuthalAngle(0);
// //           controlsRef.current.setPolarAngle(0);
// //           break;
// //         case 'front':
// //           controlsRef.current.setAzimuthalAngle(0);
// //           controlsRef.current.setPolarAngle(Math.PI / 2);
// //           break;
// //         case 'side':
// //           controlsRef.current.setAzimuthalAngle(Math.PI / 2);
// //           controlsRef.current.setPolarAngle(Math.PI / 2);
// //           break;
// //         case 'free':
// //           controlsRef.current.setAzimuthalAngle(Math.PI / 4);
// //           controlsRef.current.setPolarAngle(Math.PI / 4);
// //           break;
// //         default:
// //           controlsRef.current.setAzimuthalAngle(Math.PI / 4);
// //           controlsRef.current.setPolarAngle(Math.PI / 3);
// //       }
// //       controlsRef.current.update();
// //     }
// //   };

// //   const takeScreenshot = () => {
// //     const canvas = document.querySelector('canvas');
// //     if (canvas) {
// //       if (controlsRef.current) controlsRef.current.update();
// //       const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
// //       if (gl) {
// //         gl.render && gl.render();
// //         const dataUrl = canvas.toDataURL('image/png');
// //         setScreenshotUrl(dataUrl);
// //         setShowScreenshotModal(true);
// //       }
// //     }
// //   };

// //   const downloadScreenshot = () => {
// //     if (screenshotUrl) {
// //       const link = document.createElement('a');
// //       link.href = screenshotUrl;
// //       link.download = `cabinet-config-${new Date().getTime()}.png`;
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //     }
// //   };

// //   const downloadGLB = () => {
// //     generateGLB().then(({ url }) => {
// //       const link = document.createElement('a');
// //       link.href = url;
// //       link.download = `cabinet-config-${new Date().getTime()}.glb`;
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //     }).catch(error => console.error('Download failed:', error));
// //   };

// //   const prepareSceneForExport = (group) => {
// //     group.traverse((node) => {
// //       if (node.isMesh && node.material) {
// //         const material = node.material.clone();
// //         if (material.map) material.map.needsUpdate = true;
// //         node.material = material;
// //         node.material.needsUpdate = true;
// //       }
// //     });
// //     return group;
// //   };

// //   const client = new Client()
// //     .setEndpoint('https://cloud.appwrite.io/v1')
// //     .setProject('67efeb660016a94a1b36');

// //   const storage = new Storage(client);

// //   const generateGLB = () => {
// //     console.log('Generating GLB...');
// //     const exporter = new GLTFExporter();
// //     const sceneGroup = new THREE.Group();

// //     if (!mainRef.current || !handleRef.current || !legRef.current) {
// //       console.error('Scene refs not ready');
// //       return Promise.reject('Scene not ready');
// //     }

// //     sceneGroup.add(prepareSceneForExport(mainRef.current.clone()));
// //     sceneGroup.add(prepareSceneForExport(handleRef.current.clone()));
// //     sceneGroup.add(prepareSceneForExport(legRef.current.clone()));

// //     const options = {
// //       binary: true,
// //       trs: false,
// //       onlyVisible: true,
// //       includeCustomExtensions: false,
// //     };

// //     return new Promise((resolve, reject) => {
// //       exporter.parse(
// //         sceneGroup,
// //         async (gltf) => {
// //           try {
// //             const blob = new Blob([gltf], { type: 'model/gltf-binary' });
// //             const fileName = `cabinet-config-${new Date().getTime()}.glb`;
// //             const file = new File([blob], fileName, { type: 'model/gltf-binary' });

// //             const response = await storage.createFile(
// //               '67efec5900294e3b8bf2',
// //               ID.unique(),
// //               file,
// //               [Permission.read(Role.any())]
// //             );

// //             console.log('GLB uploaded to Appwrite:', response);
// //             const newFileId = response.$id;
// //             setFileId(newFileId);

// //             const fileUrl = storage.getFileView('67efec5900294e3b8bf2', newFileId);
// //             console.log('Generated file URL:', fileUrl);
// //             setArModelUrl(fileUrl);

// //             resolve({ url: fileUrl, fileId: newFileId });
// //           } catch (error) {
// //             console.error('Error uploading to Appwrite:', error);
// //             alert('Failed to upload model to Appwrite.');
// //             reject(error);
// //           }
// //         },
// //         (error) => {
// //           console.error('Error exporting GLB:', error);
// //           reject(error);
// //         },
// //         options
// //       );
// //     });
// //   };

// //   const openARViewerWithQR = async () => {
// //     try {
// //       const qrUrl = await generateQRCode();
// //       if (qrUrl) console.log('QR Code generated successfully:', qrUrl);
// //     } catch (error) {
// //       console.error('Failed to open AR viewer with QR:', error);
// //     }
// //   };

// //   const openDirectARViewer = async () => {
// //     try {
// //       const { url } = await generateGLB();
// //       if (url) {
// //         setArModelUrl(url);
// //         setShowARViewer(true);
// //         setShowDimensions(false); // Ensure dimensions are off
// //       }
// //     } catch (error) {
// //       console.error('Failed to open direct AR viewer:', error);
// //       alert('Failed to load AR model.');
// //     }
// //   };

// //   const closeARViewer = () => {
// //     setShowARViewer(false);
// //     if (arModelUrl) {
// //       URL.revokeObjectURL(arModelUrl);
// //       setArModelUrl(null);
// //     }
// //   };

// //   const generateQRCode = async () => {
// //     console.log('Generating QR Code...');
// //     try {
// //       const { url, fileId: generatedFileId } = await generateGLB();
// //       if (url && generatedFileId) {
// //         const qrUrl = `${window.location.origin}/ar-view?fileId=${encodeURIComponent(generatedFileId)}`;
// //         console.log('Generated QR URL with Appwrite fileId:', qrUrl);
// //         setShowQRCode(true);
// //         return qrUrl;
// //       } else {
// //         console.error('No URL or fileId generated for QR code');
// //         alert('Failed to generate QR code: No URL or fileId returned');
// //       }
// //     } catch (error) {
// //       console.error('Error generating QR code:', error);
// //       alert('Failed to generate QR code.');
// //     }
// //   };

// //   useEffect(() => {
// //     const params = new URLSearchParams(location.search);
// //     const fileIdFromUrl = params.get('fileId');
// //     if (fileIdFromUrl && location.pathname === '/ar-view') {
// //       console.log('Detected QR scan, fetching model with fileId:', fileIdFromUrl);
// //       const modelUrl = storage.getFileView('67efec5900294e3b8bf2', fileIdFromUrl);
// //       console.log('Fetched model URL from Appwrite:', modelUrl);
// //       setArModelUrl(modelUrl);
// //       setShowARViewer(true);
// //       setShowDimensions(false); // Ensure dimensions are off when opened via QR
// //     }
// //   }, [location]);

// //   const closeScreenshotModal = () => {
// //     setShowScreenshotModal(false);
// //   };

// //   useEffect(() => {
// //     const basePrice = sizes.find(s => s.id === config.size)?.price || 200;
// //     let totalPrice = basePrice;
// //     if (config.texture) totalPrice += 25;
// //     if (config.handleColor === 'gold') totalPrice += 15;
// //     else if (config.handleColor === 'bronze') totalPrice += 10;
// //     if (config.legType === 'D') totalPrice += 25;
// //     if (config.legColor === '#FFD700') totalPrice += 20;
// //     else if (config.legColor === '#CD7F32') totalPrice += 15;
// //     setPrice(totalPrice);
// //     setOriginalPrice(Math.round(totalPrice * 1.225));
// //   }, [config]);

// //   const updateConfig = (key, value) => {
// //     console.log(`Updating config: key = ${key}, value = ${value}`);
// //     setConfig((prev) => {
// //       const newConfig = { ...prev };
// //       if (key === "color" && value !== "") {
// //         if (prev.texture) newConfig.texture = "";
// //       } else if (key === "texture" && value !== "") {
// //         if (prev.color) newConfig.color = "";
// //       }
// //       newConfig[key] = value;
// //       return newConfig;
// //     });
// //   };

// //   useEffect(() => {
// //     if (showARViewer) setShowDimensions(false);
// //   }, [showARViewer]);

// //   return (
// //     <div className="min-h-screen flex flex-col">
// //       <div className="flex flex-1">
// //         <div className="w-16 border-r">
// //           <div className="flex flex-col items-center pt-4 gap-4">
// //             <button 
// //               className={`p-2 border rounded ${viewMode === 'default' ? 'bg-gray-200' : ''}`}
// //               onClick={() => handleViewChange('default')}
// //               title="Default View"
// //             >
// //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                 <rect x="3" y="3" width="18" height="18" rx="2" />
// //               </svg>
// //             </button>
// //             <button 
// //               className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-4"
// //               onClick={downloadGLB}
// //               title="Download GLB"
// //             >
// //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
// //                 <polyline points="7 10 12 15 17 10" />
// //                 <line x1="12" y1="15" x2="12" y2="3" />
// //               </svg>
// //             </button>
// //             <button 
// //               className={`p-2 border rounded ${viewMode === 'top' ? 'bg-gray-200' : ''}`}
// //               onClick={() => handleViewChange('top')}
// //               title="Top View"
// //             >
// //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                 <path d="M3 3h18v18H3z" />
// //               </svg>
// //             </button>
// //             <button 
// //               className={`p-2 border rounded ${viewMode === 'front' ? 'bg-gray-200' : ''}`}
// //               onClick={() => handleViewChange('front')}
// //               title="Front View"
// //             >
// //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                 <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
// //               </svg>
// //             </button>
// //             <button 
// //               className={`p-2 border rounded ${viewMode === 'free' ? 'bg-gray-200' : ''}`}
// //               onClick={() => handleViewChange('free')}
// //               title="Free View"
// //             >
// //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                 <path d="M4 4h16v16H4z" />
// //                 <path d="M9 9l6 6M15 9l-6 6" />
// //               </svg>
// //             </button>
// //             <button 
// //               className={`p-2 border rounded ${showDimensions ? 'bg-blue-200' : 'bg-gray-100'} hover:bg-blue-100`}
// //               onClick={toggleDimensions}
// //               title="Show Dimensions"
// //             >
// //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                 <path d="M2 12h20M12 2v20M20 16v-4M4 8v8M16 4h4M4 20h4" />
// //               </svg>
// //             </button>
// //             <button 
// //               className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-4"
// //               onClick={openARViewerWithQR}
// //               title="View in AR with QR"
// //             >
// //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                 <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 12 8 7v10l8-5z" />
// //               </svg>
// //             </button>
// //             <button 
// //               className="p-2 border rounded bg-green-50 hover:bg-green-100 mt-4"
// //               onClick={openDirectARViewer}
// //               title="Direct AR View"
// //             >
// //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                 <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8zm-1-13h2v4h4v2h-4v4h-2v-4H7v-2h4z" />
// //               </svg>
// //             </button>
// //             <button 
// //               className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-4"
// //               onClick={takeScreenshot}
// //               title="Screenshot"
// //             >
// //               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                 <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
// //                 <circle cx="12" cy="12" r="3" />
// //                 <path d="M16.5 7.5h.01" />
// //               </svg>
// //             </button>
// //           </div>
// //         </div>

// //         <div className="flex-1 flex flex-col md:flex-row">
// //           <div className="w-full md:w-3/5 h-[50vh] md:h-auto flex items-center justify-center bg-gray-50">
// //             <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
// //               <ambientLight intensity={0.5} />
// //               <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
// //               <pointLight position={[-10, -10, -10]} intensity={0.5} />
// //               <Suspense fallback={null}>
// //                 <CabinetModel config={config} showDimensions={showDimensions} mainRef={mainRef} handleRef={handleRef} legRef={legRef} />
// //                 <Environment preset="city" />
// //                 <ContactShadows opacity={0.5} scale={10} blur={1} far={10} resolution={256} />
// //                 <CanvasCapture />
// //               </Suspense>
// //               <OrbitControls 
// //                 ref={controlsRef}
// //                 enablePan={viewMode === 'free'}
// //                 enableZoom={true}
// //                 enableRotate={viewMode === 'free' || viewMode === 'default'}
// //                 minPolarAngle={viewMode === 'top' ? 0 : viewMode === 'front' ? Math.PI / 2 : 0}
// //                 maxPolarAngle={viewMode === 'top' ? 0 : viewMode === 'front' ? Math.PI / 2 : Math.PI}
// //               />
// //             </Canvas>
// //           </div>
// //           <div className="w-full md:w-2/5 p-6 overflow-y-auto">
// //             <h1 className="text-3xl font-normal mb-8">Cabinet Configurator</h1>
// //             <div className="config-select relative mb-6">
// //               <div 
// //                 className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
// //                 onClick={toggleSizes}
// //               >
// //                 <span>Size: {sizes.find(s => s.id === config.size)?.name}</span>
// //                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                   <path d={showSizes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
// //                 </svg>
// //               </div>
// //               {showSizes && (
// //                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
// //                   {sizes.map((size) => (
// //                     <div 
// //                       key={size.id} 
// //                       className="p-2 hover:bg-gray-100 cursor-pointer"
// //                       onClick={() => { updateConfig('size', size.id); setShowSizes(false); }}
// //                     >
// //                       {size.name} - ${size.price}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //             {showARViewer && (
// //               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //                 <div className="bg-white p-4 rounded-lg w-full h-full max-w-4xl max-h-[90vh] overflow-auto">
// //                   <div className="flex justify-between items-center mb-4">
// //                     <h3 className="text-lg font-semibold">View in AR</h3>
// //                     <button onClick={closeARViewer} className="text-gray-500 hover:text-gray-700">
// //                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                         <path d="M18 6L6 18M6 6l12 12" />
// //                       </svg>
// //                     </button>
// //                   </div>
// //                   {arModelUrl ? (
// //                     <>
// //                       <button slot="ar-button" style={{ position: 'absolute', bottom: '20px', right: '20px', padding: '10px', background: '#000', color: '#fff', borderRadius: '5px' }}>
// //                         Enter AR
// //                       </button>
// //                       <model-viewer
// //                         src={arModelUrl}
// //                         ar
// //                         ar-modes="webxr scene-viewer quick-look"
// //                         camera-controls
// //                         auto-rotate
// //                         style={{ width: '100%', height: '80vh' }}
// //                         ar-placement="floor"
// //                       />
// //                     </>
// //                   ) : (
// //                     <p>Loading model or model URL not available...</p>
// //                   )}
// //                 </div>
// //               </div>
// //             )}
// //             {showQRCode && arModelUrl && (
// //               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //                 <div className="bg-white p-4 rounded-lg max-w-md">
// //                   <div className="flex justify-between items-center mb-4">
// //                     <h3 className="text-lg font-semibold">Scan for AR View</h3>
// //                     <button onClick={() => setShowQRCode(false)} className="text-gray-500 hover:text-gray-700">
// //                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                         <path d="M18 6L6 18M6 6l12 12" />
// //                       </svg>
// //                     </button>
// //                   </div>
// //                   <QRCodeCanvas
// //                     value={`${window.location.origin}/ar-view?fileId=${encodeURIComponent(fileId)}`}
// //                     size={256}
// //                   />
// //                   <p className="mt-4 text-center">Scan this QR code with your device to view in AR</p>
// //                 </div>
// //               </div>
// //             )}
// //             {showScreenshotModal && (
// //               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //                 <div className="bg-white p-4 rounded-lg max-w-2xl max-h-[90vh] overflow-auto">
// //                   <div className="flex justify-between items-center mb-4">
// //                     <h3 className="text-lg font-semibold">Your Cabinet Screenshot</h3>
// //                     <button onClick={closeScreenshotModal} className="text-gray-500 hover:text-gray-700">
// //                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                         <path d="M18 6L6 18M6 6l12 12" />
// //                       </svg>
// //                     </button>
// //                   </div>
// //                   <div className="mb-4">
// //                     {screenshotUrl && <img src={screenshotUrl} alt="Cabinet Configuration" className="max-w-full" />}
// //                   </div>
// //                   <div className="flex justify-end">
// //                     <button
// //                       onClick={downloadScreenshot}
// //                       className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
// //                     >
// //                       Download
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //             <div className="config-select relative mb-6">
// //               <div 
// //                 className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
// //                 onClick={toggleTextures}
// //               >
// //                 <span>Surface Finish: {textures.find(t => t.id === config.texture)?.name || 'Solid Color'}</span>
// //                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                   <path d={showTextures ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
// //                 </svg>
// //               </div>
// //               {showTextures && (
// //                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
// //                   {textures.map((texture) => (
// //                     <div 
// //                       key={texture.id} 
// //                       className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
// //                       onClick={() => { updateConfig('texture', texture.id); setShowTextures(false); }}
// //                     >
// //                       {texture.id && <div className="w-8 h-8 mr-2 border rounded bg-gray-100 overflow-hidden"></div>}
// //                       <span>{texture.name}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //             <div className="config-select relative mb-6">
// //               <div 
// //                 className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
// //                 onClick={toggleHandleTypes}
// //               >
// //                 <span>Handle Type: {handleTypes.find(type => type.id === config.handleType)?.name}</span>
// //                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                   <path d={showHandleTypes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
// //                 </svg>
// //               </div>
// //               {showHandleTypes && (
// //                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
// //                   {handleTypes.map((type) => (
// //                     <div 
// //                       key={type.id} 
// //                       className="p-2 hover:bg-gray-100 cursor-pointer"
// //                       onClick={() => { updateConfig('handleType', type.id); setShowHandleTypes(false); }}
// //                     >
// //                       {type.name}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //             <div className="config-select relative mb-6">
// //               <div 
// //                 className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
// //                 onClick={toggleHandleColors}
// //               >
// //                 <div className="flex items-center">
// //                   <div 
// //                     className="w-6 h-6 rounded mr-3" 
// //                     style={{ backgroundColor: handleColors.find(color => color.id === config.handleColor)?.color }}
// //                   ></div>
// //                   <span>Handle Color: {handleColors.find(color => color.id === config.handleColor)?.name}</span>
// //                 </div>
// //                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                   <path d={showHandleColors ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
// //                 </svg>
// //               </div>
// //               {showHandleColors && (
// //                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
// //                   {handleColors.map((color) => (
// //                     <div 
// //                       key={color.id} 
// //                       className="p-2 hover:bg-gray-100 cursor-pointer"
// //                       onClick={() => { updateConfig('handleColor', color.id); setShowHandleColors(false); }}
// //                     >
// //                       <div className="flex items-center">
// //                         <div className="w-6 h-6 rounded mr-3" style={{ backgroundColor: color.color }}></div>
// //                         <span>{color.name}</span>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //             <div className="config-select relative mb-6">
// //               <div 
// //                 className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
// //                 onClick={toggleLegTypes}
// //               >
// //                 <span>Leg Type: {legTypes.find(type => type.id === config.legType)?.name}</span>
// //                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                   <path d={showLegTypes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
// //                 </svg>
// //               </div>
// //               {showLegTypes && (
// //                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
// //                   {legTypes.map((type) => (
// //                     <div 
// //                       key={type.id} 
// //                       className="p-2 hover:bg-gray-100 cursor-pointer"
// //                       onClick={() => { updateConfig('legType', type.id); setShowLegTypes(false); }}
// //                     >
// //                       {type.name}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //             <div className="config-select relative mb-6">
// //               <div 
// //                 className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
// //                 onClick={toggleLegColors}
// //               >
// //                 <div className="flex items-center">
// //                   <div 
// //                     className="w-6 h-6 rounded mr-3" 
// //                     style={{ backgroundColor: legColors.find(color => color.name.toLowerCase() === config.legColor.toLowerCase())?.color || config.legColor }}
// //                   ></div>
// //                   <span>Leg Color: {legColors.find(color => color.color === config.legColor)?.name || 'Custom'}</span>
// //                 </div>
// //                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
// //                   <path d={showLegColors ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
// //                 </svg>
// //               </div>
// //               {showLegColors && (
// //                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
// //                   {legColors.map((color) => (
// //                     <div 
// //                       key={color.id} 
// //                       className="p-2 hover:bg-gray-100 cursor-pointer"
// //                       onClick={() => { updateConfig('legColor', color.color); setShowLegColors(false); }}
// //                     >
// //                       <div className="flex items-center">
// //                         <div className="w-6 h-6 rounded mr-3" style={{ backgroundColor: color.color }}></div>
// //                         <span>{color.name}</span>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //             <div className="border-t my-6"></div>
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm text-gray-600">Product Price</p>
// //                 <div className="flex items-center">
// //                   <span className="text-xl font-bold">$ {price}</span>
// //                   <span className="text-sm text-gray-400 ml-2 line-through">$ {originalPrice}</span>
// //                 </div>
// //               </div>
// //               <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
// //                 Add to cart
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<CabinetConfigurator />} />
// //         <Route path="/ar-view" element={<CabinetConfigurator />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;










// import React, { useState, useRef, Suspense, useEffect, useMemo } from 'react';
// import { Canvas, useThree } from '@react-three/fiber';
// import { OrbitControls, useGLTF, Environment, ContactShadows, useTexture, Html } from '@react-three/drei';
// import * as THREE from 'three';
// import { QRCodeCanvas } from 'qrcode.react';
// import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
// import Dimension from './assets/Dimension';
// import ARViewer from './assets/Ar-viewer';
// import { Client, Storage, ID, Permission, Role } from 'appwrite';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// // Preload all models
// import { TextureLoader } from 'three';
// useGLTF.preload('/main.glb');
// useGLTF.preload('/handle-bar.glb');
// useGLTF.preload('/handle-knob.glb');
// useGLTF.preload('/leg-C.glb');
// useGLTF.preload('/leg-D.glb');

// function TexturedCabinet({ config, showDimensions, mainRef, handleRef, legRef }) {
//   const { scene: cabinetScene } = useGLTF('/main.glb');
//   const handleScene = config.handleType ? useGLTF(`/handle-${config.handleType}.glb`).scene : null;
//   const legScene = config.legType ? useGLTF(`/leg-${config.legType}.glb`).scene : null;

//   // Memoized materials
//   const bodyMaterial = useMemo(() => {
//     if (!config.texture) {
//       return new THREE.MeshStandardMaterial({
//         color: new THREE.Color(config.color),
//         roughness: 0.7,
//         metalness: 0.3,
//       });
//     }

//     const textureLoader = new TextureLoader();
//     const texturePath = `/colors/${config.texture}`;
//     const texture = textureLoader.load(texturePath, undefined, undefined, (error) => {
//       console.error('Error loading texture:', error);
//     });

//     if (THREE.SRGBColorSpace !== undefined) {
//       texture.colorSpace = THREE.SRGBColorSpace;
//     } else {
//       texture.encoding = THREE.sRGBEncoding;
//     }
//     texture.wrapS = THREE.RepeatWrapping;
//     texture.wrapT = THREE.RepeatWrapping;
//     texture.repeat.set(1, 1);
//     texture.flipY = false;
//     texture.needsUpdate = true;

//     const roughnessMap = textureLoader.load('/RoughnessMap.png', undefined, undefined, (error) => {
//       console.error('Error loading roughness map:', error);
//     });
//     if (roughnessMap) {
//       roughnessMap.wrapS = THREE.RepeatWrapping;
//       roughnessMap.wrapT = THREE.RepeatWrapping;
//       roughnessMap.needsUpdate = true;
//     }

//     return new THREE.MeshStandardMaterial({
//       map: texture,
//       roughnessMap: roughnessMap || undefined,
//       roughness: roughnessMap ? 1 : 0.8,
//       metalness: 0.2,
//       envMapIntensity: 1,
//     });
//   }, [config.texture, config.color]);

//   const handleMaterial = useMemo(() => {
//     let handleColorHex = '#C0C0C0';
//     if (config.handleColor === 'gold') handleColorHex = '#FFD700';
//     else if (config.handleColor === 'black') handleColorHex = '#000000';
//     else if (config.handleColor === 'bronze') handleColorHex = '#CD7F32';

//     return new THREE.MeshStandardMaterial({
//       color: new THREE.Color(handleColorHex),
//       roughness: 0.4,
//       metalness: 0.8,
//       envMapIntensity: 1,
//     });
//   }, [config.handleColor]);

//   const legMaterial = useMemo(() => {
//     return new THREE.MeshStandardMaterial({
//       color: new THREE.Color(config.legColor),
//       roughness: 0.3,
//       metalness: 0.6,
//     });
//   }, [config.legColor]);

//   useEffect(() => {
//     if (mainRef.current) {
//       const cabinetClone = cabinetScene.clone(true);
//       cabinetClone.traverse((node) => {
//         if (node.isMesh && (node.name.includes("565_01") || node.name.includes('frame') || node.name.includes('panel'))) {
//           node.material = bodyMaterial.clone();
//         }
//       });
//       while (mainRef.current.children.length > 0) {
//         mainRef.current.remove(mainRef.current.children[0]);
//       }
//       mainRef.current.add(cabinetClone);
//     }

//     if (handleRef.current && handleScene) {
//       const handleClone = handleScene.clone(true);
//       handleClone.traverse((node) => {
//         if (node.isMesh) {
//           node.material = handleMaterial.clone();
//         }
//       });
//       while (handleRef.current.children.length > 0) {
//         handleRef.current.remove(handleRef.current.children[0]);
//       }
//       handleRef.current.add(handleClone);
//     }

//     if (legRef.current && legScene) {
//       const legClone = legScene.clone(true);
//       legClone.traverse((node) => {
//         if (node.isMesh) {
//           node.material = legMaterial.clone();
//         }
//       });
//       while (legRef.current.children.length > 0) {
//         legRef.current.remove(legRef.current.children[0]);
//       }
//       legRef.current.add(legClone);
//     }
//   }, [cabinetScene, handleScene, legScene, bodyMaterial, handleMaterial, legMaterial, mainRef, handleRef, legRef]);

//   let scale = 1;
//   if (config.size === 'small') scale = 0.8;
//   else if (config.size === 'large') scale = 1.2;

//   const dimensions = {
//     width: 1.2 * scale,
//     height: 0.8 * scale,
//     depth: 0.5 * scale,
//   };
//   const widthStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
//   const widthEnd = [dimensions.width / 2, 0, -dimensions.depth / 2];
//   const heightStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
//   const heightEnd = [-dimensions.width / 2, dimensions.height, -dimensions.depth / 2];
//   const depthStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
//   const depthEnd = [-dimensions.width / 2, 0, dimensions.depth / 2];

//   useEffect(() => {
//     if (showDimensions) {
//       console.log('Dimensions visible:', dimensions);
//     }
//   }, [showDimensions, dimensions]);

//   return (
//     <group>
//       <group ref={mainRef} scale={scale} position={[0, 0, 0]} />
//       <group ref={handleRef} scale={scale} position={[0, 0, 0]} />
//       <group ref={legRef} scale={scale} position={[0, 0, 0]} />
//       {showDimensions && (
//         <>
//           <Dimension start={widthStart} end={widthEnd} visible={showDimensions} />
//           <Dimension start={heightStart} end={heightEnd} visible={showDimensions} />
//           <Dimension start={depthStart} end={depthEnd} visible={showDimensions} />
//           <Html>
//             <div
//               className="fixed top-20 left-2 sm:left-20 md:left-32 lg:left-40 p-2 sm:p-3 bg-black bg-opacity-70 text-white rounded-md shadow-md text-xs sm:text-sm md:text-base max-w-[150px] sm:max-w-[180px] md:max-w-[200px] z-50"
//             >
//               <table className="w-full border-collapse font-sans">
//                 <thead>
//                   <tr>
//                     <th className="p-1 sm:p-2 text-left">Dimension</th>
//                     <th className="p-1 sm:p-2 text-right">Value (m)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="p-1 sm:p-2 text-left">Width</td>
//                     <td className="p-1 sm:p-2 text-right">{dimensions.width.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td className="p-1 sm:p-2 text-left">Height</td>
//                     <td className="p-1 sm:p-2 text-right">{dimensions.height.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td className="p-1 sm:p-2 text-left">Depth</td>
//                     <td className="p-1 sm:p-2 text-right">{dimensions.depth.toFixed(2)}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </Html>
//         </>
//       )}
//     </group>
//   );
// }

// function CabinetModel({ config, showDimensions, mainRef, handleRef, legRef }) {
//   return (
//     <Suspense fallback={null}>
//       <TexturedCabinet config={config} showDimensions={showDimensions} mainRef={mainRef} handleRef={handleRef} legRef={legRef} />
//     </Suspense>
//   );
// }

// function CabinetConfigurator() {
//   const mainRef = useRef();
//   const handleRef = useRef();
//   const legRef = useRef();
//   const [config, setConfig] = useState({
//     size: 'medium',
//     color: 'white',
//     woodFinish: '#8B4513',
//     handleType: '',
//     handleColor: 'silver',
//     legType: '',
//     legColor: '#000000',
//     texture: ''
//   });
//   const [showDimensions, setShowDimensions] = useState(false);
//   const [price, setPrice] = useState(200);
//   const [originalPrice, setOriginalPrice] = useState(245);
//   const [showSizes, setShowSizes] = useState(false);
//   const [showTextures, setShowTextures] = useState(false);
//   const [showHandleTypes, setShowHandleTypes] = useState(false);
//   const [showHandleColors, setShowHandleColors] = useState(false);
//   const [showLegTypes, setShowLegTypes] = useState(false);
//   const [showLegColors, setShowLegColors] = useState(false);
//   const [viewMode, setViewMode] = useState('default');
//   const controlsRef = useRef();
//   const [screenshotUrl, setScreenshotUrl] = useState(null);
//   const [showScreenshotModal, setShowScreenshotModal] = useState(false);
//   const [showARViewer, setShowARViewer] = useState(false);
//   const [arModelUrl, setArModelUrl] = useState(null);
//   const [showQRCode, setShowQRCode] = useState(false);
//   const [fileId, setFileId] = useState(null);

//   const location = useLocation();

//   const textures = [
//     { id: '', name: 'Solid Color' },
//     { id: 'Raya.png', name: 'Natural Wood' },
//     { id: 'Empire.png', name: 'White Marble' },
//     { id: 'Amber.png', name: 'Polished Concrete' },
//     { id: 'Bitmore.png', name: 'Black Leather' }
//   ];

//   const sizes = [
//     { id: 'small', name: 'Small', price: 180 },
//     { id: 'medium', name: 'Medium', price: 200 },
//     { id: 'large', name: 'Large', price: 240 }
//   ];

//   const handleTypes = [
//     { id: 'bar', name: 'Bar Handle' },
//     { id: 'knob', name: 'Knob Handle' }
//   ];

//   const handleColors = [
//     { id: 'silver', name: 'Silver', color: '#C0C0C0' },
//     { id: 'gold', name: 'Gold', color: '#FFD700' },
//     { id: 'black', name: 'Black', color: '#000000' },
//     { id: 'bronze', name: 'Bronze', color: '#CD7F32' }
//   ];

//   const legTypes = [
//     { id: 'C', name: 'Classic Legs' },
//     { id: 'D', name: 'Designer Legs' }
//   ];

//   const legColors = [
//     { id: 'black', name: 'Black', color: '#000000' },
//     { id: 'silver', name: 'Silver', color: '#C0C0C0' },
//     { id: 'gold', name: 'Gold', color: '#FFD700' },
//     { id: 'bronze', name: 'Bronze', color: '#CD7F32' }
//   ];

//   const closeAllDropdowns = () => {
//     setShowSizes(false);
//     setShowTextures(false);
//     setShowHandleTypes(false);
//     setShowHandleColors(false);
//     setShowLegTypes(false);
//     setShowLegColors(false);
//   };

//   const toggleSizes = () => {
//     if (showSizes) setShowSizes(false);
//     else { closeAllDropdowns(); setShowSizes(true); }
//   };

//   const toggleTextures = () => {
//     if (showTextures) setShowTextures(false);
//     else { closeAllDropdowns(); setShowTextures(true); }
//   };

//   const toggleHandleTypes = () => {
//     if (showHandleTypes) setShowHandleTypes(false);
//     else { closeAllDropdowns(); setShowHandleTypes(true); }
//   };

//   const toggleHandleColors = () => {
//     if (showHandleColors) setShowHandleColors(false);
//     else { closeAllDropdowns(); setShowHandleColors(true); }
//   };

//   const toggleLegTypes = () => {
//     if (showLegTypes) setShowLegTypes(false);
//     else { closeAllDropdowns(); setShowLegTypes(true); }
//   };

//   const toggleLegColors = () => {
//     if (showLegColors) setShowLegColors(false);
//     else { closeAllDropdowns(); setShowLegColors(true); }
//   };

//   function CanvasCapture() {
//     const { gl, scene, camera } = useThree();
//     useEffect(() => {
//       gl.captureFrame = () => {
//         gl.render(scene, camera);
//         return gl.domElement.toDataURL('image/png');
//       };
//     }, [gl, scene, camera]);
//     return null;
//   }

//   const toggleDimensions = () => {
//     if (!showARViewer) setShowDimensions(prev => !prev);
//   };

//   const handleViewChange = (mode) => {
//     setViewMode(mode);
//     if (controlsRef.current) {
//       switch (mode) {
//         case 'top':
//           controlsRef.current.setAzimuthalAngle(0);
//           controlsRef.current.setPolarAngle(0);
//           break;
//         case 'front':
//           controlsRef.current.setAzimuthalAngle(0);
//           controlsRef.current.setPolarAngle(Math.PI / 2);
//           break;
//         case 'side':
//           controlsRef.current.setAzimuthalAngle(Math.PI / 2);
//           controlsRef.current.setPolarAngle(Math.PI / 2);
//           break;
//         case 'free':
//           controlsRef.current.setAzimuthalAngle(Math.PI / 4);
//           controlsRef.current.setPolarAngle(Math.PI / 4);
//           break;
//         default:
//           controlsRef.current.setAzimuthalAngle(Math.PI / 4);
//           controlsRef.current.setPolarAngle(Math.PI / 3);
//       }
//       controlsRef.current.update();
//     }
//   };

//   const takeScreenshot = () => {
//     const canvas = document.querySelector('canvas');
//     if (canvas) {
//       if (controlsRef.current) controlsRef.current.update();
//       const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
//       if (gl) {
//         gl.render && gl.render();
//         const dataUrl = canvas.toDataURL('image/png');
//         setScreenshotUrl(dataUrl);
//         setShowScreenshotModal(true);
//       }
//     }
//   };

//   const downloadScreenshot = () => {
//     if (screenshotUrl) {
//       const link = document.createElement('a');
//       link.href = screenshotUrl;
//       link.download = `cabinet-config-${new Date().getTime()}.png`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   const downloadGLB = () => {
//     generateGLB().then(({ url }) => {
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `cabinet-config-${new Date().getTime()}.glb`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }).catch(error => console.error('Download failed:', error));
//   };

//   const prepareSceneForExport = (group) => {
//     group.traverse((node) => {
//       if (node.isMesh && node.material) {
//         const material = node.material.clone();
//         if (material.map) material.map.needsUpdate = true;
//         node.material = material;
//         node.material.needsUpdate = true;
//       }
//     });
//     return group;
//   };

//   const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('67efeb660016a94a1b36');

//   const storage = new Storage(client);

//   const generateGLB = () => {
//     console.log('Generating GLB...');
//     const exporter = new GLTFExporter();
//     const sceneGroup = new THREE.Group();

//     if (!mainRef.current || !handleRef.current || !legRef.current) {
//       console.error('Scene refs not ready');
//       return Promise.reject('Scene not ready');
//     }

//     sceneGroup.add(prepareSceneForExport(mainRef.current.clone()));
//     sceneGroup.add(prepareSceneForExport(handleRef.current.clone()));
//     sceneGroup.add(prepareSceneForExport(legRef.current.clone()));

//     const options = {
//       binary: true,
//       trs: false,
//       onlyVisible: true,
//       includeCustomExtensions: false,
//     };

//     return new Promise((resolve, reject) => {
//       exporter.parse(
//         sceneGroup,
//         async (gltf) => {
//           try {
//             const blob = new Blob([gltf], { type: 'model/gltf-binary' });
//             const fileName = `cabinet-config-${new Date().getTime()}.glb`;
//             const file = new File([blob], fileName, { type: 'model/gltf-binary' });

//             const response = await storage.createFile(
//               '67efec5900294e3b8bf2',
//               ID.unique(),
//               file,
//               [Permission.read(Role.any())]
//             );

//             console.log('GLB uploaded to Appwrite:', response);
//             const newFileId = response.$id;
//             setFileId(newFileId);

//             const fileUrl = storage.getFileView('67efec5900294e3b8bf2', newFileId);
//             console.log('Generated file URL:', fileUrl);
//             setArModelUrl(fileUrl);

//             resolve({ url: fileUrl, fileId: newFileId });
//           } catch (error) {
//             console.error('Error uploading to Appwrite:', error);
//             alert('Failed to upload model to Appwrite.');
//             reject(error);
//           }
//         },
//         (error) => {
//           console.error('Error exporting GLB:', error);
//           reject(error);
//         },
//         options
//       );
//     });
//   };

//   const openARViewerWithQR = async () => {
//     try {
//       const qrUrl = await generateQRCode();
//       if (qrUrl) console.log('QR Code generated successfully:', qrUrl);
//     } catch (error) {
//       console.error('Failed to open AR viewer with QR:', error);
//     }
//   };

//   const openDirectARViewer = async () => {
//     try {
//       const { url } = await generateGLB();
//       if (url) {
//         setArModelUrl(url);
//         setShowARViewer(true);
//         setShowDimensions(false);
//       }
//     } catch (error) {
//       console.error('Failed to open direct AR viewer:', error);
//       alert('Failed to load AR model.');
//     }
//   };

//   const closeARViewer = () => {
//     setShowARViewer(false);
//     if (arModelUrl) {
//       URL.revokeObjectURL(arModelUrl);
//       setArModelUrl(null);
//     }
//   };

//   const generateQRCode = async () => {
//     console.log('Generating QR Code...');
//     try {
//       const { url, fileId: generatedFileId } = await generateGLB();
//       if (url && generatedFileId) {
//         const qrUrl = `${window.location.origin}/ar-view?fileId=${encodeURIComponent(generatedFileId)}`;
//         console.log('Generated QR URL with Appwrite fileId:', qrUrl);
//         setShowQRCode(true);
//         return qrUrl;
//       } else {
//         console.error('No URL or fileId generated for QR code');
//         alert('Failed to generate QR code: No URL or fileId returned');
//       }
//     } catch (error) {
//       console.error('Error generating QR code:', error);
//       alert('Failed to generate QR code.');
//     }
//   };

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const fileIdFromUrl = params.get('fileId');
//     if (fileIdFromUrl && location.pathname === '/ar-view') {
//       console.log('Detected QR scan, fetching model with fileId:', fileIdFromUrl);
//       const modelUrl = storage.getFileView('67efec5900294e3b8bf2', fileIdFromUrl);
//       console.log('Fetched model URL from Appwrite:', modelUrl);
//       setArModelUrl(modelUrl);
//       setShowARViewer(true);
//       setShowDimensions(false);
//     }
//   }, [location]);

//   const closeScreenshotModal = () => {
//     setShowScreenshotModal(false);
//   };

//   useEffect(() => {
//     const basePrice = sizes.find(s => s.id === config.size)?.price || 200;
//     let totalPrice = basePrice;
//     if (config.texture) totalPrice += 25;
//     if (config.handleColor === 'gold') totalPrice += 15;
//     else if (config.handleColor === 'bronze') totalPrice += 10;
//     if (config.legType === 'D') totalPrice += 25;
//     if (config.legColor === '#FFD700') totalPrice += 20;
//     else if (config.legColor === '#CD7F32') totalPrice += 15;
//     setPrice(totalPrice);
//     setOriginalPrice(Math.round(totalPrice * 1.225));
//   }, [config]);

//   const updateConfig = (key, value) => {
//     console.log(`Updating config: key = ${key}, value = ${value}`);
//     setConfig((prev) => {
//       const newConfig = { ...prev };
//       if (key === "color" && value !== "") {
//         if (prev.texture) newConfig.texture = "";
//       } else if (key === "texture" && value !== "") {
//         if (prev.color) newConfig.color = "";
//       }
//       newConfig[key] = value;
//       return newConfig;
//     });
//   };

//   useEffect(() => {
//     if (showARViewer) setShowDimensions(false);
//   }, [showARViewer]);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="flex flex-1 flex-col lg:flex-row">
//         <div className="w-full lg:w-16 border-b lg:border-r lg:border-b-0 fixed lg:static bottom-0 lg:bottom-auto z-20 bg-white">
//           <div className="flex lg:flex-col items-center justify-around lg:justify-start p-2 lg:pt-4 lg:gap-4">
//             <button 
//               className={`p-2 border rounded ${viewMode === 'default' ? 'bg-gray-200' : ''}`}
//               onClick={() => handleViewChange('default')}
//               title="Default View"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <rect x="3" y="3" width="18" height="18" rx="2" />
//               </svg>
//             </button>
//             <button 
//               className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-0 lg:mt-4"
//               onClick={downloadGLB}
//               title="Download GLB"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                 <polyline points="7 10 12 15 17 10" />
//                 <line x1="12" y1="15" x2="12" y2="3" />
//               </svg>
//             </button>
//             <button 
//               className={`p-2 border rounded ${viewMode === 'top' ? 'bg-gray-200' : ''}`}
//               onClick={() => handleViewChange('top')}
//               title="Top View"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M3 3h18v18H3z" />
//               </svg>
//             </button>
//             <button 
//               className={`p-2 border rounded ${viewMode === 'front' ? 'bg-gray-200' : ''}`}
//               onClick={() => handleViewChange('front')}
//               title="Front View"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
//               </svg>
//             </button>
//             <button 
//               className={`p-2 border rounded ${viewMode === 'free' ? 'bg-gray-200' : ''}`}
//               onClick={() => handleViewChange('free')}
//               title="Free View"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M4 4h16v16H4z" />
//                 <path d="M9 9l6 6M15 9l-6 6" />
//               </svg>
//             </button>
//             <button 
//               className={`p-2 border rounded ${showDimensions ? 'bg-blue-200' : 'bg-gray-100'} hover:bg-blue-100`}
//               onClick={toggleDimensions}
//               title="Show Dimensions"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M2 12h20M12 2v20M20 16v-4M4 8v8M16 4h4M4 20h4" />
//               </svg>
//             </button>
//             <button 
//               className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-0 lg:mt-4"
//               onClick={openARViewerWithQR}
//               title="View in AR with QR"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 12 8 7v10l8-5z" />
//               </svg>
//             </button>
//             <button 
//               className="p-2 border rounded bg-green-50 hover:bg-green-100 mt-0 lg:mt-4"
//               onClick={openDirectARViewer}
//               title="Direct AR View"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8zm-1-13h2v4h4v2h-4v4h-2v-4H7v-2h4z" />
//               </svg>
//             </button>
//             <button 
//               className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-0 lg:mt-4"
//               onClick={takeScreenshot}
//               title="Screenshot"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
//                 <circle cx="12" cy="12" r="3" />
//                 <path d="M16.5 7.5h.01" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 flex flex-col lg:flex-row">
//           <div className="w-full lg:w-3/5 h-[50vh] lg:h-screen flex items-center justify-center bg-gray-50 relative pt-16 lg:pt-0">
//             <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }} className="w-full h-full">
//               <ambientLight intensity={0.5} />
//               <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
//               <pointLight position={[-10, -10, -10]} intensity={0.5} />
//               <Suspense fallback={null}>
//                 <CabinetModel config={config} showDimensions={showDimensions} mainRef={mainRef} handleRef={handleRef} legRef={legRef} />
//                 <Environment preset="city" />
//                 <ContactShadows opacity={0.5} scale={10} blur={1} far={10} resolution={256} />
//                 <CanvasCapture />
//               </Suspense>
//               <OrbitControls 
//                 ref={controlsRef}
//                 enablePan={viewMode === 'free'}
//                 enableZoom={true}
//                 enableRotate={viewMode === 'free' || viewMode === 'default'}
//                 minPolarAngle={viewMode === 'top' ? 0 : viewMode === 'front' ? Math.PI / 2 : 0}
//                 maxPolarAngle={viewMode === 'top' ? 0 : viewMode === 'front' ? Math.PI / 2 : Math.PI}
//               />
//             </Canvas>
//           </div>
//           <div className="w-full lg:w-2/5 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-4rem)] lg:max-h-screen">
//             <h1 className="text-2xl sm:text-3xl font-normal mb-6 sm:mb-8">Cabinet Configurator</h1>
//             <div className="config-select relative mb-4 sm:mb-6">
//               <div 
//                 className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
//                 onClick={toggleSizes}
//               >
//                 <span className="text-sm sm:text-base">Size: {sizes.find(s => s.id === config.size)?.name}</span>
//                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d={showSizes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
//                 </svg>
//               </div>
//               {showSizes && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
//                   {sizes.map((size) => (
//                     <div 
//                       key={size.id} 
//                       className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
//                       onClick={() => { updateConfig('size', size.id); setShowSizes(false); }}
//                     >
//                       {size.name} - ${size.price}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             {showARViewer && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-full max-h-[90vh] overflow-auto">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">View in AR</h3>
//                     <button onClick={closeARViewer} className="text-gray-500 hover:text-gray-700">
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M18 6L6 18M6 6l12 12" />
//                       </svg>
//                     </button>
//                   </div>
//                   {arModelUrl ? (
//                     <>
//                       <button slot="ar-button" className="absolute bottom-5 right-5 p-2 bg-black text-white rounded">
//                         Enter AR
//                       </button>
//                       <model-viewer
//                         src={arModelUrl}
//                         ar
//                         ar-modes="webxr scene-viewer quick-look"
//                         camera-controls
//                         auto-rotate
//                         className="w-full h-[80vh]"
//                         ar-placement="floor"
//                       />
//                     </>
//                   ) : (
//                     <p>Loading model or model URL not available...</p>
//                   )}
//                 </div>
//               </div>
//             )}
//             {showQRCode && arModelUrl && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-4 rounded-lg max-w-md w-full">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">Scan for AR View</h3>
//                     <button onClick={() => setShowQRCode(false)} className="text-gray-500 hover:text-gray-700">
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M18 6L6 18M6 6l12 12" />
//                       </svg>
//                     </button>
//                   </div>
//                   <QRCodeCanvas
//                     value={`${window.location.origin}/ar-view?fileId=${encodeURIComponent(fileId)}`}
//                     size={256}
//                     className="w-full max-w-[256px] mx-auto"
//                   />
//                   <p className="mt-4 text-center text-sm">Scan this QR code with your device to view in AR</p>
//                 </div>
//               </div>
//             )}
//             {showScreenshotModal && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-4 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">Your Cabinet Screenshot</h3>
//                     <button onClick={closeScreenshotModal} className="text-gray-500 hover:text-gray-700">
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M18 6L6 18M6 6l12 12" />
//                       </svg>
//                     </button>
//                   </div>
//                   <div className="mb-4">
//                     {screenshotUrl && <img src={screenshotUrl} alt="Cabinet Configuration" className="max-w-full h-auto" />}
//                   </div>
//                   <div className="flex justify-end">
//                     <button
//                       onClick={downloadScreenshot}
//                       className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
//                     >
//                       Download
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div className="config-select relative mb-4 sm:mb-6">
//               <div 
//                 className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
//                 onClick={toggleTextures}
//               >
//                 <span className="text-sm sm:text-base">Surface Finish: {textures.find(t => t.id === config.texture)?.name || 'Solid Color'}</span>
//                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d={showTextures ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
//                 </svg>
//               </div>
//               {showTextures && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
//                   {textures.map((texture) => (
//                     <div 
//                       key={texture.id} 
//                       className="p-2 hover:bg-gray-100 cursor-pointer flex items-center text-sm sm:text-base"
//                       onClick={() => { updateConfig('texture', texture.id); setShowTextures(false); }}
//                     >
//                       {texture.id && <div className="w-6 h-6 sm:w-8 sm:h-8 mr-2 border rounded bg-gray-100 overflow-hidden"></div>}
//                       <span>{texture.name}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="config-select relative mb-4 sm:mb-6">
//               <div 
//                 className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
//                 onClick={toggleHandleTypes}
//               >
//                 <span className="text-sm sm:text-base">Handle Type: {handleTypes.find(type => type.id === config.handleType)?.name}</span>
//                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d={showHandleTypes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
//                 </svg>
//               </div>
//               {showHandleTypes && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
//                   {handleTypes.map((type) => (
//                     <div 
//                       key={type.id} 
//                       className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
//                       onClick={() => { updateConfig('handleType', type.id); setShowHandleTypes(false); }}
//                     >
//                       {type.name}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="config-select relative mb-4 sm:mb-6">
//               <div 
//                 className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
//                 onClick={toggleHandleColors}
//               >
//                 <div className="flex items-center">
//                   <div 
//                     className="w-5 h-5 sm:w-6 sm:h-6 rounded mr-2 sm:mr-3" 
//                     style={{ backgroundColor: handleColors.find(color => color.id === config.handleColor)?.color }}
//                   ></div>
//                   <span className="text-sm sm:text-base">Handle Color: {handleColors.find(color => color.id === config.handleColor)?.name}</span>
//                 </div>
//                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d={showHandleColors ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
//                 </svg>
//               </div>
//               {showHandleColors && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
//                   {handleColors.map((color) => (
//                     <div 
//                       key={color.id} 
//                       className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
//                       onClick={() => { updateConfig('handleColor', color.id); setShowHandleColors(false); }}
//                     >
//                       <div className="flex items-center">
//                         <div className="w-5 h-5 sm:w-6 sm:h-6 rounded mr-2 sm:mr-3" style={{ backgroundColor: color.color }}></div>
//                         <span>{color.name}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="config-select relative mb-4 sm:mb-6">
//               <div 
//                 className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
//                 onClick={toggleLegTypes}
//               >
//                 <span className="text-sm sm:text-base">Leg Type: {legTypes.find(type => type.id === config.legType)?.name}</span>
//                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d={showLegTypes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
//                 </svg>
//               </div>
//               {showLegTypes && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
//                   {legTypes.map((type) => (
//                     <div 
//                       key={type.id} 
//                       className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
//                       onClick={() => { updateConfig('legType', type.id); setShowLegTypes(false); }}
//                     >
//                       {type.name}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="config-select relative mb-4 sm:mb-6">
//               <div 
//                 className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
//                 onClick={toggleLegColors}
//               >
//                 <div className="flex items-center">
//                   <div 
//                     className="w-5 h-5 sm:w-6 sm:h-6 rounded mr-2 sm:mr-3" 
//                     style={{ backgroundColor: legColors.find(color => color.name.toLowerCase() === config.legColor.toLowerCase())?.color || config.legColor }}
//                   ></div>
//                   <span className="text-sm sm:text-base">Leg Color: {legColors.find(color => color.color === config.legColor)?.name || 'Custom'}</span>
//                 </div>
//                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d={showLegColors ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
//                 </svg>
//               </div>
//               {showLegColors && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
//                   {legColors.map((color) => (
//                     <div 
//                       key={color.id} 
//                       className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
//                       onClick={() => { updateConfig('legColor', color.color); setShowLegColors(false); }}
//                     >
//                       <div className="flex items-center">
//                         <div className="w-5 h-5 sm:w-6 sm:h-6 rounded mr-2 sm:mr-3" style={{ backgroundColor: color.color }}></div>
//                         <span>{color.name}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="border-t my-4 sm:my-6"></div>
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">Product Price</p>
//                 <div className="flex items-center">
//                   <span className="text-lg sm:text-xl font-bold">$ {price}</span>
//                   <span className="text-xs sm:text-sm text-gray-400 ml-2 line-through">$ {originalPrice}</span>
//                 </div>
//               </div>
//               <button className="bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-gray-800 transition text-sm sm:text-base">
//                 Add to cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<CabinetConfigurator />} />
// //         <Route path="/ar-view" element={<CabinetConfigurator />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;




// import React, { useState, useRef, Suspense, useEffect, useMemo } from 'react';
// import { Canvas, useThree } from '@react-three/fiber';
// import { OrbitControls, useGLTF, Environment, ContactShadows, useTexture, Html } from '@react-three/drei';
// import * as THREE from 'three';
// import { QRCodeCanvas } from 'qrcode.react';
// import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
// import Dimension from './assets/Dimension';
// import ARViewer from './assets/Ar-viewer';
// import { Client, Storage, ID, Permission, Role } from 'appwrite';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// // Preload all models
// import { TextureLoader } from 'three';
// useGLTF.preload('/main.glb');
// useGLTF.preload('/handle-bar.glb');
// useGLTF.preload('/handle-knob.glb');
// useGLTF.preload('/leg-C.glb');
// useGLTF.preload('/leg-D.glb');

// function TexturedCabinet({ config, showDimensions, mainRef, handleRef, legRef }) {
//   const { scene: cabinetScene } = useGLTF('/main.glb');
//   const handleScene = config.handleType ? useGLTF(`/handle-${config.handleType}.glb`).scene : null;
//   const legScene = config.legType ? useGLTF(`/leg-${config.legType}.glb`).scene : null;

//   // Memoized materials
//   const bodyMaterial = useMemo(() => {
//     if (!config.texture) {
//       return new THREE.MeshStandardMaterial({
//         color: new THREE.Color(config.color),
//         roughness: 0.7,
//         metalness: 0.3,
//       });
//     }

//     const textureLoader = new TextureLoader();
//     const texturePath = `/colors/${config.texture}`;
//     const texture = textureLoader.load(texturePath, undefined, undefined, (error) => {
//       console.error('Error loading texture:', error);
//     });

//     if (THREE.SRGBColorSpace !== undefined) {
//       texture.colorSpace = THREE.SRGBColorSpace;
//     } else {
//       texture.encoding = THREE.sRGBEncoding;
//     }
//     texture.wrapS = THREE.RepeatWrapping;
//     texture.wrapT = THREE.RepeatWrapping;
//     texture.repeat.set(1, 1);
//     texture.flipY = false;
//     texture.needsUpdate = true;

//     const roughnessMap = textureLoader.load('/RoughnessMap.png', undefined, undefined, (error) => {
//       console.error('Error loading roughness map:', error);
//     });
//     if (roughnessMap) {
//       roughnessMap.wrapS = THREE.RepeatWrapping;
//       roughnessMap.wrapT = THREE.RepeatWrapping;
//       roughnessMap.needsUpdate = true;
//     }

//     return new THREE.MeshStandardMaterial({
//       map: texture,
//       roughnessMap: roughnessMap || undefined,
//       roughness: roughnessMap ? 1 : 0.8,
//       metalness: 0.2,
//       envMapIntensity: 1,
//     });
//   }, [config.texture, config.color]);

//   const handleMaterial = useMemo(() => {
//     let handleColorHex = '#C0C0C0';
//     if (config.handleColor === 'gold') handleColorHex = '#FFD700';
//     else if (config.handleColor === 'black') handleColorHex = '#000000';
//     else if (config.handleColor === 'bronze') handleColorHex = '#CD7F32';

//     return new THREE.MeshStandardMaterial({
//       color: new THREE.Color(handleColorHex),
//       roughness: 0.4,
//       metalness: 0.8,
//       envMapIntensity: 1,
//     });
//   }, [config.handleColor]);

//   const legMaterial = useMemo(() => {
//     return new THREE.MeshStandardMaterial({
//       color: new THREE.Color(config.legColor),
//       roughness: 0.3,
//       metalness: 0.6,
//     });
//   }, [config.legColor]);

//   useEffect(() => {
//     if (mainRef.current) {
//       const cabinetClone = cabinetScene.clone(true);
//       cabinetClone.traverse((node) => {
//         if (node.isMesh && (node.name.includes("565_01") || node.name.includes('frame') || node.name.includes('panel'))) {
//           node.material = bodyMaterial.clone();
//         }
//       });
//       while (mainRef.current.children.length > 0) {
//         mainRef.current.remove(mainRef.current.children[0]);
//       }
//       mainRef.current.add(cabinetClone);
//     }

//     if (handleRef.current && handleScene) {
//       const handleClone = handleScene.clone(true);
//       handleClone.traverse((node) => {
//         if (node.isMesh) {
//           node.material = handleMaterial.clone();
//         }
//       });
//       while (handleRef.current.children.length > 0) {
//         handleRef.current.remove(handleRef.current.children[0]);
//       }
//       handleRef.current.add(handleClone);
//     }

//     if (legRef.current && legScene) {
//       const legClone = legScene.clone(true);
//       legClone.traverse((node) => {
//         if (node.isMesh) {
//           node.material = legMaterial.clone();
//         }
//       });
//       while (legRef.current.children.length > 0) {
//         legRef.current.remove(legRef.current.children[0]);
//       }
//       legRef.current.add(legClone);
//     }
//   }, [cabinetScene, handleScene, legScene, bodyMaterial, handleMaterial, legMaterial, mainRef, handleRef, legRef]);

//   let scale = 1;
//   if (config.size === 'small') scale = 0.8;
//   else if (config.size === 'large') scale = 1.2;

//   const dimensions = {
//     width: 1.2 * scale,
//     height: 0.8 * scale,
//     depth: 0.5 * scale,
//   };
//   const widthStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
//   const widthEnd = [dimensions.width / 2, 0, -dimensions.depth / 2];
//   const heightStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
//   const heightEnd = [-dimensions.width / 2, dimensions.height, -dimensions.depth / 2];
//   const depthStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
//   const depthEnd = [-dimensions.width / 2, 0, dimensions.depth / 2];

//   useEffect(() => {
//     if (showDimensions) {
//       console.log('Dimensions visible:', dimensions);
//     }
//   }, [showDimensions, dimensions]);

//   return (
//     <group>
//       <group ref={mainRef} scale={scale} position={[0, 0, 0]} />
//       <group ref={handleRef} scale={scale} position={[0, 0, 0]} />
//       <group ref={legRef} scale={scale} position={[0, 0, 0]} />
//       {showDimensions && (
//         <>
//           <Dimension start={widthStart} end={widthEnd} visible={showDimensions} />
//           <Dimension start={heightStart} end={heightEnd} visible={showDimensions} />
//           <Dimension start={depthStart} end={depthEnd} visible={showDimensions} />
//           <Html>
//             <div
//               className="fixed top-20 left-2 sm:left-20 md:left-32 lg:left-40 p-2 sm:p-3 bg-black bg-opacity-70 text-white rounded-md shadow-md text-xs sm:text-sm md:text-base max-w-[150px] sm:max-w-[180px] md:max-w-[200px] z-50"
//             >
//               <table className="w-full border-collapse font-sans">
//                 <thead>
//                   <tr>
//                     <th className="p-1 sm:p-2 text-left">Dimension</th>
//                     <th className="p-1 sm:p-2 text-right">Value (m)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="p-1 sm:p-2 text-left">Width</td>
//                     <td className="p-1 sm:p-2 text-right">{dimensions.width.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td className="p-1 sm:p-2 text-left">Height</td>
//                     <td className="p-1 sm:p-2 text-right">{dimensions.height.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td className="p-1 sm:p-2 text-left">Depth</td>
//                     <td className="p-1 sm:p-2 text-right">{dimensions.depth.toFixed(2)}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </Html>
//         </>
//       )}
//     </group>
//   );
// }

// function CabinetModel({ config, showDimensions, mainRef, handleRef, legRef }) {
//   return (
//     <Suspense fallback={null}>
//       <TexturedCabinet config={config} showDimensions={showDimensions} mainRef={mainRef} handleRef={handleRef} legRef={legRef} />
//     </Suspense>
//   );
// }

// function CabinetConfigurator() {
//   const mainRef = useRef();
//   const handleRef = useRef();
//   const legRef = useRef();
//   const [config, setConfig] = useState({
//     size: 'medium',
//     color: 'white',
//     woodFinish: '#8B4513',
//     handleType: '',
//     handleColor: 'silver',
//     legType: '',
//     legColor: '#000000',
//     texture: ''
//   });
//   const [showDimensions, setShowDimensions] = useState(false);
//   const [price, setPrice] = useState(200);
//   const [originalPrice, setOriginalPrice] = useState(245);
//   const [showSizes, setShowSizes] = useState(false);
//   const [showTextures, setShowTextures] = useState(false);
//   const [showHandleTypes, setShowHandleTypes] = useState(false);
//   const [showHandleColors, setShowHandleColors] = useState(false);
//   const [showLegTypes, setShowLegTypes] = useState(false);
//   const [showLegColors, setShowLegColors] = useState(false);
//   const [viewMode, setViewMode] = useState('default');
//   const controlsRef = useRef();
//   const [screenshotUrl, setScreenshotUrl] = useState(null);
//   const [showScreenshotModal, setShowScreenshotModal] = useState(false);
//   const [showARViewer, setShowARViewer] = useState(false);
//   const [arModelUrl, setArModelUrl] = useState(null);
//   const [showQRCode, setShowQRCode] = useState(false);
//   const [fileId, setFileId] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

//   const location = useLocation();

//   const textures = [
//     { id: '', name: 'Solid Color' },
//     { id: 'Raya.png', name: 'Natural Wood' },
//     { id: 'Empire.png', name: 'White Marble' },
//     { id: 'Amber.png', name: 'Polished Concrete' },
//     { id: 'Bitmore.png', name: 'Black Leather' }
//   ];

//   const sizes = [
//     { id: 'small', name: 'Small', price: 180 },
//     { id: 'medium', name: 'Medium', price: 200 },
//     { id: 'large', name: 'Large', price: 240 }
//   ];

//   const handleTypes = [
//     { id: 'bar', name: 'Bar Handle' },
//     { id: 'knob', name: 'Knob Handle' }
//   ];

//   const handleColors = [
//     { id: 'silver', name: 'Silver', color: '#C0C0C0' },
//     { id: 'gold', name: 'Gold', color: '#FFD700' },
//     { id: 'black', name: 'Black', color: '#000000' },
//     { id: 'bronze', name: 'Bronze', color: '#CD7F32' }
//   ];

//   const legTypes = [
//     { id: 'C', name: 'Classic Legs' },
//     { id: 'D', name: 'Designer Legs' }
//   ];

//   const legColors = [
//     { id: 'black', name: 'Black', color: '#000000' },
//     { id: 'silver', name: 'Silver', color: '#C0C0C0' },
//     { id: 'gold', name: 'Gold', color: '#FFD700' },
//     { id: 'bronze', name: 'Bronze', color: '#CD7F32' }
//   ];

//   const closeAllDropdowns = () => {
//     setShowSizes(false);
//     setShowTextures(false);
//     setShowHandleTypes(false);
//     setShowHandleColors(false);
//     setShowLegTypes(false);
//     setShowLegColors(false);
//   };

//   const toggleSizes = () => {
//     if (showSizes) setShowSizes(false);
//     else { closeAllDropdowns(); setShowSizes(true); }
//   };

//   const toggleTextures = () => {
//     if (showTextures) setShowTextures(false);
//     else { closeAllDropdowns(); setShowTextures(true); }
//   };

//   const toggleHandleTypes = () => {
//     if (showHandleTypes) setShowHandleTypes(false);
//     else { closeAllDropdowns(); setShowHandleTypes(true); }
//   };

//   const toggleHandleColors = () => {
//     if (showHandleColors) setShowHandleColors(false);
//     else { closeAllDropdowns(); setShowHandleColors(true); }
//   };

//   const toggleLegTypes = () => {
//     if (showLegTypes) setShowLegTypes(false);
//     else { closeAllDropdowns(); setShowLegTypes(true); }
//   };

//   const toggleLegColors = () => {
//     if (showLegColors) setShowLegColors(false);
//     else { closeAllDropdowns(); setShowLegColors(true); }
//   };

//   function CanvasCapture() {
//     const { gl, scene, camera } = useThree();
//     useEffect(() => {
//       gl.captureFrame = () => {
//         gl.render(scene, camera);
//         return gl.domElement.toDataURL('image/png');
//       };
//     }, [gl, scene, camera]);
//     return null;
//   }

//   const toggleDimensions = () => {
//     if (!showARViewer) setShowDimensions(prev => !prev);
//   };

//   const handleViewChange = (mode) => {
//     setViewMode(mode);
//     if (controlsRef.current) {
//       switch (mode) {
//         case 'top':
//           controlsRef.current.setAzimuthalAngle(0);
//           controlsRef.current.setPolarAngle(0);
//           break;
//         case 'front':
//           controlsRef.current.setAzimuthalAngle(0);
//           controlsRef.current.setPolarAngle(Math.PI / 2);
//           break;
//         case 'side':
//           controlsRef.current.setAzimuthalAngle(Math.PI / 2);
//           controlsRef.current.setPolarAngle(Math.PI / 2);
//           break;
//         case 'free':
//           controlsRef.current.setAzimuthalAngle(Math.PI / 4);
//           controlsRef.current.setPolarAngle(Math.PI / 4);
//           break;
//         default:
//           controlsRef.current.setAzimuthalAngle(Math.PI / 4);
//           controlsRef.current.setPolarAngle(Math.PI / 3);
//       }
//       controlsRef.current.update();
//     }
//   };

//   const takeScreenshot = () => {
//     const canvas = document.querySelector('canvas');
//     if (canvas) {
//       if (controlsRef.current) controlsRef.current.update();
//       const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
//       if (gl) {
//         gl.render && gl.render();
//         const dataUrl = canvas.toDataURL('image/png');
//         setScreenshotUrl(dataUrl);
//         setShowScreenshotModal(true);
//       }
//     }
//   };

//   const downloadScreenshot = () => {
//     if (screenshotUrl) {
//       const link = document.createElement('a');
//       link.href = screenshotUrl;
//       link.download = `cabinet-config-${new Date().getTime()}.png`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   const downloadGLB = () => {
//     generateGLB().then(({ url }) => {
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `cabinet-config-${new Date().getTime()}.glb`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }).catch(error => console.error('Download failed:', error));
//   };

//   const prepareSceneForExport = (group) => {
//     group.traverse((node) => {
//       if (node.isMesh && node.material) {
//         const material = node.material.clone();
//         if (material.map) material.map.needsUpdate = true;
//         node.material = material;
//         node.material.needsUpdate = true;
//       }
//     });
//     return group;
//   };

//   const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('67efeb660016a94a1b36');

//   const storage = new Storage(client);

//   const generateGLB = () => {
//     console.log('Generating GLB...');
//     const exporter = new GLTFExporter();
//     const sceneGroup = new THREE.Group();

//     if (!mainRef.current || !handleRef.current || !legRef.current) {
//       console.error('Scene refs not ready');
//       return Promise.reject('Scene not ready');
//     }

//     sceneGroup.add(prepareSceneForExport(mainRef.current.clone()));
//     sceneGroup.add(prepareSceneForExport(handleRef.current.clone()));
//     sceneGroup.add(prepareSceneForExport(legRef.current.clone()));

//     const options = {
//       binary: true,
//       trs: false,
//       onlyVisible: true,
//       includeCustomExtensions: false,
//     };

//     return new Promise((resolve, reject) => {
//       exporter.parse(
//         sceneGroup,
//         async (gltf) => {
//           try {
//             const blob = new Blob([gltf], { type: 'model/gltf-binary' });
//             const fileName = `cabinet-config-${new Date().getTime()}.glb`;
//             const file = new File([blob], fileName, { type: 'model/gltf-binary' });

//             const response = await storage.createFile(
//               '67efec5900294e3b8bf2',
//               ID.unique(),
//               file,
//               [Permission.read(Role.any())]
//             );

//             console.log('GLB uploaded to Appwrite:', response);
//             const newFileId = response.$id;
//             setFileId(newFileId);

//             const fileUrl = storage.getFileView('67efec5900294e3b8bf2', newFileId);
//             console.log('Generated file URL:', fileUrl);
//             setArModelUrl(fileUrl);

//             resolve({ url: fileUrl, fileId: newFileId });
//           } catch (error) {
//             console.error('Error uploading to Appwrite:', error);
//             alert('Failed to upload model to Appwrite.');
//             reject(error);
//           }
//         },
//         (error) => {
//           console.error('Error exporting GLB:', error);
//           reject(error);
//         },
//         options
//       );
//     });
//   };

//   const openARViewerWithQR = async () => {
//     try {
//       const qrUrl = await generateQRCode();
//       if (qrUrl) console.log('QR Code generated successfully:', qrUrl);
//     } catch (error) {
//       console.error('Failed to open AR viewer with QR:', error);
//     }
//   };

//   const openDirectARViewer = async () => {
//     try {
//       const { url } = await generateGLB();
//       if (url) {
//         setArModelUrl(url);
//         setShowARViewer(true);
//         setShowDimensions(false);
//       }
//     } catch (error) {
//       console.error('Failed to open direct AR viewer:', error);
//       alert('Failed to load AR model.');
//     }
//   };

//   const closeARViewer = () => {
//     setShowARViewer(false);
//     if (arModelUrl) {
//       URL.revokeObjectURL(arModelUrl);
//       setArModelUrl(null);
//     }
//   };

//   const generateQRCode = async () => {
//     console.log('Generating QR Code...');
//     try {
//       const { url, fileId: generatedFileId } = await generateGLB();
//       if (url && generatedFileId) {
//         const qrUrl = `${window.location.origin}/ar-view?fileId=${encodeURIComponent(generatedFileId)}`;
//         console.log('Generated QR URL with Appwrite fileId:', qrUrl);
//         setShowQRCode(true);
//         return qrUrl;
//       } else {
//         console.error('No URL or fileId generated for QR code');
//         alert('Failed to generate QR code: No URL or fileId returned');
//       }
//     } catch (error) {
//       console.error('Error generating QR code:', error);
//       alert('Failed to generate QR code.');
//     }
//   };

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const fileIdFromUrl = params.get('fileId');
//     if (fileIdFromUrl && location.pathname === '/ar-view') {
//       console.log('Detected QR scan, fetching model with fileId:', fileIdFromUrl);
//       const modelUrl = storage.getFileView('67efec5900294e3b8bf2', fileIdFromUrl);
//       console.log('Fetched model URL from Appwrite:', modelUrl);
//       setArModelUrl(modelUrl);
//       setShowARViewer(true);
//       setShowDimensions(false);
//     }
//   }, [location]);

//   const closeScreenshotModal = () => {
//     setShowScreenshotModal(false);
//   };

//   useEffect(() => {
//     const basePrice = sizes.find(s => s.id === config.size)?.price || 200;
//     let totalPrice = basePrice;
//     if (config.texture) totalPrice += 25;
//     if (config.handleColor === 'gold') totalPrice += 15;
//     else if (config.handleColor === 'bronze') totalPrice += 10;
//     if (config.legType === 'D') totalPrice += 25;
//     if (config.legColor === '#FFD700') totalPrice += 20;
//     else if (config.legColor === '#CD7F32') totalPrice += 15;
//     setPrice(totalPrice);
//     setOriginalPrice(Math.round(totalPrice * 1.225));
//   }, [config]);

//   const updateConfig = (key, value) => {
//     console.log(`Updating config: key = ${key}, value = ${value}`);
//     setConfig((prev) => {
//       const newConfig = { ...prev };
//       if (key === "color" && value !== "") {
//         if (prev.texture) newConfig.texture = "";
//       } else if (key === "texture" && value !== "") {
//         if (prev.color) newConfig.color = "";
//       }
//       newConfig[key] = value;
//       return newConfig;
//     });
//   };

//   useEffect(() => {
//     if (showARViewer) setShowDimensions(false);
//   }, [showARViewer]);

//   const toggleMenu = () => {
//     setIsMenuOpen(prev => !prev);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="flex flex-1 flex-col lg:flex-row">
//         <div className="w-full lg:w-16 border-b lg:border-r lg:border-b-0 fixed top-0 lg:static z-20 bg-white">
//           <div className="flex items-center justify-between p-2 lg:hidden">
//             <button onClick={toggleMenu} className="p-2">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M3 12h18M3 6h18M3 18h18" />
//               </svg>
//             </button>
//           </div>
//           <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col items-center p-2 lg:pt-4 lg:gap-4 absolute lg:static top-12 left-0 w-full lg:w-auto bg-white border-b lg:border-0 shadow-lg lg:shadow-none`}>
//             <button 
//               className={`p-2 border rounded ${viewMode === 'default' ? 'bg-gray-200' : ''}`}
//               onClick={() => { handleViewChange('default'); setIsMenuOpen(false); }}
//               title="Default View"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <rect x="3" y="3" width="18" height="18" rx="2" />
//               </svg>
//             </button>
//             <button 
//               className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-0 lg:mt-4"
//               onClick={() => { downloadGLB(); setIsMenuOpen(false); }}
//               title="Download GLB"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                 <polyline points="7 10 12 15 17 10" />
//                 <line x1="12" y1="15" x2="12" y2="3" />
//               </svg>
//             </button>
//             <button 
//               className={`p-2 border rounded ${viewMode === 'top' ? 'bg-gray-200' : ''}`}
//               onClick={() => { handleViewChange('top'); setIsMenuOpen(false); }}
//               title="Top View"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M3 3h18v18H3z" />
//               </svg>
//             </button>
//             <button 
//               className={`p-2 border rounded ${viewMode === 'front' ? 'bg-gray-200' : ''}`}
//               onClick={() => { handleViewChange('front'); setIsMenuOpen(false); }}
//               title="Front View"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
//               </svg>
//             </button>
//             <button 
//               className={`p-2 border rounded ${viewMode === 'free' ? 'bg-gray-200' : ''}`}
//               onClick={() => { handleViewChange('free'); setIsMenuOpen(false); }}
//               title="Free View"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M4 4h16v16H4z" />
//                 <path d="M9 9l6 6M15 9l-6 6" />
//               </svg>
//             </button>
//             <button 
//               className={`p-2 border rounded ${showDimensions ? 'bg-blue-200' : 'bg-gray-100'} hover:bg-blue-100`}
//               onClick={() => { toggleDimensions(); setIsMenuOpen(false); }}
//               title="Show Dimensions"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M2 12h20M12 2v20M20 16v-4M4 8v8M16 4h4M4 20h4" />
//               </svg>
//             </button>
//             <button 
//               className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-0 lg:mt-4"
//               onClick={() => { openARViewerWithQR(); setIsMenuOpen(false); }}
//               title="View in AR with QR"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 12 8 7v10l8-5z" />
//               </svg>
//             </button>
//             <button 
//               className="p-2 border rounded bg-green-50 hover:bg-green-100 mt-0 lg:mt-4"
//               onClick={() => { openDirectARViewer(); setIsMenuOpen(false); }}
//               title="Direct AR View"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8zm-1-13h2v4h4v2h-4v4h-2v-4H7v-2h4z" />
//               </svg>
//             </button>
//             <button 
//               className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-0 lg:mt-4"
//               onClick={() => { takeScreenshot(); setIsMenuOpen(false); }}
//               title="Screenshot"
//             >
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
//                 <circle cx="12" cy="12" r="3" />
//                 <path d="M16.5 7.5h.01" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 flex flex-col lg:flex-row">
//           <div className="w-full lg:w-3/5 h-[50vh] lg:h-screen flex items-center justify-center bg-gray-50 relative pt-16 lg:pt-0">
//             <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }} className="w-full h-full">
//               <ambientLight intensity={0.5} />
//               <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
//               <pointLight position={[-10, -10, -10]} intensity={0.5} />
//               <Suspense fallback={null}>
//                 <CabinetModel config={config} showDimensions={showDimensions} mainRef={mainRef} handleRef={handleRef} legRef={legRef} />
//                 <Environment preset="city" />
//                 <ContactShadows opacity={0.5} scale={10} blur={1} far={10} resolution={256} />
//                 <CanvasCapture />
//               </Suspense>
//               <OrbitControls 
//                 ref={controlsRef}
//                 enablePan={viewMode === 'free'}
//                 enableZoom={true}
//                 enableRotate={viewMode === 'free' || viewMode === 'default'}
//                 minPolarAngle={viewMode === 'top' ? 0 : viewMode === 'front' ? Math.PI / 2 : 0}
//                 maxPolarAngle={viewMode === 'top' ? 0 : viewMode === 'front' ? Math.PI / 2 : Math.PI}
//               />
//             </Canvas>
//           </div>
//           <div className="w-full lg:w-2/5 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-4rem)] lg:max-h-screen">
//             <h1 className="text-2xl sm:text-3xl font-normal mb-6 sm:mb-8">Cabinet Configurator</h1>
//             <div className="config-select relative mb-4 sm:mb-6">
//               <div 
//                 className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
//                 onClick={toggleSizes}
//               >
//                 <span className="text-sm sm

// :text-base">Size: {sizes.find(s => s.id === config.size)?.name}</span>
//                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d={showSizes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
//                 </svg>
//               </div>
//               {showSizes && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
//                   {sizes.map((size) => (
//                     <div 
//                       key={size.id} 
//                       className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
//                       onClick={() => { updateConfig('size', size.id); setShowSizes(false); }}
//                     >
//                       {size.name} - ${size.price}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             {showARViewer && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-full max-h-[90vh] overflow-auto">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">View in AR</h3>
//                     <button onClick={closeARViewer} className="text-gray-500 hover:text-gray-700">
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M18 6L6 18M6 6l12 12" />
//                       </svg>
//                     </button>
//                   </div>
//                   {arModelUrl ? (
//                     <>
//                       <button slot="ar-button" className="absolute bottom-5 right-5 p-2 bg-black text-white rounded">
//                         Enter AR
//                       </button>
//                       <model-viewer
//                         src={arModelUrl}
//                         ar
//                         ar-modes="webxr scene-viewer quick-look"
//                         camera-controls
//                         auto-rotate
//                         className="w-full h-[80vh]"
//                         ar-placement="floor"
//                       />
//                     </>
//                   ) : (
//                     <p>Loading model or model URL not available...</p>
//                   )}
//                 </div>
//               </div>
//             )}
//             {showQRCode && arModelUrl && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-4 rounded-lg max-w-md w-full">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">Scan for AR View</h3>
//                     <button onClick={() => setShowQRCode(false)} className="text-gray-500 hover:text-gray-700">
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M18 6L6 18M6 6l12 12" />
//                       </svg>
//                     </button>
//                   </div>
//                   <QRCodeCanvas
//                     value={`${window.location.origin}/ar-view?fileId=${encodeURIComponent(fileId)}`}
//                     size={256}
//                     className="w-full max-w-[256px] mx-auto"
//                   />
//                   <p className="mt-4 text-center text-sm">Scan this QR code with your device to view in AR</p>
//                 </div>
//               </div>
//             )}
//             {showScreenshotModal && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-4 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">Your Cabinet Screenshot</h3>
//                     <button onClick={closeScreenshotModal} className="text-gray-500 hover:text-gray-700">
//                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M18 6L6 18M6 6l12 12" />
//                       </svg>
//                     </button>
//                   </div>
//                   <div className="mb-4">
//                     {screenshotUrl && <img src={screenshotUrl} alt="Cabinet Configuration" className="max-w-full h-auto" />}
//                   </div>
//                   <div className="flex justify-end">
//                     <button
//                       onClick={downloadScreenshot}
//                       className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
//                     >
//                       Download
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div className="config-select relative mb-4 sm:mb-6">
//               <div 
//                 className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
//                 onClick={toggleTextures}
//               >
//                 <span className="text-sm sm:text-base">Surface Finish: {textures.find(t => t.id === config.texture)?.name || 'Solid Color'}</span>
//                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d={showTextures ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
//                 </svg>
//               </div>
//               {showTextures && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
//                   {textures.map((texture) => (
//                     <div 
//                       key={texture.id} 
//                       className="p-2 hover:bg-gray-100 cursor-pointer flex items-center text-sm sm:text-base"
//                       onClick={() => { updateConfig('texture', texture.id); setShowTextures(false); }}
//                     >
//                       {texture.id && <div className="w-6 h-6 sm:w-8 sm:h-8 mr-2 border rounded bg-gray-100 overflow-hidden"></div>}
//                       <span>{texture.name}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="config-select relative mb-4 sm:mb-6">
//               <div 
//                 className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
//                 onClick={toggleHandleTypes}
//               >
//                 <span className="text-sm sm:text-base">Handle Type: {handleTypes.find(type => type.id === config.handleType)?.name}</span>
//                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d={showHandleTypes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
//                 </svg>
//               </div>
//               {showHandleTypes && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
//                   {handleTypes.map((type) => (
//                     <div 
//                       key={type.id} 
//                       className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
//                       onClick={() => { updateConfig('handleType', type.id); setShowHandleTypes(false); }}
//                     >
//                       {type.name}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="config-select relative mb-4 sm:mb-6">
//               <div 
//                 className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
//                 onClick={toggleHandleColors}
//               >
//                 <div className="flex items-center">
//                   <div 
//                     className="w-5 h-5 sm:w-6 sm:h-6 rounded mr-2 sm:mr-3" 
//                     style={{ backgroundColor: handleColors.find(color => color.id === config.handleColor)?.color }}
//                   ></div>
//                   <span className="text-sm sm:text-base">Handle Color: {handleColors.find(color => color.id === config.handleColor)?.name}</span>
//                 </div>
//                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d={showHandleColors ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
//                 </svg>
//               </div>
//               {showHandleColors && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
//                   {handleColors.map((color) => (
//                     <div 
//                       key={color.id} 
//                       className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
//                       onClick={() => { updateConfig('handleColor', color.id); setShowHandleColors(false); }}
//                     >
//                       <div className="flex items-center">
//                         <div className="w-5 h-5 sm:w-6 sm:h-6 rounded mr-2 sm:mr-3" style={{ backgroundColor: color.color }}></div>
//                         <span>{color.name}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="config-select relative mb-4 sm:mb-6">
//               <div 
//                 className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
//                 onClick={toggleLegTypes}
//               >
//                 <span className="text-sm sm:text-base">Leg Type: {legTypes.find(type => type.id === config.legType)?.name}</span>
//                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d={showLegTypes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
//                 </svg>
//               </div>
//               {showLegTypes && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
//                   {legTypes.map((type) => (
//                     <div 
//                       key={type.id} 
//                       className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
//                       onClick={() => { updateConfig('legType', type.id); setShowLegTypes(false); }}
//                     >
//                       {type.name}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="config-select relative mb-4 sm:mb-6">
//               <div 
//                 className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
//                 onClick={toggleLegColors}
//               >
//                 <div className="flex items-center">
//                   <div 
//                     className="w-5 h-5 sm:w-6 sm:h-6 rounded mr-2 sm:mr-3" 
//                     style={{ backgroundColor: legColors.find(color => color.name.toLowerCase() === config.legColor.toLowerCase())?.color || config.legColor }}
//                   ></div>
//                   <span className="text-sm sm:text-base">Leg Color: {legColors.find(color => color.color === config.legColor)?.name || 'Custom'}</span>
//                 </div>
//                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d={showLegColors ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
//                 </svg>
//               </div>
//               {showLegColors && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
//                   {legColors.map((color) => (
//                     <div 
//                       key={color.id} 
//                       className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
//                       onClick={() => { updateConfig('legColor', color.color); setShowLegColors(false); }}
//                     >
//                       <div className="flex items-center">
//                         <div className="w-5 h-5 sm:w-6 sm:h-6 rounded mr-2 sm:mr-3" style={{ backgroundColor: color.color }}></div>
//                         <span>{color.name}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="border-t my-4 sm:my-6"></div>
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">Product Price</p>
//                 <div className="flex items-center">
//                   <span className="text-lg sm:text-xl font-bold">$ {price}</span>
//                   <span className="text-xs sm:text-sm text-gray-400 ml-2 line-through">$ {originalPrice}</span>
//                 </div>
//               </div>
//               <button className="bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-gray-800 transition text-sm sm:text-base">
//                 Add to cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<CabinetConfigurator />} />
//         <Route path="/ar-view" element={<CabinetConfigurator />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;






import React, { useState, useRef, Suspense, useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { QRCodeCanvas } from 'qrcode.react';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import Dimension from './assets/Dimension';
import { Client, Storage, ID, Permission, Role } from 'appwrite';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// Preload all models
import { TextureLoader } from 'three';
useGLTF.preload('/main.glb');
useGLTF.preload('/handle-bar.glb');
useGLTF.preload('/handle-knob.glb');
useGLTF.preload('/leg-C.glb');
useGLTF.preload('/leg-D.glb');

function TexturedCabinet({ config, showDimensions, mainRef, handleRef, legRef }) {
  const { scene: cabinetScene } = useGLTF('/main.glb');
  const handleScene = config.handleType ? useGLTF(`/handle-${config.handleType}.glb`).scene : null;
  const legScene = config.legType ? useGLTF(`/leg-${config.legType}.glb`).scene : null;

  // Memoized materials
  const bodyMaterial = useMemo(() => {
    if (!config.texture) {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color(config.color),
        roughness: 0.7,
        metalness: 0.3,
      });
    }

    const textureLoader = new TextureLoader();
    const texturePath = `/colors/${config.texture}`;
    const texture = textureLoader.load(texturePath, undefined, undefined, (error) => {
      console.error('Error loading texture:', error);
    });

    if (THREE.SRGBColorSpace !== undefined) {
      texture.colorSpace = THREE.SRGBColorSpace;
    } else {
      texture.encoding = THREE.sRGBEncoding;
    }
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.flipY = false;
    texture.needsUpdate = true;

    const roughnessMap = textureLoader.load('/RoughnessMap.png', undefined, undefined, (error) => {
      console.error('Error loading roughness map:', error);
    });
    if (roughnessMap) {
      roughnessMap.wrapS = THREE.RepeatWrapping;
      roughnessMap.wrapT = THREE.RepeatWrapping;
      roughnessMap.needsUpdate = true;
    }

    return new THREE.MeshStandardMaterial({
      map: texture,
      roughnessMap: roughnessMap || undefined,
      roughness: roughnessMap ? 1 : 0.8,
      metalness: 0.2,
      envMapIntensity: 1,
    });
  }, [config.texture, config.color]);

  const handleMaterial = useMemo(() => {
    let handleColorHex = '#C0C0C0';
    if (config.handleColor === 'gold') handleColorHex = '#FFD700';
    else if (config.handleColor === 'black') handleColorHex = '#000000';
    else if (config.handleColor === 'bronze') handleColorHex = '#CD7F32';

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(handleColorHex),
      roughness: 0.4,
      metalness: 0.8,
      envMapIntensity: 1,
    });
  }, [config.handleColor]);

  const legMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(config.legColor),
      roughness: 0.3,
      metalness: 0.6,
    });
  }, [config.legColor]);

  useEffect(() => {
    if (mainRef.current) {
      const cabinetClone = cabinetScene.clone(true);
      cabinetClone.traverse((node) => {
        if (node.isMesh && (node.name.includes("565_01") || node.name.includes('frame') || node.name.includes('panel'))) {
          node.material = bodyMaterial.clone();
        }
      });
      while (mainRef.current.children.length > 0) {
        mainRef.current.remove(mainRef.current.children[0]);
      }
      mainRef.current.add(cabinetClone);
    }

    if (handleRef.current && handleScene) {
      const handleClone = handleScene.clone(true);
      handleClone.traverse((node) => {
        if (node.isMesh) {
          node.material = handleMaterial.clone();
        }
      });
      while (handleRef.current.children.length > 0) {
        handleRef.current.remove(handleRef.current.children[0]);
      }
      handleRef.current.add(handleClone);
    }

    if (legRef.current && legScene) {
      const legClone = legScene.clone(true);
      legClone.traverse((node) => {
        if (node.isMesh) {
          node.material = legMaterial.clone();
        }
      });
      while (legRef.current.children.length > 0) {
        legRef.current.remove(legRef.current.children[0]);
      }
      legRef.current.add(legClone);
    }
  }, [cabinetScene, handleScene, legScene, bodyMaterial, handleMaterial, legMaterial, mainRef, handleRef, legRef]);

  let scale = 4;
  if (config.size === 'small') scale = 0.8;
  else if (config.size === 'large') scale = 1.2;

  const dimensions = {
    width: 1.2 * scale,
    height: 0.8 * scale,
    depth: 0.5 * scale,
  };
  const widthStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
  const widthEnd = [dimensions.width / 2, 0, -dimensions.depth / 2];
  const heightStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
  const heightEnd = [-dimensions.width / 2, dimensions.height, -dimensions.depth / 2];
  const depthStart = [-dimensions.width / 2, 0, -dimensions.depth / 2];
  const depthEnd = [-dimensions.width / 2, 0, dimensions.depth / 2];

  useEffect(() => {
    if (showDimensions) {
      console.log('Dimensions visible:', dimensions);
    }
  }, [showDimensions, dimensions]);

  return (
    <group>
      <group ref={mainRef} scale={scale} position={[0, -1, 0]} />
      <group ref={handleRef} scale={scale} position={[0,-1, 0]} />
      <group ref={legRef} scale={scale} position={[0, -1, 0]} />
      {showDimensions && (
        <>
          <Dimension start={widthStart} end={widthEnd} visible={showDimensions} />
          <Dimension start={heightStart} end={heightEnd} visible={showDimensions} />
          <Dimension start={depthStart} end={depthEnd} visible={showDimensions} />
          <Html>
            <div
              className="fixed top-20 left-2 sm:left-20 md:left-32 lg:left-40 p-2 sm:p-3 bg-black bg-opacity-70 text-white rounded-md shadow-md text-xs sm:text-sm md:text-base max-w-[150px] sm:max-w-[180px] md:max-w-[200px] z-50"
            >
              <table className="w-full border-collapse font-sans">
                <thead>
                  <tr>
                    <th className="p-1 sm:p-2 text-left">Dimension</th>
                    <th className="p-1 sm:p-2 text-right">Value (m)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-1 sm:p-2 text-left">Width</td>
                    <td className="p-1 sm:p-2 text-right">{dimensions.width.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="p-1 sm:p-2 text-left">Height</td>
                    <td className="p-1 sm:p-2 text-right">{dimensions.height.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="p-1 sm:p-2 text-left">Depth</td>
                    <td className="p-1 sm:p-2 text-right">{dimensions.depth.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

function CabinetModel({ config, showDimensions, mainRef, handleRef, legRef }) {
  return (
    <Suspense fallback={null}>
      <TexturedCabinet config={config} showDimensions={showDimensions} mainRef={mainRef} handleRef={handleRef} legRef={legRef} />
    </Suspense>
  );
}

function CabinetConfigurator() {
  const mainRef = useRef();
  const handleRef = useRef();
  const legRef = useRef();
  // const [config, setConfig] = useState({
  //   size: 'medium',
  //   color: 'white',
  //   woodFinish: '#8B4513',
  //   handleType: '',
  //   handleColor: 'silver',
  //   legType: '',
  //   legColor: '#000000',
  //   texture: ''
  // });

  const [config, setConfig] = useState({
    size: 'medium',
    color: 'white',
    woodFinish: '#8B4513',
    handleType: 'bar', // Default handle type
    handleColor: 'silver',
    legType: 'C', // Default leg type
    legColor: '#000000',
    texture: 'Raya.png' // Default texture with roughness map
  });
  const [showDimensions, setShowDimensions] = useState(false);
  const [price, setPrice] = useState(200);
  const [originalPrice, setOriginalPrice] = useState(245);
  const [showSizes, setShowSizes] = useState(false);
  const [showTextures, setShowTextures] = useState(false);
  const [showHandleTypes, setShowHandleTypes] = useState(false);
  const [showHandleColors, setShowHandleColors] = useState(false);
  const [showLegTypes, setShowLegTypes] = useState(false);
  const [showLegColors, setShowLegColors] = useState(false);
  const [viewMode, setViewMode] = useState('default');
  const controlsRef = useRef();
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [showScreenshotModal, setShowScreenshotModal] = useState(false);
  const [showARViewer, setShowARViewer] = useState(false);
  const [arModelUrl, setArModelUrl] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [fileId, setFileId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  const location = useLocation();

  const textures = [
    { id: '', name: 'Solid Color' },
    { id: 'Raya.png', name: 'Natural Wood' },
    { id: 'Empire.png', name: 'White Marble' },
    { id: 'Amber.png', name: 'Polished Concrete' },
    { id: 'Bitmore.png', name: 'Black Leather' }
  ];

  const sizes = [
    { id: 'small', name: 'Small', price: 180 },
    { id: 'medium', name: 'Medium', price: 200 },
    { id: 'large', name: 'Large', price: 240 }
  ];

  const handleTypes = [
    { id: 'bar', name: 'Bar Handle' },
    { id: 'knob', name: 'Knob Handle' }
  ];

  const handleColors = [
    { id: 'silver', name: 'Silver', color: '#C0C0C0' },
    { id: 'gold', name: 'Gold', color: '#FFD700' },
    { id: 'black', name: 'Black', color: '#000000' },
    { id: 'bronze', name: 'Bronze', color: '#CD7F32' }
  ];

  const legTypes = [
    { id: 'C', name: 'Classic Legs' },
    { id: 'D', name: 'Designer Legs' }
  ];

  const legColors = [
    { id: 'black', name: 'Black', color: '#000000' },
    { id: 'silver', name: 'Silver', color: '#C0C0C0' },
    { id: 'gold', name: 'Gold', color: '#FFD700' },
    { id: 'bronze', name: 'Bronze', color: '#CD7F32' }
  ];

  const closeAllDropdowns = () => {
    setShowSizes(false);
    setShowTextures(false);
    setShowHandleTypes(false);
    setShowHandleColors(false);
    setShowLegTypes(false);
    setShowLegColors(false);
  };

  const toggleSizes = () => {
    if (showSizes) setShowSizes(false);
    else { closeAllDropdowns(); setShowSizes(true); }
  };

  const toggleTextures = () => {
    if (showTextures) setShowTextures(false);
    else { closeAllDropdowns(); setShowTextures(true); }
  };

  const toggleHandleTypes = () => {
    if (showHandleTypes) setShowHandleTypes(false);
    else { closeAllDropdowns(); setShowHandleTypes(true); }
  };

  const toggleHandleColors = () => {
    if (showHandleColors) setShowHandleColors(false);
    else { closeAllDropdowns(); setShowHandleColors(true); }
  };

  const toggleLegTypes = () => {
    if (showLegTypes) setShowLegTypes(false);
    else { closeAllDropdowns(); setShowLegTypes(true); }
  };

  const toggleLegColors = () => {
    if (showLegColors) setShowLegColors(false);
    else { closeAllDropdowns(); setShowLegColors(true); }
  };

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

  const toggleDimensions = () => {
    if (!showARViewer) setShowDimensions(prev => !prev);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    if (controlsRef.current) {
      switch (mode) {
        case 'top':
          controlsRef.current.setAzimuthalAngle(0);
          controlsRef.current.setPolarAngle(0);
          break;
        case 'front':
          controlsRef.current.setAzimuthalAngle(0);
          controlsRef.current.setPolarAngle(Math.PI / 2);
          break;
        case 'side':
          controlsRef.current.setAzimuthalAngle(Math.PI / 2);
          controlsRef.current.setPolarAngle(Math.PI / 2);
          break;
        case 'free':
          controlsRef.current.setAzimuthalAngle(Math.PI / 4);
          controlsRef.current.setPolarAngle(Math.PI / 4);
          break;
        default:
          controlsRef.current.setAzimuthalAngle(Math.PI / 4);
          controlsRef.current.setPolarAngle(Math.PI / 3);
      }
      controlsRef.current.update();
    }
  };

  const takeScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      if (controlsRef.current) controlsRef.current.update();
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (gl) {
        gl.render && gl.render();
        const dataUrl = canvas.toDataURL('image/png');
        setScreenshotUrl(dataUrl);
        setShowScreenshotModal(true);
      }
    }
  };

  const downloadScreenshot = () => {
    if (screenshotUrl) {
      const link = document.createElement('a');
      link.href = screenshotUrl;
      link.download = `cabinet-config-${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadGLB = () => {
    generateGLB().then(({ url }) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `cabinet-config-${new Date().getTime()}.glb`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(error => console.error('Download failed:', error));
  };

  const prepareSceneForExport = (group) => {
    group.traverse((node) => {
      if (node.isMesh && node.material) {
        const material = node.material.clone();
        if (material.map) material.map.needsUpdate = true;
        node.material = material;
        node.material.needsUpdate = true;
      }
    });
    return group;
  };

  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67efeb660016a94a1b36');

  const storage = new Storage(client);

  const generateGLB = () => {
    console.log('Generating GLB...');
    const exporter = new GLTFExporter();
    const sceneGroup = new THREE.Group();

    if (!mainRef.current || !handleRef.current || !legRef.current) {
      console.error('Scene refs not ready');
      return Promise.reject('Scene not ready');
    }

    sceneGroup.add(prepareSceneForExport(mainRef.current.clone()));
    sceneGroup.add(prepareSceneForExport(handleRef.current.clone()));
    sceneGroup.add(prepareSceneForExport(legRef.current.clone()));

    const options = {
      binary: true,
      trs: false,
      onlyVisible: true,
      includeCustomExtensions: false,
    };

    return new Promise((resolve, reject) => {
      exporter.parse(
        sceneGroup,
        async (gltf) => {
          try {
            const blob = new Blob([gltf], { type: 'model/gltf-binary' });
            const fileName = `cabinet-config-${new Date().getTime()}.glb`;
            const file = new File([blob], fileName, { type: 'model/gltf-binary' });

            const response = await storage.createFile(
              '67efec5900294e3b8bf2',
              ID.unique(),
              file,
              [Permission.read(Role.any())]
            );

            console.log('GLB uploaded to Appwrite:', response);
            const newFileId = response.$id;
            setFileId(newFileId);

            const fileUrl = storage.getFileView('67efec5900294e3b8bf2', newFileId);
            console.log('Generated file URL:', fileUrl);
            setArModelUrl(fileUrl);

            resolve({ url: fileUrl, fileId: newFileId });
          } catch (error) {
            console.error('Error uploading to Appwrite:', error);
            alert('Failed to upload model to Appwrite.');
            reject(error);
          }
        },
        (error) => {
          console.error('Error exporting GLB:', error);
          reject(error);
        },
        options
      );
    });
  };

  const openARViewerWithQR = async () => {
    try {
      const qrUrl = await generateQRCode();
      if (qrUrl) console.log('QR Code generated successfully:', qrUrl);
    } catch (error) {
      console.error('Failed to open AR viewer with QR:', error);
    }
  };

  const openDirectARViewer = async () => {
    try {
      const { url } = await generateGLB();
      if (url) {
        setArModelUrl(url);
        setShowARViewer(true);
        setShowDimensions(false);
      }
    } catch (error) {
      console.error('Failed to open direct AR viewer:', error);
      alert('Failed to load AR model.');
    }
  };

  const closeARViewer = () => {
    setShowARViewer(false);
    if (arModelUrl) {
      URL.revokeObjectURL(arModelUrl);
      setArModelUrl(null);
    }
  };

  const generateQRCode = async () => {
    console.log('Generating QR Code...');
    try {
      const { url, fileId: generatedFileId } = await generateGLB();
      if (url && generatedFileId) {
        const qrUrl = `${window.location.origin}/ar-view?fileId=${encodeURIComponent(generatedFileId)}`;
        console.log('Generated QR URL with Appwrite fileId:', qrUrl);
        setShowQRCode(true);
        return qrUrl;
      } else {
        console.error('No URL or fileId generated for QR code');
        alert('Failed to generate QR code: No URL or fileId returned');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate QR code.');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fileIdFromUrl = params.get('fileId');
    if (fileIdFromUrl && location.pathname === '/ar-view') {
      console.log('Detected QR scan, fetching model with fileId:', fileIdFromUrl);
      const modelUrl = storage.getFileView('67efec5900294e3b8bf2', fileIdFromUrl);
      console.log('Fetched model URL from Appwrite:', modelUrl);
      setArModelUrl(modelUrl);
      setShowARViewer(true);
      setShowDimensions(false);
    }
  }, [location]);

  const closeScreenshotModal = () => {
    setShowScreenshotModal(false);
  };

  useEffect(() => {
    const basePrice = sizes.find(s => s.id === config.size)?.price || 200;
    let totalPrice = basePrice;
    if (config.texture) totalPrice += 25;
    if (config.handleColor === 'gold') totalPrice += 15;
    else if (config.handleColor === 'bronze') totalPrice += 10;
    if (config.legType === 'D') totalPrice += 25;
    if (config.legColor === '#FFD700') totalPrice += 20;
    else if (config.legColor === '#CD7F32') totalPrice += 15;
    setPrice(totalPrice);
    setOriginalPrice(Math.round(totalPrice * 1.225));
  }, [config]);

  const updateConfig = (key, value) => {
    console.log(`Updating config: key = ${key}, value = ${value}`);
    setConfig((prev) => {
      const newConfig = { ...prev };
      if (key === "color" && value !== "") {
        if (prev.texture) newConfig.texture = "";
      } else if (key === "texture" && value !== "") {
        if (prev.color) newConfig.color = "";
      }
      newConfig[key] = value;
      return newConfig;
    });
  };

  useEffect(() => {
    if (showARViewer) setShowDimensions(false);
  }, [showARViewer]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="w-full lg:w-16 border-b lg:border-r lg:border-b-0 fixed top-0 lg:static z-20 bg-white">
          <div className="flex items-center justify-between p-2 lg:hidden">
            {/* <button onClick={toggleMenu} className="p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col items-center p-2 lg:pt-4 lg:gap-4 absolute lg:static top-12 left-0 w-full lg:w-auto bg-white border-b lg:border-0 shadow-lg lg:shadow-none`}>
            <button 
              className={`p-2 border rounded ${viewMode === 'default' ? 'bg-gray-200' : ''}`}
              onClick={() => { handleViewChange('default'); setIsMenuOpen(false); }}
              title="Default View"
            >
              {/*<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>*
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    
</svg>
            </button>
            <button 
              className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-0 lg:mt-4"
              onClick={() => { downloadGLB(); setIsMenuOpen(false); }}
              title="Download GLB"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </button>
            <button 
              className={`p-2 border rounded ${viewMode === 'top' ? 'bg-gray-200' : ''}`}
              onClick={() => { handleViewChange('top'); setIsMenuOpen(false); }}
              title="Top View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h18v18H3z" />
              </svg>
            </button>
            <button 
              className={`p-2 border rounded ${viewMode === 'front' ? 'bg-gray-200' : ''}`}
              onClick={() => { handleViewChange('front'); setIsMenuOpen(false); }}
              title="Front View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
            <button 
              className={`p-2 border rounded ${viewMode === 'free' ? 'bg-gray-200' : ''}`}
              onClick={() => { handleViewChange('free'); setIsMenuOpen(false); }}
              title="Free View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16v16H4z" />
                <path d="M9 9l6 6M15 9l-6 6" />
              </svg>
            </button>
            <button 
              className={`p-2 border rounded ${showDimensions ? 'bg-blue-200' : 'bg-gray-100'} hover:bg-blue-100`}
              onClick={() => { toggleDimensions(); setIsMenuOpen(false); }}
              title="Show Dimensions"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 12h20M12 2v20M20 16v-4M4 8v8M16 4h4M4 20h4" />
              </svg>
            </button>
            <button 
              className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-0 lg:mt-4"
              onClick={() => { openARViewerWithQR(); setIsMenuOpen(false); }}
              title="View in AR with QR"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 12 8 7v10l8-5z" />
              </svg>
            </button>
            <button 
              className="p-2 border rounded bg-green-50 hover:bg-green-100 mt-0 lg:mt-4"
              onClick={() => { openDirectARViewer(); setIsMenuOpen(false); }}
              title="Direct AR View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8zm-1-13h2v4h4v2h-4v4h-2v-4H7v-2h4z" />
              </svg>
            </button>
            <button 
              className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-0 lg:mt-4"
              onClick={() => { takeScreenshot(); setIsMenuOpen(false); }}
              title="Screenshot"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="12" cy="12" r="3" />
                <path d="M16.5 7.5h.01" />
              </svg>
            </button> */}
            <button onClick={toggleMenu} className="p-2">
  {/* Hamburger menu - this is already clear */}
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
</button>
</div>
<div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col items-center p-2 lg:pt-4 lg:gap-4 absolute lg:static top-12 left-0 w-full lg:w-auto bg-white border-b lg:border-0 shadow-lg lg:shadow-none`}>
  {/* Default View - Home with perspective lines */}
  <button 
    className={`p-2 border rounded ${viewMode === 'default' ? 'bg-gray-200' : ''}`}
    onClick={() => { handleViewChange('default'); setIsMenuOpen(false); }}
    title="Default View"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  </button>
  
  {/* Download GLB - Document with GLB text */}
  {/* <button 
    className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-0 lg:mt-4"
    onClick={() => { downloadGLB(); setIsMenuOpen(false); }}
    title="Download GLB"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M12 18v-6" />
      <path d="M9 15l3 3 3-3" />
      <path d="M9 10h2" strokeWidth="1.5" />
      <path d="M14 10h1" strokeWidth="1.5" />
      <path d="M9 12h6" strokeWidth="1.5" />
    </svg>
  </button> */}
  
  {/* Top View - Overhead view with grid */}
  <button 
    className={`p-2 border rounded ${viewMode === 'top' ? 'bg-gray-200' : ''}`}
    onClick={() => { handleViewChange('top'); setIsMenuOpen(false); }}
    title="Top View"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" />
      <path d="M4 8h16" strokeWidth="1" />
      <path d="M4 12h16" strokeWidth="1" />
      <path d="M4 16h16" strokeWidth="1" />
      <path d="M8 4v16" strokeWidth="1" />
      <path d="M12 4v16" strokeWidth="1" />
      <path d="M16 4v16" strokeWidth="1" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  </button>
  
  {/* Front View - Side elevation with indicator */}
  <button 
    className={`p-2 border rounded ${viewMode === 'front' ? 'bg-gray-200' : ''}`}
    onClick={() => { handleViewChange('front'); setIsMenuOpen(false); }}
    title="Front View"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="6" width="16" height="12" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M8 6v12" strokeWidth="1" />
      <path d="M12 6v12" strokeWidth="1" />
      <path d="M16 6v12" strokeWidth="1" />
      <path d="M4 9h16" strokeWidth="1" />
      <path d="M4 15h16" strokeWidth="1" />
    </svg>
  </button>
  
  {/* Free View - 3D cube with orbit */}
  <button 
    className={`p-2 border rounded ${viewMode === 'free' ? 'bg-gray-200' : ''}`}
    onClick={() => { handleViewChange('free'); setIsMenuOpen(false); }}
    title="Free View (Orbit)"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 8l5-3 5 3v8l-5 3-5-3V8z" />
      <path d="M12 5v8" />
      <path d="M17 8l-5 3-5-3" />
      <path d="M21 12a9 9 0 1 1-3-6.7" strokeDasharray="2,2" />
      <path d="M21 6v6h-6" />
    </svg>
  </button>
  
  {/* Show Dimensions - Measuring tools and lines */}
  <button 
    className={`p-2 border rounded ${showDimensions ? 'bg-blue-200' : 'bg-gray-100'} hover:bg-blue-100`}
    onClick={() => { toggleDimensions(); setIsMenuOpen(false); }}
    title="Show Dimensions"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 6H3" />
      <path d="M21 18H3" />
      <path d="M3 6v12" />
      <path d="M21 6v12" />
      <path d="M3 12h18" />
      <path d="M9 6v2" strokeWidth="1" />
      <path d="M15 6v2" strokeWidth="1" />
      <path d="M9 16v2" strokeWidth="1" />
      <path d="M15 16v2" strokeWidth="1" />
      <path d="M5 10h2" strokeWidth="1" />
      <path d="M5 14h2" strokeWidth="1" />
      <path d="M17 10h2" strokeWidth="1" />
      <path d="M17 14h2" strokeWidth="1" />
    </svg>
  </button>
  
  {/* View in AR with QR - QR code and mobile device */}
  <button 
    className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-0 lg:mt-4"
    onClick={() => { openARViewerWithQR(); setIsMenuOpen(false); }}
    title="View in AR with QR"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="7" height="7" />
      <rect x="4" y="13" width="7" height="7" />
      <rect x="13" y="4" width="7" height="7" />
      <path d="M17 13h3v3h-3z" strokeWidth="1.5" />
      <path d="M13 17h3v3h-3z" strokeWidth="1.5" />
      <path d="M17 17h3v3" strokeWidth="1.5" />
      <path d="M6 7h3M7 6v3" strokeWidth="1.5" />
      <path d="M6 16h3M7 15v3" strokeWidth="1.5" />
      <path d="M15 7h3M16 6v3" strokeWidth="1.5" />
    </svg>
  </button>
  
  {/* Direct AR View - AR glasses/headset */}
  <button 
    className="p-2 border rounded bg-green-50 hover:bg-green-100 mt-0 lg:mt-4"
    onClick={() => { openDirectARViewer(); setIsMenuOpen(false); }}
    title="Direct AR View"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 8h18v8H3z" />
      <path d="M12 8v8" />
      <path d="M15 16l2 3" />
      <path d="M9 16l-2 3" />
      <circle cx="7" cy="12" r="1.5" />
      <circle cx="17" cy="12" r="1.5" />
      <path d="M1 12h2" />
      <path d="M21 12h2" />
    </svg>
  </button>
  
  {/* Screenshot - Camera with viewfinder */}
  <button 
    className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-0 lg:mt-4"
    onClick={() => { takeScreenshot(); setIsMenuOpen(false); }}
    title="Screenshot"
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M8 5l2-2h4l2 2" />
      <path d="M16 8h2" />
      <path d="M10 9v6" strokeWidth="1" />
      <path d="M14 9v6" strokeWidth="1" />
      <path d="M9 10h6" strokeWidth="1" />
      <path d="M9 14h6" strokeWidth="1" />
    </svg>
  </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/5 h-[50vh] lg:h-screen flex items-center justify-center bg-gray-50 relative pt-16 lg:pt-0">
            <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }} camera={{ position: [0, 1, 8], fov: 50 }} className="w-full h-full">
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <Suspense fallback={null}>
                <CabinetModel config={config} showDimensions={showDimensions} mainRef={mainRef} handleRef={handleRef} legRef={legRef} />
                <Environment preset="city" />
                <ContactShadows opacity={0.5} scale={10} blur={1} far={10} resolution={256} position={[0, -1, 0]} />
                <CanvasCapture />
              </Suspense>
              <OrbitControls 
                ref={controlsRef}
                enablePan={viewMode === 'free'}
                enableZoom={true}
                enableRotate={viewMode === 'free' || viewMode === 'default'}
                minPolarAngle={viewMode === 'top' ? 0 : viewMode === 'front' ? Math.PI / 2 : 0}
                maxPolarAngle={viewMode === 'top' ? 0 : viewMode === 'front' ? Math.PI / 2 : Math.PI}
              />
            </Canvas>
          </div>
          <div className="w-full lg:w-2/5 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-4rem)] lg:max-h-screen">
            <h1 className="text-2xl sm:text-3xl font-normal mb-6 sm:mb-8">Cabinet Configurator</h1>
            <div className="config-select relative mb-4 sm:mb-6">
              <div 
                className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
                onClick={toggleSizes}
              >
                <span className="text-sm sm

:text-base">Size: {sizes.find(s => s.id === config.size)?.name}</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={showSizes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                </svg>
              </div>
              {showSizes && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                  {sizes.map((size) => (
                    <div 
                      key={size.id} 
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                      onClick={() => { updateConfig('size', size.id); setShowSizes(false); }}
                    >
                      {size.name} - ${size.price}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {showARViewer && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg w-full max-w-4xl h-full max-h-[90vh] overflow-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">View in AR</h3>
                    <button onClick={closeARViewer} className="text-gray-500 hover:text-gray-700">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {arModelUrl ? (
                    <>
                      <button slot="ar-button" className="absolute bottom-5 right-5 p-2 bg-black text-white rounded">
                        Enter AR
                      </button>
                      <model-viewer
                        src={arModelUrl}
                        ar
                        ar-modes="webxr scene-viewer quick-look"
                        camera-controls
                        auto-rotate
                        className="w-full h-[80vh]"
                        ar-placement="floor"
                      />
                    </>
                  ) : (
                    <p>Loading model or model URL not available...</p>
                  )}
                </div>
              </div>
            )}
            {showQRCode && arModelUrl && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg max-w-md w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Scan for AR View</h3>
                    <button onClick={() => setShowQRCode(false)} className="text-gray-500 hover:text-gray-700">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <QRCodeCanvas
                    value={`${window.location.origin}/ar-view?fileId=${encodeURIComponent(fileId)}`}
                    size={256}
                    className="w-full max-w-[256px] mx-auto"
                  />
                  <p className="mt-4 text-center text-sm">Scan this QR code with your device to view in AR</p>
                </div>
              </div>
            )}
            {showScreenshotModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Your Cabinet Screenshot</h3>
                    <button onClick={closeScreenshotModal} className="text-gray-500 hover:text-gray-700">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="mb-4">
                    {screenshotUrl && <img src={screenshotUrl} alt="Cabinet Configuration" className="max-w-full h-auto" />}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={downloadScreenshot}
                      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="config-select relative mb-4 sm:mb-6">
              <div 
                className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
                onClick={toggleTextures}
              >
                <span className="text-sm sm:text-base">Surface Finish: {textures.find(t => t.id === config.texture)?.name || 'Solid Color'}</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={showTextures ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                </svg>
              </div>
              {showTextures && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                  {textures.map((texture) => (
                    <div 
                      key={texture.id} 
                      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center text-sm sm:text-base"
                      onClick={() => { updateConfig('texture', texture.id); setShowTextures(false); }}
                    >
                      {texture.id && <div className="w-6 h-6 sm:w-8 sm:h-8 mr-2 border rounded bg-gray-100 overflow-hidden"></div>}
                      <span>{texture.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="config-select relative mb-4 sm:mb-6">
              <div 
                className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
                onClick={toggleHandleTypes}
              >
                <span className="text-sm sm:text-base">Handle Type: {handleTypes.find(type => type.id === config.handleType)?.name}</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={showHandleTypes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                </svg>
              </div>
              {showHandleTypes && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                  {handleTypes.map((type) => (
                    <div 
                      key={type.id} 
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                      onClick={() => { updateConfig('handleType', type.id); setShowHandleTypes(false); }}
                    >
                      {type.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="config-select relative mb-4 sm:mb-6">
              <div 
                className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
                onClick={toggleHandleColors}
              >
                <div className="flex items-center">
                  <div 
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded mr-2 sm:mr-3" 
                    style={{ backgroundColor: handleColors.find(color => color.id === config.handleColor)?.color }}
                  ></div>
                  <span className="text-sm sm:text-base">Handle Color: {handleColors.find(color => color.id === config.handleColor)?.name}</span>
                </div>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={showHandleColors ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                </svg>
              </div>
              {showHandleColors && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                  {handleColors.map((color) => (
                    <div 
                      key={color.id} 
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                      onClick={() => { updateConfig('handleColor', color.id); setShowHandleColors(false); }}
                    >
                      <div className="flex items-center">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded mr-2 sm:mr-3" style={{ backgroundColor: color.color }}></div>
                        <span>{color.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="config-select relative mb-4 sm:mb-6">
              <div 
                className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
                onClick={toggleLegTypes}
              >
                <span className="text-sm sm:text-base">Leg Type: {legTypes.find(type => type.id === config.legType)?.name}</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={showLegTypes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                </svg>
              </div>
              {showLegTypes && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                  {legTypes.map((type) => (
                    <div 
                      key={type.id} 
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                      onClick={() => { updateConfig('legType', type.id); setShowLegTypes(false); }}
                    >
                      {type.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="config-select relative mb-4 sm:mb-6">
              <div 
                className="flex items-center justify-between bg-gray-100 p-2 sm:p-3 rounded cursor-pointer"
                onClick={toggleLegColors}
              >
                <div className="flex items-center">
                  <div 
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded mr-2 sm:mr-3" 
                    style={{ backgroundColor: legColors.find(color => color.name.toLowerCase() === config.legColor.toLowerCase())?.color || config.legColor }}
                  ></div>
                  <span className="text-sm sm:text-base">Leg Color: {legColors.find(color => color.color === config.legColor)?.name || 'Custom'}</span>
                </div>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={showLegColors ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                </svg>
              </div>
              {showLegColors && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                  {legColors.map((color) => (
                    <div 
                      key={color.id} 
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                      onClick={() => { updateConfig('legColor', color.color); setShowLegColors(false); }}
                    >
                      <div className="flex items-center">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded mr-2 sm:mr-3" style={{ backgroundColor: color.color }}></div>
                        <span>{color.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t my-4 sm:my-6"></div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Product Price</p>
                <div className="flex items-center">
                  <span className="text-lg sm:text-xl font-bold">$ {price}</span>
                  <span className="text-xs sm:text-sm text-gray-400 ml-2 line-through">$ {originalPrice}</span>
                </div>
              </div>
              <button className="bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-gray-800 transition text-sm sm:text-base">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CabinetConfigurator />} />
        <Route path="/ar-view" element={<CabinetConfigurator />} />
      </Routes>
    </Router>
  );
}

export default App;