import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import 'reactflow/dist/style.css';
import ReactFlow, { Background, Controls, Edge, Node } from 'reactflow';
import { Film } from '../../types/Film';
import { Starship } from '../../types/Starship';

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FFC300', '#C70039', '#900C3F'];

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
				await buildGraph(data);
			} catch (err) {
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [userId]);

	const buildGraph = async (user: Person) => {
		const userNode: Node = {
			id: user.id.toString(),
			data: { label: user.name },
			position: { x: 0, y: 0 },
			style: { width: 100, height: 100, backgroundColor: '#ddd' },
		};

		const responseFilme = await fetch('https://sw-api.starnavi.io/films');
		const films = await responseFilme.json();

		const userFilms = films.results.filter((film: Film) => film.characters.includes(user.id));

		const radiusFilms = 200;
		const filmNodes = userFilms.map((film: any, index: any) => {
			const angle = (index / userFilms.length) * 2 * Math.PI;
			const x = radiusFilms * Math.cos(angle) * 2;
			const y = radiusFilms * Math.sin(angle) * 2;

			const filmColor = colors[index % colors.length];

			return {
				id: `film-${index}`,
				data: { label: film.title },
				position: { x, y },
				style: { width: 80, height: 80, backgroundColor: filmColor },
			};
		});

		const filmEdges = userFilms.map((_: any, index: any) => {
			const filmColor = colors[index % colors.length];

			return {
				id: `edge-${index}`,
				source: user.id.toString(),
				target: `film-${index}`,
				style: { stroke: filmColor },
			};
		});

		const responseShips = await fetch('https://sw-api.starnavi.io/starships');
		const ships = await responseShips.json();

		const shipNodes: Node[] = [];
		const shipEdges: Edge[] = [];

		const radiusShips = 100;

		userFilms.forEach((film: any, filmIndex: any) => {
			const filmStarships = ships.results.filter((ship: Starship) => film.starships.includes(ship.id));
			const filmPosition = filmNodes[filmIndex].position;

			const filmColor = colors[filmIndex % colors.length];

			filmStarships.forEach((ship: any, shipIndex: any) => {
				// Протилежний кут відносно центра користувача
				const angle = Math.PI + ((shipIndex * 2) / filmStarships.length) * Math.PI;
				const x = filmPosition.x + radiusShips * Math.cos(angle);
				const y = filmPosition.y + radiusShips * Math.sin(angle);

				shipNodes.push({
					id: `ship-${filmIndex}-${shipIndex}`,
					data: { label: ship.name },
					position: { x, y },
					style: {
						width: 80,
						height: 80,
						backgroundColor: filmColor,
						borderRadius: '50%',
					},
				});

				shipEdges.push({
					id: `ship-edge-${filmIndex}-${shipIndex}`,
					source: `film-${filmIndex}`,
					target: `ship-${filmIndex}-${shipIndex}`,
					style: { stroke: filmColor },
				});
			});
		});

		setNodes([userNode, ...filmNodes, ...shipNodes]);
		setEdges([...filmEdges, ...shipEdges]);
	};

	const handleNodeClick = (event: any, node: Node) => {
		// alert(`You clicked on ${node.data.label}`);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className='text-white container '>
			<div>
				<h1 className='text-3xl font-bold mb-4'>{user?.name}</h1>
				<button className='w-16 h-6 bg-yellow-300 font-bold mb-4' onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? 'Close' : 'Open'}
				</button>
				{isOpen && (
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
				)}
			</div>
			<div style={{ height: '70vh', border: '2px solid yellow' }}>
				<ReactFlow nodes={nodes} onNodeClick={handleNodeClick} edges={edges} fitView>
					<Background />
					<Controls />
				</ReactFlow>
			</div>
		</div>
	);
};
