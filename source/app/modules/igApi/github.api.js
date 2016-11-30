class Api {

  constructor(options) {
    this.settings = {
      credentials: 'omit',
      onUncauchError(error) {
        console.error(error);
      }
    };

    this.methods = {
      GET_ISSUES: '/repos/rails/rails/issues'
    };

    Object.assign(this.settings, options);
  }

  call(method, params) {
    let queryUrl = this.settings.apiDomain + method + '?';
    for(let key in params){
      const val = params[key];
      queryUrl += `${key}=${val}&`;
    }
    queryUrl = queryUrl.substr(0, queryUrl.length-1);

    var slf = this;
    function httpRequest(url, method){
      let fetchOptions = {
        method: method,
        credentials: slf.settings.credentials
      };
      return fetch(url, fetchOptions);
    }

    return httpRequest(queryUrl, 'HEAD')
    .then(response => {
      const links = response.headers.get('Link').split(',');
      const lastPage = links[1].match(/page=(\d+).*$/)[1];

      var urls = [];
      for(let i = 1; i <= lastPage; i++){
        urls.push(queryUrl.replace(/page=(\d+)/, 'page='+i));
      }

      return Promise.all(urls.map((url) => httpRequest(url, 'GET')))
        .then(responses => Promise.all(responses.map(res => res.json())));
    })
    .then((json) => json.reduce((flat, current) => flat.concat(current), []))
    .catch((error) => this.settings.onUncauchError(json));
  }

  getIssues() {
    let sinceDate = new Date();
    sinceDate.setMonth(sinceDate.getMonth()-1);
    return this.call(this.methods.GET_ISSUES, {state: 'all', since: sinceDate, page: 1, per_page: 100});
  }
}

module.exports = Api;
