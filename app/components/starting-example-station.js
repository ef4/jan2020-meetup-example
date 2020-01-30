import Component from '@ember/component';

export default Component.extend({
  didReceiveAttrs() {
    this.loadTheStation();
  },

  async loadTheStation() {
    let response = await fetch(`/api/stations/${this.id}.json`);
    let json = await response.json();
    this.set('station', json);
  }
});
