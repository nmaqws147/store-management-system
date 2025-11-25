
type DailyTotal = {
  weekly: number; 
};
const WeeklySales = ({weekly}:DailyTotal) => {
    return(
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-blue-200/30 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Weekly Sales</h3>
        <p className="text-3xl font-bold text-blue-900 mt-3">${weekly.toFixed(2)}</p>
      </div>
      <div className="w-14 h-14 bg-blue-100/50 rounded-xl flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
        <span className="text-2xl">📊</span>
      </div>
    </div>
    <div className="mt-4 pt-3 border-t border-blue-200/30">
      <p className="text-xs text-blue-600 font-medium">Last 7 days performance</p>
    </div>
  </div>
    )
}
export default WeeklySales;