class ClientApi {
  constructor(user_key) {
    this.api_domain = process.env.REACT_APP_WEATHER_API_DOMAIN;
    this.api_key = process.env.REACT_APP_WEATHER_API_KEY;
    this.user_key = user_key === undefined ? '' : user_key;
  }

  getHeaders() {
    if (this.api_key !== undefined) {
      let ret = {
        'Authorization': 'Token ' + this.api_key,
        'Content-Type': 'application/json',
      };
      if (this.user_key.length) {
        ret['User-Authorization'] = 'Token ' + this.user_key
      }
      return ret;
    } else {
      return {};
    }
  }

  getForecasts(location) {
    const options = {
      method: 'GET',
      headers: this.getHeaders(),
    };
    const url = this.api_domain + '/api/weather/city/' + location;
    return fetch(url, options);
  }

  getDemoForecasts(location) {
    const options = {
      method: 'GET',
      headers: this.getHeaders(),
    };
    const url = this.api_domain + '/api/weather/demo/city/' + location;
    return fetch(url, options);
  }

  signUp(username, password) {
    const options = {
      method: 'POST',
      headers: this.getHeaders(), 
      body: JSON.stringify({
        username,
        password,
      })
    };
    const url = this.api_domain + '/api/auth/signup/';
    return fetch(url, options);
  }

  signIn(username, password) {
    const options = {
      method: 'POST',
      headers: this.getHeaders(), 
      body: JSON.stringify({
        username,
        password,
      })
    };
    const url = this.api_domain + '/api/auth/signin/';
    return fetch(url, options);
  }

  getLocations() {
    const options = {
      method: 'GET',
      headers: this.getHeaders(), 
    };
    const url = this.api_domain + '/api/location/';
    return fetch(url, options);
  }

  newLocation(name) {
    const options = {
      method: 'POST',
      headers: this.getHeaders(), 
      body: JSON.stringify({
        name,
      })
    };
    const url = this.api_domain + '/api/location/';
    return fetch(url, options);
  }

  deleteLocation(Id) {
    const options = {
      method: 'DELETE',
      headers: this.getHeaders(), 
    };
    const url = this.api_domain + '/api/location/' + Id + '/';
    return fetch(url, options);
  }
}

export default ClientApi;