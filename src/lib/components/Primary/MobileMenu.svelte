<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { AlignJustify } from 'lucide-svelte';

	// Your existing menu items
	const menuItems = [
		{ name: 'Home', href: '/', color: 'bg-orange' },
		{ name: 'Work', href: '/work', color: 'bg-purple' },
		{ name: 'Blog', href: '/blog', color: 'bg-sage' },
		{ name: 'Contact', href: '/', color: 'bg-blue', highlight: true }
	];

	const {
		elements: { trigger, menu, item },
		states: { open }
	} = createDropdownMenu();
</script>

<button
	type="button"
	class="trigger bg-base-300/20 rounded-lg md:hidden py-2 px-4 self-end mx-4 my-2"
	use:melt={$trigger}
>
	<AlignJustify class="h-8" />
</button>

<nav
	class="menu block md:hidden px-6 w-[16rem] py-8 shadow-xl border-[1px] border-base-300 -ml-6 bg-base-200 z-50"
	use:melt={$menu}
>
	<ul class=" flex flex-col gap-2">
		{#each menuItems as menuItem}
			<a href={menuItem.href}>
				<li class="btn w-full text-sm {menuItem.color} ">
					{menuItem.name}
				</li>
			</a>
		{/each}
	</ul>
</nav>

<nav class="hidden md:flex justify-center items-center w-full my-3 px-6">
	<ul class="flex justify-around items-center max-w-lg w-full">
		{#each menuItems as menuItem}
			<a href={menuItem.href}>
				<li class="btn text-xl {menuItem.color} ">
					{menuItem.name}
				</li>
			</a>
		{/each}
	</ul>
</nav>

<style>
	.btn {
		@apply w-full flex justify-center items-center gap-2  font-bold  font-roboto tracking-normal uppercase px-4 py-1 rounded-md text-white border-2 border-neutral;
	}
</style>
