let wacher = (obj, cb) => {
  // const data = [
  //   {
  //     visible: true,
  //     active: true,
  //     invalidated: false,
  //     handles: {
  //       start: {
  //         x: 70.78286558345641,
  //         y: 70.7533234859675,
  //         highlight: true,
  //         active: false,
  //       },
  //       end: {
  //         x: 135.94091580502214,
  //         y: 126.2983751846381,
  //         highlight: true,
  //         active: false,
  //       },
  //       textBox: {
  //         active: false,
  //         hasMoved: false,
  //         movesIndependently: false,
  //         drawnIndependently: true,
  //         allowedOutsideImage: true,
  //         hasBoundingBox: true,
  //         x: 135.94091580502214,
  //         y: 108.52584933530281,
  //         boundingBox: {
  //           width: 0,
  //           height: 5,
  //           left: 420.99999999999994,
  //           top: 284.5,
  //         },
  //       },
  //     },
  //     meanStdDev: {
  //       count: 1800,
  //       mean: 59.165,
  //       variance: 1530.478886111111,
  //       stdDev: 39.1213354336366,
  //     },
  //     area: 1410.423516731431,
  //   },
  //   {
  //     visible: true,
  //     active: true,
  //     invalidated: false,
  //     handles: {
  //       start: {
  //         x: 80.01624815361887,
  //         y: 80.14623338257016,
  //         highlight: true,
  //         active: false,
  //       },
  //       end: {
  //         x: 145.01624815361887,
  //         y: 153.14623338257016,
  //         highlight: true,
  //         active: true,
  //       },
  //       textBox: {
  //         active: false,
  //         hasMoved: false,
  //         movesIndependently: false,
  //         drawnIndependently: true,
  //         allowedOutsideImage: true,
  //         hasBoundingBox: true,
  //         x: 145.01624815361887,
  //         y: 153.14623338257016,
  //         boundingBox: {
  //           width: 0,
  //           height: 5,
  //           left: 444.99999999999994,
  //           top: 402.5,
  //         },
  //       },
  //     },
  //     meanStdDev: {
  //       count: 0,
  //       mean: 0,
  //       variance: 0,
  //       stdDev: 0,
  //     },
  //     area: 0,
  //   },
  // ];

  // obj['mock://1']['rectangleRoi'] = {
  //   data: [],
  // };

  // obj['mock://1']['rectangleRoi']['data'] = data;

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
