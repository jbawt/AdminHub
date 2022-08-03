import { format } from 'date-fns';

const chartData = (goalData) => {
  const seriesData = goalData.savingsData.map((item) => {
    return item.amount;
  });
  const categories = goalData.savingsData.map((item) => {
    const start = `${format(new Date(item.week_start), 'MMM dd')}`;
    const end = `${format(new Date(item.week_end), 'MMM dd')}`;
    const label = `${start}-${end}`;

    return label;
  });

  const data = {
    series: [
      {
        name: 'Put Away',
        data: seriesData,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      theme: {
        mode: 'dark',
        palette: 'palette1',
        monochrome: {
          enabled: false,
          color: '#225aee',
          shadeTo: 'light',
          shadeIntensity: 0.65,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          distributed: true,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories,
      },
      yaxis: {
        title: {
          text: '$ Put Away',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter(val) {
            return `$${val}`;
          },
        },
        theme: 'dark',
      },
    },
  };

  return data;
};

export default chartData;
