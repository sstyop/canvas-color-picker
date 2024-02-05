import React, { useRef, useState } from 'react';
import { ColorPickerStyle } from './style';
import { drawCircle, drawRect, drawText, handleFileChange, rgbToHex } from '../../utils';
import { PickedColorsBlock } from '../pickedColors';
import { useCanvas } from '../../hooks';

//default size of canvas.
const canvasDefaultWidth = 1600;

const ColorPicker = () => {
  const { canvasRef, context } = useCanvas();
  const circleRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageDataRef = useRef<Uint8ClampedArray | null>(null);
  const [pickedColors, setPickedColors] = useState<string[]>([]);

  const canvas = canvasRef.current;
  let circleCoords = circleRef.current;

  function imageIsLoaded(e: ProgressEvent<FileReader>) {
    const img = new Image();
    img.onload = function () {
      if (canvas) {
        //resize the canvas to the size of the picture․ (supports up to 6000x6000)
        canvas.width = img.width;
        canvas.height = img.height;
        context!.drawImage(img, 0, 0);
        const imageData = context!.getImageData(0, 0, canvas.width, canvas.height);
        imageDataRef.current = imageData?.data ?? null;
      }
    };
    img.src = e.target?.result as string;
    setPickedColors([]);
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    circleCoords = { x, y };
    drawCanvas();
  };

  const handleCanvasMouseLeave = () => {
    //hiding canvas cursor elements on mouse leaving (keeping uploaded image)
    if (context && canvas && imageDataRef.current) {
      context.clearRect(0, 0, canvas!.width, canvas.height);
      const imageData = new ImageData(new Uint8ClampedArray(imageDataRef.current), canvas.width, canvas.height);
      context.putImageData(imageData, 0, 0);
    }
  };

  const handleCanvasClick = () => {
    if (canvas && imageDataRef.current) {
      const pixelIndex = (circleCoords.y * canvas.width + circleCoords.x) * 4;
      const R = imageDataRef.current![pixelIndex];
      const G = imageDataRef.current![pixelIndex + 1];
      const B = imageDataRef.current![pixelIndex + 2];
      const hex = rgbToHex(R, G, B, false);

      setPickedColors([...pickedColors, hex]);
    }
  };

  const drawCanvas = () => {
    if (canvas && imageDataRef.current) {
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw the initial image
        const imageData = new ImageData(new Uint8ClampedArray(imageDataRef.current), canvas.width, canvas.height);
        context.putImageData(imageData, 0, 0);
        const pixelIndex = (circleCoords.y * canvas.width + circleCoords.x) * 4;
        const R = imageDataRef.current![pixelIndex];
        const G = imageDataRef.current![pixelIndex + 1];
        const B = imageDataRef.current![pixelIndex + 2];
        const hex = rgbToHex(R, G, B);
        const invertHex = rgbToHex(R, G, B, true);

        // draw the circle at its current position
        drawCircle(context, circleCoords.x, circleCoords.y, 100, 15, `#${hex}`)

        //small circle cursor to know exactly where you are
        drawCircle(context, circleCoords.x, circleCoords.y, 5, 1, '#fff')

        //drawing inverted background rect to get more visible text over hovering
        drawRect(context, circleCoords.x, circleCoords.y + 25, 80, 25, `#${invertHex}`)

        //adding current color hex text in the cursor circle
        drawText(context, "14px Comic Sans MS", circleCoords.x, circleCoords.y, `#${hex}`)

        //outer white bordered circle
        drawCircle(context, circleCoords.x, circleCoords.y, 110, 5, '#fff')

        //inner white bordered circle
        drawCircle(context, circleCoords.x, circleCoords.y, 90, 5, '#fff')

        // hide the default cursor
        canvas.style.cursor = 'none';
      }
    }
  };

  return (
    <ColorPickerStyle>
      <div className='navigation-block'>
        <label htmlFor="upload-photo">Click ME to upload your magic &#128248;</label>
        <input type="file" id="upload-photo" onChange={(e) => handleFileChange(e, imageIsLoaded)} hidden />
        {pickedColors.length > 0 && <PickedColorsBlock pickedColors={pickedColors} />}
      </div>
      <div className='canvas-block'>
        <canvas ref={canvasRef} onClick={handleCanvasClick} onMouseLeave={handleCanvasMouseLeave} onMouseMove={handleCanvasMouseMove} width={canvasDefaultWidth} height={canvasDefaultWidth}></canvas>
      </div>
    </ColorPickerStyle>
  );
};

export default ColorPicker;