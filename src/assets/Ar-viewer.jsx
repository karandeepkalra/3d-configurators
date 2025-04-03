
// import React, { useEffect, useRef } from "react";
// import { QRCodeSVG } from "qrcode.react";

// const ARViewer = ({ visible, onClose, modelPath }) => {
//   const modelViewerRef = useRef(null);
  
//   // Generate QR code URL for the current page
//   const qrValue = window.location.href;
  
//   useEffect(() => {
//     if (visible && modelViewerRef.current) {
//       // Set the model path dynamically based on the current configuration
//       modelViewerRef.current.setAttribute("src", modelPath || "/models/cabinet-default.glb");
      
//       const handleLoad = () => console.log("Model loaded");
//       const handleError = (error) => console.error("Error loading model", error);
      
//       modelViewerRef.current.addEventListener("load", handleLoad);
//       modelViewerRef.current.addEventListener("error", handleError);
      
//       return () => {
//         modelViewerRef.current.removeEventListener("load", handleLoad);
//         modelViewerRef.current.removeEventListener("error", handleError);
//       };
//     }
//   }, [visible, modelPath]);
  
//   if (!visible) return null;
  
//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden">
//         {/* Header */}
//         <div className="p-4 border-b flex justify-between items-center">
//           <h3 className="text-lg font-semibold">View Cabinet in Your Room</h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             ✕
//           </button>
//         </div>
        
//         {/* AR Viewer & QR Code */}
//         <div className="flex flex-col md:flex-row">
//           <div className="w-full md:w-2/3 h-96">
//             <model-viewer
//               ref={modelViewerRef}
//               ar
//               ar-modes="webxr scene-viewer quick-look"
//               camera-controls
//               shadow-intensity="1"
//               auto-rotate
//               ar-scale="fixed"
//               interaction-prompt="none"
//               reveal="auto"
//               alt="3D model of cabinet furniture"
//             ></model-viewer>
//           </div>
          
//           <div className="w-full md:w-1/3 p-6 flex flex-col justify-center items-center">
//             <h4 className="text-lg font-medium mb-4">Scan to view on mobile</h4>
//             <QRCodeSVG value={qrValue} size={200} />
//             <p className="text-sm text-gray-500 mt-4 text-center">
//               Scan this QR code with your mobile device to view this cabinet in augmented reality.
//             </p>
//           </div>
//         </div>
        
//         {/* Footer with Close Button */}
//         <div className="p-4 border-t">
//           <button
//             className="w-full py-3 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ARViewer;


import React, { useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

const ARViewer = ({ visible, onClose, modelPath }) => {
  const modelViewerRef = useRef(null);
  
  // Generate QR code URL for the current page
  const qrValue = window.location.href;

// const qrValue = process.env.REACT_APP_PUBLIC_URL || "https://your-live-site.com";

  
  useEffect(() => {
    // Store the current ref value to a variable that will be captured in the closure
    const currentModelViewer = modelViewerRef.current;
    
    if (visible && currentModelViewer) {
      // Set the model path dynamically based on the current configuration
      currentModelViewer.setAttribute("src", modelPath || "/models/cabinet-default.glb");
      
      const handleLoad = () => console.log("Model loaded");
      const handleError = (error) => console.error("Error loading model", error);
      
      currentModelViewer.addEventListener("load", handleLoad);
      currentModelViewer.addEventListener("error", handleError);
      
      // Use the captured variable in the cleanup function
      return () => {
        if (currentModelViewer) {
          currentModelViewer.removeEventListener("load", handleLoad);
          currentModelViewer.removeEventListener("error", handleError);
        }
      };
    }
  }, [visible, modelPath]);
  
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">View Cabinet in Your Room</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        {/* AR Viewer & QR Code */}
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 h-96">
            <model-viewer
              ref={modelViewerRef}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              shadow-intensity="1"
              auto-rotate
              ar-scale="fixed"
              interaction-prompt="none"
              reveal="auto"
              alt="3D model of cabinet furniture"
            ></model-viewer>
          </div>
          
          <div className="w-full md:w-1/3 p-6 flex flex-col justify-center items-center">
            <h4 className="text-lg font-medium mb-4">Scan to view on mobile</h4>
            <QRCodeSVG value={qrValue} size={200} />
            <p className="text-sm text-gray-500 mt-4 text-center">
              Scan this QR code with your mobile device to view this cabinet in augmented reality.
            </p>
          </div>
        </div>
        
        {/* Footer with Close Button */}
        <div className="p-4 border-t">
          <button
            className="w-full py-3 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ARViewer;