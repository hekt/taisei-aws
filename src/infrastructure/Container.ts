import ServiceProviderInterface from 'infrastructure/ServiceProviderInterface';

export default class Container {
  private static sharedInstance: Container | null = null;
  private providers: {[key: string]: ServiceProviderInterface} = {};

  private constructor() {}

  public static instance(): Container {
    if (this.sharedInstance === null) {
      this.sharedInstance = new Container();
    }

    return this.sharedInstance;
  }

  public static newInstance(): Container {
    this.sharedInstance = null;

    return Container.instance();
  }

  public cleanup(): void {
    for (let k in this.providers) {
      let provider = this.providers[k];
      provider.cleanup();
    }
  }

  public addProvider(provider: ServiceProviderInterface): Container {
    this.providers[provider.getIdentifier()] = provider;

    return this;
  }

  public addProviders(providers: ServiceProviderInterface[]): Container {
    for (let provider of providers) {
      this.addProvider(provider);
    }

    return this;
  }

  public get<T>(identifier: string): T {
    let provider = this.providers[identifier];
    if (!provider) {
      throw new Error('Container: unknown identifier');
    }

    return provider.provide<T>(this);
  }
}
