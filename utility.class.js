import Point from "./point.class.js";
export default class Utility {
  static getMouseCoordsOnCanvas(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return new Point(x, y);
  }

  static calcHypotenuse(startPos, endPos) {
    return Math.sqrt(
      Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2)
    );
  }

  static hexToRgba(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
          255,
        ]
      : null;
  }

  static getPixel(context, x, y) {
    let imageData = context.getImageData(
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );
    if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
      return [-1, -1, -1, -1]; // impossible color
    } else {
      const offset = (y * imageData.width + x) * 4;

      return [
        imageData.data[offset + 0],
        imageData.data[offset + 1],
        imageData.data[offset + 2],
        imageData.data[offset + 3],
      ];
    }
  }

  static setPixel(context, x, y, color) {
    let imageData = context.getImageData(
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );

    const offset = (y * imageData.width + x) * 4;
    imageData.data[offset + 0] = color[0];
    imageData.data[offset + 1] = color[1];
    imageData.data[offset + 2] = color[2];
    imageData.data[offset + 3] = color[0];

    context.putImageData(imageData, 0, 0);
  }

  static colorsMatch(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }
}
