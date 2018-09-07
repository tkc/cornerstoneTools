let stateFilter = obj => {
  console.log (obj);
  return obj;
};

const SetFillter = filterFunc => {
  stateFilter = filterFunc;
};

const Register = () => {
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
      proxyStackState = stateFilter (proxyStackState);
      return true;
    },
  };
  return new Proxy (proxyStackState, handler);
};

export {SetFillter, Register};
