let proxyState = {};

let wacher = obj => {
  if (
    obj.viewportslayout_1.hasOwnProperty ('stack') &&
    obj.viewportslayout_1.stack.data[0]
  ) {
    console.log (obj.viewportslayout_1.stack.data[0].currentImageIdIndex);
    obj.viewportslayout_1.stack.data[0].currentImageIdIndex = 1;
  }
  return obj;
};

const SetStackProxyWacher = newWacher => {
  wacher = newWacher;
};

const GetSatckProxyState = () => {
  return proxyState;
};

const RestoreStackProxyState = restoreState => {
  proxyState = restoreState;
};

const RegisterStackProxyState = () => {
  proxyState = {};
  const handler = {
    get: (obj, prop) => {
      if (typeof obj[prop] === 'object' && obj[prop] !== null) {
        return new Proxy (obj[prop], handler);
      }
      return obj[prop];
    },
    set: (obj, prop, value) => {
      obj[prop] = value;
      proxyState = wacher (proxyState);
      return true;
    },
  };
  return new Proxy (proxyState, handler);
};

export {
  SetStackProxyWacher,
  RegisterStackProxyState,
  GetSatckProxyState,
  RestoreStackProxyState,
};
