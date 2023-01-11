import { Input, Label } from "reactstrap";

export function ListGenero({...props}) {
  function test(e:any) {
    console.log(e.target.value);
  }
  return(
    <>
      <Input type="checkbox" value={props.genero} onChange={test}/>{' '}
      <Label for="exampleSelect">{props.genero}</Label>
      <br />
    </>
  )
}