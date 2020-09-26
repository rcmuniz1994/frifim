import React from "react";
import { useSelector } from "react-redux";
import { Bar } from 'react-chartjs-2';
import LoadingContainer from "../loading/LoadingContainer";
import { INCOME_TYPE, EXPENSE_TYPE } from "../categories/constants";
import useSelectorForMonthlySituation, { getMonthlyCalcs } from "../monthly-budget/useSelectorForMonthlySituation";

export default function Home() {
  const isLoading = useSelector(state => Object.keys(state).some(slice => state[slice].isLoading));
  const monthlySituation = useSelectorForMonthlySituation();

  if (isLoading) {
    return <LoadingContainer />
  }

  const monthlyCalcs = getMonthlyCalcs(monthlySituation);

  const isHealthy = monthlyCalcs.total.isZero() || monthlyCalcs.total.isPositive();

  const chartData = {
    labels: [''],
    datasets: [
      {
        label: INCOME_TYPE.pluralLabel,
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        hoverBackgroundColor: 'rgba(0, 123, 255, 0.7)',
        data: [monthlyCalcs.subtotalIncomes],
      },
      {
        label: EXPENSE_TYPE.pluralLabel,
        backgroundColor: 'rgba(220, 53, 69, 0.5)',
        hoverBackgroundColor: 'rgba(220, 53, 69, 0.7)',
        data: [monthlyCalcs.subtotalExpenses],
      }
    ]
  };

  return (
    <main className="container">
      <header>
        <h1>Página inicial</h1>
      </header>
      <section>
        <h2>Resumo do mês</h2>
        <ul>
          <li className="text-secondary"><strong>{INCOME_TYPE.label}: </strong>
            R$ {monthlyCalcs.subtotalIncomes.toFixed(2)}
          </li>
          <li className="text-secondary"><strong>{EXPENSE_TYPE.label}: </strong>
            R$ {monthlyCalcs.subtotalExpenses.toFixed(2)}
          </li>
          <li>
            <strong>Total: </strong>
            <span className={isHealthy ? 'text-success' : 'text-danger'}>
              R$ {monthlyCalcs.total.toFixed(2)}
            </span>
          </li>
        </ul>
        <div className="mt-3">
          <Bar options={chartOptions} data={chartData} />
        </div>
      </section>
    </main>
  );
}

const chartOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};
