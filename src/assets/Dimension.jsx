
import React from 'react';
import { Line } from '@react-three/drei';
import * as THREE from "three";
// A simpler approach that doesn't use Text or Html components at all
const Dimension = ({ start, end, text, visible = true }) => {
  if (!visible) return null;
  
  // Calculate arrow points for the dimension lines
  const createArrow = (from, to, size = 0.05) => {
    const direction = new THREE.Vector3(
      to[0] - from[0],
      to[1] - from[1],
      to[2] - from[2]
    ).normalize();
    
    const perpendicular = new THREE.Vector3(-direction.z, 0, direction.x).normalize();
    if (perpendicular.length() < 0.1) {
      // Handle vertical case
      perpendicular.set(1, 0, 0).normalize();
    }
    
    const arrow1 = [
      to[0] - direction.x * size + perpendicular.x * size,
      to[1] - direction.y * size + perpendicular.y * size,
      to[2] - direction.z * size + perpendicular.z * size
    ];
    
    const arrow2 = [
      to[0] - direction.x * size - perpendicular.x * size,
      to[1] - direction.y * size - perpendicular.y * size,
      to[2] - direction.z * size - perpendicular.z * size
    ];
    
    return [arrow1, arrow2];
  };
  
  const startArrows = createArrow(end, start);
  const endArrows = createArrow(start, end);
  
  return (
    <group>
      {/* Main dimension line */}
      <Line
        points={[start, end]}
        color="black"
        lineWidth={1}
      />
      
      {/* Start arrows */}
      <Line
        points={[start, startArrows[0]]}
        color="black"
        lineWidth={1}
      />
      <Line
        points={[start, startArrows[1]]}
        color="black"
        lineWidth={1}
      />
      
      {/* End arrows */}
      <Line
        points={[end, endArrows[0]]}
        color="black"
        lineWidth={1}
      />
      <Line
        points={[end, endArrows[1]]}
        color="black"
        lineWidth={1}
      />
      
      {/* No text component, we'll use a UI overlay instead */}
    </group>
  );
};

export default Dimension;