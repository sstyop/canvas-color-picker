export function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, imageIsLoaded: (e: ProgressEvent<FileReader>) => void) {
  const file = e.target.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = imageIsLoaded;
    reader.readAsDataURL(file);
  }
};

export function drawCircle(context: CanvasRenderingContext2D, x: number, y: number, radius: number, borderWidth: number, borderColor: string) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fillStyle = 'transparent';
  context.lineWidth = borderWidth;
  context.strokeStyle = borderColor;
  context.stroke();
}

export function drawRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, rectColor: string) {
  context.beginPath();
  context.fillStyle = rectColor;
  context.fillRect(x - (width / 2), y - (height / 2), width, height);
}

export function drawText(context: CanvasRenderingContext2D, font: string, x: number, y: number, textColor: string) {
  context.font = font;
  context.fillStyle = textColor;
  context.textAlign = "center";
  context.fillText(textColor, x, y + 30);
}

export function toHex(n: number): string {
  const validN = Math.min(255, Math.max(0, Math.round(n))) || 0;
  return validN.toString(16).padStart(2, '0').toUpperCase();
}

export function rgbToHex(R: number, G: number, B: number, invert?: boolean): string {
  if (invert) {
    return toHex(255 - R) + toHex(255 - G) + toHex(255 - B);
  } else {
    return toHex(R) + toHex(G) + toHex(B);
  }
};

