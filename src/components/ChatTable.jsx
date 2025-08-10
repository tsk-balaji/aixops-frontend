import React, { useState } from 'react';

export default function ChatTable({ data }) {
    if (!data || data.length === 0) {
        return null;
    }

    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const headers = data[0];
    const initialRows = data.slice(1);

    const sortedRows = React.useMemo(() => {
        let sortableRows = [...initialRows];
        if (sortConfig.key !== null) {
            sortableRows.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableRows;
    }, [initialRows, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getClassNamesFor = (name) => {
        if (!sortConfig.key) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const handleDownloadCsv = () => {
        const csvContent = "data:text/csv;charset=utf-8," +
            [headers, ...sortedRows]
                .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
                .join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "table_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="aixops-chat-table mt-5">
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                onClick={() => requestSort(index)}
                                className={getClassNamesFor(index)}
                                style={{ cursor: 'pointer' }}
                            >
                                {header}
                                {sortConfig.key === index && (
                                    <i className={`fas fa-sort ml-2 ${sortConfig.direction === 'ascending' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-end mb-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={handleDownloadCsv}>
                    <i className="fas fa-download mr-1"></i> Download CSV
                </button>
            </div>
        </div>
    );
}