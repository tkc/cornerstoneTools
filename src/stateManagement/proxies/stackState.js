let proxyState = {};

let wacher = obj => {
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
  proxyState,
};
