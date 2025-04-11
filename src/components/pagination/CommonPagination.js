import React from "react";
import { Pagination } from "react-bootstrap";

const CommonPagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPaginationItems = () => {
        const pages = [];
        const maxVisiblePages = 3; // Number of pages visible at a time in the middle

        if (totalPages <= 5) {
            // Show all pages if total pages are 5 or less
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1); // First Page

            if (currentPage > 3) {
                pages.push("..."); // Ellipsis before currentPage
            }

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("..."); // Ellipsis after currentPage
            }

            pages.push(totalPages); // Last Page
        }

        return pages;
    };

    return (
        <Pagination className="justify-content-center">
            <Pagination.Prev 
                disabled={currentPage === 1} 
                onClick={() => onPageChange(currentPage - 1)} 
            />

            {getPaginationItems().map((item, index) => (
                <Pagination.Item
                    key={index}
                    active={item === currentPage}
                    onClick={() => typeof item === "number" && onPageChange(item)}
                    disabled={item === "..."}
                >
                    {item}
                </Pagination.Item>
            ))}

            <Pagination.Next 
                disabled={currentPage === totalPages} 
                onClick={() => onPageChange(currentPage + 1)} 
            />
        </Pagination>
    );
};

export default CommonPagination;
