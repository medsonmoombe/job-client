import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg"
            >
                <ChevronLeft size={16} />
            </Button>

            {startPage > 1 && (
                <>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(1)}
                        className="rounded-lg"
                    >
                        1
                    </Button>
                    {startPage > 2 && <span className="text-slate-400">...</span>}
                </>
            )}

            {pages.map(page => (
                <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    className={`rounded-lg ${currentPage === page ? 'btn-gradient text-white' : ''}`}
                >
                    {page}
                </Button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="text-slate-400">...</span>}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(totalPages)}
                        className="rounded-lg"
                    >
                        {totalPages}
                    </Button>
                </>
            )}

            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg"
            >
                <ChevronRight size={16} />
            </Button>
        </div>
    );
};

export default Pagination;
