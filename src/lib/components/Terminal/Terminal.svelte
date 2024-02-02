<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { magicEightBall } from './magic8Ball';
	import { speakText } from './polly';
	import { routes } from '$lib/routes.js';
	import { afterUpdate } from 'svelte';
	import fuzzysort from 'fuzzysort';

	import { goto } from '$app/navigation';

	let currentCommand = '',
		errorMessage = '',
		suggestions = [],
		history = [],
		historyIndex = -1,
		ghostValue = '';
	let timer = writable(0);

	let terminalElement;

	//// Reset Logic /////////
	function resetTerminal() {
		// Reset terminal state
		currentCommand = '';
		errorMessage = '⛔ Exited';
		suggestions = [];
		history = [];
		historyIndex = -1;
		ghostValue = '';
		gameState = 'not_started';
		timer.set(0);
	}

	function clearHistory() {
		history = [];
		saveHistory(); // Save the cleared history to localStorage
		return {
			output: 'History cleared.'
		};
	}

	function resetCommandState() {
		currentCommand = '';
		suggestions = [];
	}

	///////////////////////
	const allCommands = [
		{
			name: 'cd',
			logic: navigate,
			output: null, // Output will be generated dynamically
			description: 'Navigate to a specified route.'
		},
		{
			name: 'sudo',
			logic: null,
			output: "Lmao what you trynna sudo my dude, you're not me.", // Output will be generated dynamically
			description: 'Enable superuser mode.'
		},
		{
			name: 'help',
			logic: showHelp,
			output: null, // Output will be generated dynamically
			description: 'Display available commands.'
		},

		{
			name: 'polly',
			logic: speakText,
			output: null, // Output will be generated dynamically
			description: 'Have Polly imitate you',
			suggestion: 'enter text for Polly'
		},
		{
			name: '8ball',
			logic: magicEightBall,
			output: null, // Output will be generated dynamically
			description: 'Ask the Magic 8-Ball a yes or no question.',
			suggestion: 'Enter your question'
		},

		{
			name: 'cls',
			logic: clearScreen,
			output: '',
			description: 'Clear the screen.'
		},
		{
			name: 'clean',
			logic: clearHistory,
			output: 'History cleared.',
			description: 'Clear the terminal history.'
		}
	];

	// Function to show help
	function showHelp() {
		const helpOutput = allCommands
			.filter((cmd) => !cmd.isOptional) // Filter out optional commands
			.map((cmd) => ({ name: cmd.name, description: cmd.description }));
		return {
			output: helpOutput,
			isHelp: true
		};
	}

	function clearScreen() {
		history = [];
		return {
			output: ''
		};
	}

	// Dynamically create commandMapping
	const commandMapping = allCommands.reduce((acc, cmd) => {
		acc[cmd.name] = cmd.logic;
		return acc;
	}, {});

	function navigate(arg) {
		if (routes.includes(arg)) {
			if (arg === 'home') {
				goto('/', { noScroll: true });
			} else {
				goto(arg, { noScroll: true });
			}
			return {
				output: `<span class="symbol">⇒</span> /${arg}`
			};
		} else {
			throw new Error(`Unknown route: ${arg}`);
		}
	}

	function executeCommand(command) {
		command = resolveAliases(command);

		const parts = command.split(' ');
		errorMessage = '';
		const baseCommand = parts[0];
		const arg = parts.slice(1).join('/').trim();
		let output = '';

		let isHelp = false;

		try {
			const commandExists = allCommands.some((cmd) => cmd.name === baseCommand);
			if (commandExists) {
				const logicFn = commandMapping[baseCommand];
				if (logicFn) {
					const result = logicFn(arg);
					output =
						result.output || allCommands.find((cmd) => cmd.name === baseCommand)?.output || '';
					isHelp = result.isHelp || false;
				} else {
					output = allCommands.find((cmd) => cmd.name === baseCommand)?.output || '';
				}
			} else {
				throw new Error(`Command not found: ${baseCommand}`);
			}
		} catch (error) {
			errorMessage = error.message;
		}

		updateHistory(command, output, errorMessage, isHelp);
		resetCommandState();
	}

	function updateHistory(command, output, errorMessage, isHelp = false) {
		if (errorMessage) {
			return; // Skip adding to history if there's an error message
		}
		const [baseCommand, ...args] = command.split(' ');
		if (baseCommand === 'cls' || baseCommand === 'delhist') {
			return; // Skip adding 'cls' and 'clear_history' to history
		}

		let formattedCommand = `<span class="base-command">${baseCommand}</span> ${args.join(' ')}`;

		// Conditionally replace the base command for 'polly' with an emoji
		if (baseCommand === 'polly') {
			formattedCommand = `<span class="base-command">🦜</span> ${args.join(' ')}`;
		}

		if (baseCommand === '8ball') {
			formattedCommand = `<span class="base-command">🎱</span> ${args.join(' ')}`;
		}
		history = [
			{
				command: formattedCommand,
				rawCommand: command,
				errorMessage,
				output,
				isHelp
			},
			...history
		];
		saveHistory();
		historyIndex = -1;
	}

	const resolveAliases = (command) => {
		const aliases = {
			c: 'cd',
			h: 'help',
			'8': '8ball'
		};
		const [baseCommand, ...rest] = command.split(' ');
		return (aliases[baseCommand] || baseCommand) + ' ' + rest.join(' ');
	};

	function handleKeyDown(e) {
		const keyHandlerMapping = {
			Enter: () => executeCommand(currentCommand),
			Tab: handleTab,
			ArrowDown: handleArrowDown,
			ArrowUp: handleArrowUp
		};

		// Handle Ctrl+C
		if (e.ctrlKey && e.key === 'c') {
			resetTerminal();
			e.preventDefault();
			return;
		}

		if (keyHandlerMapping[e.key]) {
			keyHandlerMapping[e.key]();
			e.preventDefault();
		}
	}

	function handleTab(e) {
		if (currentCommand === '') {
			return;
		}
		const tabFunctionalCommands = ['cd'];
		const parts = currentCommand.split(' ');
		const baseCommand = parts[0];
		if (!tabFunctionalCommands.includes(baseCommand)) {
			return;
		}
		const args = parts.slice(1);
		if (args.length === 0) {
			if (currentCommand.endsWith(' ')) {
				currentCommand += suggestions[0];
			} else {
				currentCommand += ' ' + suggestions[0];
			}
		} else {
			currentCommand += suggestions[0];
		}
	}

	function handleArrowDown(e) {
		if (historyIndex >= 0) {
			currentCommand = history[historyIndex].rawCommand;
			historyIndex--;
		}
		e.preventDefault();
	}

	function handleArrowUp(e) {
		if (historyIndex < history.length - 1) {
			historyIndex++;
			currentCommand = history[historyIndex].rawCommand;
		} else if (historyIndex === history.length - 1) {
			historyIndex = -1;
			currentCommand = '';
		}
		e.preventDefault();
	}

	const scrollToBottom = (node) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	onMount(async () => {
		scrollToBottom(terminalElement);
	});

	const saveHistory = () => localStorage.setItem('terminal-history', JSON.stringify(history));

	function getSuggestionForCommand(baseCommand) {
		const commandObj = allCommands.find((cmd) => cmd.name === baseCommand);
		return commandObj ? commandObj.suggestion : '';
	}

	$: {
		const parts = currentCommand.split(' ');
		const baseCommand = parts[0];
		const args = parts.slice(1);
		const incompleteArg = args.pop() || '';
		const namespace = args.join(' ');
		suggestions = [];

		if (baseCommand === 'cd') {
			const searchNamespace = namespace ? `${namespace}/` : '';
			const searchQuery = `${searchNamespace}${incompleteArg}`;
			suggestions = routes
				.filter((route) => route.startsWith(searchQuery))
				.map((route) => route.slice(searchQuery.length));
		}
		const isBaseCommandOnly = !currentCommand.includes(' ');

		if (suggestions.length > 0) {
			if (currentCommand.endsWith(' ')) {
				ghostValue = currentCommand + suggestions[0];
			} else if (isBaseCommandOnly) {
				ghostValue = currentCommand + ' ' + suggestions[0];
			} else {
				ghostValue = currentCommand + suggestions[0];
			}
		} else {
			const suggestion = getSuggestionForCommand(baseCommand);
			ghostValue = suggestion && isBaseCommandOnly ? `${currentCommand} ${suggestion}` : '';
		}
	}

	afterUpdate(() => {
		if (terminalElement) {
			scrollToBottom(terminalElement);
		}
	});
</script>

<div class="terminal" role="region" aria-labelledby="terminal-label">
	<h2 id="terminal-label" class="sr-only">Interactive Terminal</h2>
	<div role="log" aria-live="polite" class="history" bind:this={terminalElement}>
		{#if history.length === 0 && !errorMessage}
			<div class="ascii-art">
				<pre class="overflow-hidden">
  Hellooo thereeeee		
      \ _   _
      /(. .)\    )
        (*)____/|
              /       |
       /   |--\ |
      (_)(_)  (_) I'm a Terminal. (type help!)
                </pre>
			</div>
		{/if}
		{#each history.slice(0, 5).reverse() as command}
			{#if command.command !== 'cls'}
				<div class={command.isHelp ? 'command-line-block' : 'command-line'}>
					<span role="status">{@html command.command}</span>
					{#if command.isHelp}
						<div class="command-output-block">
							<table>
								<thead>
									<tr>
										<th class="command-name">Command</th>
										<th>Description</th>
									</tr>
								</thead>
								<tbody>
									{#each command.output as row}
										<tr>
											<td class="command-name">{row.name}</td>
											<td>{row.description}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					{:else}
						<span role="status" class="command-output">{@html command.output}</span>
					{/if}
				</div>
			{/if}
		{/each}

		{#if errorMessage}
			<div class="error" role="alert">{errorMessage}</div>
		{/if}
	</div>
	<div class="input-wrapper">
		<label for="command-input" class="prompt">marvin@aman.bh:~ % </label>
		<div class="input">
			<input id="ghost-input" type="text" readonly value={ghostValue} aria-hidden="true" />
			<input
				id="command-input"
				type="text"
				bind:value={currentCommand}
				on:keydown={handleKeyDown}
				placeholder="Command me, ig."
				aria-describedby="command-desc"
			/>
		</div>
		<div id="command-desc" class="sr-only">Type your command here and press Enter to execute.</div>
	</div>
</div>

<style>
	:root {
		--history-opacity: 0.9;
		--error-color: crimson;
		--terminal-font-family: 'Menlo', monospace;
		--terminal-bg-color: #1a1a1a;
		--terminal-text-color: #00ffcc;
		--terminal-padding: 16px;
		--terminal-border-radius: 8px;
		--terminal-max-width: 500px;
		--prompt-margin-right: 5px;
		--prompt-color: #ffcc00;
		--input-bg: none;
		--input-border: none;
		--input-color: #00ffcc;
		--input-outline: none;
		--placeholder-color: #474747;
		--ghost-input-color: #4c566a;
		--terminal-font-size: 14px;
		--max-height-terminal: 140px;
		--max-height-log: 130px;
		--command-output-color: #474747;
	}

	.history,
	.error,
	.terminal,
	.input,
	.command-line,
	.prompt,
	input,
	.input-wrapper,
	#ghost-input,
	#command-input,
	table,
	.sr-only {
		font-size: var(--terminal-font-size);
		font-weight: 500;
	}
	.command-output-block {
		display: block;
	}

	.word-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	.word,
	.emoji {
		flex: 1;
		text-align: center;
	}
	.ascii-art {
		font-size: 12px;
		pointer-events: none;
		color: var(--command-output-color);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.history {
		position: relative;
		height: var(--max-height-log);
		opacity: var(--history-opacity);
		/* flex: 1; */
		width: 100%;
		overflow-y: auto;
	}

	.history::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
	}

	.error {
		color: var(--error-color);
	}

	.terminal {
		font-family: var(--terminal-font-family);
		background-color: var(--terminal-bg-color);
		color: var(--terminal-text-color);
		padding: var(--terminal-padding);
		border-radius: var(--terminal-border-radius);
		border: 1px rgb(46, 46, 46) solid;
		max-width: var(--terminal-max-width);
		margin: auto;
		max-height: 200px;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: start;
		height: 100%;
	}

	.input,
	.command-line {
		display: flex;
		align-items: center;
	}

	.prompt {
		margin-right: var(--prompt-margin-right);
		color: var(--prompt-color);
	}

	input {
		font-family: var(--terminal-font-family);
		background: var(--input-bg);
		border: var(--input-border);
		color: var(--input-color);
		outline: var(--input-outline);
		flex: 1;
		width: 100%;
	}

	input::placeholder {
		color: var(--placeholder-color);
	}

	.input-wrapper {
		display: flex;
		align-items: center;
		position: relative;
	}

	.input {
		width: 310px;
		flex: 1;
		position: relative;
		display: flex;
		align-items: center;
	}

	:global(symbol) {
		font-size: 80px;
	}

	#ghost-input {
		flex: 1;
		position: absolute;
		top: 0;
		left: 0;
		color: var(--ghost-input-color);
		pointer-events: none;
		margin: 0;
		padding: 0;
	}

	#command-input {
		flex: 1;
		position: relative;
		background: transparent;
		color: var(--input-color);
		outline: none;
		border: none;
		z-index: 1;
		caret-shape: block;
		margin: 0;
		padding: 0;
	}
	.command-line span[role='status']:first-child {
		margin-right: 1em; /* Adjust the space as needed */
	}
	#command-input::before {
		content: '';
		position: absolute;
		top: 50%;

		left: 0;
		width: 8px; /* Width of the block caret */
		height: 100%;
		background-color: var(--input-color);
		transform: translateY(-50%);
		pointer-events: none;
		transition: all 0.1s ease;
		z-index: 1;
	}

	.command-output {
		color: var(--command-output-color);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}

	table th,
	table td {
		text-align: left;
	}
	table th:first-child,
	table td:first-child {
		padding-right: 2em; /* Set the gap between the two columns */
	}
	table th.command-name,
	table td.command-name {
		color: #32cd32; /* LimeGreen */
	}

	.history {
		scroll-behavior: smooth;
	}

	:global(.base-command) {
		color: #32cd32; /* LimeGreen */
	}

	/* Responsiveness for smaller screens */
	@media screen and (max-width: 768px) {
		:root {
			--terminal-max-width: 100%;
			--terminal-padding: 8px;
			--terminal-font-size: 14px;
			--max-height-terminal: 200px;
			--max-height-log: 180px;
		}

		.input-wrapper,
		.history {
			flex-direction: column;
			justify-content: start;
			align-items: flex-start;
			text-align: left;
		}

		.prompt {
			margin-bottom: 8px;
		}

		.input,
		.command-line {
			flex-direction: row;
			align-items: flex-start;
		}
	}

	/* Responsiveness for larger screens */
	@media screen and (min-width: 1269px) {
		:root {
			--terminal-max-width: 600px;
			--terminal-padding: 16px;
			--terminal-font-size: 14px;
			--max-height-terminal: 250px;
			--max-height-log: 250px;
		}
	}

	.game-info {
		width: 100%;
	}

	.word-layout {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		gap: 5px;
	}
</style>
