import React, { useState, useEffect } from 'react';
import { FiRefreshCw, FiCheckCircle, FiAlertCircle, FiClock, FiChevronRight } from 'react-icons/fi';

const formatDate = (dateString) => {
	const date = new Date(dateString);
	const now = new Date();
	const diffInHours = (now - date) / (1000 * 60 * 60);

	if (diffInHours < 24) {
		// If less than 24 hours ago, show relative time
		if (diffInHours < 1) {
			return `${Math.round(diffInHours * 60)} min ago`;
		}
		return `${Math.round(diffInHours)} hours ago`;
	} else if (date.getFullYear() === now.getFullYear()) {
		// If this year, show month and day
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	} else {
		// If not this year, show month, day, and year
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}
};

const DeployScreen = ({
	// Customizable props
	maxWidth = '600px',
	fontFamily = "'Inter', sans-serif",
	primaryColor = '#0070f3',
	secondaryColor = '#666',
	successColor = '#0070f3',
	errorColor = '#ff4d4f',
	infoColor = '#1890ff',
	backgroundColor = '#ffffff',
	cardBackgroundColor = '#f7f7f7',
	borderColor = '#e0e0e0',
	borderRadius = '12px',
	boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)',
	fontSize = {
		small: '0.875rem',
		medium: '1rem',
		large: '1.25rem',
		xlarge: '1.5rem'
	},
	padding = {
		small: '0.5rem',
		medium: '1rem',
		large: '1.5rem'
	},
	iconSize = 20,
	getFunctionUrl = '/.netlify/functions/get-past-deploys',
	postFunctionUrl = '/.netlify/functions/trigger-build'
}) => {
	const [deployStatus, setDeployStatus] = useState('idle');
	const [errorMessage, setErrorMessage] = useState('');
	const [lastDeployTime, setLastDeployTime] = useState(null);
	const [deployHistory, setDeployHistory] = useState([]);

	useEffect(() => {
		fetchDeployHistory();
	}, []);

	const fetchDeployHistory = async () => {
		try {
			const response = await fetch(getFunctionUrl);
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
			const response = await fetch(postFunctionUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const data = await response.json();
			if (response.ok) {
				console.log(data.message);
				setDeployStatus('success');
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

	const styles = {
		container: {
			fontFamily,
			maxWidth,
			margin: 'auto',
			width: '100%',
			backgroundColor,
			borderRadius,
			boxShadow,
			overflow: 'hidden'
		},
		header: {
			padding: padding.large,
			borderBottom: `1px solid ${borderColor}`
		},
		title: {
			fontSize: fontSize.xlarge,
			fontWeight: '600',
			margin: '0',
			color: '#333'
		},
		description: {
			fontSize: fontSize.small,
			color: secondaryColor,
			margin: `${padding.small} 0 0`
		},
		content: {
			padding: padding.large
		},
		button: {
			backgroundColor: primaryColor,
			color: '#ffffff',
			border: 'none',
			borderRadius: '8px',
			padding: `${padding.medium} ${padding.large}`,
			fontSize: fontSize.medium,
			fontWeight: '500',
			cursor: 'pointer',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			transition: 'background-color 0.2s ease',
			'&:hover': {
				backgroundColor: '#0051a8'
			}
		},
		alert: {
			padding: padding.medium,
			borderRadius: '8px',
			marginBottom: padding.medium,
			display: 'flex',
			alignItems: 'center',
			fontSize: fontSize.small
		},
		alertSuccess: {
			backgroundColor: 'rgba(0, 112, 243, 0.1)',
			color: successColor
		},
		alertError: {
			backgroundColor: 'rgba(255, 77, 79, 0.1)',
			color: errorColor
		},
		alertInfo: {
			backgroundColor: 'rgba(24, 144, 255, 0.1)',
			color: infoColor
		},
		icon: {
			marginRight: padding.small
		},
		lastDeployTime: {
			fontSize: fontSize.small,
			color: secondaryColor,
			marginTop: padding.medium,
			display: 'flex',
			alignItems: 'center'
		},
		deployHistoryTitle: {
			fontSize: fontSize.large,
			fontWeight: '600',
			marginBottom: padding.medium,
			marginTop: padding.medium,
			color: '#333'
		},
		deployHistoryItem: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			padding: padding.medium,
			borderRadius: '8px',
			backgroundColor: cardBackgroundColor,
			marginBottom: padding.small
		},
		deployHistoryStatus: {
			display: 'flex',
			alignItems: 'center',
			fontSize: fontSize.small,
			fontWeight: '500',
			flex: 1
		},
		deployHistoryStatusSuccess: {
			color: successColor
		},
		deployHistoryStatusError: {
			color: errorColor
		},
		deployHistoryDate: {
			fontSize: fontSize.small,
			color: secondaryColor,
			textAlign: 'right',
			minWidth: '80px'
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
						<FiRefreshCw size={iconSize} style={styles.icon} /> Trigger Deploy
					</button>
				)}
				{deployStatus === 'triggering' && (
					<div style={{ ...styles.alert, ...styles.alertInfo }}>
						<FiRefreshCw size={iconSize} style={styles.icon} />
						<span>Deploying... This may take a few minutes.</span>
					</div>
				)}
				{deployStatus === 'success' && (
					<div style={{ ...styles.alert, ...styles.alertSuccess }}>
						<FiCheckCircle size={iconSize} style={styles.icon} />
						<span>Deploy triggered successfully!</span>
					</div>
				)}
				{deployStatus === 'error' && (
					<div style={{ ...styles.alert, ...styles.alertError }}>
						<FiAlertCircle size={iconSize} style={styles.icon} />
						<span>{errorMessage}</span>
					</div>
				)}
				{lastDeployTime && (
					<div style={styles.lastDeployTime}>
						<FiClock size={iconSize} style={styles.icon} />
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
									{deploy.state === 'ready' ? (
										<FiCheckCircle size={iconSize} style={styles.icon} />
									) : (
										<FiAlertCircle size={iconSize} style={styles.icon} />
									)}
									{deploy.state === 'ready' ? 'Published' : deploy.state}
								</span>
								<span style={styles.deployHistoryDate}>{formatDate(deploy.created_at)}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DeployScreen;
