const LOCAL_BASE_URL = 'http://localhost:5001/api'
const DEV_BASE_URL = 'http://46.101.60.50:5001/api'
const STAGING_BASE_URL = 'http://46.101.9.206:5001/api'

const devConfig = {
  environment: 'development',
  api:{
    BASE_URL: LOCAL_BASE_URL,
    timeout: 60000
  },
  isDev: true
}

const stagingConfig = {
  environment: 'staging',
  api:{
    BASE_URL: DEV_BASE_URL,
    timeout: 60000
  },
  isDev: false
}

const prodConfig = {
  environment: 'production',
  api: {
    BASE_URL: STAGING_BASE_URL,
    timeout: 60000
  },
  isDev: false
}

const getConfig = () => {
  switch (process.env.NODE_ENV) { //eslint-disable-line
  case 'development':
    return devConfig
  case 'staging':
    return stagingConfig
  case 'production':
    return prodConfig
  default:
    throw new Error(
      'Could not determine environment. Please define environment variable ENV.'
    )
  }
}

export default getConfig()
