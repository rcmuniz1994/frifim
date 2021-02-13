import { makeReduxAssets } from 'resource-toolkit';
import { makeFirestoreApiClient } from '../../app/firebase-adapters';
import makeResourceMessageTextFn from '../izitoast-for-resources/makeResourceMessageTextFn';

const client = makeFirestoreApiClient('transactions');

const transactionsResource = makeReduxAssets({
  name: 'transactions',
  idKey: 'uuid',
  makeMessageText: makeResourceMessageTextFn('transação', 'transações'),
  gateway: {
    fetchMany: (ids, basicData) => client.read(basicData),
    create: (transaction, basicData) => client.create(basicData, transaction),
    delete: (uuid) => client.delete(uuid),
  },
});

export const { actionThunks: transactionsActions } = transactionsResource;

export default transactionsResource.reducer;
