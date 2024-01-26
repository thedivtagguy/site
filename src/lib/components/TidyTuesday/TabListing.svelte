<script>
	import { marked } from 'marked';

	export let listing = {};
</script>

<div class="-mt-12 transition-all group hover:cursor-pointer hover:-translate-y-2 tilt">
	<div class="relative my-10">
		<button
			style="--bg-tab: {listing?.thumbnailColors?.dark
				? listing.thumbnailColors.dark
				: '#2B2B2B'};{listing.tabStyle};"
			class="tab max-w-fit"
		>
			<h3 class="text-sm font-bold font-fira">{listing.title}</h3>
		</button>
		<div tabindex="-1" class="border-[1px] h-20 tab-container px-8 py-4 bg-white border-neutral/50">
			<p class="transition-all text-neutral/70 group-hover:text-neutral line-clamp-2 text-md">
				{@html marked(listing.description)}
			</p>
		</div>
	</div>
</div>

<style>
	.tilt {
		transform: perspective(250px) rotateX(-6deg);
		transform-style: preserve-3d;
		-webkit-transform: perspective(250px) rotateX(-6deg);
		-webkit-transform-style: preserve-3d;
	}

	.tab-container {
		position: relative;
	}

	.tab-container::after {
		content: '';
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to top, #ffffff 0%, #ffffff 20%, transparent 90%, transparent 100%);
		z-index: 2;
	}
	.tab {
		border-radius: 8px 8px 0 0;
		cursor: pointer;
		padding: 10px 24px 8px;
		position: absolute;
		top: -46%;
		z-index: 3;
	}
	.tab,
	.tab:after,
	.tab:before {
		background-color: var(--bg-tab);
		color: #fff;
		display: block;
		transition: all 250ms;
	}

	.tab:after,
	.tab:before {
		content: ' ';
		height: 100%;
		margin: 0;
		padding: 0;
		position: absolute;
		top: 0;
		width: 40px;
	}

	.tab:after {
		border-radius: 8px 0 0 0;
		left: -24px;
		transform: skew(-30deg);
	}

	.tab:before {
		border-radius: 0 8px 0 0;
		right: -24px;
		transform: skew(30deg);
	}
</style>
