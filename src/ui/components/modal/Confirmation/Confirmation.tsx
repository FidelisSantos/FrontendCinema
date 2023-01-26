import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

export function Confirmation({ ...props }) {
	function confirmation() {
		props.setIsOpenConfirmation(false);
		props.action();
	}

	return (
		<div>
			<Modal isOpen={props.isOpenConfirmation}>
				<ModalBody>{props.message}</ModalBody>
				<ModalFooter>
					<Button color="danger" onClick={confirmation}>
						{' '}
						Confirmar{' '}
					</Button>{' '}
					<Button
						color="secondary"
						onClick={() => props.setIsOpenConfirmation(false)}
					>
						{' '}
						Cancelar{' '}
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}
