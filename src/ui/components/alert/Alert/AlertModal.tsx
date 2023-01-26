import { Alert } from 'reactstrap';

import styles from './Alert.module.css';

export function AlertError({ ...props }) {
	function toogle() {
		props.setError(false);
	}

	return (
		<Alert
			color="danger"
			isOpen={props.error}
			toggle={toogle}
			className={styles['alert-container']}
		>
			{props.errorMessage}
		</Alert>
	);
}
