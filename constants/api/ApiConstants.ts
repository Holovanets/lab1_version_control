const config = require('../../package.json').projectConfig
const BACKEND_BASE_URL = config.backendApiBaseUrl


const BACKEND_API = {
	BASE_API_URL: `${BACKEND_BASE_URL}/api`,
  MENU: '/menu',
  CATEGORY: '/category',
  AUTH: '/auth',
  TOKENS: '/tokens',
  BY_PHONE: '/by-phone'
}
export default {BACKEND_API}