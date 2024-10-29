import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { fetchUsers } from '../../redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/slices/hooks';
import { Pagination } from '../../component/Pagination/Pagination';
import { UserButton } from '../../component/UserButton/UserButton';

export const UsersPage = () => {
	const dispatch = useAppDispatch();
	const { users, nextPageUrl, previousPageUrl, totalUsers } = useAppSelector(usersState => usersState.users);
	const [page, setPage] = useState(1);

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

	return (
		<div className=''>
			<div className='flex flex-col'>
				{users.map((user: Person) => (
					<UserButton key={user.id} user={user} />
				))}
			</div>

			<Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} hasNextPage={!!nextPageUrl} hasPreviousPage={!!previousPageUrl} />
		</div>
	);
};
