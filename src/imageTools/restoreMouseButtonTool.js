import EVENTS from '../events.js';
import external from '../externalModules.js';
import getHandleNearImagePoint
  from '../manipulators/getHandleNearImagePoint.js';
import {
  addToolState,
  removeToolState,
  getToolState,
} from '../stateManagement/toolState.js';
import triggerEvent from '../util/triggerEvent.js';
import {setToolOptions} from '../toolOptions.js';

export default function (mouseToolInterface) {
  let configuration = {};
  const toolType = mouseToolInterface.toolType;

  function mouseDownActivateCallback () {}
  function mouseMoveCallback () {}
  function mouseDownCallback () {}

  const mouseMove = mouseToolInterface.mouseMoveCallback || mouseMoveCallback;
  const mouseDown = mouseToolInterface.mouseDownCallback || mouseDownCallback;
  const mouseDownActivate =
    mouseToolInterface.mouseDownActivateCallback || mouseDownActivateCallback;
  const mouseDoubleClick = mouseToolInterface.mouseDoubleClickCallback;

  // Not visible, not interactive
  function disable (element) {
    element.removeEventListener (
      EVENTS.IMAGE_RENDERED,
      mouseToolInterface.onImageRendered
    );
    element.removeEventListener (EVENTS.MOUSE_MOVE, mouseMove);
    element.removeEventListener (EVENTS.MOUSE_DOWN, mouseDown);
    element.removeEventListener (EVENTS.MOUSE_DOWN_ACTIVATE, mouseDownActivate);

    if (mouseDoubleClick) {
      element.removeEventListener (EVENTS.MOUSE_DOUBLE_CLICK, mouseDoubleClick);
    }
    external.cornerstone.updateImage (element);
  }

  function enable (element) {
    element.removeEventListener (
      EVENTS.IMAGE_RENDERED,
      mouseToolInterface.onImageRendered
    );
    element.removeEventListener (EVENTS.MOUSE_MOVE, mouseMove);
    element.removeEventListener (EVENTS.MOUSE_DOWN, mouseDown);
    element.removeEventListener (EVENTS.MOUSE_DOWN_ACTIVATE, mouseDownActivate);
    if (mouseDoubleClick) {
      element.removeEventListener (EVENTS.MOUSE_DOUBLE_CLICK, mouseDoubleClick);
    }
    element.addEventListener (
      EVENTS.IMAGE_RENDERED,
      mouseToolInterface.onImageRendered
    );
    external.cornerstone.updateImage (element);
  }

  function activate (element, mouseButtonMask) {
    setToolOptions (toolType, element, {mouseButtonMask});
    element.removeEventListener (
      EVENTS.IMAGE_RENDERED,
      mouseToolInterface.onImageRendered
    );
    element.removeEventListener (EVENTS.MOUSE_MOVE, mouseMove);
    element.removeEventListener (EVENTS.MOUSE_DOWN, mouseDown);
    element.removeEventListener (EVENTS.MOUSE_DOWN_ACTIVATE, mouseDownActivate);
    element.addEventListener (
      EVENTS.IMAGE_RENDERED,
      mouseToolInterface.onImageRendered
    );
    element.addEventListener (EVENTS.MOUSE_MOVE, mouseMove);
    element.addEventListener (EVENTS.MOUSE_DOWN, mouseDown);
    element.addEventListener (EVENTS.MOUSE_DOWN_ACTIVATE, mouseDownActivate);
    if (mouseDoubleClick) {
      element.removeEventListener (EVENTS.MOUSE_DOUBLE_CLICK, mouseDoubleClick);
      element.addEventListener (EVENTS.MOUSE_DOUBLE_CLICK, mouseDoubleClick);
    }
    external.cornerstone.updateImage (element);
  }

  function deactivate (element, mouseButtonMask) {
    setToolOptions (toolType, element, {mouseButtonMask});
    const eventType = EVENTS.TOOL_DEACTIVATED;
    const statusChangeEventData = {
      mouseButtonMask,
      toolType,
      type: eventType,
    };
    triggerEvent (element, eventType, statusChangeEventData);
    element.removeEventListener (
      EVENTS.IMAGE_RENDERED,
      mouseToolInterface.onImageRendered
    );
    element.removeEventListener (EVENTS.MOUSE_MOVE, mouseMove);
    element.removeEventListener (EVENTS.MOUSE_DOWN, mouseDown);
    element.removeEventListener (EVENTS.MOUSE_DOWN_ACTIVATE, mouseDownActivate);
    element.addEventListener (
      EVENTS.IMAGE_RENDERED,
      mouseToolInterface.onImageRendered
    );
    element.addEventListener (EVENTS.MOUSE_MOVE, mouseMove);
    element.addEventListener (EVENTS.MOUSE_DOWN, mouseDown);
    if (mouseDoubleClick) {
      element.removeEventListener (EVENTS.MOUSE_DOUBLE_CLICK, mouseDoubleClick);
      element.addEventListener (EVENTS.MOUSE_DOUBLE_CLICK, mouseDoubleClick);
    }
    if (mouseToolInterface.deactivate) {
      mouseToolInterface.deactivate (element, mouseButtonMask);
    }
    external.cornerstone.updateImage (element);
  }

  function getConfiguration () {
    return configuration;
  }

  function setConfiguration (config) {
    configuration = config;
  }

  const toolInterface = {
    enable,
    disable,
    activate,
    deactivate,
    getConfiguration,
    setConfiguration,
    mouseDownCallback,
    mouseMoveCallback,
    mouseDownActivateCallback,
  };

  if (mouseToolInterface.pointNearTool) {
    toolInterface.pointNearTool = mouseToolInterface.pointNearTool;
  }

  if (mouseDoubleClick) {
    toolInterface.mouseDoubleClickCallback = mouseDoubleClick;
  }

  if (mouseToolInterface.addNewMeasurement) {
    toolInterface.addNewMeasurement = mouseToolInterface.addNewMeasurement;
  }

  return toolInterface;
}
