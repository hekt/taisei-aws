import { Connection, Repository as BaseRepository } from 'typeorm';
import Entity from './Entity';

abstract class Repository<T> {
  public constructor(
    protected connection: Connection
  ) {}

  protected abstract getRepository(): BaseRepository<Entity<T>>;
  protected abstract inflate(entity: Entity<T>): T;
  protected abstract deflate(model: T): Entity<T>;

  public async persist(model: T): Promise<Entity<T>> {
    let entity: Entity<T> = this.deflate(model);

    return this.getRepository().persist(entity);
  }

  public async all(): Promise<T[]> {
    let entities = await this.getRepository().find();

    return entities.map(this.inflate);
  }

  public async transaction(
    callback: (repository: Repository<T>, base: BaseRepository<Entity<T>>) => Promise<any> | any
  ): Promise<any> {
    return this.getRepository()
      .transaction(callback.bind(null, this));
  }
}

export default Repository;
