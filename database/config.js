import ip from 'public-ip'
import dotenv from 'dotenv'
dotenv.config()

/*
 * For dev use.  Delete for prod.

const apiKeysByIp = {
  "75.87.1.110": "API_KEY_BUZZMILL",
  "66.68.63.55": "API_KEY_HOME"
}
*/

export const {
  PORT,
  DB_USERNAME,
  DB_HOSTNAME,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT
} = process.env;

class apiAuthKeyGenerator {
  constructor() {
    this.counter = 0,
    this.authKeyNames = ["API_KEY_HOME", 'API_KEY_COFFEE']
  }

  getKey() {
    const key = process.env[this.authKeyNames[this.counter]]
    this.counter = (this.counter + 1) % this.authKeyNames.length
    return key
  }
}

export const keyGenerator = new apiAuthKeyGenerator()

// export const _initAuthHeader = async () => {
//   const apiKeyByIp = apiKeysByIp[await ip.v4()]
//   // console.log(apiKeyByIp)
//   authHeader.headers.Authorization = 'Bearer: ' + process.env[apiKeyByIp]
//   console.log(authHeader.headers.Authorization)
// } 

// _initAuthHeader()