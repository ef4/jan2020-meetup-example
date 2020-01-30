import Route from '@ember/routing/route';

export default class DeclarativeExampleRoute extends Route {
  async model({ id }) {
    return { id };
  }
}
