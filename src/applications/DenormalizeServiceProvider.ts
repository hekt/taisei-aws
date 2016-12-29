import Container from '../infrastructure/Container';
import ServiceProvider from '../infrastructure/ServiceProvider';
import CorrectorFactory from '../domains/Efficacy/CorrectorFactory';
import DenormalizeService from './DenormalizeService';

export class DenormalizeServiceProvider extends ServiceProvider<DenormalizeService> {
  public getIdentifier(): string {
    return 'denormalizeService';
  }

  public resolve(container: Container): DenormalizeService {
    return new DenormalizeService(
      container.get<CorrectorFactory>('correctorFactory')
    );
  }
}
