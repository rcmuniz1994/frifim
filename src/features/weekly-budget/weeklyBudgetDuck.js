import { makeReduxAssets } from 'resource-toolkit';
import { makeFirestoreApiClient } from '../../app/firebase-adapters';
import makeResourceMessageTextFn from '../izitoast-for-resources/makeResourceMessageTextFn';

const client = makeFirestoreApiClient('weekly_budgets');

const weeklyBudgetResource = makeReduxAssets({
  name: 'weeklyBudget',
  idKey: 'uuid',
  makeMessageText: makeResourceMessageTextFn('planejamento semanal', 'planejamentos semanais'),
  gateway: {
    fetchMany: (ids, basicData) => client.read(basicData),
    create: (budget, basicData) => client.create(basicData, budget),
    delete: (uuid) => client.delete(uuid),
  },
});

export const { actionThunks: weeklyBudgetActions } = weeklyBudgetResource;

export default weeklyBudgetResource.reducer;
