import Container from './Container';

interface ServiceProviderInterface {
  getIdentifier(): string;
  provide<T>(container: Container): T;
}

export default ServiceProviderInterface;
