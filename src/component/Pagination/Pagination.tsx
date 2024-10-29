import React from 'react';
import { generatePagination } from '../../utils/function/generatePagination';

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	onNextPage: () => void;
	onPreviousPage: () => void;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, onNextPage, onPreviousPage, hasNextPage, hasPreviousPage }) => {
	return (
		<div className='flex justify-center mt-16 font-bold'>
			{hasPreviousPage && (
				<button onClick={onPreviousPage} className='w-10 h-10 rounded-3xl border-4 border-yellow-300 text-white hover:bg-gray-400 hover:bg-yellow-300'>
					{'<'}
				</button>
			)}

			<div className='flex'>
				{generatePagination(currentPage, totalPages).map((p, index) =>
					typeof p === 'number' ? (
						<button key={index} onClick={() => onPageChange(p)} className={`border-4 px-2 w-10 mx-1 bg-white border-yellow-300 hover:bg-yellow-300 ${currentPage === p ? 'bg-yellow-300 border-white' : ''}`}>
							{p}
						</button>
					) : (
						<span key={index} className='px-2 text-white'>
							...
						</span>
					)
				)}
			</div>

			{hasNextPage && (
				<button onClick={onNextPage} className='w-10 h-10 rounded-3xl border-4 text-white border-yellow-300 hover:bg-gray-400 hover:bg-yellow-300'>
					{'>'}
				</button>
			)}
		</div>
	);
};
