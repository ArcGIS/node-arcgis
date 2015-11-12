/**
 * Wrapper for arcgis api
 */
var rq = require('./lib/rq')
var uniq = require('./lib/uniq')

var Client = {
  search: function (string) {console.log(`search for ${string}`)},
  user: require('./user/user'),
  organization: require('./org/org'),
  group: require('./group/group'),
  item: require('./item/item'),
  usage: {
    get: require('./usage/usage'),
    summary: require('./usage/get-summary'),
    stypeToService: require('./usage/stype-to-service'),
    parseProduct: require('./usage/parse-product'),
    flatten: require('./usage/flatten-data'),
    periodToMs: require('./usage/period-to-ms')
  },
  billing: {
    get: require('./billing/billing'),
    status: function(){console.log('checks status of billing')}
  }
}

/**
 * Sets up a new arcgis client
 * @param {String} Valid Token
 * @returns {Object} Object with methods for necessary routes
 */
let client = ({token = "", domain = "www.arcgis.com"} = {}) => {
  var arcgis = Object.create(Client)
  /* Automatically add client id, base url */
  /**
   * Sets ups base request to ArcGIS
   * @param {String} URL to append to root URL
   * @param {Object} Options to pass as query parameters
   * @returns {Promise} On resolution will return results
   */
  arcgis.request = (url, form = {}, post) => {
    var rootUrl = `https://${domain}/sharing/rest/`
    if (!form.public){
      form.token = token
    }
    form.f     = 'pjson'
    if (post) {
      return rq.post(`${rootUrl}${url}`, form)
    } else {
      return rq.get(`${rootUrl}${url}`, form)
    }
  }
  return arcgis
}

module.exports = client