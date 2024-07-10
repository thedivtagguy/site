import React, { useState, useEffect } from 'react';

const styles = {
	container: {
		fontFamily: 'Arial, sans-serif',
		maxWidth: '900px',
		margin: 'auto',
		width: '100%',
		backgroundColor: '#ffffff',
		borderRadius: '8px',
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
		overflow: 'hidden'
	},
	header: {
		backgroundColor: '#f8f9fa',
		padding: '1.5rem',
		borderBottom: '1px solid #e0e0e0'
	},
	title: {
		fontSize: '1.5rem',
		fontWeight: 'bold',
		margin: '0'
	},
	description: {
		fontSize: '0.875rem',
		color: '#6c757d',
		margin: '0.5rem 0 0'
	},
	content: {
		padding: '1.5rem'
	},
	button: {
		backgroundColor: '#007bff',
		color: '#ffffff',
		border: 'none',
		borderRadius: '4px',
		padding: '0.5rem 1rem',
		fontSize: '1rem',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%'
	},
	alert: {
		padding: '1rem',
		borderRadius: '4px',
		marginBottom: '1rem',
		display: 'flex',
		alignItems: 'center'
	},
	alertSuccess: {
		backgroundColor: '#d4edda',
		color: '#155724'
	},
	alertError: {
		backgroundColor: '#f8d7da',
		color: '#721c24'
	},
	alertInfo: {
		backgroundColor: '#e1f5fe',
		color: '#0c5460'
	},
	icon: {
		marginRight: '0.5rem',
		width: '20px',
		height: '20px'
	},
	lastDeployTime: {
		fontSize: '0.875rem',
		color: '#6c757d',
		marginTop: '1rem',
		display: 'flex',
		alignItems: 'center'
	},
	deployHistory: {
		marginTop: '2rem'
	},
	deployHistoryTitle: {
		fontSize: '1.25rem',
		fontWeight: 'bold',
		marginBottom: '1rem'
	},
	deployHistoryList: {
		listStyle: 'none',
		padding: 0,
		margin: 0
	},
	deployHistoryItem: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0.5rem 0',
		borderBottom: '1px solid #e0e0e0'
	},
	deployHistoryStatus: {
		display: 'flex',
		alignItems: 'center'
	},
	deployHistoryStatusSuccess: {
		color: '#28a745'
	},
	deployHistoryStatusError: {
		color: '#dc3545'
	},
	footer: {
		padding: '1rem 1.5rem',
		borderTop: '1px solid #e0e0e0',
		textAlign: 'center'
	},
	link: {
		color: '#007bff',
		textDecoration: 'none'
	},
	heatmapContainer: {
		marginTop: '2rem',
		width: '100%',
		overflowX: 'auto'
	}
};

const Icon = ({ name, style }) => {
	const icons = {
		refresh: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
			</svg>
		),
		checkCircle: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
				<polyline points="22 4 12 14.01 9 11.01" />
			</svg>
		),
		alertCircle: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<line x1="12" y1="8" x2="12" y2="12" />
				<line x1="12" y1="16" x2="12.01" y2="16" />
			</svg>
		),
		clock: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<polyline points="12 6 12 12 16 14" />
			</svg>
		)
	};

	return <span style={style}>{icons[name]}</span>;
};

const DeployScreen = () => {
	const [deployStatus, setDeployStatus] = useState('idle');
	const [errorMessage, setErrorMessage] = useState('');
	const [lastDeployTime, setLastDeployTime] = useState(null);
	const [deployHistory, setDeployHistory] = useState([]);

	useEffect(() => {
		fetchDeployHistory();
	}, []);

	const fetchDeployHistory = async () => {
		try {
			const response = await fetch('https://aman.bh/.netlify/functions/get-past-deploys');
			if (!response.ok) {
				throw new Error('Failed to fetch deploy history');
			}
			const data = await response.json();

			setDeployHistory(data);
			if (data.length > 0) {
				setLastDeployTime(data[0].created_at);
			}
		} catch (error) {
			console.error('Error fetching deploy history:', error);
			setErrorMessage('Failed to fetch deploy history');
		}
	};

	const triggerDeploy = async () => {
		setDeployStatus('triggering');
		setErrorMessage('');
		try {
			const response = await fetch('/.netlify/functions/trigger-build', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			if (response.ok) {
				console.log(data.message);
				setDeployStatus('success');
				// Refresh deploy history after successful trigger
				fetchDeployHistory();
			} else {
				throw new Error(data.error || 'Failed to trigger deploy');
			}
		} catch (error) {
			console.error('Error:', error);
			setDeployStatus('error');
			setErrorMessage(error.message);
		}
	};

	return (
		<div style={styles.container}>
			<div style={styles.header}>
				<h2 style={styles.title}>Deploy Website</h2>
				<p style={styles.description}>Trigger a new deploy to update content</p>
			</div>
			<div style={styles.content}>
				{deployStatus === 'idle' && (
					<button onClick={triggerDeploy} style={styles.button}>
						<Icon name="refresh" style={styles.icon} /> Trigger Deploy
					</button>
				)}
				{deployStatus === 'triggering' && (
					<div style={{ ...styles.alert, ...styles.alertInfo }}>
						<Icon name="refresh" style={styles.icon} />
						<span>Deploying... This may take a few minutes.</span>
					</div>
				)}
				{deployStatus === 'success' && (
					<div style={{ ...styles.alert, ...styles.alertSuccess }}>
						<Icon name="checkCircle" style={styles.icon} />
						<span>Deploy triggered successfully!</span>
					</div>
				)}
				{deployStatus === 'error' && (
					<div style={{ ...styles.alert, ...styles.alertError }}>
						<Icon name="alertCircle" style={styles.icon} />
						<span>{errorMessage}</span>
					</div>
				)}
				{lastDeployTime && (
					<div style={styles.lastDeployTime}>
						<Icon name="clock" style={styles.icon} />
						<span>Last deploy: {new Date(lastDeployTime).toLocaleString()}</span>
					</div>
				)}
				<div style={styles.deployHistory}>
					<h3 style={styles.deployHistoryTitle}>Recent Deploys</h3>
					<ul style={styles.deployHistoryList}>
						{deployHistory.slice(0, 5).map((deploy) => (
							<li key={deploy.id} style={styles.deployHistoryItem}>
								<span
									style={{
										...styles.deployHistoryStatus,
										...(deploy.state === 'ready'
											? styles.deployHistoryStatusSuccess
											: styles.deployHistoryStatusError)
									}}
								>
									<Icon
										name={deploy.state === 'ready' ? 'checkCircle' : 'alertCircle'}
										style={styles.icon}
									/>
									{deploy.state === 'ready' ? 'Published' : deploy.state}
								</span>
								<span>{new Date(deploy.created_at).toLocaleString()}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DeployScreen;
