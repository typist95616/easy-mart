import React, { useRef, useState } from "react";
import "./StandaloneImageSlider.css";

interface StandaloneImageSliderProps {
  images: string[];
}

const StandaloneImageSlider: React.FC<StandaloneImageSliderProps> = ({ images }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Clone images for infinite scroll
  const extendedImages = [...images, ...images, ...images];
  const originalLength = images.length;
  const startIndex = images.length;

  React.useEffect(() => {
    if (sliderRef.current) {
      // Scroll to the start of the middle set
      const imgWidth = 400; // must match image width below
      sliderRef.current.scrollLeft = imgWidth * originalLength;
    }
  }, [originalLength]);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = x - startX;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // Infinite scroll effect
  const onScroll = () => {
    if (!sliderRef.current) return;
    const imgWidth = 400; // must match image width below
    const totalImages = extendedImages.length;
    const totalWidth = imgWidth * totalImages;
    const leftEdge = imgWidth * (originalLength - 1);
    const rightEdge = imgWidth * (originalLength * 2);
    // When scrolling left past the first image of the middle set
    if (sliderRef.current.scrollLeft <= leftEdge) {
      sliderRef.current.scrollLeft = imgWidth * (originalLength + (sliderRef.current.scrollLeft / imgWidth));
    }
    // When scrolling right past the last image of the middle set
    else if (sliderRef.current.scrollLeft >= rightEdge + imgWidth) {
      sliderRef.current.scrollLeft = leftEdge + (sliderRef.current.scrollLeft - rightEdge);
    }
  };

  return (
    <div
      ref={sliderRef}
      style={{
        overflow: "auto",
        whiteSpace: "nowrap",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        width: "calc(100% - 160px)",
        margin: "0 80px",
        border: "none",
        padding: "10px 0",
        boxSizing: "border-box",
        borderRadius: "20px",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}
      className="hide-scrollbar"
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onScroll={onScroll}
    >
      <div style={{ display: "inline-block", margin: "0 40px" }}>
        {extendedImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`slider-img-${idx}`}
            style={{
              width: 400,
              height: 150,
              objectFit: "cover",
              display: "inline-block",
              marginRight: 8,
              userSelect: "none",
              pointerEvents: "auto",
              borderRadius: "20px"
            }}
            draggable={false}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>
    </div>
  );
};

export default StandaloneImageSlider;