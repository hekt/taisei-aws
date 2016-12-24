import ServiceProviderInterface from './ServiceProviderInterface';

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
    return this.providers[identifier].provide<T>(this);
  }
}
