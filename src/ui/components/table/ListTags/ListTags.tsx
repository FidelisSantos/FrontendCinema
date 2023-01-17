import { useState } from 'react';
import { VscEdit, VscTrash } from 'react-icons/vsc';
import { Button } from 'reactstrap';

import { Confirmation } from '../../modal/Confirmation/Confirmation';
import { UpdateTag } from '../../modal/Tags/UpdateTag/UpdateTag';
import styles from './ListTags.module.css';

export function ListTags({ ...props }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
	const [message, setMessage] = useState('');

	function updateTag(newTag: string) {
		props.updateTag(newTag, props.tag.id);
		setIsOpen(false);
	}

	function confirmDelete() {
		setMessage(`Quer mesmo deletar a Tag ${props.tag.tag}?`);
		setIsOpenConfirmation(true);
	}

	function deleteTag() {
		props.deleteTag(props.tag.id);
	}

	return (
		<>
			<th scope="row"></th>
			<td>{props.tag.tag}</td>
			<td>
				<Button
					color="none"
					className={styles['btn-remove']}
					onClick={confirmDelete}
				>
					<VscTrash color="red" className={styles['icon']} />
					<Confirmation
						message={message}
						isOpenConfirmation={isOpenConfirmation}
						setIsOpenConfirmation={setIsOpenConfirmation}
						action={deleteTag}
					/>
				</Button>
				<Button
					color="none"
					className={styles['btn-edit']}
					onClick={() => setIsOpen(true)}
				>
					<VscEdit color="black" className={styles['icon']} />
				</Button>
				<UpdateTag
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					updateTag={updateTag}
					tag={props.tag.tag}
				/>
			</td>
		</>
	);
}
