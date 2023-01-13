import { SessaoFilmeSessao } from "../../../../../../types/sessaoFilmeSessaoType";
import { SessaoType } from "../../../../../../types/sessaoType";



export function HomeModalBodySessao(props:SessaoFilmeSessao) {
  const dateInit = new Date(props.inicio);
  console.log(props.salaId);
  return(
    <div key={props.sessaoId}>
      <strong>Sala {props.salaId}: </strong> 
      {dateInit.toLocaleDateString()} {dateInit.getHours()}:{dateInit.getMinutes()}
    </div>
  );
}