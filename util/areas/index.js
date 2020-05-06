import Shape from "clipper-js"; // clipping library

const scaler = 1000; // scaling Shapes lets us merge non-integer lengths
const minimumHoleArea = 0.002;
const removeTinyHoles = shapes => {
  shapes.forEach(shape => {
    if (shape.paths.length > 1) {
      // i.e. shape has holes
      const shapeAreas = shape.areas();
      // eslint-disable-next-line no-param-reassign
      shape.paths = shape.paths.filter(
        (s, i) => Math.abs(shapeAreas[i]) > minimumHoleArea
      );
    }
  });
  return shapes;
};
const mergeArea = (areas, newArea) => {
  const existingShapes = areas.map(area =>
    new Shape(area, true, true).scaleUp(scaler)
  );
  const existingShape = existingShapes.reduce(
    (acc, shape) => acc.join(shape),
    new Shape()
  );
  const newAreaShape = new Shape(newArea, true, true).scaleUp(scaler);
  const mergedShapes = existingShape
    .union(newAreaShape)
    .scaleDown(scaler)
    .seperateShapes();
  const result = removeTinyHoles(mergedShapes).map(shape => shape.mapToLower());
  return result;
};
const removeArea = (areas, newArea) => {
  const existingShapes = areas.map(area =>
    new Shape(area, true, true).scaleUp(scaler)
  );
  const existingShape = existingShapes.reduce(
    (acc, shape) => acc.join(shape),
    new Shape()
  );
  const newAreaShape = new Shape(newArea, true, true).scaleUp(scaler);
  const mergedShapes = existingShape
    .difference(newAreaShape)
    .scaleDown(scaler)
    .seperateShapes();
  const result = removeTinyHoles(mergedShapes).map(shape => shape.mapToLower());
  return result;
};

const easement = 1 / scaler; // the amount of area put between areas
const toRect = reduction => (coordA, coordB = coordA) => {
  const left = Math.min(coordA.x, coordB.x) - reduction;
  const bottom = Math.min(coordA.y, coordB.y) - reduction;
  const right = Math.max(coordA.x, coordB.x) + reduction;
  const top = Math.max(coordA.y, coordB.y) + reduction;
  return [
    [
      { x: left, y: bottom },
      { x: left, y: top },
      { x: right, y: top },
      { x: right, y: bottom }
    ]
  ];
};
const coordinateHalf = 0.5;
const magicNumberToReduceCursorSize = 0.04;
const toArea = toRect(coordinateHalf - easement);
const toAreaCursor = toRect(
  coordinateHalf - easement - magicNumberToReduceCursorSize
);
const toRemoval = toRect(easement);

export { mergeArea, removeArea, toArea, toAreaCursor, toRemoval };
