type Daily = {
    daily: number;
}
const DailySales = ({daily}:Daily) => {
    return(
        <> 
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide">Todays Sales</h3>
        <p className="text-3xl font-bold text-green-900 mt-3">${daily.toFixed(2)}</p>
      </div>
      <div className="w-14 h-14 bg-white/80 group-hover:rotate-12  rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
        <span className="text-2xl">💰</span>
      </div>
    </div>
    <div className="mt-4 pt-3 border-t border-green-200/50">
      <p className="text-xs text-green-600 font-medium">Updated just now</p>
    </div>
  </div>

  </>
    )
}
export default DailySales;