/* global exports */
"use strict";

// module WebSocket

export const specViolation = function(s) {
  throw new Error(s);
};

export const newWebSocketImpl = function(url, protocols) {
  return function() {
    var platformSpecific = {};
    if (typeof module !== "undefined" && module.require) {
      // We are on node.js
      platformSpecific.WebSocket = module.require('ws');
    } else {
      // We are in the browser
      platformSpecific.WebSocket = WebSocket;
    }
    var socket = new platformSpecific.WebSocket(url, protocols);
    var getSocketProp = function (prop) {
      return function() { return socket[prop]; }
    }
    var setSocketProp = function (prop) {
      return function(v) {
        return function() {
          socket[prop] = v;
          return {};
        }
      }
    }
    return { setBinaryType: setSocketProp("binaryType")
           , getBinaryType: getSocketProp("binaryType")
           , getBufferedAmount: getSocketProp("bufferedAmount")
           , setOnclose: setSocketProp("onclose")
           , getOnclose: getSocketProp("onclose")
           , setOnerror: setSocketProp("onerror")
           , getOnerror: getSocketProp("onerror")
           , setOnmessage: setSocketProp("onmessage")
           , getOnmessage: getSocketProp("onmessage")
           , setOnopen: setSocketProp("onopen")
           , getOnopen: getSocketProp("onopen")
           , setProtocol: setSocketProp("protocol")
           , getProtocol: getSocketProp("protocol")
           , getReadyState: getSocketProp("readyState")
           , getUrl: getSocketProp("url")
           , closeImpl:
              function(params) {
                return function() {
                  if (params == null) {
                    socket.close();
                  } else if (params.reason == null) {
                    socket.close(params.code);
                  } else {
                    socket.close(params.code, params.reason);
                  }
                  return {}
                }
              }
           , sendImpl:
              function(message) {
                return function() {
                  socket.send(message);
                  return {};
                }
              }
           , getSocket: function () { return socket }
           };
  }
};
