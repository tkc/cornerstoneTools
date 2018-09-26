let proxyState = {};

let wacher = obj => {
  console.log (obj);
  return obj;
};

const SetToolProxyWacher = newWacher => {
  wacher = newWacher;
};

const GetToolProxyState = () => {
  return proxyState;
};

const RestoreToolProxyState = restoreState => {
  proxyState = restoreState;
};

const RegisterToolProxyState = () => {
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
  SetToolProxyWacher,
  RegisterToolProxyState,
  GetToolProxyState,
  RestoreToolProxyState,
};
