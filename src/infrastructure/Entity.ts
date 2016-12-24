abstract class Entity<T> {
  public abstract inflate(): T;

  /**
   * 本当は static abstract deflate(model: T) にしたいが
   * TypeScript で static abstract がサポートされていないため我慢
   */
  public abstract setValuesFromModel(model: T): Entity<T>;
}

export default Entity;
