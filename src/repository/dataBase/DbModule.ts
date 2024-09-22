import { UpdateMode } from 'realm';
import { ESchemas } from './DbConfig';
import RealmInstance from './DbInstance';

interface IDbModule {
  getAll: <T>(
    modelName: ESchemas,
    sorted?: string,
    sortedReverse?: boolean,
  ) => Promise<T>;
  getByQuery: <T>(
    query: string,
    modelName: ESchemas,
    sorted?: string,
    sortedReverse?: boolean,
  ) => Promise<T>;
  write: <T>(
    item: T,
    modelName: string,
    mode?: UpdateMode.All | UpdateMode.Modified,
  ) => Promise<boolean>;
  // writeList: <T>(
  //   listItem: T[],
  //   modelName: ESchemas,
  //   mode?: UpdateMode.All | UpdateMode.Modified,
  // ) => Promise<boolean>;
  deleteItem: (query: string, modelName: ESchemas) => Promise<boolean>;
  checkIsEmpty: (modelName: string) => boolean;
}

function DbModule(): IDbModule {
  function getAll<T>(
    modelName: ESchemas,
    sorted?: string,
    sortedReverse?: boolean,
  ): Promise<T> {
    return new Promise(async (resolve: any, reject) => {
      try {
        const allData = RealmInstance.objects(modelName);
      
        if (sorted) {
          allData.sorted(sorted, sortedReverse);
        }
        if (sortedReverse) {
          allData.sorted(sortedReverse);
        }

        resolve(allData.toJSON());
      } catch (error) {
        console.error('DbModule#getByQuery', modelName, error);
        reject(error);
      }
    });
  }

  function getByQuery<T>(
    query: string,
    modelName: ESchemas,
    sorted?: string,
    sortedReverse?: boolean,
  ): Promise<T> {
    return new Promise(async (resolve: any, reject) => {
      try {
        const allData = RealmInstance.objects(modelName).filtered(query);

        if (sorted) {
          allData.sorted(sorted, sortedReverse);
        }
        if (sortedReverse) {
          allData.sorted(sortedReverse);
        }

        resolve(allData.toJSON());
      } catch (error) {
        console.error('DbModule#getByQuery', modelName, error);
        reject(error);
      }
    });
  }

  function write<T>(
    item: T,
    modelName: string,
    mode?: UpdateMode.All | UpdateMode.Modified,
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!modelName) {
        return reject();
      }
      try {
        RealmInstance.write(() => {
          if (!item) {
            return;
          }

          if (mode) {
            RealmInstance.create<T>(modelName, item, mode);
          } else {
            RealmInstance.create<T>(modelName, item);
          }
        });
        resolve(true);
      } catch (error) {
        console.error('DbModule#write', modelName, error, item);
        reject(error);
      }
    });
  }

  // function writeList<T>(
  //   listItem: T[],
  //   modelName: ESchemas,
  //   mode?: UpdateMode.All | UpdateMode.Modified,
  // ): Promise<boolean> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       RealmInstance.write(() => {
  //         listItem.forEach(item => {
  //           if (!item) {
  //             return;
  //           }

  //           if (mode) {
  //             RealmInstance.create<T>(modelName, item, mode);
  //           } else {
  //             RealmInstance.create<T>(modelName, item);
  //           }
  //         });
  //       });
  //       resolve(true);
  //     } catch (error) {
  //       console.error('DbModule#writeList', modelName, error);
  //       reject(error);
  //     }
  //   });
  // }

  function deleteItem(query: string, modelName: ESchemas): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        RealmInstance.write(() => {
          const result = RealmInstance.objects(modelName).filtered(query);
          RealmInstance.delete(result);
        });
        resolve(true);
      } catch (error) {
        console.error('DbModule#deleteItem', modelName, error);
        reject(error);
      }
    });
  }

  function checkIsEmpty(modelName: string): boolean {
    return RealmInstance.objects(modelName).isEmpty();
  }

  return {
    getAll,
    getByQuery,
    write,
    // writeList,
    deleteItem,
    checkIsEmpty,
  };
}

export default DbModule();
