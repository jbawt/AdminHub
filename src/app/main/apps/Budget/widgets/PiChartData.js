/**
 *
 * @param {*Expense data from api} apiData
 * @param {*date} date
 * @returns Expense data specific to this month / month selected
 */
const chartData = (apiData, date) => {
  /**
   * below expression will be used to sort and display expenses by month
   * possibly in the PiChartData function
   */
  const monthExpenseData = apiData?.expenses
    ?.map((item) => {
      if (new Date(item.date).getMonth() === date.getMonth()) {
        return item;
      }
      return null;
    })
    .filter((item) => item !== null);

  const names = monthExpenseData?.map((item) => {
    return item.name;
  });
  const totals = monthExpenseData?.map((item) => {
    return Number(item.total);
  });

  const chartInfo = {
    options: {
      labels: names,
      theme: {
        monochrome: {
          enabled: false,
        },
        palette: 'palette1',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%',
              height: '100%',
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      chart: {
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log(config.w.config.labels[config.dataPointIndex]);
          },
        },
      },
    },
    series: totals,
  };

  return chartInfo;
};

export default chartData;
