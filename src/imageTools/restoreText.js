import external from '../externalModules.js';
import restoreMouseButtonTool from './restoreMouseButtonTool.js';
import toolColors from '../stateManagement/toolColors.js';
import drawTextBox, {textBoxWidth} from '../util/drawTextBox.js';
import {getToolState} from '../stateManagement/toolState.js';
import {getNewContext, draw} from '../util/drawing.js';

const toolType = 'restoreText';

function createNewMeasurement (mouseEventData) {
  const measurementData = {
    visible: true,
    active: true,
    text: '',
    color: undefined,
    handles: {
      end: {
        x: mouseEventData.currentPoints.image.x,
        y: mouseEventData.currentPoints.image.y,
        highlight: true,
        active: true,
      },
    },
  };
  return measurementData;
}

function onImageRendered (e) {
  const eventData = e.detail;

  const toolData = getToolState (eventData.element, toolType);

  if (!toolData) {
    return;
  }

  const context = getNewContext (eventData.canvasContext.canvas);

  for (let i = 0; i < toolData.data.length; i++) {
    const data = toolData.data[i];

    if (data.visible === false) {
      continue;
    }

    const color = toolColors.getColorIfActive (data);
    draw (context, context => {
      const padding = 0;
      data.textWidth = textBoxWidth (context, data.text, padding);
      const textCoords = external.cornerstone.pixelToCanvas (
        eventData.element,
        data.handles.end
      );
      const options = {
        centering: {
          x: true,
          y: true,
        },
      };
      drawTextBox (
        context,
        data.text,
        textCoords.x,
        textCoords.y - 10,
        color,
        options
      );
    });
  }
}

function pointNearTool () {}
function mouseDoubleClickCallback () {}

const restoreText = restoreMouseButtonTool ({
  createNewMeasurement,
  onImageRendered,
  pointNearTool,
  toolType,
  mouseDoubleClickCallback,
});

export {restoreText};
