const {
  _,
  log,
  handleError,
  buildUri,
  fluid,
  createPromisedApi,
  createAbstractApi,
  validateArgs
} = require('./_base')

/**
 * API doc: https://developer.atlassian.com/bitbucket/api/2/reference/
 * resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commit
 */
function createApi(api, opts = {}) {
  const result = createAbstractApi(api, opts)

  const localApi = {

    /**
     * get all repo commits
     *
     * @param {String} repo owner
     * @param {String} slug (name) of the repo
     *
     * See: https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D/commits
     */
    getAll(username, repoSlug, callback) {
      validateArgs('getAll', arguments, 2)
      const uri = buildUri(username, repoSlug, 'refs')
      api.get(
        uri,
        null, null,
        result.$createListener(callback)
      )
    },
    
    getBranches(username, repoSlug, page, callback) {
      //validateArgs('getBranches', arguments, 3)
      const uri = buildUri(username, repoSlug, 'refs/branches')
	  let opts = null
	  if (page)
		  opts = { pagelen: 100, page: page }
	  else
		  opts = { pagelen: 100 }
      api.get(
        uri,
        opts, null,
        result.$createListener(callback)
      )
    },
  
    getTags(username, repoSlug, page, callback) {
      //validateArgs('getTags', arguments, 3)
      const uri = buildUri(username, repoSlug, 'refs/tags')
	  let opts = null
	  if (page)
		  opts = { pagelen: 100, page: page }
	  else
		  opts = { pagelen: 100 }
      api.get(
        uri,
        opts, null,
        result.$createListener(callback)
      )
    }
  }

  localApi.promised = createPromisedApi(localApi, opts)
  return _.assign(result, localApi)
}

module.exports = {
  createApi,
  methods: [
    'getAll',
    'getBranches',
    'getTags'
  ]
}
