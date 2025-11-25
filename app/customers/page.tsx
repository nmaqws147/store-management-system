'use client';
import { useState, useEffect } from "react";

interface Customer {
  customerId: number;
  customerName: string;
  phoneNumber: string;
  customerDebt: string;
  customerDebtHistory: string;
  customerDebtPayment: string;
  customerDesc: string;
}

const Customers = () => {
    const [showCustomersField, setShowCustomersField] = useState(false);
    const [editBool, setEditBool] = useState(false);
    const [showCustomers, setShowCustomers] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [debt, setDebt] = useState("");
    const [debtHistory, setDebtHistory] = useState("");
    const [desc, setDesc] = useState("");
    const [debtPayment, setDebtPayment] = useState("");
    
    // Load from localStorage
    const [customer, setCustomer] = useState<Customer[]>(() => {
      if (typeof window === 'undefined') return [];
      try {
        const savedCustomers = localStorage.getItem('customers');
        return savedCustomers ? JSON.parse(savedCustomers) : [];
      } catch (error) {
        console.error('Error loading customers:', error);
        return [];
      }
    });
    
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    // Save to localStorage function
    const saveCustomersToLocalStorage = (customers: Customer[]) => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('customers', JSON.stringify(customers));
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      }
    };

    // Save to localStorage whenever customers change
    useEffect(() => {
      saveCustomersToLocalStorage(customer);
    }, [customer]);

    const addCustomer = () => {
      if (!name || name.trim() === "" || !phone || phone.trim() === "") {
        alert("Name and phone are required!");
        return;
      }
      const newCustomer = {
        customerId: Date.now(),
        customerName: name.trim(),
        phoneNumber: phone.trim(),
        customerDebt: debt.trim(),
        customerDebtHistory: debtHistory.trim(),
        customerDebtPayment: debtPayment.trim(),
        customerDesc: desc.trim()
      }
      const updatedCustomers = [...customer, newCustomer];
      setCustomer(updatedCustomers);
      setShowCustomersField(false);
      setShowCustomers(false);
      setName("");
      setPhone("");
      setDebt("");
      setDebtHistory("");
      setDebtPayment("");
      setDesc("");
    } 

    const editCustomer = (cust: Customer) => {
      setSelectedCustomer(cust);
      setEditBool(true);
    }

    const updateCustomer = () => {
      if (!selectedCustomer) return;
      
      const updatedCustomers = customer.map(cust => 
        cust.customerId === selectedCustomer.customerId ? selectedCustomer : cust
      );
      setCustomer(updatedCustomers);
      setEditBool(false);
    }

    const deleteCustomer = (customerId: number) => {
      const updatedCustomers = customer.filter(cust => cust.customerId !== customerId);
      setCustomer(updatedCustomers);
    }

    const calculateRemainingDebt = (customer: Customer) => {
      const currentDebt = Number(customer.customerDebt) || 0;
      const payments = Number(customer.customerDebtPayment) || 0;
      return (currentDebt - payments).toFixed(2);
    }

    return (
        <>
          {customer.length === 0 ? (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md text-center border border-gray-100">
                
                {/* Icon */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md text-white text-2xl sm:text-3xl">
                    👤
                  </div>
                </div>

                {/* Text Content */}
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                    No Customers Added Yet
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Start by adding your first customer to track debts, phone numbers, products, and due dates easily.
                  </p>
                </div>

                {/* Button */}
                <button
                  className="w-full py-3 cursor-pointer bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                  onClick={() => setShowCustomersField(!showCustomersField)}>
                  + Add First Customer
                </button>

              </div>
            </div>
          ) : (
            <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-30">
              <button
                onClick={() => setShowCustomersField(!showCustomersField)}
                className="cursor-pointer flex items-center gap-2 sm:gap-3 bg-white border-2 border-dashed border-blue-400 text-blue-600 px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-50 hover:border-blue-500 active:scale-95 group"
              >
                <span className="text-xl sm:text-2xl font-semibold group-hover:rotate-90 transition-transform duration-300">+</span>
                <span className="font-medium text-sm sm:text-base">Add Customer</span>
              </button>
            </div>
          )}

          {showCustomersField && (
            <>
              {/* Overlay */}
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>

              {/* Popup */}
              <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4">
                <div className="bg-white w-full max-w-sm sm:max-w-md rounded-xl shadow-lg border border-gray-200 mx-auto max-h-[90vh] overflow-hidden">

                  {/* Header */}
                  <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                      Add Customer
                    </h2>
                  </div>

                  {/* Form */}
                  <div className="p-4 sm:p-5 space-y-3 max-h-[60vh] overflow-y-auto">
                    {/* Name Input */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Customer name"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    {/* Phone Input */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Phone *
                      </label>
                      <input
                        type="text"
                        placeholder="Phone number"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    {/* Financial Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {/* Current Debt */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Current Debt
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                          onChange={(e) => setDebt(e.target.value)}
                        />
                      </div>

                      {/* Debt Payment */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Payment Due Date
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 15th monthly"
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                          onChange={(e) => setDebtPayment(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Debt History */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Debt Date
                      </label>
                      <input
                        type="text"
                        placeholder="Previous debts..."
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                        onChange={(e) => setDebtHistory(e.target.value)}
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Notes
                      </label>
                      <textarea
                        placeholder="Additional notes..."
                        className="w-full h-16 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none transition-all"
                        onChange={(e) => setDesc(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 px-4 sm:px-5 pb-4 sm:pb-5">
                    <button
                      className="flex-1 py-2 bg-gray-100 cursor-pointer text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all"
                      onClick={() => setShowCustomersField(false)}>
                      Cancel
                    </button>
                    <button
                      className="flex-1 py-2 bg-blue-600 cursor-pointer text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all shadow-sm"
                      onClick={addCustomer}>
                      Save
                    </button>
                  </div>

                </div>
              </div>
            </>
          )}

          {showCustomers === false && customer.length > 0 && (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-6xl mx-auto">
                
                {/* Header - Compact */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div>
                      <h1 className="text-lg sm:text-xl font-bold text-gray-900">Customers</h1>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">Manage customers and track debts</p>
                    </div>
                    <div className="text-sm text-gray-600 sm:text-right">
                      Total: <span className="font-semibold text-blue-600">{customer.length}</span>
                    </div>
                  </div>
                </div>

                {/* Table Container - Compact */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  
                  {/* Desktop Table */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-sm">
                      {/* Compact Table Header */}
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Customer
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Phone
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Current Debt
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Debt Date
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Payment Due
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Remaining
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Notes
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      {/* Compact Table Body */}
                      <tbody className="divide-y divide-gray-100">
                        {customer.map((customer, index) => (
                          <tr key={index} className="hover:bg-blue-50 transition-colors duration-150">
                            
                            {/* Customer Info - Compact */}
                            <td className="px-4 py-3">
                              <div className="flex items-center min-w-0">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
                                  <span className="text-white text-xs font-bold">
                                    {customer.customerName.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium text-gray-900 truncate">
                                    {customer.customerName}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Phone - Compact */}
                            <td className="px-3 py-3">
                              <div className="text-xs text-gray-700">
                                {customer.phoneNumber}
                              </div>
                            </td>

                            {/* Current Debt - Compact */}
                            <td className="px-3 py-3">
                              <div className="text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded border border-red-200">
                                ${customer.customerDebt || '0'}
                              </div>
                            </td>

                            {/* Debt History - Compact */}
                            <td className="px-3 py-3">
                              <div className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-200 max-w-xs truncate">
                                {customer.customerDebtHistory || 'No date'}
                              </div>
                            </td>

                            {/* Payment History - Compact */}
                            <td className="px-3 py-3">
                              <div className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200">
                                {customer.customerDebtPayment || 'No due date'}
                              </div>
                            </td>

                            {/* Remaining Debt - Compact */}
                            <td className="px-3 py-3">
                              <div className="text-xs font-semibold text-orange-700 bg-orange-50 px-2 py-1 rounded border border-orange-200">
                                ${calculateRemainingDebt(customer)}
                              </div>
                            </td>

                            {/* Description - Compact */}
                            <td className="px-3 py-3">
                              <div className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded border border-blue-100 max-w-xs truncate">
                                {customer.customerDesc || 'No notes'}
                              </div>
                            </td>

                            {/* Actions - Professional Icons */}
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                {/* Edit Button - Professional */}
                                <button
                                  className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer group"
                                  onClick={() => editCustomer(customer)}
                                  title="Edit Customer"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>

                                {/* Delete Button - Professional */}
                                <button
                                  className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer group"
                                  onClick={() => deleteCustomer(customer.customerId)}
                                  title="Delete Customer"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Tablet View */}
                  <div className="hidden md:block lg:hidden overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                          <th className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>
                          <th className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Current Debt</th>
                          <th className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Payment Due</th>
                          <th className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Remaining</th>
                          <th className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {customer.map((customer, index) => (
                          <tr key={index} className="hover:bg-blue-50">
                            <td className="px-3 py-2">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-2">
                                  <span className="text-white text-xs font-bold">
                                    {customer.customerName.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{customer.customerName}</div>
                                  <div className="text-xs text-gray-500">{customer.phoneNumber}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-2">
                              <div className="text-xs text-gray-700">{customer.phoneNumber}</div>
                            </td>
                            <td className="px-2 py-2">
                              <div className="text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded border border-red-200">
                                ${customer.customerDebt || '0'}
                              </div>
                            </td>
                            <td className="px-2 py-2">
                              <div className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200">
                                {customer.customerDebtPayment || 'No due date'}
                              </div>
                            </td>
                            <td className="px-2 py-2">
                              <div className="text-xs font-semibold text-orange-700 bg-orange-50 px-2 py-1 rounded border border-orange-200">
                                ${calculateRemainingDebt(customer)}
                              </div>
                            </td>
                            <td className="px-2 py-2">
                              <div className="flex gap-1">
                                <button
                                  className="p-1 text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                                  onClick={() => editCustomer(customer)}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                                  onClick={() => deleteCustomer(customer.customerId)}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-3 p-3">
                    {customer.map((customer, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-bold">
                                {customer.customerName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{customer.customerName}</h3>
                              <p className="text-xs text-gray-600">{customer.phoneNumber}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                              onClick={() => editCustomer(customer)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                              onClick={() => deleteCustomer(customer.customerId)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600 text-xs">Current Debt:</span>
                            <div className="font-medium text-red-700">${customer.customerDebt || '0'}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 text-xs">Payment Due:</span>
                            <div className="font-medium text-green-700">{customer.customerDebtPayment || 'No due date'}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 text-xs">Debt Date:</span>
                            <div className="font-medium text-gray-700">{customer.customerDebtHistory || 'No date'}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 text-xs">Remaining:</span>
                            <div className="font-semibold text-orange-700">${calculateRemainingDebt(customer)}</div>
                          </div>
                        </div>

                        {customer.customerDesc && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <span className="text-gray-600 text-xs">Notes:</span>
                            <div className="text-xs text-gray-700 mt-1">{customer.customerDesc}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary Footer */}
                <div className="mt-4 text-center text-sm text-gray-600 md:hidden">
                  Total Customers: <span className="font-semibold text-blue-600">{customer.length}</span>
                </div>
              </div>
            </div>
          )}

          {editBool && selectedCustomer && (
            <>
              {/* Overlay */}
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>

              {/* Popup */}
              <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4">
                <div className="bg-white w-full max-w-sm sm:max-w-md rounded-xl shadow-lg border border-gray-200 mx-auto max-h-[90vh] overflow-hidden">

                  {/* Header */}
                  <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                      Edit Customer
                    </h2>
                  </div>

                  {/* Form */}
                  <div className="p-4 sm:p-5 space-y-3 max-h-[60vh] overflow-y-auto">
                    {/* Name Input */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Customer name"
                        value={selectedCustomer.customerName}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        onChange={(e) => setSelectedCustomer({...selectedCustomer, customerName: e.target.value})}
                      />
                    </div>

                    {/* Phone Input */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Phone *
                      </label>
                      <input
                        type="text"
                        placeholder="Phone number"
                        value={selectedCustomer.phoneNumber}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        onChange={(e) => setSelectedCustomer({...selectedCustomer, phoneNumber: e.target.value})}
                      />
                    </div>

                    {/* Financial Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {/* Current Debt */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Current Debt
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          value={selectedCustomer.customerDebt}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                          onChange={(e) => setSelectedCustomer({...selectedCustomer, customerDebt: e.target.value})}
                        />
                      </div>

                      {/* Debt Payment */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Payment Due Date
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 15th monthly"
                          value={selectedCustomer.customerDebtPayment}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                          onChange={(e) => setSelectedCustomer({...selectedCustomer, customerDebtPayment: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Debt History */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Debt Date
                      </label>
                      <input
                        type="text"
                        placeholder="Previous debts..."
                        value={selectedCustomer.customerDebtHistory}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                        onChange={(e) => setSelectedCustomer({...selectedCustomer, customerDebtHistory: e.target.value})}
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Notes
                      </label>
                      <textarea
                        placeholder="Additional notes..."
                        value={selectedCustomer.customerDesc}
                        className="w-full h-16 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none transition-all"
                        onChange={(e) => setSelectedCustomer({...selectedCustomer, customerDesc: e.target.value})}
                      ></textarea>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 px-4 sm:px-5 pb-4 sm:pb-5">
                    <button
                      className="flex-1 py-2 bg-gray-100 cursor-pointer text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all"
                      onClick={() => setEditBool(false)}>
                      Cancel
                    </button>
                    <button
                      className="flex-1 py-2 bg-blue-600 cursor-pointer text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all shadow-sm"
                      onClick={updateCustomer}>
                      Save Changes
                    </button>
                  </div>

                </div>
              </div>
            </>
          )}
        </>
    )
}

export default Customers;