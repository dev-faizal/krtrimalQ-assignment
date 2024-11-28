import React, { useState, useMemo } from 'react';


const TableComp = ({users,title}) =>{
    console.log(users)
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5
  
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
        <div className="bg-white rounded-xl shadow-md mb-3">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <div className="mb-4 flex justify-between">
      <input 
        type="text" 
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="border p-2 w-1/4 rounded"
      />
    </div>
          <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          {users?.columns?.map((header) => (
            <th 
              key={header?.headerName} 
              className="px-4 py-2 text-left border"
              style={{ width: `${header.width}px` }}
            >
              {header?.headerName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {paginatedData?.map((user, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50">
            {users?.columns?.map((column) => (
              <td 
                key={column?.field} 
                className="px-4 py-2 border"
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

          <div className="flex items-center mt-4">
      <button 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className='mx-2'>Page {currentPage} of {totalPages}</span>
      <button 
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
        </div>
      </div>
    )
}

export default TableComp