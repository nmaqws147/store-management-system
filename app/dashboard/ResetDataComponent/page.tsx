import { useState } from 'react';
import { DailyTotal, WeeklyTotal, MonthlyTotal } from "../page";
type ResetDataProps = {
    daily: DailyTotal[];
    weekly: WeeklyTotal[];
    monthly: MonthlyTotal[];
    dailyCart: number[];
    updateDailyCart: React.Dispatch<React.SetStateAction<number[]>>;
    updateDaily: (data: DailyTotal[]) => void;
    updateWeekly: (data: WeeklyTotal[]) => void;
    updateMonthly: (data: MonthlyTotal[]) => void;
};

const ResetDataComponent = ({
    updateDailyCart,
    updateDaily,
    updateWeekly,
    updateMonthly,
}: ResetDataProps) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const ResetDailyCart = () => {
        updateDailyCart([]);
    };
    const ResetDailyChart = () => {
        updateDaily([]);
    };
    const resetAll = () => {
        updateDaily([]);
        updateWeekly([]);
        updateMonthly([]);
        updateDailyCart([]);
    };
    const resetMonthlyChart = () => {
        updateMonthly([]);
    };
    const resetWeeklyChart = () => {
        updateWeekly([]);
    };
    const deleteLastProccess = () => {
        updateDailyCart((prev) => prev.slice(0,-1));;
    }
    return (    
        <div className="relative inline-block">
            {/* Floating Gear Icon Button - White Theme */}
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    className="fixed bottom-6 right-6 z-50 p-4 cursor-pointer rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group border border-gray-300 bg-black"                    
                >
                    {/* Animated Gear Icon */}
                    <svg 
                        className={`w-6 h-6 transition-all text-white duration-500 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    
                </button>

                {/* Settings Panel - White Theme */}
                {isOpen && (
                    <div 
                        className="fixed bottom-20 right-6 w-80 bg-white border border-gray-300 rounded-2xl shadow-2xl z-40 animate-in slide-in-from-bottom-5"
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        {/* Panel Header */}
                        <div className="p-4 border-b border-gray-200 from-gray-50 to-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Reset Dashboard</h3>
                                    <p className="text-sm text-gray-600">Manage your data</p>
                                </div>
                            </div>
                        </div>
                        {/* Even Better - Full Consistency */}
                        {/* Settings Options */}
                        <div className="p-4 space-y-3 bg-white">
                             <button 
    onClick={deleteLastProccess}
    className="w-full flex items-center cursor-pointer justify-between mt-2 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors group"
>
    <div className="flex items-center gap-3">
        <div className="p-2 bg-amber-100 rounded-lg">
            <svg fill="none" className="h-4 w-4 text-amber-600" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
    <circle cx="18" cy="14" r="1" stroke-width="1.5" />
</svg>
        </div>
        <span className="text-gray-700">Undo Last Entry</span>
    </div>
    <div className="flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
    </div>
</button>
                            {/* Daily Cart Reset */}
                            <button 
                                onClick={ResetDailyCart}
                                className="w-full flex items-center cursor-pointer justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Daily Cart</span>
                                </div>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Daily Chart Reset */}
                            <button 
                                onClick={ResetDailyChart}
                                className="w-full flex items-center cursor-pointer justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-100 rounded-lg">
                                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Daily Chart</span>
                                </div>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Weekly Reset */}
                            <button 
                                onClick={resetWeeklyChart}
                                className="w-full flex items-center cursor-pointer justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Weekly Chart</span>
                                </div>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Monthly Reset */}
                            <button 
                                onClick={resetMonthlyChart}
                                className="w-full flex items-center cursor-pointer justify-between p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Monthly Chart</span>
                                </div>
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Reset All - Bottom Button */}
                            <button 
                                onClick={resetAll}
                                className="w-full flex items-center cursor-pointer justify-center gap-2 p-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all mt-4 shadow-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span className="font-semibold">Reset Everything</span>
                            </button>
                        </div>

                        {/* Panel Footer */}
                        <div className="p-3 border-t border-gray-200 bg-gray-50">
                            <p className="text-xs text-gray-600 text-center">
                                Data will be permanently deleted
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetDataComponent;