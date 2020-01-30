import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  station: computed('id', {
    get() {
      this.loadTheStation();
      return null;
    },
    set(key, value) {
      return value;
    }
  }),

  async loadTheStation() {
    let response = await fetch(`/api/stations/${this.id}.json`);
    let json = await response.json();
    this.set('station', json);
  }
});
