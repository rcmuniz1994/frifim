import { makeReduxAssets } from 'resource-toolkit';
import { makeFirestoreApiClient } from '../../app/firebase-adapters';
import makeResourceMessageTextFn from '../izitoast-for-resources/makeResourceMessageTextFn';

const client = makeFirestoreApiClient('categories');

const categoriesResource = makeReduxAssets({
  name: 'categories',
  idKey: 'uuid',
  makeMessageText: makeResourceMessageTextFn('categoria', 'categorias'),
  gateway: {
    fetchMany: (ids, basicData) => client.read(basicData),
    create: (category, basicData) => client.create(basicData, category),
    delete: (uuid) => client.delete(uuid),
  },
});

export const { actionThunks: categoriesActions } = categoriesResource;

export default categoriesResource.reducer;
