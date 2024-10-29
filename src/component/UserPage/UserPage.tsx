import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import 'reactflow/dist/style.css';
import ReactFlow, { Background, Controls, Edge, Node } from 'reactflow';
import { buildGraph } from '../../utils/function/buildGraph';
import { UserInformation } from '../UserInformation/UserInformation';
import { ErrorMessages } from '../../utils/constant/error';

export const UserPage = () => {
	const { userId } = useParams();
	const [user, setUser] = useState<Person | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch(`https://sw-api.starnavi.io/people/${userId}/`);
				if (!response.ok) throw new Error('Failed to fetch user');
				const data = await response.json();
				setUser(data);
				await buildGraph(data, setNodes, setEdges);
			} catch (err) {
				setError(ErrorMessages.FAILED_TO_FETCH_FILMS);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [userId]);

	if (loading) return <div className='text-white'>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className='text-white container '>
			<div>
				<h1 className='text-3xl font-bold mb-4'>{user?.name}</h1>
				<button className='w-16 h-6 bg-yellow-300 font-bold mb-4' onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? 'Close' : 'Open'}
				</button>
				{isOpen && user && <UserInformation user={user} />}
			</div>
			<div style={{ height: '70vh', border: '2px solid yellow' }}>
				<ReactFlow nodes={nodes} edges={edges} fitView>
					<Background />
					<Controls />
				</ReactFlow>
			</div>
		</div>
	);
};
