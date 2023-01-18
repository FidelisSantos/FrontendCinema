import { useState } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	Alert
} from 'reactstrap';

import styles from './LoginModal.module.css';

export function LoginModal({ ...props }) {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	async function loginAdm() {
		await props.loginAdm(email, password);
	}

	function toggle() {
		props.toggle();
	}

	return (
		<Modal isOpen={props.isOpen}>
			{!props.errorLogin && (
				<ModalHeader className={styles['modal-header']}>LOGIN</ModalHeader>
			)}
			{props.errorLogin && (
				<Alert className={styles['error-login']} color="danger">
					Email ou Senha Incorretos
				</Alert>
			)}
			<ModalBody>
				<Form inline>
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
						<Label for="exampleEmail" className="mr-sm-2">
							Email:
						</Label>
						<Input
							type="email"
							name="email"
							placeholder="Digite o Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={styles['login-modal-input']}
							invalid={props.errorLogin}
						/>
					</FormGroup>
					<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
						<Label for="examplePassword" className="mr-sm-2">
							Senha:
						</Label>
						<Input
							type="password"
							name="password"
							placeholder="Digite a Senha"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							className={styles['login-modal-input']}
							invalid={props.errorLogin}
						/>
					</FormGroup>
					<Button className={styles['modal-header-button']} onClick={loginAdm}>
						Logar
					</Button>
					<Button
						className={styles['modal-header-button']}
						color="danger"
						onClick={toggle}
					>
						Sair
					</Button>
				</Form>
			</ModalBody>
		</Modal>
	);
}
