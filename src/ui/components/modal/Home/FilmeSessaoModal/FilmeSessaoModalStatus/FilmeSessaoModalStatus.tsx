import { SessaoFilmeSessao } from '../../../../../../types/sessaoFilmeSessaoType';

export function HomeModalBodySessao(props: SessaoFilmeSessao) {
	const inicio = new Date(props.inicio);
	return (
		<div key={props.sessaoId}>
			<strong>Sala {props.salaId}: </strong>
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
