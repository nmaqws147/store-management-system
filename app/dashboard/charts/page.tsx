'use client';
import { useEffect, useRef } from 'react';
import { Chart, ChartOptions } from 'chart.js/auto';

type BarChartProps = {
  data: {
    labels: string[];
    values: number[];
  };
  title: string;
  color?: string;
};

const BarChart = ({ data, title, color = '#3B82F6' }: BarChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // تعريف options مع النوع المناسب
    const options: ChartOptions<'bar'> = {
      responsive: true,
      plugins: {
        legend: { 
          display: false
        }
      },
      scales: {
        y: { 
          beginAtZero: true,
          display: false
        },
        x: {
          display: false,
          grid: {
            display: false,
          },
          // إضافة الخصائص المطلوبة بشكل صحيح
          ticks: {
            display: false,
          }
        }
      }
    };

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: title,
          data: data.values,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
          borderRadius: 8,
        }]
      },
      options: options
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title, color]);

  return <canvas ref={chartRef} />;
};

export default BarChart;