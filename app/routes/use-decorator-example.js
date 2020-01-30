import Route from '@ember/routing/route';

export default class OctaneExampleRoute extends Route {
  async model({ id }) {
    return { id };
  }
}
