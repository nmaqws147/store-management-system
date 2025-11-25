'use client';
import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

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
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { 
            display: false // ✅ شيل الليجيند
          }
        },
        scales: {
          y: { 
            beginAtZero: true,
            display: false // ✅ شيل المحور الرأسي
          },
          x: {
            display: false // ✅ شيل المحور الأفقي
          }
        }
      }
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