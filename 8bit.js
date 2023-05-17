/**
 * 8bit
 *
 * A module that converts an image into a pixelated version (just like
 * 8bit artwork).
 *
 * @author rogeriopvl <https://github.com/rogeriopvl>
 * @license MIT
 */

module.exports = function(canvas, image, scale) {
  scale *= 0.01;

  var hRatio = canvas.width / image.width;
  var vRatio = canvas.height / image.height;
  var ratio = Math.min(hRatio, vRatio);

  image.width *= ratio;
  image.height *= ratio;

  canvas.width = image.width;
  canvas.height = image.height;

  var scaledW = canvas.width * scale;
  var scaledH = canvas.height * scale;

  var { createCanvas, Image } = require('canvas');
  var tempCanvas = createCanvas(scaledW, scaledH);
  var tempCtx = tempCanvas.getContext('2d');
  tempCtx.imageSmoothingEnabled = false;
  tempCtx.drawImage(image, 0, 0, scaledW, scaledH);

  var ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(tempCanvas, 0, 0, scaledW, scaledH, 0, 0, canvas.width, canvas.height);
};
