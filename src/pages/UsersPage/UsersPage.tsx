import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { fetchUsers } from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/slices/hooks';
import { useNavigate } from 'react-router-dom';
// import UserItem from '../../component/UserItem/UserItem';

export const UsersPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { users, nextPageUrl, previousPageUrl, totalUsers, status, error } = useAppSelector(usersState => usersState.users);
	const [page, setPage] = useState(1);

	console.log('previousPageUrl', previousPageUrl);
	console.log('nextPageUrl', nextPageUrl);

	const userPerPage = 10;
	const totalPages = Math.ceil(totalUsers / userPerPage);

	useEffect(() => {
		dispatch(fetchUsers({ page }));
	}, [page, dispatch]);

	const handleNextPage = () => {
		if (nextPageUrl) {
			setPage(prev => prev + 1);
		}
	};

	const handlePreviousPage = () => {
		if (previousPageUrl) {
			setPage(prev => prev - 1);
		}
	};

	const generatePagination = () => {
		const pages = [];
		const delta = 1;

		if (page > delta + 2) {
			pages.push(1, '...');
		} else {
			for (let i = 1; i <= Math.min(delta + 2, totalPages); i++) {
				pages.push(i);
			}
		}

		for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
			if (!pages.includes(i)) pages.push(i);
		}

		if (page < totalPages - delta - 1) {
			pages.push('...', totalPages);
		} else {
			for (let i = totalPages - delta - 1; i <= totalPages; i++) {
				if (i > 1 && !pages.includes(i)) pages.push(i);
			}
		}

		return pages;
	};

	const handleUserPage = (userId: number) => {
		navigate(`/user/${userId}`);
	};

	return (
		<div className=''>
			<div className='flex flex-col'>
				{users.map((user: Person) => (
					<button onClick={() => handleUserPage(user.id)} key={user.id} className='block text-black  bg-white text-colar mb-4 border-yellow-300   font-bold	 p-2 rounded-3xl box-border border-4 hover:bg-gray-400 '>
						{user.name}
					</button>
				))}
			</div>

			<div className='flex justify-center mt-16 font-bold'>
				{previousPageUrl && (
					<button onClick={handlePreviousPage} disabled={!previousPageUrl} className='w-10 h-10 rounded-3xl border-4 border-yellow-300 text-white hover:bg-gray-400 hover:bg-yellow-300'>
						{'<'}
					</button>
				)}

				<div className='flex'>
					{generatePagination().map((p, index) =>
						typeof p === 'number' ? (
							<button key={index} onClick={() => setPage(p)} className={`border-4 px-2 w-10 mx-1 bg-white border-yellow-300 hover:bg-yellow-300  ${page === p ? 'bg-yellow-300 border-white' : ''}`}>
								{p}
							</button>
						) : (
							<span key={index} className='px-2 text-white'>
								...
							</span>
						)
					)}
				</div>
				{nextPageUrl && (
					<button onClick={handleNextPage} disabled={!nextPageUrl} className='w-10 h-10 rounded-3xl border-4  text-white border-yellow-300 hover:bg-gray-400 hover:bg-yellow-300'>
						{'>'}
					</button>
				)}
			</div>
		</div>
	);
};
