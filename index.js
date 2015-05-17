#! /usr/bin/env node
'use strict';
/******************************************************************************
  DEPENDENCIES = CUSTOM SDK [Custom Software Development Kit]
******************************************************************************/
const path = require('path');
/******************************************************************************
  PARAMETER = ARGUMENT
******************************************************************************/
  // no cli tool
  // $paramName = process.argv[2];
/******************************************************************************
  MODULE INTERNALS & HELPERS
******************************************************************************/
function returnMessage (msg, method) {
  console.log('==============================');
  console.log(msg);
  console.log('==============================');
  return method;
}
function exemethod (logger) {
  // logger: function (msg, method) { /*log here*/ return method; }
  // return [npm|script|globalcli|localcli|required|browserify]
  logger = logger ? logger : returnMessage;
  if (process.platform === 'linux') {
    var isLinux         = true;
  } else if (process.platform === 'darwin') {
    var isMac           = true;
  } else if (process.platform) {
    var isWindows       = true;
  } else {
    var isBrowserified  = process.title === 'browser';
  }
  var isNode            = !isBrowserified;
  if (isNode) {
    var isRequired  = module.parent ? module.parent.parent ? true:false:false;
    var isCLI       = !isRequired;
    if (isCLI) {
      var fullpath  = process.env._.split(path.sep);
      dir           = fullpath[0];
      cmd           = fullpath[fullpath.length-1];
      var isLocal   = cmd === 'node' || cmd === 'iojs';
      var isScript  = dir === '.';
      var isNPM     = cmd === 'npm';
      var isGlobal  = !isLocal;
      if (isNPM) {
        return logger('EXEC AS: npm run ...', 'npm');
      } else if (isScript) {
        return logger('EXEC AS: standalone script', 'script');
      } else if (isGlobal) {
        return logger('EXEC AS: node cli global', 'globalcli');
      } else if (isLocal){
        return logger('EXEC AS: node cli local', 'localcli');
      }
    } else if (isRequired) {
      return logger('EXEC AS: node required(...)', 'required');
    } else {
      throw new Error('Current usage not supported. [weird node usage]');
    }
  } else if (isBrowserified) {
    var isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      return logger('EXEC AS: browser required(...)', 'browersify');
    } else {
      throw new Error('Current usage not supported. [browserified cli]');
    }
  } else {
    throw new Error('Current usage not supported. [unknown environment]');
  }
}
/******************************************************************************
  EXPORT
******************************************************************************/
module.exports = exemethod;
