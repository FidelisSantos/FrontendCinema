import { FormEvent, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { TagType } from '../../../../../types/tagType';
import { classificacaoList } from '../../../../pages/Filmes/classificacaoList/classificacaoList';
import styles from './CreateForm.module.css';
import { ListGenero } from './ListGenero/ListGenero';

export function CreateForm({ ...props }) {
	const [hourMinute, setHourMinute] = useState('');
	const [tempoFilme, setTempoFilme] = useState(0);
	const [titulo, setTitulo] = useState('');
	const [descricao, setDescricao] = useState('');
	const [fileImg, setFileImg] = useState<File>();
	const [linkImg, setLinkImg] = useState('');
	const [genero, setGenero] = useState<number[]>([]);
	const [classificacao, setClassificacao] = useState('');

	function maskHours(e: FormEvent<HTMLInputElement>) {
		e.currentTarget.maxLength = 5;
		let value = e.currentTarget.value;
		const verifyValue = value.split(':');
		verifyValue[1] = +verifyValue[1] >= 60 ? '59' : verifyValue[1];
		value = verifyValue.toString();
		value = value.replace(/\D/g, '');
		value = value.replace(/^(\d{2})(\d)/, '$1:$2');
		setHourMinute(value);
		calcMinutes(value);
	}

	function getClassificacao(e: FormEvent<HTMLInputElement>) {
		setClassificacao(e.currentTarget.value);
	}

	function calcMinutes(hour: string) {
		const hourMinutes = hour.split(':');
		const minutes = +hourMinutes[0] * 60 + +hourMinutes[1];
		setTempoFilme(minutes);
	}

	async function createFilme(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (fileImg || !linkImg) {
			createUrl(e);
		} else {
			props.createFilme(
				titulo,
				tempoFilme,
				genero,
				descricao,
				linkImg,
				classificacao
			);
		}
	}

	async function createUrl(e: FormEvent<HTMLFormElement>) {
		const formData = new FormData(e.currentTarget);
		const file = formData.get('imageFile') as File;
		props.createUrl(file, titulo, tempoFilme, genero, descricao, classificacao);
	}

	return (
		<Form
			className={styles['form-container']}
			method="POSt"
			onSubmit={createFilme}
		>
			<FormGroup>
				<Label>Titulo</Label>
				<Input
					type="text"
					placeholder="Informe o titulo"
					onChange={(e) => setTitulo(e.target.value)}
					value={titulo}
					required
				/>
			</FormGroup>
			<FormGroup>
				<Label>Tempo de Filme</Label>
				<Input
					type="time"
					placeholder="Informe o tempo do filme(ex 01:50)"
					id="tempoFilme"
					onChange={maskHours}
					value={hourMinute}
					required
				/>
			</FormGroup>
			<FormGroup className={styles['form-tags']}>
				<Label>Selecione as Tags </Label>
				<div className={styles['form-tags-options']}>
					{props.tags.map((tag: TagType) => (
						<ListGenero
							tag={tag}
							key={tag.id}
							genero={genero}
							setGenero={setGenero}
						/>
					))}
				</div>
			</FormGroup>
			<FormGroup>
				<Label>Descrição</Label>
				<br />
				<Input
					type="textarea"
					placeholder="Informe a descrição"
					onChange={(e) => setDescricao(e.target.value)}
					value={descricao}
					required
				/>
			</FormGroup>
			<FormGroup>
				<div className={styles['modal-select-sala']}>
					<Label>Classificação</Label>
					<Input type="select" onChange={getClassificacao} defaultValue={0}>
						<option value="0"></option>
						{classificacaoList.map((classificacao) => (
							<option key={classificacao} value={classificacao}>
								{classificacao}
							</option>
						))}
					</Input>
				</div>
			</FormGroup>
			<FormGroup>
				<Label>Imagem do filme</Label>
				<Input
					type="file"
					disabled={linkImg ? true : false}
					onChange={(e: any) => {
						setFileImg(e.target.value);
					}}
					required={linkImg ? false : true}
					name="imageFile"
				/>
				<Input
					type="url"
					disabled={fileImg ? true : false}
					onChange={(e: any) => setLinkImg(e.target.value)}
					value={linkImg}
					placeholder="Link da Imagem"
					required={fileImg ? false : true}
				/>
				<FormText color="muted">
					Favor colocar arquivo da imagem ou link da imagem
				</FormText>
			</FormGroup>
			<Button className={styles['modal-button']} type="submit">
				Cadastrar
			</Button>
		</Form>
	);
}
