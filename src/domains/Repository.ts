// import { Connection, Repository as BaseRepository } from 'typeorm';

// abstract class Repository<TDao, TModel> {
//   protected repository: BaseRepository<TDao>;

//   public constructor(
//     protected connection: Connection
//   ) {
//     this.repository = connection.getRepository(this.getDao());
//   }

//   protected abstract getModel: TModel;
//   protected abstract getDao: TDao;
//   protected abstract inflate(dao: TDao): TModel
//   protected abstract deflate(model: TModel): TDao

//   public persist(model: TModel): void {
//     let dao: TDao = this.deflate(model);

//     this.repository.persist(dao);
//   }

//   public find(id: number): TModel | undefined {
//     let dao: TDao | undefined = await this.repository.findById(id);

//     if (dao === undefined) {
//       return undefined;
//     }

//     return this.inflate(dao);
//   }
// }

// export default Repository
