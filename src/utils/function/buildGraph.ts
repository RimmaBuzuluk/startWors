import { Node, Edge } from 'reactflow';
import { Person } from '../../types/Person';
import { Film } from '../../types/Film';
import { colors } from '../constant/colors';
import { Starship } from '../../types/Starship';
import { apiRoutes } from '../constant/apiRouter';
import { ErrorMessages } from '../constant/error';

export const buildGraph = async (user: Person, setNodes: (nodes: Node[]) => void, setEdges: (edges: Edge[]) => void) => {
	const userNode: Node = {
		id: user.id.toString(),
		data: { label: user.name },
		position: { x: 0, y: 0 },
		style: { width: 100, height: 100, backgroundColor: '#ddd' },
	};

	const responseFilme = await fetch(apiRoutes.Films);
	if (!responseFilme.ok) {
		throw new Error(ErrorMessages.FAILED_TO_FETCH_FILMS);
	}
	const films = await responseFilme.json();

	const userFilms = films.results.filter((film: Film) => film.characters.includes(user.id));

	const radiusFilms = 200;
	const filmNodes = userFilms.map((film: Film, index: number) => {
		const angle = (index / userFilms.length) * 2 * Math.PI;
		const x = radiusFilms * Math.cos(angle) * 2;
		const y = radiusFilms * Math.sin(angle) * 2;

		const filmColor = colors[index % colors.length];

		return {
			id: `film-${index}`,
			data: { label: film.title },
			position: { x, y },
			style: { width: 90, height: 90, backgroundColor: filmColor },
		};
	});

	const filmEdges = userFilms.map((_: any, index: number) => {
		const filmColor = colors[index % colors.length];

		return {
			id: `edge-${index}`,
			source: user.id.toString(),
			target: `film-${index}`,
			style: { stroke: filmColor },
		};
	});

	const responseShips = await fetch(apiRoutes.Starships);
	if (!responseShips.ok) {
		throw new Error(ErrorMessages.FAILED_TO_FETCH_STARSHIPS);
	}
	const ships = await responseShips.json();

	const shipNodes: Node[] = [];
	const shipEdges: Edge[] = [];

	const radiusShips = 100;

	userFilms.forEach((film: Film, filmIndex: number) => {
		const filmStarships = ships.results.filter((ship: Starship) => film.starships.includes(ship.id));
		const filmPosition = filmNodes[filmIndex].position;

		const filmColor = colors[filmIndex % colors.length];

		filmStarships.forEach((ship: Starship, shipIndex: number) => {
			const angle = Math.PI + ((shipIndex * 2) / filmStarships.length) * Math.PI;
			const x = filmPosition.x + radiusShips * Math.cos(angle) * 1.5;
			const y = filmPosition.y + radiusShips * Math.sin(angle) * 1.5;

			shipNodes.push({
				id: `ship-${filmIndex}-${shipIndex}`,
				data: { label: ship.name },
				position: { x, y },
				style: {
					width: 110,
					height: 110,
					fontSize: 12,
					backgroundColor: filmColor,
					borderRadius: '50%',
					padding: 20,
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
