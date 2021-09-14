const CANVAS_SIZE = [700, 700];
const SNAKE_START = [
  [8, 10],
  [8, 11]
];
const APPLE_START = [8, 4];
const SCALE = 20;
const SPEED = 100; // initail delay milliseconds
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};
const MAX_SCORE = 1200;
export {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
  MAX_SCORE
};