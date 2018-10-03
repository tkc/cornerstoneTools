import restoreMouseButtonTool from './restoreMouseButtonTool.js';
import drawHandles from '../manipulators/drawHandles.js';
import {getToolState} from '../stateManagement/toolState.js';
import {getNewContext, draw} from '../util/drawing.js';

const toolType = 'restoreProbe';

function createNewMeasurement () {}
function pointNearTool () {}

function onImageRendered (e) {
  const eventData = e.detail;
  const toolData = getToolState (e.currentTarget, toolType);
  if (!toolData) {
    return;
  }
  const context = getNewContext (eventData.canvasContext.canvas);
  for (let i = 0; i < toolData.data.length; i++) {
    const data = toolData.data[i];
    if (data.visible === false) {
      continue;
    }
    draw (context, context => {
      drawHandles (context, eventData, data.handles, data.color);
    });
  }
}

const restoreProbe = restoreMouseButtonTool ({
  createNewMeasurement,
  onImageRendered,
  pointNearTool,
  toolType,
});

export {restoreProbe};
