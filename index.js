#! /usr/bin/env node
'use strict'
/******************************************************************************
  DEPENDENCIES = CUSTOM SDK [Custom Software Development Kit]
******************************************************************************/
const path = require('path')
/******************************************************************************
  PARAMETER = ARGUMENT
******************************************************************************/
  // no cli tool
  // $paramName = process.argv[2];
/******************************************************************************
  MODULE INTERNALS & HELPERS
******************************************************************************/
function returnMessage (msg, method) {
  console.log('==============================')
  console.log('TO AVOID THIS MESSAGE, DO:')
  console.log('  exemethod(function logger (msg, method) {')
  console.log('  /*log here*/; return method; })')
  console.log('RETURNS:')
  console.log('[npm|shellscript|globalcli|localcli|required|browserify]')
  console.log('==============================')
  console.log(msg)
  console.log('==============================')
  return method
}
function exemethod (logger) {
  // logger: function (msg, method) { /*log here*/; return method; }
  // return [npm|shellscript|globalcli|localcli|required|browserify]
  logger = logger ? logger : returnMessage
  if (process.platform === 'linux') {
    var isLinux         = true
  } else if (process.platform === 'darwin') {
    var isMac           = true
  } else if (process.platform) {
    var isWindows       = true
  } else {
    var isBrowserified  = process.title === 'browser'
  }
  var isBrowserify      = (function checkBrowserify (argstr) {
    return argstr.indexOf(' -t ') !== -1 ||
           (process.argv[1]||'').indexOf('browserify') !== -1 ||
           (process.argv[1]||'').indexOf('watchify') !== -1
  })(process.argv.join(' '))
  if (isBrowserify) {
    return logger('Current execution context: "browserify"', 'browserify')
  }
  var isNode            = !isBrowserified
  if (isNode) {
    var isRequired  = module.parent ? module.parent.parent ? true:false:false
    var isCLI       = !isRequired
    if (isCLI) {
      var fullpath  = process.env._.split(path.sep)
      var dir       = fullpath[0]
      var cmd       = fullpath[fullpath.length-1]
      var isLocal   = cmd === 'node' || cmd === 'iojs'
      var isScript  = dir === '.'
      var isNPM     = cmd === 'npm'
      var isGlobal  = !isLocal
      if (isNPM) {
        return logger('Current execution context: "npm"', 'npm')
      } else if (isScript) {
        return logger('Current execution context:  "shellscript"', 'shellscript')
      } else if (isGlobal) {
        return logger('Current execution context: "globalcli"', 'globalcli')
      } else if (isLocal){
        return logger('Current execution context: "localcli"', 'localcli')
      }
    } else if (isRequired) {
      return logger('Current execution context: "required"', 'required')
    } else {
      throw new Error('Current usage not supported. [weird node usage]')
    }
  } else if (isBrowserified) {
    var isBrowser = typeof window !== 'undefined'
    if (isBrowser) {
      return logger('Current execution context: "browser"', 'browser')
    } else {
      throw new Error('Current usage not supported. [browserified cli]')
    }
  } else {
    throw new Error('Current usage not supported. [unknown environment]')
  }
}
/******************************************************************************
  EXPORT
******************************************************************************/
module.exports = exemethod
