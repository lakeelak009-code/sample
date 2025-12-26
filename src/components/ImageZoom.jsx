import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, RotateCcw } from 'lucide-react';

const ImageZoom = ({ src, alt, className = "", onZoomChange }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  
  // Notify parent about zoom state
  useEffect(() => {
    if (onZoomChange) {
      onZoomChange(scale > 1);
    }
  }, [scale, onZoomChange]);

  // Refs for gesture state to avoid re-renders during drag
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const pinchStartDist = useRef(null);
  const startScale = useRef(1);

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;

  // Reset zoom helper
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    lastPos.current = { x: 0, y: 0 };
  };

  // Constrain position to keep image within bounds
  const constrainPosition = (pos, currentScale) => {
    if (!containerRef.current || !imageRef.current) return pos;
    
    const container = containerRef.current.getBoundingClientRect();
    const scaledWidth = container.width * currentScale;
    const scaledHeight = container.height * currentScale;
    
    // Calculate max limits
    // The logic depends on transform origin. We use center.
    const maxX = (scaledWidth - container.width) / 2;
    const maxY = (scaledHeight - container.height) / 2;
    
    // If scaled image is smaller than container (shouldn't happen with min scale 1), keep centered (0)
    const limitX = maxX > 0 ? maxX : 0;
    const limitY = maxY > 0 ? maxY : 0;

    return {
      x: Math.max(-limitX, Math.min(limitX, pos.x)),
      y: Math.max(-limitY, Math.min(limitY, pos.y))
    };
  };

  // --- Mouse Events (Desktop) ---

  const handleWheel = (e) => {
    if (e.ctrlKey || scale > 1) {
      e.preventDefault();
      const delta = -e.deltaY * 0.01;
      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta));
      setScale(newScale);
      
      // If zooming out creates space, constrain position
      const newPos = constrainPosition(position, newScale);
      setPosition(newPos);
      lastPos.current = newPos;
    }
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      e.preventDefault();
      isDragging.current = true;
      startPos.current = { x: e.clientX, y: e.clientY };
      // cursor logic handled in render
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || scale <= 1) return;
    e.preventDefault();
    
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    
    const nextPos = {
      x: lastPos.current.x + dx,
      y: lastPos.current.y + dy
    };
    
    setPosition(constrainPosition(nextPos, scale));
  };

  const handleMouseUp = (e) => {
    if (isDragging.current) {
      isDragging.current = false;
      lastPos.current = position; // Save constrained position
    }
  };

  const handleDoubleClick = (e) => {
    if (scale > 1) {
      resetZoom();
    } else {
      // Zoom in to 2x
      setScale(2);
      // Optionally center on click? For simplicity, center zoom.
    }
  };

  // --- Touch Events (Mobile) ---

  const getDistance = (touch1, touch2) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.hypot(dx, dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Start Pinch
      isDragging.current = false;
      pinchStartDist.current = getDistance(e.touches[0], e.touches[1]);
      startScale.current = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      // Start Pan
      isDragging.current = true;
      startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && pinchStartDist.current) {
      // Pinching
      e.preventDefault(); // Prevent page scroll
      const dist = getDistance(e.touches[0], e.touches[1]);
      const ratio = dist / pinchStartDist.current;
      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, startScale.current * ratio));
      setScale(newScale);
    } else if (e.touches.length === 1 && isDragging.current && scale > 1) {
      // Panning
      e.preventDefault(); // Prevent page scroll/swipe
      const dx = e.touches[0].clientX - startPos.current.x;
      const dy = e.touches[0].clientY - startPos.current.y;
      
      const nextPos = {
        x: lastPos.current.x + dx,
        y: lastPos.current.y + dy
      };
      
      setPosition(constrainPosition(nextPos, scale));
    }
  };

  const handleTouchEnd = (e) => {
    isDragging.current = false;
    pinchStartDist.current = null;
    lastPos.current = position;
    
    // Snap back if out of bounds or scale < 1 (not likely due to constraints)
  };

  // Double tap detection
  const lastTap = useRef(0);
  const handleTap = (e) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      handleDoubleClick(e);
    }
    lastTap.current = now;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    // Non-passive listeners needed for preventing default wheel/touch
    el.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, [scale, position]); // Re-bind if state needed, but using refs is better. 
  // Actually wheel needs current scale.

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden touch-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={(e) => { handleTap(e); handleTouchStart(e); }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
      style={{ cursor: scale > 1 ? 'grab' : 'zoom-in' }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center center',
          willChange: 'transform'
        }}
        draggable={false}
      />
      
      {/* Zoom Controls / Indicator */}
      {scale > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
           <button 
             onClick={resetZoom}
             className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white text-gray-800 transition-colors"
             title="Reset Zoom"
           >
             <RotateCcw size={20} />
           </button>
        </div>
      )}
    </div>
  );
};

export default ImageZoom;
