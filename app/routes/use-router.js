import Route from '@ember/routing/route';

export default class UseRouterRoute extends Route {
  async model({ id }) {
    let response = await fetch(`/api/stations/${id}.json`);
    let json = await response.json();
    return json;
  }
}
