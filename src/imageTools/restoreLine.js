import restoreMouseButtonTool from './restoreMouseButtonTool.js';
import toolColors from '../stateManagement/toolColors.js';
import {getNewContext, draw, drawLine} from '../util/drawing.js';
import {getToolState} from '../stateManagement/toolState.js';

const toolType = 'restoreLine';

function createNewMeasurement () {}
function pointNearTool () {}

function onImageRendered (e) {
  const eventData = e.detail;
  const context = getNewContext (eventData.canvasContext.canvas);
  const {element} = eventData;
  const toolData = getToolState (eventData.element, toolType);

  if (!toolData) {
    return;
  }

  for (let i = 0; i < toolData.data.length; i++) {
    const data = toolData.data[i];
    if (data.visible === false) {
      continue;
    }
    draw (context, context => {
      const color = toolColors.getColorIfActive (data);
      drawLine (context, element, data.handles.start, data.handles.end, {
        color,
      });
    });
  }
}

const restoreLine = restoreMouseButtonTool ({
  createNewMeasurement,
  onImageRendered,
  pointNearTool,
  toolType,
});

export {restoreLine};
