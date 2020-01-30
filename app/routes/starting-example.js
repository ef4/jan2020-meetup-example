import Route from '@ember/routing/route';

export default class StartingExampleRoute extends Route {
  async model({ id }) {
    return { id };
  }
}
