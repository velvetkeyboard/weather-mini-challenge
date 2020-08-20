class ClientApi {
  constructor() {
    this.api_domain = process.env.REACT_APP_WEATHER_API_DOMAIN;
    this.api_key = process.env.REACT_APP_WEATHER_API_KEY;
  }

  getCheckWeatherUrl(newLocation) {
    if (this.api_key !== undefined) {
      return this.api_domain + '/api/weather/city/' + newLocation + '/';
    } else {
      return this.api_domain + '/api/weather/demo/city/' + newLocation + '/';
    }
  }

  getHeaders() {
    if (this.api_key !== undefined) {
      return {
        'Authorization': 'Token ' + this.api_key,
      };
    } else {
      return {};
    }
  }
}

export default ClientApi;