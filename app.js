import Tool from "./tool.class.js";
import Paint from "./paint.class.js";

var paint = new Paint("canvas");
paint.activeTool = Tool.TOOL_LINE;
paint.brushSize1 = 4;
paint.selectedColor = "#000000";

paint.init();

document.querySelectorAll("[data-command]").forEach((item) => {
  item.addEventListener("click", (e) => {
    let command = item.getAttribute("data-command");

    if (command == "undo") {
      console.log("undo called");
      paint.undoPaint();
    } else if (command == "download") {
      var canva = document.getElementById("canvas");
      var image = canvas
        .toDataURL("image/png", 1.0)
        .replace("image/png", "image/octet-stream");

      var link = document.createElement("a");
      link.download = "my-image.png";
      link.href = image;
      link.click();
    }

    if (item.getAttribute("data-command")) {
    }
  });
});

document.querySelectorAll("[data-tool]").forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(item.getAttribute("data-tool"));
    document.querySelector("[data-tool].active").classList.toggle("active");
    item.classList.toggle("active");

    let selectedTool = item.getAttribute("data-tool");
    paint.activeTool = selectedTool;

    switch (selectedTool) {
      case Tool.TOOL_LINE:
      case Tool.TOOL_RECTANGLE:
      case Tool.TOOL_CIRCLE:
      case Tool.TOOL_TRIANGLE:
      case Tool.TOOL_PENCIL:
        document.querySelector(".group.for-shapes").style.display = "block";
        document.querySelector(".group.for-brush").style.display = "none";

        break;
      case Tool.TOOL_ERASER:
      case Tool.TOOL_BRUSH:
        document.querySelector(".group.for-shapes").style.display = "none";
        document.querySelector(".group.for-brush").style.display = "block";
        break;

      default:
        document.querySelector(".group.for-shapes").style.display = "none";
        document.querySelector(".group.for-brush").style.display = "none";
    }
  });
});

document.querySelectorAll("[data-line-width]").forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(item.getAttribute("data-line-width"));
    document
      .querySelector("[data-line-width].active")
      .classList.toggle("active");
    item.classList.toggle("active");
    let linewidth = item.getAttribute("data-line-width");
    paint.linewidth1 = linewidth;
  });
});

document.querySelectorAll("[data-brush-width]").forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(item.getAttribute("data-brush-width"));
    document
      .querySelector("[data-brush-width].active")
      .classList.toggle("active");
    item.classList.toggle("active");
    let brushwidth = item.getAttribute("data-brush-width");
    paint.brushSize1 = brushwidth;
  });
});

document.querySelectorAll("[data-color]").forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(item.getAttribute("data-color"));
    document.querySelector("[data-color].active").classList.toggle("active");
    item.classList.toggle("active");
    let color = item.getAttribute("data-color");
    paint.selectedColor = color;
  });
});
