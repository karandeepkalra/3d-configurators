import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// const BagConfigurator = () => {
//   const [mobileArLoading, setMobileArLoading] = useState(false);
//   const [selectedAccessory, setSelectedAccessory] = useState('Acc1.glb');
//   const [selectedTexture, setSelectedTexture] = useState('Black_Basecolor.jpg');
//   const [showMeasurements, setShowMeasurements] = useState(false);
//   const [measurement, setMeasurement] = useState(null);
//   const [isArMode, setIsArMode] = useState(false);
//   const [arModelSrc, setArModelSrc] = useState(null);
//   const [screenshotData, setScreenshotData] = useState(null);
//   const [sceneRenderer, setSceneRenderer] = useState(null);
//   const [modelViewerLoaded, setModelViewerLoaded] = useState(false);
//   const [arSupported, setArSupported] = useState(false);
//   const [arLoading, setArLoading] = useState(false);
//   const [arError, setArError] = useState(null);
//   const [downloadLink, setDownloadLink] = useState(null);

//   const meshRef = useRef(null);
//   const canvasRef = useRef(null);
//   const modelViewerRef = useRef(null);

//   const handleSceneCapture = (renderer) => setSceneRenderer(renderer);

//   const handleMeasurement = () => {
//       if (!meshRef.current) return;
//       const box = new THREE.Box3().setFromObject(meshRef.current);
//       const size = box.getSize(new THREE.Vector3());
//       setMeasurement({ x: size.x, y: size.y, z: size.z });
//       setShowMeasurements(!showMeasurements);
//   };

//   const updateArModel = async () => {
//       setArLoading(true);
//       setArError(null);

//       const arModelUrl = await generateARModel(
//           '/BlackLeather.glb',
//           selectedAccessory,
//           selectedTexture
//       );

//       if (arModelUrl) {
//           setArModelSrc(arModelUrl);
//       } else {
//           setArError('Failed to generate AR model');
//       }
//       setArLoading(false);
//   };

//   const checkArSupport = () => {
//       if (window.navigator.xr) {
//           window.navigator.xr.isSessionSupported('immersive-ar')
//               .then(supported => setArSupported(supported))
//               .catch(err => {
//                   console.error('AR check error:', err);
//                   setArSupported(false);
//               });
//       } else if ('customElements' in window && window.customElements.get('model-viewer')) {
//           setArSupported(true);
//       } else {
//           setArSupported(false);
//       }
//   };

//   const handleArMode = async () => {
//       if (!isArMode) {
//           try { 
              
//               const arModelUrl = await generateARModel(
//                   '/BlackLeather.glb',
//                   selectedAccessory,
//                   selectedTexture
//               );
//               setArModelSrc(arModelUrl);
//               setIsArMode(true);
              
//               // Check if on mobile device
//               const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
              
//               // If on mobile, directly trigger AR experience after model loads
//               if (isMobile) {
//                   // Short timeout to ensure model-viewer is rendered
//                   setTimeout(() => {
//                       if (modelViewerRef.current) {
//                           // Programmatically click the AR button to activate AR experience
//                           const arButton = modelViewerRef.current.querySelector('button[slot="ar-button"]');
//                           if (arButton) {
//                               arButton.click();
//                           } else {
//                               // Alternative approach - use activateAR method if available
//                               if (typeof modelViewerRef.current.activateAR === 'function') {
//                                   modelViewerRef.current.activateAR();
//                               }
//                           }
//                       }
//                   }, 1000);
//               }
//               if (isMobile) {
//                   setTimeout(() => {
//                       setMobileArLoading(false);
//                   }, 5000); // Hide after 5 seconds max
//               }
//           } catch (error) {
//               setArError(Failed to generate AR model: ${error.message});
//               console.error('AR generation failed:', error);
//               setMobileArLoading(false)
//           }
//       } else {
//           setIsArMode(false);
//       }
//   };
//   const handleScreenshot = () => {
//       if (isArMode && modelViewerRef.current) {
//           modelViewerRef.current.toBlob({ mimeType: 'image/png', idealAspect: true, quality: 0.92 })
//               .then((blob) => {
//                   const url = URL.createObjectURL(blob);
//                   setScreenshotData(url);
//               })
//               .catch(error => {
//                   console.error('Error taking AR screenshot:', error);
//                   alert('Unable to take screenshot in AR mode.');
//               });
//       } else if (sceneRenderer) {
//           const { gl, scene, camera } = sceneRenderer;
//           gl.preserveDrawingBuffer = true;
//           gl.render(scene, camera);
//           const dataURL = gl.domElement.toDataURL('image/png');
//           gl.preserveDrawingBuffer = false;
//           setScreenshotData(dataURL);
//       }
//   };

//   const downloadScreenshot = () => {
//       if (screenshotData) {
//           const link = document.createElement('a');
//           link.href = screenshotData;
//           link.download = customized_bag_${new Date().toISOString().split('T')[0]}.png;
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
//           setScreenshotData(null);
//       }
//   };

//   const closeScreenshot = () => setScreenshotData(null);

//   useEffect(() => {
//       checkArSupport();
//       if (window.customElements) {
//           if (!window.customElements.get('model-viewer')) {
//               window.addEventListener('WebComponentsReady', () => setModelViewerLoaded(true));
//           } else {
//               setModelViewerLoaded(true);
//           }
//       }
//       return () => window.removeEventListener('WebComponentsReady', () => setModelViewerLoaded(true));
//   }, []);

//   useEffect(() => {
//       if (isArMode) updateArModel();
//   }, [selectedAccessory, selectedTexture]);

//   const handleDownloadGLB = () => {
//       if (!meshRef.current) {
//           console.error('No mesh reference available');
//           return;
//       }
  
//       // Create a scene clone to ensure we have all the materials and textures
//       const scene = meshRef.current.clone();
      
//       // Make sure scene has proper materials before export
//       scene.traverse((node) => {
//           if (node.isMesh && node.material) {
//               // Ensure material is properly cloned with textures
//               if (Array.isArray(node.material)) {
//                   node.material = node.material.map(mat => mat.clone());
//               } else {
//                   node.material = node.material.clone();
//               }
              
//               // Make sure material updates are applied
//               if (node.material.map) node.material.map.needsUpdate = true;
//               node.material.needsUpdate = true;
//           }
//       });
  
//       const exporter = new GLTFExporter();
      
//       // Use proper export options
//       const exportOptions = {
//           binary: true,
//           includeCustomExtensions: true,
//           animations: [],
//           onlyVisible: true
//       };
      
//       exporter.parse(
//           scene,
//           (glb) => {
//               if (!glb || glb.byteLength === 0) {
//                   console.error('Generated GLB is empty');
//                   alert('Failed to generate the 3D model file. Please try again.');
//                   return;
//               }
              
//               const blob = new Blob([glb], { type: 'model/gltf-binary' });
//               const url = URL.createObjectURL(blob);
              
//               console.log('GLB file created successfully, size:', blob.size, 'bytes');
//               setDownloadLink(url);
//           },
//           (error) => {
//               console.error('GLB Export error:', error);
//               alert('Failed to generate the 3D model file: ' + error.message);
//           },
//           exportOptions
//       );
//   };

//   useEffect(() => {
//       if (downloadLink) {
//           const link = document.createElement('a');
//           link.href = downloadLink;
//           link.download = customized_bag_${new Date().toISOString().split('T')[0]}.glb;
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
//           setDownloadLink(null);
//       }
//   }, [downloadLink]);
//    if(mobileArLoading){
//       alert("Opening in y")
//    }
//   if (isArMode && arModelSrc) {
//       return (
//           <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
//               {arLoading && (
//                   <div style={{
//                       position: 'absolute',
//                       top: '50%',
//                       left: '50%',
//                       transform: 'translate(-50%, -50%)',
//                       color: 'white',
//                       background: 'rgba(0,0,0,0.7)',
//                       padding: '20px',
//                       borderRadius: '8px'
//                   }}>
//                       Loading AR Model...
//                   </div>
//               )}
//               {arError && (
//                   <div style={{
//                       position: 'absolute',
//                       top: '50%',
//                       left: '50%',
//                       transform: 'translate(-50%, -50%)',
//                       color: 'white',
//                       background: 'rgba(255,0,0,0.7)',
//                       padding: '20px',
//                       borderRadius: '8px'
//                   }}>
//                       {arError}
//                   </div>
//               )}
              
// {!arLoading && !arError && (
//   <model-viewer
//       ref={modelViewerRef}
//       src={arModelSrc}
//       ar
//       ar-modes="webxr scene-viewer quick-look"
//       camera-controls
//       ar-placement="floor"
//       ar-scale="auto"
//       shadow-intensity="1"
//       exposure="1"
//       environment-image="neutral"
//       auto-rotate
//       style={{ width: '100%', height: '100%' }}
//       onError={(error) => {
//           console.error('model-viewer error:', error);
//           setArError('Error loading AR view');
//           setMobileArLoading(false);
//       }}
//       onLoad={() => {
//           console.log('AR model loaded successfully');
//           setMobileArLoading(false);
//           // Check if on mobile device
//           const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          
//           // If on mobile, directly trigger AR experience after model loads
//           if (isMobile) {
//               setTimeout(() => {
//                   try {
//                       // Try using the activateAR method first
//                       if (typeof modelViewerRef.current.activateAR === 'function') {
//                           modelViewerRef.current.activateAR();
//                       } else {
//                           // Fallback to clicking the AR button
//                           const arButton = modelViewerRef.current.querySelector('button[slot="ar-button"]');
//                           if (arButton) {
//                               arButton.click();
//                           }
//                       }
//                   } catch (e) {
//                       console.error('Error auto-activating AR:', e);
//                   }
//               }, 1000);
//           }
//       }}
//   >
//       <button
//           slot="ar-button"
//           style={{
//               backgroundColor: 'white',
//               borderRadius: '4px',
//               border: 'none',
//               position: 'absolute',
//               bottom: '16px',
//               right: '16px',
//               padding: '8px 16px',
//               fontSize: '14px',
//               fontWeight: 'bold',
//               boxShadow: '0 2px 4px rgba(0,0,0,0.25)'
//           }}
//       >
//           Activate AR
//       </button>
//   </model-viewer>
// )}
//               <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
//                   <button
//                       onClick={() => setIsArMode(false)}
//                       style={{
//                           backgroundColor: 'white',
//                           padding: '8px 16px',
//                           borderRadius: '4px',
//                           border: 'none',
//                           boxShadow: '0 2px 4px rgba(0,0,0,0.25)'
//                       }}
//                   >
//                       Exit AR
//                   </button>
              
//               </div>
//           </div>
//       );
//   }

//   return (
//       <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100vh', background: '#f8f8f8', fontFamily: 'sans-serif', overflow: 'hidden' }}>
//           <div style={{ flex: 2, display: 'flex', flexDirection: 'column', padding: '20px', overflow: 'hidden' }}>
//               <Canvas ref={canvasRef} style={{ flex: 1, background: '#f0f0f0', borderRadius: '8px' }}>
//                   <PerspectiveCamera makeDefault position={[0, 2, 2]} fov={70} />
//                   <ambientLight intensity={1.5} />
//                   <directionalLight position={[-2, 5, 2]} intensity={1} />
//                   <Suspense fallback={<Loading />}>
//                       <Model accessory={selectedAccessory} texture={selectedTexture} meshRef={meshRef} />
//                       <SceneCapture onCapture={handleSceneCapture} />
//                       <DimensionsOverlay show={showMeasurements} measurement={measurement} meshRef={meshRef} />
//                   </Suspense>
//                   <OrbitControls />
//               </Canvas>
//               <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', flexWrap: 'wrap' }}>
//                   <button
//                       onClick={handleArMode}
//                       disabled={!arSupported && !modelViewerLoaded}
//                       style={{
//                           padding: '10px 15px',
//                           borderRadius: '5px',
//                           border: '1px solid #ccc',
//                           background: arSupported ? 'white' : '#f0f0f0',
//                           cursor: arSupported ? 'pointer' : 'not-allowed',
//                           opacity: arSupported ? 1 : 0.7,
//                           margin: '5px'
//                       }}
//                   >
//                       {isArMode ? (
//                           <>
//                               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
//                                   <path d="M18 6L6 18M6 6l12 12" />
//                               </svg>
//                               Exit AR
//                           </>
//                       ) : (
//                           <>
//                               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
//                                   <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
//                                   <polyline points="10 17 15 12 10 7" />
//                                   <line x1="15" y1="12" x2="3" y2="12" />
//                               </svg>
//                               View in AR
//                           </>
//                       )}
//                   </button>
//                   <button
//                       onClick={handleScreenshot}
//                       style={{
//                           padding: '10px 15px',
//                           borderRadius: '5px',
//                           border: '1px solid #ccc',
//                           background: 'white',
//                           cursor: 'pointer',
//                           margin: '5px'
//                       }}
//                   >
//                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
//                           <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
//                           <circle cx="8.5" cy="8.5" r="1.5" />
//                           <polyline points="21 15 16 10 5 21" />
//                       </svg>
//                       Screenshot
//                   </button>
//                   <button
//                       onClick={handleMeasurement}
//                       style={{
//                           padding: '10px 15px',
//                           borderRadius: '5px',
//                           border: '1px solid #ccc',
//                           background: 'white',
//                           cursor: 'pointer',
//                           margin: '5px'
//                       }}
//                   >
//                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
//                           <line x1="3" y1="3" x2="21" y2="21" />
//                           <polyline points="7 3 3 7" />
//                           <polyline points="21 17 21 21" />
//                       </svg>
//                       Measurements
//                   </button>
//                   <button
//                       onClick={handleDownloadGLB}
//                       style={{
//                           padding: '10px 15px',
//                           borderRadius: '5px',
//                           border: '1px solid #ccc',
//                           background: 'white',
//                           cursor: 'pointer',
//                           margin: '5px'
//                       }}
//                   >
//                       Download GLB
//                   </button>
//               </div>
//           </div>
//           <div style={{ flex: 1, padding: '20px', backgroundColor: 'white', borderRadius: '8px', margin: '20px', overflow: 'auto' }}>
//               <div style={{ textAlign: 'left' }}>
//                   <h2 style={{ fontSize: '1.8em', fontWeight: 'bold', marginBottom: '5px' }}>Bag CONFIGURATOR</h2>
//                   <p style={{ color: '#888' }}>★★★★★ (1152)</p>
//                   <p style={{ fontSize: '1.4em', fontWeight: 'bold', marginTop: '5px' }}>$245</p>
//               </div>
//               <div style={{ marginTop: '20px' }}>
//                   <h3>1. Select Accessories</h3>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
//                       <div style={{ textAlign: 'center', margin: '0 5px' }}>
//                           <img
//                               src="/ICON/Acc1.png"
//                               alt="Fixed Arms"
//                               style={{ width: '60px', height: '60px', cursor: 'pointer', borderRadius: '5px', border: selectedAccessory === 'Acc1.glb' ? '2px solid #007bff' : '1px solid #ddd', padding: '5px' }}
//                               onClick={() => setSelectedAccessory('Acc1.glb')}
//                           />
//                           <p style={{ fontSize: '0.9em', marginTop: '5px' }}>Fixed</p>
//                       </div>
//                       <div style={{ textAlign: 'center', margin: '0 5px' }}>
//                           <img
//                               src="/ICON/Acc2.png"
//                               alt="Adjustable Arms"
//                               style={{ width: '60px', height: '60px', cursor: 'pointer', borderRadius: '5px', border: selectedAccessory === 'Acc2.glb' ? '2px solid #007bff' : '1px solid #ddd', padding: '5px' }}
//                               onClick={() => setSelectedAccessory('Acc2.glb')}
//                           />
//                           <p style={{ fontSize: '0.9em', marginTop: '5px' }}>Adjustable</p>
//                       </div>
//                       <div style={{ textAlign: 'center', margin: '0 5px' }}>
//                           <img
//                               src="/ICON/Acc3.png"
//                               alt="No Arms"
//                               style={{ width: '60px', height: '60px', cursor: 'pointer', borderRadius: '5px', border: selectedAccessory === 'Acc3.glb' ? '2px solid #007bff' : '1px solid #ddd', padding: '5px' }}
//                               onClick={() => setSelectedAccessory('Acc3.glb')}
//                           />
//                           <p style={{ fontSize: '0.9em', marginTop: '5px' }}>No Arms</p>
//                       </div>
//                   </div>
//               </div>
//               <div style={{ marginTop: '20px' }}>
//                   <h3>2. Select Textures</h3>
//                   <select
//                       value={selectedTexture}
//                       onChange={(e) => setSelectedTexture(e.target.value)}
//                       style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
//                   >
//                       <option value="Black_Basecolor.jpg">Black Leather</option>
//                       <option value="BlueLeathertexture.jpg">Blue Leather</option>
//                       <option value="Normal.jpg">Normal</option>
//                       <option value="Roughness.png">Roughness</option>
//                   </select>
//               </div>
             
//           </div>
//           {screenshotData && (
//               <div style={{
//                   position: 'fixed',
//                   top: 0,
//                   left: 0,
//                   width: '100%',
//                   height: '100%',
//                   backgroundColor: 'rgba(0,0,0,0.8)',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   zIndex: 1000
//               }}>
//                   <div style={{
//                       maxWidth: '90%',
//                       maxHeight: '90%',
//                       backgroundColor: '#222',
//                       padding: '20px',
//                       borderRadius: '10px',
//                       boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
//                       overflow: 'auto'
//                   }}>
//                       <h3 style={{ color: 'white', marginTop: 0 }}>Screenshot Preview</h3>
//                       <img
//                           src={screenshotData}
//                           alt="Customized Bag Screenshot"
//                           style={{ maxWidth: '100%', maxHeight: '70vh', border: '1px solid #444', objectFit: 'contain' }}
//                       />
//                       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
//                           <button
//                               onClick={downloadScreenshot}
//                               style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
//                           >
//                               Download
//                           </button>
//                           <button
//                               onClick={closeScreenshot}
//                               style={{ padding: '10px 20px', backgroundColor: '#555', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
//                           >
//                               Close
//                           </button>
//                       </div>
//                   </div>
//               </div>
//           )}
 
//       </div>
//   );
// };