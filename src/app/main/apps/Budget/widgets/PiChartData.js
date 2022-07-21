const chartData = (apiData) => {
  const names = apiData?.expenses?.map((item) => {
    return item.name;
  });
  const totals = apiData?.expenses?.map((item) => {
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
