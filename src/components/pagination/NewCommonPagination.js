import React from "react";
import { useState } from "react";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

const NewCommonPagination = ({
    currentPage,
    setCurrentPage,
    limitPerPage,
    totalRecords,
}) => {
    const totalPages = Math.ceil(totalRecords / limitPerPage);

    // Number of pages to display at once
    const pageRange = 5;

    // Define the pages to be shown (previous, current, and next pages)
    let startPage = Math.max(currentPage - Math.floor(pageRange / 2), 1);
    let endPage = Math.min(startPage + pageRange - 1, totalPages);

    if (endPage - startPage < pageRange - 1) {
        startPage = Math.max(endPage - pageRange + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }



    console.log("pagination recotrd count",totalRecords)

    return (
        <div className="p-4 d-flex align-items-center justify-content-between ">
            {/* Previous Button */}
            <button
                disabled={currentPage <= 1}
                className="py-1 px-3 rounded-1 d-flex align-items-center gap-1 fw-semibold border-0"
                // style={{color: "#344054"}}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
                <GrFormPreviousLink/> Prev
            </button>

            {/* Page Numbers */}
            <div className="d-flex align-items-center gap-2">
                {startPage > 1 && (
                    <>
                        <button
                            className= "bg-white rounded-1 border-0"
                            onClick={() => setCurrentPage(1)}
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="px-2">...</span>}
                    </>
                )}

                {pages.map((page) => (
                    <button
                        key={page}
                        className={`px-2 rounded-1 border-0 ${page === currentPage
                                ? "text-dark px-3 fw-semibold"
                                : "bg-white"
                            } cursor-pointer`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="px-2">...</span>}
                        <button
                            className="px-2 rounded-1 border-0 bg-white"
                            onClick={() => setCurrentPage(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}
            </div>

            {/* Next Button */}
            <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage >= totalPages}
                className="py-1 px-3 rounded-1 fw-semibold border-0 d-flex align-items-center gap-1"
            >
                Next <GrFormNextLink/>
            </button>
        </div>
    );
};

export default NewCommonPagination;
