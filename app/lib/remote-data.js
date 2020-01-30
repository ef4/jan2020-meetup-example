import { tracked } from '@glimmer/tracking';


class RemoteData {
  @tracked state;

  constructor(url) {
    this.run(url);
  }

  async run(url) {
    this.state = {
      isLoading: true,
      response: undefined,
    }
    let response = await fetch(url);
    let json = await response.json();
    this.state = {
      isLoading: false,
      response: json,
    };
  }
}

export function remoteData(url) {
  return [RemoteData, url];
}
