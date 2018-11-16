const oak = require('oak')
const _ = require('lodash')

const OakPlatform = require('@oaklabs/platform')

// store the window closure, if needed the window can be destroyed later
let window = null

async function loadWindow () {
  // kick off a new platform, defaults to hitting localhost
  platform = await new OakPlatform({
    host: process.env.PLATFORM_HOST || 'localhost:443'
  })
  // store the object for hitting the host proto
  platformHost = await platform.host()

  window = oak.load({
    url: process.env.REMOTE_URL || 'http://0.0.0.0:9151',
    size: '1080x1920',
    background: 'rgb(204, 18, 108)',
    ontop: false,
    sslExceptions: ['localhost']
  })
  // the client side has fired window.oak.ready()
  .on('ready', function () {
    platformHost.info(undefined, function (err, hostInfo) {
      // we have the host information, or an error
      // in the client side, we can listen to oak.on('hostInfo', function ({ error, success }) {})
      window.send('hostInfo', {
        error: err,
        success: hostInfo
      })
    })
  })
}

// everything has to wait for the main ready event to fire
oak.on('ready', () => {
  loadWindow()
})
