import React from "react";

const CommonTable = ({
    title,
    headers,      // Array of header labels
    bodyData,     // Array of row data
    renderRow,    // Function to render each row
    minimumWidth,
    showstatus
}) => {

    return (
        <div className="border rounded-2">
            <div className="px-4 py-2 fs-5 fw-semibold border-bottom">
                <div className="row">
                    <div className="col-6" style={{fontSize:'1.2rem'}}> {title}</div>
                    {
                        showstatus == 1 &&
                
                    <div className="col-6 d-flex justify-content-end" style={{fontSize:'1.1rem'}}>Total Amount :{bodyData.reduce((sum, deposit) => sum + parseFloat(deposit.amount), 0).toFixed(2)} </div>
                }
                </div>

            </div>
            <div style={{ overflowX: "auto" }}>
                <table
                    className="bordered w-100"
                    style={{
                        tableLayout: "fixed",
                        minWidth: minimumWidth,
                    }}>
                    <thead>
                        <tr className="border-bottom" style={{ backgroundColor: "#eef1f5", color: "#5c5f61" }}>
                            {headers?.map((header) => (
                                <th key={header.accessor} className={header.class} style={{ width: header.width }} >
                                    {header.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bodyData?.map((item, index) => renderRow(item, index))}
                    </tbody>
                </table>
            </div>

          
        </div>
    );
};

export default CommonTable;