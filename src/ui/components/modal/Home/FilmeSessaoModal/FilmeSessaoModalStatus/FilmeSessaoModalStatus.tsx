import { SessionsMovieType } from '../../../../../../types/sessionsMovieType';

export function HomeModalBodySessao(props: SessionsMovieType) {
	const inicio = new Date(props.init);
	return (
		<div key={props.sessionId}>
			<strong>{props.roomName}: </strong>
			{`${inicio.toLocaleDateString()} - ${
				inicio.getHours() < 10 ? '0' + inicio.getHours() : inicio.getHours()
			}: ${
				inicio.getMinutes() < 10
					? '0' + inicio.getMinutes()
					: inicio.getMinutes()
			}`}
		</div>
	);
}
