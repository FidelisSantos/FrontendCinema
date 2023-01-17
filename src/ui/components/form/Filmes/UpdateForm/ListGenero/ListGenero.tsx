import { useState } from 'react';
import { Input, Label } from 'reactstrap';

import styles from './ListGenero.module.css';

export function ListGenero({ ...props }) {
	const [isCheck, setIsCheck] = useState(false);

	async function setGenero(tagId: number) {
		const index = props.genero.indexOf(tagId);
		if (index >= 0) {
			props.genero.splice(index, 1);
		} else {
			props.genero.push(tagId);
		}

		props.setGenero(props.genero);
	}

	return (
		<div className={styles['listgenero-container']}>
			<Input
				type="checkbox"
				value={props.tag.id}
				onChange={() => {
					setGenero(props.tag.id);
					setIsCheck(!isCheck);
				}}
				checked={props.genero.indexOf(props.tag.id) >= 0}
			/>{' '}
			<Label className={styles['listgenero-label']}>{props.tag.tag}</Label>
		</div>
	);
}
