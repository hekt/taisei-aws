import Container from 'infrastructure/Container';

interface ServiceProviderInterface {
  getIdentifier(): string;
  cleanup(): void;
  provide<T>(container: Container): T;
}

export default ServiceProviderInterface;
