import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import CabinetModel from './CabinetModel';
import Sidebar from './Sidebar';
import ConfigPanel from './ConfigPanel';
import ScreenshotModal from './ScreenshotModal';
import ARViewer from './ARViewer';
import QRCodeModal from './QRCodeModal';
import CanvasCapture from './CanvasCapture';

function CabinetConfigurator() {
  const mainRef = useRef();
  const handleRef = useRef();
  const legRef = useRef();
  const [config, setConfig] = useState({
    size: 'medium',
    color: '#4b5c4b',
    woodFinish: '#8B4513',
    handleType: 'bar',
    handleColor: 'silver',
    legType: 'C',
    legColor: '#000000',
    texture: ''
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
  const canvasRef = useRef(null);
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [showScreenshotModal, setShowScreenshotModal] = useState(false);
  const [screenshotCanvas, setScreenshotCanvas] = useState(null);
  // const [showARViewer, setShowARViewer] = useState(false);
  // const [arModelPath, setArModelPath] = useState('/models/cabinet-default.glb');
  const [showARViewer, setShowARViewer] = useState(false);
  const [arModelUrl, setArModelUrl] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false); // For displaying QR code
  const location = useLocation();
  // Improved texture list with better file references
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

  const cabinetColors = [
    { id: 'sage', color: '#4b5c4b' },
    { id: 'navy', color: '#1a237e' },
    { id: 'cream', color: '#fff8e1' },
    { id: 'charcoal', color: '#37474f' }
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

  function CanvasCapture() {
    const { gl, scene, camera } = useThree();
    
    useEffect(() => {
      // Add a method to the gl object to capture the current frame
      gl.captureFrame = () => {
        gl.render(scene, camera);
        return gl.domElement.toDataURL('image/png');
      };
    }, [gl, scene, camera]);
    
    return null;
  }
  
  
  
  const toggleDimensions = () => {
    // setShowDimensions(!showDimensions);
    setShowDimensions(prevShowDimensions => !prevShowDimensions);
  };
  
  const handleViewChange = (mode) => {
    setViewMode(mode);
    
    if (controlsRef.current) {
      switch(mode) {
        case 'top':
          controlsRef.current.setAzimuthalAngle(0);
          controlsRef.current.setPolarAngle(0);
          controlsRef.current.update();
          break;
        case 'front':
          controlsRef.current.setAzimuthalAngle(0);
          controlsRef.current.setPolarAngle(Math.PI / 2);
          controlsRef.current.update();
          break;
        case 'side':
          controlsRef.current.setAzimuthalAngle(Math.PI / 2);
          controlsRef.current.setPolarAngle(Math.PI / 2);
          controlsRef.current.update();
          break;
        case 'free':
          controlsRef.current.setAzimuthalAngle(Math.PI / 4);
          controlsRef.current.setPolarAngle(Math.PI / 4);
          controlsRef.current.update();
          break;
        default:
          controlsRef.current.setAzimuthalAngle(Math.PI / 4);
          controlsRef.current.setPolarAngle(Math.PI / 3);
          controlsRef.current.update();
      }
    }
  };
  
  const takeScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      // Force a render update
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Get the WebGL context
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (gl) {
        // Ensure we capture the current frame
        gl.render && gl.render();
        
        // Create the screenshot
        const dataUrl = canvas.toDataURL('image/png');
        setScreenshotUrl(dataUrl);
        setShowScreenshotModal(true);
      }
    }
  };
  
  // Download screenshot
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
    generateGLB().then((url) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `cabinet-config-${new Date().getTime()}.glb`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error) => {
      console.error('Download failed:', error);
    });
  };
  const prepareSceneForExport = (group) => {
    group.traverse((node) => {
      if (node.isMesh && node.material) {
        const material = node.material.clone();
        if (material.map) {
          material.map.encoding = THREE.sRGBEncoding;
          material.map.needsUpdate = true;
        }
        node.material = material;
        node.material.needsUpdate = true;
      }
    });
    return group;
  };
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
      embedImages:true,
      includeCustomExtensions: false,
    };
    
  
    return new Promise((resolve, reject) => {
      exporter.parse(
        sceneGroup,
        (gltf) => {
          const blob = new Blob([gltf], { type: 'model/gltf-binary' });
          const url = URL.createObjectURL(blob);
          console.log('GLB generated, URL:', url);
          setArModelUrl(url);
          resolve(url);
        },
        (error) => {
          console.error('Error exporting GLB:', error);
          reject(error);
        },
        options
      );
    });
  };
  const openARViewer = async () => {
    try {
      await generateQRCode(); // Generate the GLB and show the QR code
      // Optionally, you can still open the AR viewer after generating the QR code
      // setShowARViewer(true);
    } catch (error) {
      console.error('Failed to open AR viewer:', error);
    }
  };
  
  // Close AR viewer
  const closeARViewer = () => {
    setShowARViewer(false);
    if (arModelUrl) {
      URL.revokeObjectURL(arModelUrl); // Clean up the Blob URL
      setArModelUrl(null);
    }
  };
  
  const uploadToServer = async (blob) => {
    const formData = new FormData();
    formData.append('file', blob, 'cabinet.glb');
    const response = await fetch('/upload', { method: 'POST', body: formData });
    const { url } = await response.json();
    return url;
  };

  const generateQRCode = async () => {
    console.log('Generating QR Code...');
    try {
      const url = await generateGLB();
      if (url) {
        const qrUrl = `${window.location.origin}/ar-view?model=${encodeURIComponent(url)}`;
        console.log('Generated QR URL:', qrUrl);
        setShowQRCode(true);
        return qrUrl;
        // console.log('QR Code should be visible now, URL:', url);
      } else {
        console.error('No URL generated for QR code');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };
  

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modelUrl = params.get('model');
    if (modelUrl && location.pathname === '/ar-view') {
      console.log('Detected QR scan, opening AR with URL:', modelUrl);
      setArModelUrl(decodeURIComponent(modelUrl));
      setShowARViewer(true);
    }
  }, [location])
  // Close screenshot modal
  const closeScreenshotModal = () => {
    setShowScreenshotModal(false);
  };

  useEffect(() => {
    const basePrice = sizes.find(s => s.id === config.size)?.price || 200;
    let totalPrice = basePrice;
    
    // Add texture pricing
    if (config.texture) {
      totalPrice += 25; // Premium for textured finishes
    }
    
    if (config.handleColor === 'gold') {
      totalPrice += 15;
    } else if (config.handleColor === 'bronze') {
      totalPrice += 10;
    }

    if (config.legType === 'D') {
      totalPrice += 25;
    }
    
    if (config.legColor === '#FFD700') {
      totalPrice += 20;
    } else if (config.legColor === '#CD7F32') {
      totalPrice += 15;
    }
    
    setPrice(totalPrice);
    setOriginalPrice(Math.round(totalPrice * 1.225));
  }, [config]);
  
  const updateConfig = (key, value) => {
    setConfig(prev => {
      // Create a copy of the previous state
      const newConfig = { ...prev };
      
      // Only handle texture/color interaction if one of those properties is being updated
      if (key === 'color') {
        // Only reset texture when changing from solid color to another solid color
        if (value !== '') {
          newConfig.texture = '';
        }
        newConfig[key] = value;
      } else if (key === 'texture') {
        // Only reset color when changing from texture to another texture
        if (value !== '') {
          newConfig.color = '';
        }
        newConfig[key] = value;
      } else {
        // For all other properties, just update normally without side effects
        newConfig[key] = value;
      }
      
      return newConfig;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <div className="w-16 border-r">
          <div className="flex flex-col items-center pt-4 gap-4">
            <button 
              className={`p-2 border rounded ${viewMode === 'default' ? 'bg-gray-200' : ''}`}
              onClick={() => handleViewChange('default')}
              title="Default View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            </button>
           
<button 
  className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-4"
  onClick={downloadGLB}
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
              onClick={() => handleViewChange('top')}
              title="Top View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h18v18H3z" />
              </svg>
            </button>
            
            <button 
              className={`p-2 border rounded ${viewMode === 'front' ? 'bg-gray-200' : ''}`}
              onClick={() => handleViewChange('front')}
              title="Front View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
            <button 
              className={`p-2 border rounded ${viewMode === 'free' ? 'bg-gray-200' : ''}`}
              onClick={() => handleViewChange('free')}
              title="Free View"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16v16H4z" />
                <path d="M9 9l6 6M15 9l-6 6" />
              </svg>
            </button>
            <button 
              className={`p-2 border rounded ${showDimensions ? 'bg-blue-200' : 'bg-gray-100'} hover:bg-blue-100`}
              onClick={toggleDimensions}
              title="Show Dimensions"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 12h20M12 2v20M20 16v-4M4 8v8M16 4h4M4 20h4" />
              </svg>
            </button>
            <button 
              className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-4"
              onClick={openARViewer}
              title="View in AR"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 12 8 7v10l8-5z" />
              </svg>
            </button>
            <button 
              className="p-2 border rounded bg-blue-50 hover:bg-blue-100 mt-4"
              onClick={takeScreenshot}
              title="Screenshot"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="12" cy="12" r="3" />
                <path d="M16.5 7.5h.01" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="w-full md:w-3/5 h-[50vh] md:h-auto flex items-center justify-center bg-gray-50">
            <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              
              <Suspense fallback={null}>
                <CabinetModel config={config} showDimensions={showDimensions} mainRef={mainRef}
          handleRef={handleRef}
          legRef={legRef}/>
                <Environment preset="city" />
                <ContactShadows opacity={0.5} scale={10} blur={1} far={10} resolution={256} />
                <CanvasCapture setScreenshotCanvas={setScreenshotCanvas} />
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
          <div className="w-full md:w-2/5 p-6 overflow-y-auto">
            <h1 className="text-3xl font-normal mb-8">Cabinet Configurator</h1>
            
            <div className="config-select relative mb-6">
              <div 
                className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
                onClick={() => setShowSizes(!showSizes)}
              >
                <span>Size: {sizes.find(s => s.id === config.size)?.name}</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={showSizes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                </svg>
              </div>
              
              {showSizes && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                  {sizes.map((size) => (
                    <div 
                      key={size.id} 
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        updateConfig('size', size.id);
                        setShowSizes(false);
                      }}
                    >
                      {size.name} - ${size.price}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {showARViewer && arModelUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full h-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">View in AR</h3>
              <button onClick={closeARViewer} className="text-gray-500 hover:text-gray-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <model-viewer
              src={arModelUrl}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate
              style={{ width: '100%', height: '80vh' }}
              ar-placement="floor"
            >
              <button slot="ar-button" style={{ position: 'absolute', bottom: '20px', right: '20px', padding: '10px', background: '#000', color: '#fff', borderRadius: '5px' }}>
                Enter AR
              </button>
            </model-viewer>
          </div>
        </div>
      )}
      {showQRCode && arModelUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Scan for AR View</h3>
              <button onClick={() => setShowQRCode(false)} className="text-gray-500 hover:text-gray-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <QRCodeCanvas
              value={`${window.location.origin}/ar-view?model=${encodeURIComponent(arModelUrl)}`}
              size={256}
            />
            <p className="mt-4 text-center">Scan this QR code with your device to view in AR</p>
          </div>
        </div>
      )}

            
            {/* Screenshot Modal */}
            {showScreenshotModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg max-w-2xl max-h-[90vh] overflow-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Your Cabinet Screenshot</h3>
                    <button 
                      onClick={closeScreenshotModal}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    {screenshotUrl && (
                      <img src={screenshotUrl} alt="Cabinet Configuration" className="max-w-full" />
                    )}
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
            
            <div className="config-select relative mb-6">
              <div 
                className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
                onClick={() => setShowTextures(!showTextures)}
              >
                <span>Surface Finish: {textures.find(t => t.id === config.texture)?.name || 'Solid Color'}</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={showTextures ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                </svg>
              </div>
              
              {showTextures && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                  {textures.map((texture) => (
                    <div 
                      key={texture.id} 
                      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => {
                        updateConfig('texture', texture.id);
                        setShowTextures(false);
                      }}
                    >
                      {texture.id && (
                        <div className="w-8 h-8 mr-2 border rounded bg-gray-100 overflow-hidden">
                          {/* Optional: Show texture preview */}
                        </div>
                      )}
                      <span>{texture.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {!config.texture && (
              <div className="mb-6">
                <p className="text-sm text-gray-700 mb-2">Cabinet Color</p>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="grid grid-cols-4 gap-4">
                    {cabinetColors.map((colorOption, index) => (
                      <button
                        key={index}
                        className={`w-12 h-12 rounded cursor-pointer ${config.color === colorOption.color ? 'ring-2 ring-black' : ''}`}
                        style={{ backgroundColor: colorOption.color }}
                        onClick={() => updateConfig('color', colorOption.color)}
                        aria-label={`Select ${colorOption.id} color`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div className="config-select relative mb-6">
              <div 
                className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
                onClick={() => setShowHandleTypes(!showHandleTypes)}
              >
                <span>Handle Type: {handleTypes.find(type => type.id === config.handleType)?.name}</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={showHandleTypes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                </svg>
              </div>
              
              {showHandleTypes && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                  {handleTypes.map((type) => (
                    <div 
                      key={type.id} 
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        updateConfig('handleType', type.id);
                        setShowHandleTypes(false);
                      }}
                    >
                      {type.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <ARViewer 
        visible={showARViewer} 
        onClose={closeARViewer} 
        modelPath={arModelUrl} 
        config={config}
      />
      
            
            <div className="config-select relative mb-6">
              <div 
                className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
                onClick={() => setShowHandleColors(!showHandleColors)}
              >
                <div className="flex items-center">
                  <div 
                    className="w-6 h-6 rounded mr-3" 
                    style={{ backgroundColor: handleColors.find(color => color.id === config.handleColor)?.color }}
                  ></div>
                  <span>Handle Color: {handleColors.find(color => color.id === config.handleColor)?.name}</span>
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
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        updateConfig('handleColor', color.id);
                        setShowHandleColors(false);
                      }}
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-6 h-6 rounded mr-3" 
                          style={{ backgroundColor: color.color }}
                        ></div>
                        <span>{color.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="config-select relative mb-6">
              <div 
                className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
                onClick={() => setShowLegTypes(!showLegTypes)}
              >
                <span>Leg Type: {legTypes.find(type => type.id === config.legType)?.name}</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={showLegTypes ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                </svg>
              </div>
              
              {showLegTypes && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
                  {legTypes.map((type) => (
                    <div 
                      key={type.id} 
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        updateConfig('legType', type.id);
                        setShowLegTypes(false);
                      }}
                    >
                      {type.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="config-select relative mb-6">
              <div 
                className="flex items-center justify-between bg-gray-100 p-3 rounded cursor-pointer"
                onClick={() => setShowLegColors(!showLegColors)}
              >
                <div className="flex items-center">
                  <div 
                    className="w-6 h-6 rounded mr-3" 
                    style={{ backgroundColor: legColors.find(color => color.name.toLowerCase() === config.legColor.toLowerCase())?.color || config.legColor }}
                  ></div>
                  <span>Leg Color: {legColors.find(color => color.color === config.legColor)?.name || 'Custom'}</span>
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
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        updateConfig('legColor', color.color);
                        setShowLegColors(false);
                      }}
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-6 h-6 rounded mr-3" 
                          style={{ backgroundColor: color.color }}
                        ></div>
                        <span>{color.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t my-6"></div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Product Price</p>
                <div className="flex items-center">
                  <span className="text-xl font-bold">$ {price}</span>
                  <span className="text-sm text-gray-400 ml-2 line-through">$ {originalPrice}</span>
                </div>
              </div>
              
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CabinetConfigurator;