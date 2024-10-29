import { useNavigate } from 'react-router-dom';
import { Person } from '../../types/Person';

type Props = {
	user: Person;
};

export const UserButton = ({ user }: Props) => {
	const navigate = useNavigate();
	const handleUserPage = (userId: number) => {
		navigate(`/user/${userId}`);
	};
	return (
		<button onClick={() => handleUserPage(user.id)} className='block text-black bg-white text-colar mb-4 border-yellow-300 font-bold p-2 rounded-3xl box-border border-4 hover:bg-gray-400'>
			{user.name}
		</button>
	);
};
