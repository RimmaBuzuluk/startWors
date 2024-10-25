import { useNavigate } from 'react-router-dom';
import logo from '../../img/Star_Wars_Logo.svg.png';

export const Header = () => {
	const navigate = useNavigate();
	const handleNavigateManePage = () => {
		navigate('/');
	};
	return (
		<div className='p-4 mb-8 border-b-2 border-yellow-300 '>
			<button onClick={() => handleNavigateManePage()}>
				<img src={logo} className='w-20' />
			</button>
		</div>
	);
};
