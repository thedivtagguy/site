<script>
	import { Popover } from 'svelte-ux';
	import { isOnline } from '$lib/stores';
	import { timeFormat } from 'd3';

	const online = isOnline();

	const convertToIST = (time) => {
		let date = new Date(time);
		const offset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
		const ISTOffset = 5.5 * 3600000; // 5 hours and 30 minutes in milliseconds
		let ISTTime = new Date(date.getTime() + ISTOffset - offset);
		return ISTTime;
	};

	const formatTime = (time) => {
		const format = timeFormat('It is %-I %p at my end.');
		return format(convertToIST(time));
	};

	let open = false;
	let isAmanOnline = $online?.status === 'Online';
	// let isAmanOnline = false;
	let text = {
		offline: "I'm AFK and not at my desk right now. Probably doing better things for once",
		online: "I'm working on something on my laptop right now. Yeah like at this moment."
	};
	let textToShow = $online?.status === 'Online' ? text.online : text.offline;
</script>

<div class="inline-block w-full md:max-w-[11.5rem]">
	<Popover offset={5} bind:open>
		<div
			class="p-2 text-xs font-medium rounded-sm shadow-sm text-neutral max-w-36 bg-base-100/80 font-archivo backdrop-blur-lg"
		>
			{textToShow}
			<p>{formatTime($online?.last_ping)}</p>
		</div>
	</Popover>
	<button
		tabindex="-1"
		on:click={() => (open = !open)}
		class="w-full px-8 py-1 min-w-40 online-box"
		style="margin-top: 10px"
	>
		<span class="text-sm font-bold font-roboto">I am</span>
		<h4
			class:offline={!isAmanOnline}
			class="inline-block text-sm font-bold status font-fira h4-status"
		>
			<span class="relative inline-flex w-[0.5rem] h-[0.5rem] mr-1">
				<span
					class="absolute inline-flex w-full h-full rounded-full opacity-75 {isAmanOnline
						? 'bg-green animate-ping'
						: 'bg-red'}"
				></span>
				<span
					class="relative inline-flex w-[0.5rem] h-[0.5rem] rounded-full {isAmanOnline
						? 'bg-green'
						: 'bg-red'}"
				></span>
			</span>{isAmanOnline ? 'ONLINE' : 'OFFLINE'}
		</h4>
	</button>
</div>

<style>
	.online-box {
		background-color: rgba(0, 0, 0, 0.66);
		border: 1px solid #383838;
		border-image: none 100% 1 0 stretch;
		border-radius: 4px;
		color: #fff;

		text-align: center;
	}

	.offline {
		color: #b56666 !important;
		display: inline;
		text-shadow: none !important;
	}

	.status {
		color: #92de86;
		text-shadow:
			0 0 1px #6bd606,
			0 0 1px #6bd606,
			0 0 5px #6bd606,
			0 0 40px #6bd606,
			0 0 600px #577713,
			0 0 50px #6bd606,
			0 0 98px #577713;
	}
</style>
