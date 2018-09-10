let proxyState = {};

let wacher = obj => {
  // const data = [
  //   {
  //     restore: true,
  //     visible: true,
  //     active: true,
  //     invalidated: false,
  //     handles: {
  //       start: {
  //         x: 70.78286558345641,
  //         y: 70.7533234859675,
  //         highlight: true,
  //         active: true,
  //       },
  //       end: {
  //         x: 135.94091580502214,
  //         y: 126.2983751846381,
  //         highlight: true,
  //         active: true,
  //       },
  //       textBox: {},
  //     },
  //     meanStdDev: {},
  //     area: 0,
  //   },
  //   {
  //     restore: true,
  //     visible: true,
  //     active: true,
  //     invalidated: false,
  //     handles: {
  //       start: {
  //         x: 80.01624815361887,
  //         y: 80.14623338257016,
  //         highlight: true,
  //         active: true,
  //       },
  //       end: {
  //         x: 145.01624815361887,
  //         y: 153.14623338257016,
  //         highlight: true,
  //         active: true,
  //       },
  //       textBox: {},
  //     },
  //     meanStdDev: {},
  //     area: 0,
  //   },
  //   {
  //     restore: true,
  //     visible: true,
  //     active: true,
  //     invalidated: false,
  //     handles: {
  //       start: {
  //         x: 110.01624815361887,
  //         y: 110.14623338257016,
  //         highlight: true,
  //         active: true,
  //       },
  //       end: {
  //         x: 180.01624815361887,
  //         y: 180.14623338257016,
  //         highlight: true,
  //         active: true,
  //       },
  //       textBox: {},
  //     },
  //     meanStdDev: {},
  //     area: 0,
  //   },
  // ];

  // obj['mock://1']['rectangleRoi'] = {
  //   data: [],
  // };
  // obj['mock://1']['rectangleRoi']['data'] = data;
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
