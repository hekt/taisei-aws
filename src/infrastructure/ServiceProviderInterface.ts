import Container from './Container';

interface ServiceProviderInterface {
  getIdentifier(): string;
  cleanup(): void;
  provide<T>(container: Container): T;
}

export default ServiceProviderInterface;
