
type weekly = {
    monthly: number;
}
const MonthlySales = ({monthly}:weekly) => {
    return(
        <div className="bg-gradient-to-br from-purple-900 to-indigo-800 rounded-2xl shadow-2xl border border-purple-700 p-6 hover:shadow-3xl transition-all duration-300 hover:scale-105 group">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-semibold text-purple-200 uppercase tracking-wide">Monthly Sales</h3>
        <p className="text-3xl font-bold text-white mt-3">${monthly !== undefined && monthly !== null ? monthly.toFixed(2) : '0.00'}</p>
      </div>
      <div className="w-14 h-14 bg-white/10 group-hover:rotate-12  rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
        <span className="text-2xl text-white">🎯</span>
      </div>
    </div>
    <div className="mt-4 pt-3 border-t border-purple-600/50">
      <p className="text-xs text-purple-300 font-medium">30-day revenue tracking</p>
    </div>
  </div>
    )
}
export default MonthlySales;