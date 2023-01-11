import { SessaoType } from "../../../../../../types/sessaoType";



export function HomeModalBodySessao(props:SessaoType) {
  const dateInit = new Date(props.inicio);
  console.log(dateInit);
  return(
    <div key={props.sessaoId}>
      <strong>Sala {props.salaId}: </strong> 
      {dateInit.toLocaleDateString()} {dateInit.getHours()}:{dateInit.getMinutes()}
    </div>
  );
}