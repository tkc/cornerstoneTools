let wacher = (obj, cb) => {
  return obj;
};

const SetProxyWacher = newWacher => {
  wacher = newWacher;
};

const RegisterProxyState = () => {
  let proxyStackState = {};
  const handler = {
    get: (obj, prop) => {
      if (typeof obj[prop] === 'object' && obj[prop] !== null) {
        return new Proxy (obj[prop], handler);
      }
      return obj[prop];
    },
    set: (obj, prop, value) => {
      obj[prop] = value;
      proxyStackState = wacher (proxyStackState, {});
      return true;
    },
  };
  return new Proxy (proxyStackState, handler);
};

export {SetProxyWacher, RegisterProxyState};
