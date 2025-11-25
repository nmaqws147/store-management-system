'use client';
import { useState, useEffect } from "react";
  
interface Employee {
  employeeId: number;
  employeeName: string;
  phoneNumber: string;
  basicSalary: string;
  bonuses: string;
  deductions: string;
  paymentDate: string;
  position: string;
  notes: string;
}

const Employees = () => {
    const [showEmployeesField, setShowEmployeesField] = useState(false);
    const [editBool, setEditBool] = useState(false);
    const [showEmployees, setShowEmployees] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [bonuses, setBonuses] = useState("");
    const [deductions, setDeductions] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [position, setPosition] = useState("");
    const [notes, setNotes] = useState("");
    
    // Load from localStorage
    const [employees, setEmployees] = useState<Employee[]>(() => {
      if (typeof window === 'undefined') return [];
      try {
        const savedEmployees = localStorage.getItem('employees');
        return savedEmployees ? JSON.parse(savedEmployees) : [];
      } catch (error) {
        console.error('Error loading employees:', error);
        return [];
      }
    });
    
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    // Save to localStorage function
    const saveEmployeesToLocalStorage = (employeesData: Employee[]) => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('employees', JSON.stringify(employeesData));
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      }
    };

    // Save to localStorage whenever employees change
    useEffect(() => {
      saveEmployeesToLocalStorage(employees);
    }, [employees]);

    const addEmployee = () => {
      if (!name || name.trim() === "" || !phone || phone.trim() === "") {
        alert("Name and phone are required!");
        return;
      }
      const newEmployee = {
        employeeId: Date.now(),
        employeeName: name.trim(),
        phoneNumber: phone.trim(),
        basicSalary: basicSalary.trim(),
        bonuses: bonuses.trim(),
        deductions: deductions.trim(),
        paymentDate: paymentDate.trim(),
        position: position.trim(),
        notes: notes.trim()
      }
      const updatedEmployees = [...employees, newEmployee];
      setEmployees(updatedEmployees);
      setShowEmployeesField(false);
      setShowEmployees(false);
      setName("");
      setPhone("");
      setBasicSalary("");
      setBonuses("");
      setDeductions("");
      setPaymentDate("");
      setPosition("");
      setNotes("");
    } 

    const editEmployee = (emp: Employee) => {
      setSelectedEmployee(emp);
      setEditBool(true);
    }

    const updateEmployee = () => {
      if (!selectedEmployee) return;
      
      const updatedEmployees = employees.map(emp => 
        emp.employeeId === selectedEmployee.employeeId ? selectedEmployee : emp
      );
      setEmployees(updatedEmployees);
      setEditBool(false);
    }

    const deleteEmployee = (employeeId: number) => {
      const updatedEmployees = employees.filter(emp => emp.employeeId !== employeeId);
      setEmployees(updatedEmployees);
    }

    const calculateNetSalary = (employee: Employee) => {
      const basic = Number(employee.basicSalary) || 0;
      const bonus = Number(employee.bonuses) || 0;
      const deduction = Number(employee.deductions) || 0;
      return (basic + bonus - deduction).toFixed(2);
    }

    return (
        <>
          {employees.length === 0 ? (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md text-center border border-gray-100">
                
                {/* Icon */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md text-white text-2xl sm:text-3xl">
                    👨‍💼
                  </div>
                </div>

                {/* Text Content */}
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                    No Employees Added Yet
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    Start by adding your first employee to track salaries, bonuses, deductions, and payment dates.
                  </p>
                </div>

                {/* Button */}
                <button
                  className="w-full py-3 cursor-pointer bg-green-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-green-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
                  onClick={() => setShowEmployeesField(!showEmployeesField)}>
                  + Add First Employee
                </button>

              </div>
            </div>
          ) : (
            <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-30">
              <button
                onClick={() => setShowEmployeesField(!showEmployeesField)}
                className="cursor-pointer flex items-center gap-2 sm:gap-3 bg-white border-2 border-dashed border-green-400 text-green-600 px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-green-50 hover:border-green-500 active:scale-95 group"
              >
                <span className="text-xl sm:text-2xl font-semibold group-hover:rotate-90 transition-transform duration-300">+</span>
                <span className="font-medium text-sm sm:text-base">Add Employee</span>
              </button>
            </div>
          )}

          {showEmployeesField && (
            <>
              {/* Overlay */}
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>

              {/* Popup */}
              <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4">
                <div className="bg-white w-full max-w-sm sm:max-w-md rounded-xl shadow-lg border border-gray-200 mx-auto max-h-[90vh] overflow-hidden">

                  {/* Header */}
                  <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                      Add Employee
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
                        placeholder="Employee name"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all"
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
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    {/* Position */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Position
                      </label>
                      <input
                        type="text"
                        placeholder="Employee position"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all"
                        onChange={(e) => setPosition(e.target.value)}
                      />
                    </div>

                    {/* Salary Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {/* Basic Salary */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Basic Salary
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
                          onChange={(e) => setBasicSalary(e.target.value)}
                        />
                      </div>

                      {/* Payment Date */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Payment Date
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 5th monthly"
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
                          onChange={(e) => setPaymentDate(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Bonuses & Deductions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Bonuses
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
                          onChange={(e) => setBonuses(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Deductions
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
                          onChange={(e) => setDeductions(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Notes
                      </label>
                      <textarea
                        placeholder="Additional notes..."
                        className="w-full h-16 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none transition-all"
                        onChange={(e) => setNotes(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 px-4 sm:px-5 pb-4 sm:pb-5">
                    <button
                      className="flex-1 py-2 bg-gray-100 cursor-pointer text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-all"
                      onClick={() => setShowEmployeesField(false)}>
                      Cancel
                    </button>
                    <button
                      className="flex-1 py-2 bg-green-600 cursor-pointer text-white text-sm font-medium rounded-lg hover:bg-green-700 active:bg-green-800 transition-all shadow-sm"
                      onClick={addEmployee}>
                      Save
                    </button>
                  </div>

                </div>
              </div>
            </>
          )}

          {showEmployees === false && employees.length > 0 && (
            <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
              <div className="max-w-6xl mx-auto">
                
                {/* Header - Compact */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div>
                      <h1 className="text-lg sm:text-xl font-bold text-gray-900">Employees</h1>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">Manage employees and track salaries</p>
                    </div>
                    <div className="text-sm text-gray-600 sm:text-right">
                      Total: <span className="font-semibold text-green-600">{employees.length}</span>
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
                            Employee
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Position
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Phone
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Basic
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Bonus
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Deduct
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Net
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Payment
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      {/* Compact Table Body */}
                      <tbody className="divide-y divide-gray-100">
                        {employees.map((employee, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                            
                            {/* Employee Info - Compact */}
                            <td className="px-4 py-3">
                              <div className="flex items-center min-w-0">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-2 flex-shrink-0">
                                  <span className="text-white text-xs font-bold">
                                    {employee.employeeName.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium text-gray-900 truncate">
                                    {employee.employeeName}
                                  </div>
                                  {employee.notes && (
                                    <div className="text-xs text-gray-500 truncate mt-0.5">
                                      {employee.notes}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Position - Compact */}
                            <td className="px-3 py-3">
                              <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-50 text-green-700 border border-green-200">
                                {employee.position}
                              </span>
                            </td>

                            {/* Phone - Compact */}
                            <td className="px-3 py-3">
                              <div className="text-xs text-gray-700">
                                {employee.phoneNumber}
                              </div>
                            </td>

                            {/* Basic Salary - Compact */}
                            <td className="px-3 py-3">
                              <div className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-200">
                                ${employee.basicSalary || '0'}
                              </div>
                            </td>

                            {/* Bonuses - Compact */}
                            <td className="px-3 py-3">
                              <div className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200">
                                +${employee.bonuses || '0'}
                              </div>
                            </td>

                            {/* Deductions - Compact */}
                            <td className="px-3 py-3">
                              <div className="text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded border border-red-200">
                                -${employee.deductions || '0'}
                              </div>
                            </td>

                            {/* Net Salary - Compact */}
                            <td className="px-3 py-3">
                              <div className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-1 rounded border border-purple-200">
                                ${calculateNetSalary(employee)}
                              </div>
                            </td>

                            {/* Payment Date - Compact */}
                            <td className="px-3 py-3">
                              <div className="text-xs text-orange-700 bg-orange-50 px-2 py-1 rounded border border-orange-200">
                                {employee.paymentDate}
                              </div>
                            </td>

                            {/* Actions - Professional Icons */}
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-1">
                                {/* Edit Button - Professional */}
                                <button
                                  className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200 cursor-pointer group"
                                  onClick={() => editEmployee(employee)}
                                  title="Edit Employee"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>

                                {/* Delete Button - Professional */}
                                <button
                                  className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer group"
                                  onClick={() => deleteEmployee(employee.employeeId)}
                                  title="Delete Employee"
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
                          <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
                          <th className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Position</th>
                          <th className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Basic</th>
                          <th className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Net</th>
                          <th className="px-2 py-2 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {employees.map((employee, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-3 py-2">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-2">
                                  <span className="text-white text-xs font-bold">
                                    {employee.employeeName.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{employee.employeeName}</div>
                                  <div className="text-xs text-gray-500">{employee.phoneNumber}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-2">
                              <span className="inline-flex px-2 py-1 text-xs rounded bg-green-50 text-green-700 border border-green-200">
                                {employee.position}
                              </span>
                            </td>
                            <td className="px-2 py-2">
                              <div className="text-xs font-medium text-blue-700">${employee.basicSalary || '0'}</div>
                            </td>
                            <td className="px-2 py-2">
                              <div className="text-xs font-semibold text-purple-700">${calculateNetSalary(employee)}</div>
                            </td>
                            <td className="px-2 py-2">
                              <div className="flex gap-1">
                                <button
                                  className="p-1 text-green-600 hover:bg-green-50 rounded cursor-pointer"
                                  onClick={() => editEmployee(employee)}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                                  onClick={() => deleteEmployee(employee.employeeId)}
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
                    {employees.map((employee, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-bold">
                                {employee.employeeName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{employee.employeeName}</h3>
                              <p className="text-xs text-gray-600">{employee.position}</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button
                              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg cursor-pointer"
                              onClick={() => editEmployee(employee)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                              onClick={() => deleteEmployee(employee.employeeId)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600 text-xs">Phone:</span>
                            <div className="font-medium">{employee.phoneNumber}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 text-xs">Payment:</span>
                            <div className="font-medium text-orange-700">{employee.paymentDate}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 text-xs">Basic Salary:</span>
                            <div className="font-medium text-blue-700">${employee.basicSalary || '0'}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 text-xs">Net Salary:</span>
                            <div className="font-semibold text-purple-700">${calculateNetSalary(employee)}</div>
                          </div>
                        </div>

                        {(employee.bonuses !== '0' || employee.deductions !== '0') && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex gap-4 text-xs">
                              {employee.bonuses !== '0' && (
                                <div className="text-green-700">
                                  <span className="text-gray-600">Bonus: </span>
                                  +${employee.bonuses}
                                </div>
                              )}
                              {employee.deductions !== '0' && (
                                <div className="text-red-700">
                                  <span className="text-gray-600">Deduct: </span>
                                  -${employee.deductions}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {employee.notes && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <span className="text-gray-600 text-xs">Notes:</span>
                            <div className="text-xs text-gray-700 mt-1">{employee.notes}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary Footer */}
                <div className="mt-4 text-center text-sm text-gray-600 md:hidden">
                  Total Employees: <span className="font-semibold text-green-600">{employees.length}</span>
                </div>
              </div>
            </div>
          )}

          {editBool && selectedEmployee && (
            <>
              {/* Overlay */}
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>

              {/* Popup */}
              <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4">
                <div className="bg-white w-full max-w-sm sm:max-w-md rounded-xl shadow-lg border border-gray-200 mx-auto max-h-[90vh] overflow-hidden">

                  {/* Header */}
                  <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                      Edit Employee
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
                        placeholder="Employee name"
                        value={selectedEmployee.employeeName}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all"
                        onChange={(e) => setSelectedEmployee({...selectedEmployee, employeeName: e.target.value})}
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
                        value={selectedEmployee.phoneNumber}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all"
                        onChange={(e) => setSelectedEmployee({...selectedEmployee, phoneNumber: e.target.value})}
                      />
                    </div>

                    {/* Position Input */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Position
                      </label>
                      <input
                        type="text"
                        placeholder="Employee position"
                        value={selectedEmployee.position}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all"
                        onChange={(e) => setSelectedEmployee({...selectedEmployee, position: e.target.value})}
                      />
                    </div>

                    {/* Salary Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {/* Basic Salary */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Basic Salary
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          value={selectedEmployee.basicSalary}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
                          onChange={(e) => setSelectedEmployee({...selectedEmployee, basicSalary: e.target.value})}
                        />
                      </div>

                      {/* Payment Date */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Payment Date
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 5th monthly"
                          value={selectedEmployee.paymentDate}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
                          onChange={(e) => setSelectedEmployee({...selectedEmployee, paymentDate: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Bonuses & Deductions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Bonuses
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          value={selectedEmployee.bonuses}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
                          onChange={(e) => setSelectedEmployee({...selectedEmployee, bonuses: e.target.value})}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">
                          Deductions
                        </label>
                        <input
                          type="text"
                          placeholder="0.00"
                          value={selectedEmployee.deductions}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
                          onChange={(e) => setSelectedEmployee({...selectedEmployee, deductions: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">
                        Notes
                      </label>
                      <textarea
                        placeholder="Additional notes..."
                        value={selectedEmployee.notes}
                        className="w-full h-16 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 resize-none transition-all"
                        onChange={(e) => setSelectedEmployee({...selectedEmployee, notes: e.target.value})}
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
                      className="flex-1 py-2 bg-green-600 cursor-pointer text-white text-sm font-medium rounded-lg hover:bg-green-700 active:bg-green-800 transition-all shadow-sm"
                      onClick={updateEmployee}>
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

export default Employees;