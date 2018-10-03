import restoreMouseButtonTool from './restoreMouseButtonTool.js';
import getCircle from '../paintingTools/getCircle.js';
import {drawBrushOnCanvas} from '../paintingTools/drawBrush.js';
import {getNewContext} from '../util/drawing.js';
import {getToolState} from '../stateManagement/toolState.js';

const toolType = 'restoreMask';

const configuration = {
  draw: 1,
  radius: 5,
  minRadius: 1,
  maxRadius: 20,
  hoverColor: 'rgba(230, 25, 75, 1.0)',
  dragColor: 'rgba(230, 25, 75, 0.3)',
  active: false,
};

function createNewMeasurement () {}
function pointNearTool () {}

function onImageRendered (e) {
  const eventData = e.detail;
  const context = getNewContext (eventData.canvasContext.canvas);
  const element = eventData.element;
  const toolData = getToolState (eventData.element, toolType);
  if (!toolData) {
    return;
  }

  for (let i = 0; i < toolData.data.length; i++) {
    const data = toolData.data[i];
    if (data.visible === false) {
      continue;
    }
    context.setTransform (1, 0, 0, 1, 0, 0);
    const pointerArray = getCircle (
      configuration.radius,
      256,
      256,
      data.handles.end.x,
      data.handles.end.y
    );
    drawBrushOnCanvas (pointerArray, context, configuration.dragColor, element);
  }
}

const restoreMask = restoreMouseButtonTool ({
  createNewMeasurement,
  onImageRendered,
  pointNearTool,
  toolType,
});

export {restoreMask};
