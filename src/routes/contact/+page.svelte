<script>
	import { ChevronRight, ExternalLink, Mail } from 'lucide-svelte';
	import toolsImage from '$lib/assets/images/contact/tools.png';
	import Button from '$lib/components/Primary/Button.svelte';
	import SEO from '$lib/components/Primary/SEO.svelte';
	const tools = [
		'Svelte',
		'HTML',
		'CSS',
		'Javascript',
		'D3.js',
		'QGIS',
		'R',
		'ggplot',
		'Python',
		'Photoshop',
		'Blender',
		'Illustrator',
		'Tidyverse',
		'NodeJS'
	];

	import { timeFormat } from 'd3';
	import { onMount } from 'svelte';

	const formatMonthYear = timeFormat('%B, %Y');
	const FREELANCE_API = '/api/common?file=now/now.mdx&keys=takingFreelanceFrom';
	let freelance = 'August 2024';
	onMount(async () => {
		const res = await fetch(FREELANCE_API);
		const data = await res.json();
		freelance = formatMonthYear(new Date(data.takingFreelanceFrom));
	});
</script>

<SEO
	title="Contact | Aman Bhargava"
	description="Reach out to me so I can make something for you!"
	url="https://aman.bh"
	image="https://aman.bh/sharecard.jpg"
	name="Aman Bhargava"
	jobTitle="Developer and designer"
	skills={['JavaScript', 'Svelte', 'D3.js', 'Data visualization', 'Design']}
	sameAs={[
		'https://www.linkedin.com/in/amnbh/',
		'https://github.com/thedivtagguy',
		'https://www.instagram.com/thedivtagguy',
		'https://bsky.app/profile/aman.bh'
	]}
	lang="en"
/>

<!-- <TableOfContents /> -->
<article class="relative flex flex-col justify-center w-full gap-4 py-8 md:flex-row">
	<div>
		<hgroup class="items-center justify-center w-full">
			<div class="relative flex flex-col justify-center w-full my-2 text-center">
				<article class="hidden text-left md:inline-block text-effect">
					<p class="line">If you like what you see here</p>
					<p class="line">and are curious about how I can help you in</p>
					<p class="line">data storytelling & visualization, design or web dev —</p>

					<br />
					<p class="line cta-line">It couldn't hurt to talk, could it?</p>
				</article>
				<article class="block text-left md:hidden text-effect">
					<p class="line">
						If you like what you see here and are curious about how I can help you in data
						storytelling & visualization, design or web dev —
					</p>
					<p class="mt-4 line cta-line">It couldn't hurt to talk, could it?</p>
				</article>
			</div>
		</hgroup>
		<hr class="mt-12 mb-6 divider" />
		<div class="flex flex-col md:divide-x-2 *:px-4 first:*:pl-0 last:*:pr-0 md:flex-row">
			<div class="mb-4 prose md:mb-0 md:prose-2xl">
				<p class="py-4 text-left t font-archivo">
					I take on a small number of projects every year so that whatever I do receives my best
					possible attention. You can hire me on a freelance basis for short-term and long-term
					projects. I will be available for work next in
					<span
						class="px-2 inline-block border-[1px] border-gray-20 py-1 md:text-[1rem] text-xs font-bold uppercase rounded-md text-green green-glow-100 font-fira bg-neutral"
					>
						<span class="animate-pulse green-glow-200">⬤ </span>{freelance}</span
					>. <br />In the meantime, I would still love to chat!
				</p>
				<p>
					You can find an assorted collection of what I've done in the past in my <a href="/work"
						>work gallery</a
					> and other places around this website. My practice is at the intersection of design and development,
					which enables me in crafting strong user-centric experiences, while blending aesthetic and
					practical design. I enjoy all kinds of projects, but I have a special interest in news graphics*
					and data visualization.
				</p>
				<sub class="text-xs leading-tight"
					>*so this is me hoping that someone who works at a newsroom reads this. Sometimes you
					gotta throw stuff out there and see what sticks man.
				</sub>
			</div>
			<div class="relative">
				<img src={toolsImage} width="120" class="mb-4 pointer-events-none" alt="tools" />
				<ul>
					{#each tools as tool}
						<li class="border-2 rounded-md md:text-xl border-base-300 bg-base-200 tool">
							{tool}
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<div
			class=" outline mb-1 mx-2 mt-9 outline-1 outline-base-300 outline-offset-8 flex flex-col md:flex-row bg-base-100 p-6 md:p-12 rounded-xl border-[1px] border-base-300"
		>
			<div class="mb-6 prose md:prose-xl md:basis-8/12">
				<h3 class="mb-4 text-3xl font-bold font-libre-caslon">
					You can't always get what you want 🎵
				</h3>
				<p class="max-w-3xl">
					But with me, you just might. If you're interested in talking to me about a project, the
					best way is to send me an email <a href="mailto:hi@aman.bh">hi@aman.bh</a>! I look forward
					to hearing from you. Here's my resume as well, if it helps.
				</p>
				<div class="flex flex-col gap-4 md:flex-row">
					<div class="cta">
						<a
							href="/Aman_Bhargava_CV.pdf"
							class="btn-primary decoration-transparent w-80 bg-neutral/80"
							target="_blank"
							rel="noopener noreferrer"
						>
							updated resume
							<ExternalLink size={22} />
						</a>
					</div>
					<div class="cta">
						<a
							href="mailto:hi@aman.bh"
							class="btn-primary decoration-transparent w-80 bg-blue"
							target="_blank"
						>
							Shoot me an email
							<Mail size={22} />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</article>

<style>
	.tool {
		/* border: 2px solid; */
		border-image: none 100% 1 0 stretch;
		display: inline-block;
		line-height: 140%;
		list-style: none;
		margin: 0 1rem 0.7rem 0;
		padding: 0.6rem 1rem;
	}

	.tool:selection {
		background-color: #fbd3eb;
		color: #0b0c17;
	}

	:root {
		--contact-multiplier: 3.45;
	}
	.line {
		@apply font-libre-caslon inline-block;
	}

	.cta-line {
		position: relative;
		z-index: 1;
	}
	.cta-line::before {
		content: '';
		display: block;
		width: 55%;
		height: 35px;
		position: absolute;
		transform: translate(-50%, -50%) rotate(1deg);
		top: 50%;
		left: 28%;
		z-index: -1;
		@apply bg-yellow;
	}

	.line {
		font-weight: 700;
		line-height: 1.2;
		text-align: left;
	}
	.text-effect .line {
		display: block;
	}

	.text-effect .line:nth-child(1) {
		font-size: calc(2em * var(--contact-multiplier));
	}
	.text-effect .line:nth-child(2) {
		font-size: calc(1.27em * var(--contact-multiplier));
	}
	.text-effect .line:nth-child(3) {
		font-size: calc(1em * var(--contact-multiplier));
	}
	.text-effect .line:nth-child(4) {
		font-size: calc(0.9em * var(--contact-multiplier));
	}
	.text-effect .line:nth-child(5) {
		font-size: calc(1em * var(--contact-multiplier));
	}
	.text-effect .line:nth-child(6) {
		width: 80%;
		font-size: calc(0.8em * var(--contact-multiplier));
	}

	@media (max-width: 768px) {
		:root {
			--contact-multiplier: 1;
		}
		.text-effect .line {
			font-size: 16px; /* Set a fixed font size for tablet and below */
		}
	}

	@media (max-width: 480px) {
		:root {
			--contact-multiplier: 1;
		}

		.cta-line::before {
			width: 80%;
			left: 40%;
		}

		.text-effect .line {
			font-size: 14px; /* Set a fixed font size for mobile */
		}
	}
</style>
