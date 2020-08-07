import Utility from "./utility.class.js";

export default class Fill {
  constructor(canvas, mousexpos, mouseypos, color) {
    this.context = canvas.getContext("2d");

    this.fillStack = [];

    // read the pixels in the canvas
    this.imageData = this.context.getImageData(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );

    console.log(this.imageData);

    this.floodFill(mousexpos, mouseypos, Utility.hexToRgba(color));
  }

  getPixel(x, y) {
    if (
      x < 0 ||
      y < 0 ||
      x >= this.imageData.width ||
      y >= this.imageData.height
    ) {
      return [-1, -1, -1, -1]; // impossible color
    } else {
      const offset = (y * this.imageData.width + x) * 4;

      return [
        this.imageData.data[offset + 0],
        this.imageData.data[offset + 1],
        this.imageData.data[offset + 2],
        this.imageData.data[offset + 3],
      ];
    }
  }

  setPixel(x, y, color) {
    const offset = (y * this.imageData.width + x) * 4;
    this.imageData.data[offset + 0] = color[0];
    this.imageData.data[offset + 1] = color[1];
    this.imageData.data[offset + 2] = color[2];
    this.imageData.data[offset + 3] = color[3];
  }

  colorsMatch(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }

  floodFill(x, y, fillColor) {
    // get the color we're filling
    const targetColor = this.getPixel(x, y);

    console.log(targetColor);
    console.log(fillColor);

    // check we are actually filling a different color
    if (!this.colorsMatch(targetColor, fillColor)) {
      //console.log(targetColor);
      //console.log(fillColor);

      console.log("In");

      this.fillPixel(x, y, targetColor, fillColor);
      this.fillCol();
      // put the data back
    }
  }

  fillPixel(x, y, targetColor, fillColor) {
    const currentColor = this.getPixel(x, y);
    if (this.colorsMatch(currentColor, targetColor)) {
      this.setPixel(x, y, fillColor);
      this.fillStack.push([x + 1, y, targetColor, fillColor]);
      this.fillStack.push([x - 1, y, targetColor, fillColor]);
      this.fillStack.push([x, y + 1, targetColor, fillColor]);
      this.fillStack.push([x, y - 1, targetColor, fillColor]);
    }
  }

  fillCol() {
    if (this.fillStack.length) {
      let range = this.fillStack.length;

      for (let i = 0; i < range; i++) {
        this.fillPixel(
          this.fillStack[i][0],
          this.fillStack[i][1],
          this.fillStack[i][2],
          this.fillStack[i][3]
        );
      }

      this.fillStack.splice(0, range);

      this.fillCol();
    } else {
      console.log(this.imageData);
      this.context.putImageData(this.imageData, 0, 0);
      this.fillStack = [];
    }
  }
}
