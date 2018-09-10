import {
  globalImageIdSpecificToolStateManager,
} from './imageIdSpecificStateManager.js';
import {
  getElementToolStateManager,
  setElementToolStateManager,
} from './toolState.js';

import {RegisterStackProxyState} from './proxies/stackState';

let state = RegisterStackProxyState ();

// This implements an Stack specific tool state management strategy.  This means
// That tool data is shared between all imageIds in a given stack
function newProxyStackSpecificToolStateManager (
  toolTypes,
  oldStateManager,
  viewportDivId
) {
  // TODO: why need this code

  let baseState = {};
  const id = viewportDivId;

  const handler = {
    get: (obj, prop) => {
      if (typeof obj[prop] === 'object' && obj[prop] !== null) {
        return new Proxy (obj[prop], handler);
      }
      return obj[prop];
    },
    set: (obj, prop, value) => {
      obj[prop] = value;
      state[id] = baseState;
      return true;
    },
  };

  let toolState = new Proxy (baseState, handler);

  state[id] = toolState;

  function saveToolState () {
    return toolState;
  }

  function restoreToolState (stackToolState) {
    toolState = stackToolState;
  }

  // Here we add tool state, this is done by tools as well
  // As modules that restore saved state
  function addStackSpecificToolState (element, toolType, data) {
    // If this is a tool type to apply to the stack, do so
    if (toolTypes.indexOf (toolType) >= 0) {
      // If we don't have tool state for this type of tool, add an empty object
      if (toolState.hasOwnProperty (toolType) === false) {
        toolState[toolType] = {
          data: [],
        };
      }

      const toolData = toolState[toolType];

      // Finally, add this new tool to the state
      toolData.data.push (data);
    } else {
      // Call the imageId specific tool state manager
      return oldStateManager.add (element, toolType, data);
    }
  }

  // Here you can get state - used by tools as well as modules
  // That save state persistently
  function getStackSpecificToolState (element, toolType) {
    // If this is a tool type to apply to the stack, do so
    if (toolTypes.indexOf (toolType) >= 0) {
      // If we don't have tool state for this type of tool, add an empty object
      if (toolState.hasOwnProperty (toolType) === false) {
        toolState[toolType] = {
          data: [],
        };
      }
      return toolState[toolType];
    }

    // Call the imageId specific tool state manager
    return oldStateManager.get (element, toolType);
  }

  const stackSpecificToolStateManager = {
    get: getStackSpecificToolState,
    add: addStackSpecificToolState,
    saveToolState,
    restoreToolState,
    toolState,
  };

  return stackSpecificToolStateManager;
}

const stackStateManagers = [];

function addProxyStackStateManager (element, otherTools, viewportDivId) {
  let oldStateManager = getElementToolStateManager (element);

  if (!oldStateManager) {
    oldStateManager = globalImageIdSpecificToolStateManager;
  }

  let stackTools = [
    'stack',
    'stackPrefetch',
    'playClip',
    'volume',
    'slab',
    'referenceLines',
    'crosshairs',
    'stackRenderer',
  ];

  if (otherTools) {
    stackTools = stackTools.concat (otherTools);
  }

  const stackSpecificStateManager = newProxyStackSpecificToolStateManager (
    stackTools,
    oldStateManager,
    viewportDivId
  );

  // TODO:
  stackStateManagers.push (stackSpecificStateManager);
  setElementToolStateManager (element, stackSpecificStateManager);
}

export {newProxyStackSpecificToolStateManager, addProxyStackStateManager};
