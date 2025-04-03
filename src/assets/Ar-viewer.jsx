
// // // // // import React, { useEffect, useRef } from "react";
// // // // // import { QRCodeSVG } from "qrcode.react";

// // // // // const ARViewer = ({ visible, onClose, modelPath }) => {
// // // // //   const modelViewerRef = useRef(null);
  
// // // // //   // Generate QR code URL for the current page
// // // // //   const qrValue = window.location.href;
  
// // // // //   useEffect(() => {
// // // // //     if (visible && modelViewerRef.current) {
// // // // //       // Set the model path dynamically based on the current configuration
// // // // //       modelViewerRef.current.setAttribute("src", modelPath || "/models/cabinet-default.glb");
      
// // // // //       const handleLoad = () => console.log("Model loaded");
// // // // //       const handleError = (error) => console.error("Error loading model", error);
      
// // // // //       modelViewerRef.current.addEventListener("load", handleLoad);
// // // // //       modelViewerRef.current.addEventListener("error", handleError);
      
// // // // //       return () => {
// // // // //         modelViewerRef.current.removeEventListener("load", handleLoad);
// // // // //         modelViewerRef.current.removeEventListener("error", handleError);
// // // // //       };
// // // // //     }
// // // // //   }, [visible, modelPath]);
  
// // // // //   if (!visible) return null;
  
// // // // //   return (
// // // // //     <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
// // // // //       <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden">
// // // // //         {/* Header */}
// // // // //         <div className="p-4 border-b flex justify-between items-center">
// // // // //           <h3 className="text-lg font-semibold">View Cabinet in Your Room</h3>
// // // // //           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
// // // // //             ✕
// // // // //           </button>
// // // // //         </div>
        
// // // // //         {/* AR Viewer & QR Code */}
// // // // //         <div className="flex flex-col md:flex-row">
// // // // //           <div className="w-full md:w-2/3 h-96">
// // // // //             <model-viewer
// // // // //               ref={modelViewerRef}
// // // // //               ar
// // // // //               ar-modes="webxr scene-viewer quick-look"
// // // // //               camera-controls
// // // // //               shadow-intensity="1"
// // // // //               auto-rotate
// // // // //               ar-scale="fixed"
// // // // //               interaction-prompt="none"
// // // // //               reveal="auto"
// // // // //               alt="3D model of cabinet furniture"
// // // // //             ></model-viewer>
// // // // //           </div>
          
// // // // //           <div className="w-full md:w-1/3 p-6 flex flex-col justify-center items-center">
// // // // //             <h4 className="text-lg font-medium mb-4">Scan to view on mobile</h4>
// // // // //             <QRCodeSVG value={qrValue} size={200} />
// // // // //             <p className="text-sm text-gray-500 mt-4 text-center">
// // // // //               Scan this QR code with your mobile device to view this cabinet in augmented reality.
// // // // //             </p>
// // // // //           </div>
// // // // //         </div>
        
// // // // //         {/* Footer with Close Button */}
// // // // //         <div className="p-4 border-t">
// // // // //           <button
// // // // //             className="w-full py-3 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors"
// // // // //             onClick={onClose}
// // // // //           >
// // // // //             Close
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ARViewer;


// // // // import React, { useEffect, useRef } from "react";
// // // // import { QRCodeSVG } from "qrcode.react";

// // // // const ARViewer = ({ visible, onClose, modelPath }) => {
// // // //   const modelViewerRef = useRef(null);
  
// // // //   // Generate QR code URL for the current page
// // // //   const qrValue = window.location.href;

// // // // // const qrValue = process.env.REACT_APP_PUBLIC_URL || "https://your-live-site.com";

  
// // // //   useEffect(() => {
// // // //     // Store the current ref value to a variable that will be captured in the closure
// // // //     const currentModelViewer = modelViewerRef.current;
    
// // // //     if (visible && currentModelViewer) {
// // // //       // Set the model path dynamically based on the current configuration
// // // //       currentModelViewer.setAttribute("src", modelPath || "/models/cabinet-default.glb");
      
// // // //       const handleLoad = () => console.log("Model loaded");
// // // //       const handleError = (error) => console.error("Error loading model", error);
      
// // // //       currentModelViewer.addEventListener("load", handleLoad);
// // // //       currentModelViewer.addEventListener("error", handleError);
      
// // // //       // Use the captured variable in the cleanup function
// // // //       return () => {
// // // //         if (currentModelViewer) {
// // // //           currentModelViewer.removeEventListener("load", handleLoad);
// // // //           currentModelViewer.removeEventListener("error", handleError);
// // // //         }
// // // //       };
// // // //     }
// // // //   }, [visible, modelPath]);
  
// // // //   if (!visible) return null;
  
// // // //   return (
// // // //     <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
// // // //       <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden">
// // // //         {/* Header */}
// // // //         <div className="p-4 border-b flex justify-between items-center">
// // // //           <h3 className="text-lg font-semibold">View Cabinet in Your Room</h3>
// // // //           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
// // // //             ✕
// // // //           </button>
// // // //         </div>
        
// // // //         {/* AR Viewer & QR Code */}
// // // //         <div className="flex flex-col md:flex-row">
// // // //           <div className="w-full md:w-2/3 h-96">
// // // //             <model-viewer
// // // //               ref={modelViewerRef}
// // // //               ar
// // // //               ar-modes="webxr scene-viewer quick-look"
// // // //               camera-controls
// // // //               shadow-intensity="1"
// // // //               auto-rotate
// // // //               ar-scale="fixed"
// // // //               interaction-prompt="none"
// // // //               reveal="auto"
// // // //               alt="3D model of cabinet furniture"
// // // //             ></model-viewer>
// // // //           </div>
          
// // // //           <div className="w-full md:w-1/3 p-6 flex flex-col justify-center items-center">
// // // //             <h4 className="text-lg font-medium mb-4">Scan to view on mobile</h4>
// // // //             <QRCodeSVG value={qrValue} size={200} />
// // // //             <p className="text-sm text-gray-500 mt-4 text-center">
// // // //               Scan this QR code with your mobile device to view this cabinet in augmented reality.
// // // //             </p>
// // // //           </div>
// // // //         </div>
        
// // // //         {/* Footer with Close Button */}
// // // //         <div className="p-4 border-t">
// // // //           <button
// // // //             className="w-full py-3 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors"
// // // //             onClick={onClose}
// // // //           >
// // // //             Close
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ARViewer;


// // // // import React, { useEffect, useRef, useState } from "react";
// // // // import { QRCodeSVG } from "qrcode.react";

// // // // const ARViewer = ({ visible, onClose, modelPath, productConfig }) => {
// // // //   const modelViewerRef = useRef(null);
// // // //   const [arViewUrl, setArViewUrl] = useState("");
  
// // // //   useEffect(() => {
// // // //     // Create a URL with product configuration parameters
// // // //     if (visible) {
// // // //       // Base URL - this should be your deployed site URL in production
// // // //       const baseUrl = window.location.origin + "/ar-view";
      
// // // //       // Create URL params based on product configuration
// // // //       const params = new URLSearchParams();
      
// // // //       // Add the model path
// // // //       params.append("model", modelPath || "/main.glb");
      
// // // //       // Add any other product configuration parameters
// // // //       if (productConfig) {
// // // //         if (productConfig.texture) params.append("texture", productConfig.texture);
// // // //         if (productConfig.color) params.append("color", productConfig.color);
// // // //         if (productConfig.size) params.append("size", productConfig.size);
// // // //         // Add any other configuration parameters you need
// // // //       }
      
// // // //       // Set the complete AR view URL
// // // //       setArViewUrl(`${baseUrl}?${params.toString()}`);
// // // //     }
// // // //   }, [visible, modelPath, productConfig]);
  
// // // //   useEffect(() => {
// // // //     // Store the current ref value to a variable that will be captured in the closure
// // // //     const currentModelViewer = modelViewerRef.current;
    
// // // //     if (visible && currentModelViewer) {
// // // //       // Set the model path dynamically based on the current configuration
// // // //       currentModelViewer.setAttribute("src", modelPath || "/main.glb");
      
// // // //       // Apply textures and other configurations directly to the model-viewer
// // // //       if (productConfig) {
// // // //         // You might need to implement specific model-viewer methods
// // // //         // to apply textures based on your 3D model structure
// // // //         if (productConfig.texture) {
// // // //           // Example: Apply texture to the model
// // // //           // This would depend on your specific model structure
// // // //           console.log("Applying texture:", productConfig.texture);
// // // //         }
// // // //       }
      
// // // //       const handleLoad = () => console.log("Model loaded");
// // // //       const handleError = (error) => console.error("Error loading model", error);
      
// // // //       currentModelViewer.addEventListener("load", handleLoad);
// // // //       currentModelViewer.addEventListener("error", handleError);
      
// // // //       // Use the captured variable in the cleanup function
// // // //       return () => {
// // // //         if (currentModelViewer) {
// // // //           currentModelViewer.removeEventListener("load", handleLoad);
// // // //           currentModelViewer.removeEventListener("error", handleError);
// // // //         }
// // // //       };
// // // //     }
// // // //   }, [visible, modelPath, productConfig]);
  
// // // //   if (!visible) return null;
  
// // // //   return (
// // // //     <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
// // // //       <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden">
// // // //         {/* Header */}
// // // //         <div className="p-4 border-b flex justify-between items-center">
// // // //           <h3 className="text-lg font-semibold">View Cabinet in Your Room</h3>
// // // //           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
// // // //             ✕
// // // //           </button>
// // // //         </div>
        
// // // //         {/* AR Viewer & QR Code */}
// // // //         <div className="flex flex-col md:flex-row">
// // // //           <div className="w-full md:w-2/3 h-96">
// // // //             <model-viewer
// // // //               ref={modelViewerRef}
// // // //               ar
// // // //               ar-modes="webxr scene-viewer quick-look"
// // // //               camera-controls
// // // //               shadow-intensity="1"
// // // //               auto-rotate
// // // //               ar-scale="fixed"
// // // //               interaction-prompt="none"
// // // //               reveal="auto"
// // // //               alt="3D model of cabinet furniture"
// // // //             ></model-viewer>
// // // //           </div>
          
// // // //           <div className="w-full md:w-1/3 p-6 flex flex-col justify-center items-center">
// // // //             <h4 className="text-lg font-medium mb-4">Scan to view on mobile</h4>
// // // //             <QRCodeSVG value={arViewUrl} size={200} />
// // // //             <p className="text-sm text-gray-500 mt-4 text-center">
// // // //               Scan this QR code with your mobile device to view this cabinet with your selected options in augmented reality.
// // // //             </p>
// // // //           </div>
// // // //         </div>
        
// // // //         {/* Footer with Close Button */}
// // // //         <div className="p-4 border-t">
// // // //           <button
// // // //             className="w-full py-3 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors"
// // // //             onClick={onClose}
// // // //           >
// // // //             Close
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ARViewer;


// // // import React, { useEffect, useRef, useState } from "react";
// // // import { QRCodeSVG } from "qrcode.react";

// // // const ARViewer = ({ visible, onClose, modelPath, productConfig }) => {
// // //   const [arViewUrl, setArViewUrl] = useState("");
  
// // //   useEffect(() => {
// // //     if (visible) {
// // //       // Create a URL that points to a standalone AR view page
// // //       const baseUrl = window.location.origin;
// // //       const params = new URLSearchParams();
      
// // //       // Add model path and configuration parameters
// // //       params.append("model", modelPath);
      
// // //       if (productConfig) {
// // //         Object.entries(productConfig).forEach(([key, value]) => {
// // //           params.append(key, String(value));
// // //         });
// // //       }
      
// // //       // Set the complete AR view URL
// // //       setArViewUrl(`${baseUrl}/ar-view.html?${params.toString()}`);
// // //     }
// // //   }, [visible, modelPath, productConfig]);
  
// // //   if (!visible) return null;
  
// // //   return (
// // //     <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
// // //       <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden">
// // //         <div className="p-4 border-b flex justify-between items-center">
// // //           <h3 className="text-lg font-semibold">View in AR</h3>
// // //           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
// // //             ✕
// // //           </button>
// // //         </div>
        
// // //         <div className="p-6 flex flex-col items-center">
// // //           <div className="mb-6 text-center">
// // //             <h4 className="text-lg font-medium mb-2">Scan to view in AR</h4>
// // //             <p className="text-sm text-gray-600">
// // //               Use your mobile device to scan this QR code and view the cabinet in augmented reality
// // //             </p>
// // //           </div>
          
// // //           <div className="bg-white p-4 rounded-lg shadow-lg">
// // //             <QRCodeSVG value={arViewUrl} size={250} />
// // //           </div>
          
// // //           <p className="mt-4 text-sm text-gray-500 max-w-md text-center">
// // //             Make sure your device supports WebXR for the best AR experience
// // //           </p>
// // //         </div>
        
// // //         <div className="p-4 border-t">
// // //           <button
// // //             className="w-full py-3 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors"
// // //             onClick={onClose}
// // //           >
// // //             Close
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ARViewer;


// // import React, { useEffect, useRef, useState } from "react";
// // import { QRCodeSVG } from "qrcode.react";

// // const ARViewer = ({ visible, onClose, modelPath, productConfig }) => {
// //   const [arViewUrl, setArViewUrl] = useState("");
  
// //   useEffect(() => {
// //     if (visible) {
// //       // Use the deployed URL instead of window.location.origin
// //       const baseUrl = "https://3d-configurators-hbdn.vercel.app/";
// //       const params = new URLSearchParams();
      
// //       // Add model path and configuration parameters
// //       params.append("model", modelPath);
      
// //       if (productConfig) {
// //         Object.entries(productConfig).forEach(([key, value]) => {
// //           params.append(key, String(value));
// //         });
// //       }
      
// //       // Set the complete AR view URL
// //       setArViewUrl(`${baseUrl}/ar-view.html?${params.toString()}`);
// //     }
// //   }, [visible, modelPath, productConfig]);
  
// //   if (!visible) return null;
  
// //   return (
// //     <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
// //       <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden">
// //         <div className="p-4 border-b flex justify-between items-center">
// //           <h3 className="text-lg font-semibold">View in AR</h3>
// //           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
// //             ✕
// //           </button>
// //         </div>
        
// //         <div className="p-6 flex flex-col items-center">
// //           <div className="mb-6 text-center">
// //             <h4 className="text-lg font-medium mb-2">Scan to view in AR</h4>
// //             <p className="text-sm text-gray-600">
// //               Use your mobile device to scan this QR code and view the cabinet in augmented reality
// //             </p>
// //           </div>
          
// //           <div className="bg-white p-4 rounded-lg shadow-lg">
// //             <QRCodeSVG value={arViewUrl} size={250} />
// //           </div>
          
// //           <p className="mt-4 text-sm text-gray-500 max-w-md text-center">
// //             Make sure your device supports WebXR for the best AR experience
// //           </p>
// //         </div>
        
// //         <div className="p-4 border-t">
// //           <button
// //             className="w-full py-3 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors"
// //             onClick={onClose}
// //           >
// //             Close
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ARViewer;


// // import React, { useEffect, useRef, useState } from "react";
// // import { QRCodeSVG } from "qrcode.react";

// // const ARViewer = ({ visible, onClose, modelPath, productConfig }) => {
// //   const [arViewUrl, setArViewUrl] = useState("");
  
// //   useEffect(() => {
// //     if (visible) {
// //       // Use the current window location to handle both development and production
// //       const baseUrl = window.location.href.split('/').slice(0, -1).join('/');
// //       const params = new URLSearchParams();
      
// //       // Add model path and configuration parameters
// //       params.append("model", modelPath);
      
// //       if (productConfig) {
// //         Object.entries(productConfig).forEach(([key, value]) => {
// //           params.append(key, String(value));
// //         });
// //       }
      
// //       // Set the complete AR view URL
// //       setArViewUrl(`${baseUrl}/ar-view.html?${params.toString()}`);
// //     }
// //   }, [visible, modelPath, productConfig]);
  
// //   if (!visible) return null;
  
// //   return (
// //     <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
// //       <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden">
// //         <div className="p-4 border-b flex justify-between items-center">
// //           <h3 className="text-lg font-semibold">View in AR</h3>
// //           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
// //             ✕
// //           </button>
// //         </div>
        
// //         <div className="p-6 flex flex-col items-center">
// //           <div className="mb-6 text-center">
// //             <h4 className="text-lg font-medium mb-2">Scan to view in AR</h4>
// //             <p className="text-sm text-gray-600">
// //               Use your mobile device to scan this QR code and view the cabinet in augmented reality
// //             </p>
// //           </div>
          
// //           <div className="bg-white p-4 rounded-lg shadow-lg">
// //             <QRCodeSVG value={arViewUrl} size={250} />
// //           </div>
          
// //           <p className="mt-4 text-sm text-gray-500 max-w-md text-center">
// //             Make sure your device supports WebXR for the best AR experience
// //           </p>
// //         </div>
        
// //         <div className="p-4 border-t">
// //           <button
// //             className="w-full py-3 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors"
// //             onClick={onClose}
// //           >
// //             Close
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ARViewer;



// import React, { useEffect, useState } from "react";
// import { QRCodeSVG } from "qrcode.react";

// const ARViewer = ({ visible, onClose, modelPath, productConfig }) => {
//   const [arViewUrl, setArViewUrl] = useState("");
  
//   useEffect(() => {
//     if (visible && modelPath) {
//       // Get the absolute base URL without the last path segment
//       const baseUrl = window.location.origin;
//       const params = new URLSearchParams();
      
//       // Make sure modelPath is an absolute URL or properly relative to AR view
//       // If modelPath is relative, make it absolute
//       let absoluteModelPath = modelPath;
//       if (!modelPath.startsWith('http') && !modelPath.startsWith('/')) {
//         absoluteModelPath = `${baseUrl}/${modelPath}`;
//       } else if (modelPath.startsWith('/')) {
//         absoluteModelPath = `${baseUrl}${modelPath}`;
//       }
      
//       // Add model path and encode it properly
//       params.append("model", encodeURIComponent(absoluteModelPath));
      
//       // Add configuration parameters
//       if (productConfig) {
//         Object.entries(productConfig).forEach(([key, value]) => {
//           if (value !== undefined && value !== null) {
//             params.append(key, String(value));
//           }
//         });
//       }
      
//       // Set the complete AR view URL (make sure ar-view.html is in the correct location)
//       setArViewUrl(`${baseUrl}/ar-view.html?${params.toString()}`);
//     }
//   }, [visible, modelPath, productConfig]);
  
//   if (!visible) return null;
  
//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden">
//         <div className="p-4 border-b flex justify-between items-center">
//           <h3 className="text-lg font-semibold">View in AR</h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             ✕
//           </button>
//         </div>
        
//         <div className="p-6 flex flex-col items-center">
//           <div className="mb-6 text-center">
//             <h4 className="text-lg font-medium mb-2">Scan to view in AR</h4>
//             <p className="text-sm text-gray-600">
//               Use your mobile device to scan this QR code and view the cabinet in augmented reality
//             </p>
//           </div>
          
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <QRCodeSVG value={arViewUrl} size={250} />
//           </div>
          
//           <div className="mt-4 text-sm text-gray-500 max-w-md text-center">
//             <p className="mb-2">Make sure your device supports WebXR for the best AR experience</p>
//             <p className="text-xs">AR URL: {arViewUrl}</p>
//           </div>
//         </div>
        
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


import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const ARViewer = ({ visible, onClose, modelPath, productConfig }) => {
  const [arViewUrl, setArViewUrl] = useState("");
  const [debugInfo, setDebugInfo] = useState("");
  
  useEffect(() => {
    if (visible && modelPath) {
      // Create debug info
      let debug = `Original modelPath: ${modelPath}\n`;
      
      // Get the protocol and host
      const origin = window.location.origin;
      debug += `Origin: ${origin}\n`;
      
      // Ensure modelPath is absolute
      let absoluteModelPath = modelPath;
      
      // If it's a relative path (doesn't start with http or //)
      if (!modelPath.startsWith('http') && !modelPath.startsWith('//')) {
        // If it doesn't start with a slash, add one
        if (!modelPath.startsWith('/')) {
          absoluteModelPath = `${origin}/${modelPath}`;
        } else {
          absoluteModelPath = `${origin}${modelPath}`;
        }
      }
      
      debug += `Absolute model path: ${absoluteModelPath}\n`;
      
      // Create params
      const params = new URLSearchParams();
      
      // Add model path (encode it to handle special characters)
      params.append("model", absoluteModelPath);
      
      // Set the AR view URL (using simple-ar-view.html instead)
      const arViewPath = `${origin}/simple-ar-view.html?${params.toString()}`;
      setArViewUrl(arViewPath);
      
      debug += `AR View URL: ${arViewPath}`;
      setDebugInfo(debug);
    }
  }, [visible, modelPath, productConfig]);
  
  if (!visible) return null;
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert("URL copied to clipboard"))
      .catch(err => console.error("Could not copy text: ", err));
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">View in AR</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="p-6 flex flex-col items-center">
          <div className="mb-6 text-center">
            <h4 className="text-lg font-medium mb-2">Scan to view in AR</h4>
            <p className="text-sm text-gray-600">
              Use your mobile device to scan this QR code and view the model in augmented reality
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <QRCodeSVG value={arViewUrl} size={250} />
          </div>
          
          <div className="mt-4 text-sm text-gray-500 max-w-md text-center">
            <p className="mb-2">Make sure your device supports WebXR for the best AR experience</p>
            <div className="flex flex-col mt-4">
              <button 
                className="text-blue-600 underline text-xs"
                onClick={() => copyToClipboard(arViewUrl)}
              >
                Copy AR URL to clipboard
              </button>
            </div>
          </div>
          
          <div className="mt-6 border p-3 bg-gray-50 w-full text-xs text-left overflow-auto max-h-40">
            <pre>{debugInfo}</pre>
          </div>
        </div>
        
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