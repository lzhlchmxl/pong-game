import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const Canvas = ( { draw, height, width } : { 
  draw: (context: CanvasRenderingContext2D) => void, 
  height: number, 
  width: number,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    
    const timer1 = setInterval(() => {
      setCounter(counter + 1);
    }, 20);

    const canvas = canvasRef.current;
    if (!canvas) {
      throw new Error('canvas cannot be null during render');
    }
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('canvas context cannot be null during render');
    }

    draw(context);

    return () => {
      clearTimeout(timer1);
    };

  }, [counter]);

  return <canvas className="bg-black" ref={canvasRef} height={height} width={width} />;
};

Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default Canvas;
