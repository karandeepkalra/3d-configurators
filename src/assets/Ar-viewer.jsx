
// import React from 'react';

// function ARViewer({ visible, onClose, modelPath, config }) {
//   if (!visible || !modelPath) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-4 rounded-lg w-full h-full max-w-4xl max-h-[90vh] overflow-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">AR View</h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               <path d="M18 6L6 18M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//         <model-viewer
//           src={modelPath}
//           ar
//           ar-modes="webxr scene-viewer quick-look"
//           camera-controls
//           auto-rotate
//           style={{ width: '100%', height: '80vh' }}
//         >
//           <button slot="ar-button" style={{ position: 'absolute', bottom: '20px', right: '20px', padding: '10px', background: '#000', color: '#fff', borderRadius: '5px' }}>
//             Enter AR
//           </button>
//         </model-viewer>
//       </div>
//     </div>
//   );
// }

// export default ARViewer;


import React, { useEffect } from 'react';

const ARViewer = ({ visible, onClose, modelPath, config }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    script.type = 'module';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!visible || !modelPath) 
    return null;

  const handleARButtonClick = () => {
    const modelViewer = document.querySelector('model-viewer');
    if (modelViewer && 'activateAR' in modelViewer) {
      modelViewer.activateAR();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full h-full max-w-4xl max-h-[90vh] overflow-auto relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <model-viewer
          src={modelPath}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          ar-scale="fixed"
          style={{ width: '100%', height: '80vh' }}
          ios-src={modelPath}
          ar-placement="floor"
          shadow-intensity="1"
          exposure="1"
          environment-image="neutral"
          camera-orbit="45deg 55deg 2.5m"
          min-camera-orbit="auto auto auto"
          max-camera-orbit="auto auto auto"
          interaction-prompt="auto"
          ar-status="not-presenting"
        >
          <button 
            slot="ar-button"
            onClick={handleARButtonClick}
            className="absolute bottom-4 right-4 bg-black text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
          >
            View in AR
          </button>
          
          <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
            <p className="text-sm">Size: {config.size}</p>
            <p className="text-sm">Material: {config.texture ? 'Textured' : 'Solid Color'}</p>
          </div>
        </model-viewer>

        <div className="absolute top-4 left-4 bg-white p-3 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">AR Instructions</h3>
          <ol className="text-sm space-y-1">
            <li>1. Click "View in AR" button</li>
            <li>2. Point your camera at the floor</li>
            <li>3. Tap to place the cabinet</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ARViewer;