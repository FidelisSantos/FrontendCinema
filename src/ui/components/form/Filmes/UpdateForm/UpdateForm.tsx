import { FormEvent, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { TagType } from '../../../../../types/tagType';
import { classificacaoList } from '../../../../pages/Filmes/classificacaoList/classificacaoList';
import { ListGenero } from './ListGenero/ListGenero';
import styles from './UpdateForm.module.css';

export function UpdateForm({ ...props }) {
	const [hourMinute, setHourMinute] = useState('');
	const [tempoFilme, setTempoFilme] = useState(props.filme.tempoDeFilme);
	const [titulo, setTitulo] = useState(props.filme.titulo);
	const [descricao, setDescricao] = useState(props.filme.descricao);
	const [fileImg, setFileImg] = useState<File>();
	const [linkImg, setLinkImg] = useState(props.filme.linkImagem);
	const [genero, setGenero] = useState<number[]>([]);
	const [tempoFilmeAtual, setTempoFilmeAtual] = useState('');
	const [classificacao, setClassificacao] = useState(props.filme.classificacao);

	useEffect(() => {
		const formatteHour = () => {
			const hour = Math.floor(tempoFilme / 60);
			const min = tempoFilme % 60;
			const hourMinutes = `${hour.toString()}:${min.toString()}`;

			return hourMinutes;
		};

		const fomatterHourAtual = () => {
			const hour = formatteHour();
			setHourMinute(hour);
			const hourArray = hour.split(':');
			hourArray[0] = +hourArray[0] < 10 ? '0' + hourArray[0] : hourArray[0];
			hourArray[1] = +hourArray[1] < 10 ? '0' + hourArray[1] : hourArray[1];
			setTempoFilmeAtual(`${hourArray[0]}:${hourArray[1]}`);
		};
		fomatterHourAtual();
		const formatteGenero = () => {
			const tagsId: number[] = [];
			for (let index = 0; index < props.filme.tags.length; index++) {
				tagsId.push(props.filme.tags[index].id);
			}
			return tagsId;
		};
		setGenero(formatteGenero);
	}, []);

	function getClassificacao(e: FormEvent<HTMLInputElement>) {
		setClassificacao(e.currentTarget.value);
	}
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

	function calcMinutes(hour: string) {
		const hourMinutes = hour.split(':');
		const minutes = +hourMinutes[0] * 60 + +hourMinutes[1];
		setTempoFilme(minutes);
	}

	function updateFilme(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (fileImg) {
			updateUrl(e);
		} else {
			props.updateFilme(
				titulo,
				tempoFilme,
				genero,
				descricao,
				linkImg,
				classificacao
			);
		}
	}

	function updateUrl(e: FormEvent<HTMLFormElement>) {
		const formData = new FormData(e.currentTarget);
		const file = formData.get('imageFile') as File;
		props.updateUrl(titulo, tempoFilme, genero, descricao, file, classificacao);
	}

	return (
		<Form className={styles['form-container']} onSubmit={updateFilme}>
			<FormGroup>
				<Label>Titulo</Label>
				<Input
					type="text"
					placeholder="Informe o titulo"
					onChange={(e: any) => setTitulo(e.target.value)}
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
					defaultValue={hourMinute}
					value={hourMinute}
					required
				/>
			</FormGroup>
			<FormText color="muted">Tempo atual de filme {tempoFilmeAtual}</FormText>
			<FormGroup className={styles['form-tags']}>
				<Label>Selecione Gênero </Label>
				<div className={styles['form-tags-options']}>
					{props.tags.map((tag: TagType, index: number) => (
						<ListGenero
							key={index}
							genero={genero}
							setGenero={setGenero}
							tag={tag}
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
					onChange={(e: any) => setDescricao(e.target.value)}
					value={descricao}
					required
				/>
			</FormGroup>
			<FormGroup>
				<div className={styles['modal-select-sala']}>
					<Label>Classificação</Label>
					<Input
						type="select"
						onChange={getClassificacao}
						defaultValue={props.filme.classificacao}
					>
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
					onChange={(e) => setLinkImg(e.target.value)}
					value={linkImg}
					placeholder="Link da Imagem"
					required={fileImg ? false : true}
				/>
				<FormText color="muted">
					Favor colocar arquivo da imagem ou link da imagem
				</FormText>
			</FormGroup>
			<Button className={styles['modal-button']} type="submit">
				Atualizar
			</Button>
		</Form>
	);
}
