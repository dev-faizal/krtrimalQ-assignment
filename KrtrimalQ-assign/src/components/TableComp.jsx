import React, { useState, useMemo } from 'react';

const TableComp = ({users, title}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
  
    const filteredData = useMemo(() => {
      return users?.data?.filter(user => 
        Object.values(user).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, [users?.data, searchTerm]);
  
    const paginatedData = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return filteredData?.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage]);
  
    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

    return(
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-indigo-100 mb-5">
            <div className="bg-gradient-to-r from-blue-400 to-cyan-300 p-6">
                <h2 className="text-2xl font-bold text-white tracking-wide">{title}</h2>
            </div>

            <div className="p-6">
                <div className="mb-6 flex justify-between items-center">
                    <div className="relative flex-grow mr-4">
                        <input 
                            type="text" 
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-1/4 pl-10 pr-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-300"
                        />
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 text-indigo-400 absolute left-3 top-1/2 transform -translate-y-1/2" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg overflow-hidden">
                        <thead className="bg-indigo-50">
                            <tr>
                                {users?.columns?.map((header) => (
                                    <th 
                                        key={header?.headerName} 
                                        className="px-4 py-3 text-left text-xs font-semibold   tracking-wider border-b-2 border-indigo-200"
                                        style={{ width: `${header.width}px` }}
                                    >
                                        {header?.headerName}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-indigo-100">
                            {paginatedData?.map((user, rowIndex) => (
                                <tr 
                                    key={rowIndex} 
                                    className="hover:bg-cyan-50 transition duration-200"
                                >
                                    {users?.columns?.map((column) => (
                                        <td 
                                            key={column?.field} 
                                            className="px-4 py-3 text-sm text-gray-700"
                                            style={{ width: `${column.width}px` }}
                                        >
                                            {user[column?.field]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between mt-6 bg-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 disabled:bg-indigo-300 transition duration-300"
                        >
                            Previous
                        </button>
                        <span className='text-indigo-600 font-medium'>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 disabled:bg-indigo-300 transition duration-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableComp;