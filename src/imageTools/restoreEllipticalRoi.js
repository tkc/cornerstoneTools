import restoreMouseButtonTool from './restoreMouseButtonTool.js';
import {getToolState} from '../stateManagement/toolState.js';
import {drawEllipse, getNewContext, draw} from '../util/drawing.js';

const toolType = 'restoreEllipticalRoi';

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
      drawEllipse (context, element, data.handles.start, data.handles.end, {
        color,
      });
    });
  }
}

const restoreEllipticalRoi = restoreMouseButtonTool ({
  createNewMeasurement,
  onImageRendered,
  pointNearTool,
  toolType,
});

export {restoreEllipticalRoi};
