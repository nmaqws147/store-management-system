'use client';
import { useCallback, useMemo, useState, useEffect } from "react";
import { useSalary } from "../products/context/page";
import BarChart from "./charts/page";
import DailySales from "./dailysales/page";
import WeeklySales from "./weeklysales/page";
import MonthlySales from "./monthlysales/page";
import ResetDataComponent from "./ResetDataComponent/page";   
export type DailyTotal = {
  day: string;
  total: number;
  date: string; 
};
export type WeeklyTotal = {
  week: number;
  total: number;
  period: string;
};
export type MonthlyTotal = {
  month: string;
  total: number;
};

const Dashboard = () => {
    const {salarySum, setSalarySum, saveToLocalStorage} = useSalary();
    
    const [dailyChart, setDailyChart] = useState<DailyTotal[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('dailyChart');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const [weeklyChart, setWeeklyChart] = useState<WeeklyTotal[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('weeklyChart');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const [monthlyChart, setMonthlyChart] = useState<MonthlyTotal[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('monthlyChart');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== 'undefined') saveToLocalStorage('dailyChart', dailyChart);
    }, [dailyChart, saveToLocalStorage]);

    useEffect(() => {
        if (typeof window !== 'undefined') saveToLocalStorage('weeklyChart', weeklyChart);
    }, [weeklyChart, saveToLocalStorage]);

    useEffect(() => {
        if (typeof window !== 'undefined') saveToLocalStorage('monthlyChart', monthlyChart);
    }, [monthlyChart, saveToLocalStorage]);

    useEffect(() => {
        if (typeof window !== 'undefined') saveToLocalStorage('salarySum', salarySum);
    }, [salarySum, saveToLocalStorage]);

    useEffect(() => {
        if (dailyChart.length >= 7) {
            const weeklyTotal = dailyChart.reduce((sum, day) => sum + day.total, 0);
            const firstDay = dailyChart[0].date;
            const lastDay = dailyChart[6].date;
            setTimeout(() => {
                setWeeklyChart(prev => {
                    const newWeeklyChart = [...prev, {
                        week: prev.length + 1,  
                        total: weeklyTotal,
                        period: `${firstDay} to ${lastDay}`,
                    }];
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('weeklyChart', JSON.stringify(newWeeklyChart));
                    }
                    return newWeeklyChart;
                });
                setDailyChart([]);
            }, 0);
        }
    }, [dailyChart]);

    useEffect(() => {
        if (monthlyChart.length >= 12) {
            setTimeout(() => {
                setMonthlyChart([]);
                if (typeof window !== 'undefined') {
                    localStorage.setItem('monthlyChart', JSON.stringify([]));
                }
            }, 0);
        }
    }, [monthlyChart]);

    type SalesData = number[] | DailyTotal[] | WeeklyTotal[] | MonthlyTotal[];

    // تعديل: الحساب فقط
    const calculateSales = useCallback((data: SalesData, period: 'daily' | 'weekly' | 'monthly') => {
        if (period === 'daily') {
            const salesData = data as number[];
            return salesData.reduce((sum, amount) => sum + amount, 0);
        }
        else if(period === 'weekly'){
            return dailyChart.reduce((sum, day) => sum + day.total, 0);
        }
        else if(period === 'monthly'){
            return weeklyChart.reduce((sum, week) => sum + week.total, 0);
        }
        return 0;
    }, [dailyChart, weeklyChart]);

    const salesData = useMemo(() => {
        return {
            daily: calculateSales(salarySum, 'daily') || 0,
            weekly: calculateSales([], 'weekly') || 0,
            monthly: calculateSales([], 'monthly') || 0
        };
    }, [salarySum, calculateSales]);

    const { daily, weekly, monthly } = salesData;

    // تعديل: نقل منطق الـ Reset والتحديث لليوم الجديد هنا لمنع الـ Infinite Loop
    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const now = new Date();
        const thisDay = now.toDateString();
        const lastResetDate = localStorage.getItem('lastResetDate');

        if (lastResetDate !== thisDay) {
            const today = new Date();
            const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
            
            setDailyChart(prev => {
                const newDailyChart = [...prev, {
                    day: dayName,
                    total: daily,
                    date: today.toISOString().split('T')[0]
                }];
                localStorage.setItem('dailyChart', JSON.stringify(newDailyChart));
                return newDailyChart;
            });
            
            setSalarySum([]); 
            localStorage.setItem('lastResetDate', thisDay);
            saveToLocalStorage('dailyTotal', 0);
        } else {
            saveToLocalStorage('dailyTotal', daily);
        }

        if(weeklyChart.length === 4){
            const monthlyTotal = weeklyChart.reduce((sum, week) => sum + week.total, 0);
            const today = new Date();
            const monthName = today.toLocaleDateString('en-US', { month: 'long' });
            setMonthlyChart(prev => {
                const newMonthlyChart = [...prev, {
                    month: monthName,
                    total: monthlyTotal,
                }];
                localStorage.setItem('monthlyChart', JSON.stringify(newMonthlyChart));
                return newMonthlyChart;
            });
            setWeeklyChart([]);
        }
    }, [daily, weeklyChart, setSalarySum, saveToLocalStorage]);

    return(
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <DailySales daily={daily}/>
                <WeeklySales weekly={weekly}/>
                <MonthlySales monthly={monthly}/>
                <ResetDataComponent 
                daily={dailyChart} 
                weekly={weeklyChart} 
                monthly={monthlyChart}
                dailyCart = {salarySum}
                updateDaily={setDailyChart} 
                updateWeekly={setWeeklyChart} 
                updateMonthly={setMonthlyChart}
                updateDailyCart={setSalarySum}  
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Daily Chart */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-700">📈 Daily Sales Trend</h3>
                        <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                            <span className="text-lg">🌞</span>
                        </div>
                    </div>
                    <BarChart 
                        data={{
                            labels: dailyChart.slice(-7).map(d => d.day),
                            values: dailyChart.slice(-7).map(d => d.total)
                        }} 
                        title=""
                        color="#4F46E5"
                        
                    />
                    <div className="mt-4 pt-3 border-t border-slate-200/50">
                        <p className="text-sm text-slate-600 font-medium">Last 7 days performance</p>
                    </div>
                </div>

                {/* Weekly Chart */}
                <div className="bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-700">📊 Weekly Performance</h3>
                        <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                            <span className="text-lg">⭐</span>
                        </div>
                    </div>
                    <BarChart 
                        data={{
                            labels: weeklyChart.map(w => `Week ${w.week}`),
                            values: weeklyChart.map(w => w.total)
                        }} 
                        title=""
                        color="#059669"
                    />
                    <div className="mt-4 pt-3 border-t border-slate-200/50">
                        <p className="text-sm text-slate-600 font-medium">{weeklyChart.length} weeks tracked</p>
                    </div>
                </div>

                {/* Monthly Chart */}
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-50 to-violet-50 rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-700">📅 Monthly Sales Report</h3>
                        <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                            <span className="text-lg">🎯</span>
                        </div>
                    </div>
                    <div className="h-48">
                        <BarChart 
                            data={{
                                labels: monthlyChart.map(m => m.month),
                                values: monthlyChart.map(m => m.total)
                            }} 
                            title=""
                            color="#7C3AED"
                            
                        />
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/50 flex justify-between items-center">
                        <p className="text-sm text-slate-600 font-medium">{monthlyChart.length} months analyzed</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
