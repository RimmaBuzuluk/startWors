import { Person } from '../../types/Person';

type Props = {
	user: Person;
};

export const UserInformation = ({ user }: Props) => {
	return (
		<>
			<p>
				<strong>Gender:</strong> {user?.gender}
			</p>
			<p>
				<strong>Birth Year:</strong> {user?.birth_year}
			</p>
			<p>
				<strong>Height:</strong> {user?.height}
			</p>
			<p>
				<strong>Mass:</strong> {user?.mass}
			</p>
		</>
	);
};
