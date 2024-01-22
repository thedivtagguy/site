<script lang="ts">
	import { Navbar, NavHamburger, NavUl, NavLi, MegaMenu, NavBrand } from 'flowbite-svelte';
	import { MoreHorizontal } from 'lucide-svelte';
	import Logo from '$lib/assets/svg/Logo.svelte';
	let menu = [
		// { name: '🗃️⠀ Store', href: '/store' },

		// { name: 'Links', href: '/' },
		// { name: 'RSS', href: '/' },
		{ name: '🆎⠀ About me', href: '/about' },
		{ name: '👇🏽⠀ Now', href: '/now' }
	];

	export let showBorders = true;
</script>

<div class="max-w-[83rem] justify-center flex items-center bg-none main-menu">
	<Navbar
		class="gap-4 {showBorders ? ' border-b-[1px] border-base-300' : ''}  py-0 z-[100] my-0 bg-none"
		let:hidden
		let:toggle
		let:NavContainer
	>
		<NavContainer
			class="flex justify-between max-w-sm mx-auto mt-2 md:justify-center md:w-auto bg-none"
		>
			<NavBrand class="block md:hidden" href="/">
				<Logo class="p-1" />
			</NavBrand>
			<NavHamburger on:click={toggle} />
			<NavUl
				divClass="w-full md:block md:w-auto z-[100]"
				{hidden}
				nonActiveClass="text-gray-700 z-[100] border-2 border-neutral md:border-2 md:mb-0  bg-orange  px-10 h-10 flex justify-center items-center uppercase text-white font-roboto font-bold text-lg"
			>
				<NavLi class="w-full md:w-24" href="/">Home</NavLi>
				<NavLi class="w-full bg-purple md:w-24" href="/work">Work</NavLi>
				<NavLi class="w-full bg-sage md:w-24" href="/blog">Blog</NavLi>
				<NavLi class="w-full bg-blue md:w-24" href="/">Contact</NavLi>
				<NavLi class="w-full cursor-pointer md:w-10">
					<MoreHorizontal class="inline w-6 h-6 text-primary-800" /></NavLi
				>
				<MegaMenu
					items={menu}
					let:item
					ulClass="flex min-w-32 justify-start items-start flex-col gap-4 z-[100] "
				>
					<a
						href={item.href}
						class="hover:text-primary-600 hover:underline dark:hover:text-primary-500"
						>{item.name}</a
					>
				</MegaMenu>
			</NavUl>
		</NavContainer>
	</Navbar>
</div>

<style>
	:global(.main-menu > nav) {
		background-color: transparent;
	}
</style>
