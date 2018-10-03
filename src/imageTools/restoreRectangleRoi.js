import restoreMouseButtonTool from './restoreMouseButtonTool.js';
import {getToolState} from '../stateManagement/toolState.js';
import {getNewContext, draw, drawRect} from '../util/drawing.js';

const toolType = 'restoreRectangleRoi';

function createNewMeasurement () {}
function pointNearTool () {}
function onImageRendered (e) {
  const eventData = e.detail;
  const toolData = getToolState (e.currentTarget, toolType);
  if (!toolData) {
    return;
  }
  const element = eventData.element;
  const context = getNewContext (eventData.canvasContext.canvas);

  for (let i = 0; i < toolData.data.length; i++) {
    const data = toolData.data[i];
    if (data.visible === false) {
      continue;
    }
    draw (context, context => {
      const color = data.color;
      drawRect (context, element, data.handles.start, data.handles.end, {
        color,
      });
    });
  }
}

const restoreRectangleRoi = restoreMouseButtonTool ({
  createNewMeasurement,
  onImageRendered,
  pointNearTool,
  toolType,
});

export {restoreRectangleRoi};
