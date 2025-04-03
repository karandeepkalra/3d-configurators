
import React from 'react';

function ARViewer({ visible, onClose, modelPath, config }) {
  if (!visible || !modelPath) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full h-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">AR View</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <model-viewer
          src={modelPath}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          style={{ width: '100%', height: '80vh' }}
        >
          <button slot="ar-button" style={{ position: 'absolute', bottom: '20px', right: '20px', padding: '10px', background: '#000', color: '#fff', borderRadius: '5px' }}>
            Enter AR
          </button>
        </model-viewer>
      </div>
    </div>
  );
}

export default ARViewer;