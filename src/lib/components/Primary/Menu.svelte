<script lang="ts">
	import { Navbar, NavHamburger, NavUl, NavLi, MegaMenu, NavBrand } from 'flowbite-svelte';
	import { MoreHorizontal } from 'lucide-svelte';

	let menu = [
		{ name: 'Now', href: '/now' },
		// { name: 'Links', href: '/' },
		// { name: 'RSS', href: '/' },
		{ name: 'About me', href: '/about' }
	];
</script>

<div class="bg-none main-menu">
	<Navbar let:NavContainer let:hidden let:toggle class="gap-4 py-0 my-0 bg-none">
		<NavContainer class="flex justify-end mx-auto w-80 md:w-auto bg-none">
			<NavHamburger on:click={toggle} />
			<NavUl
				divClass="z-[100] w-full md:block "
				nonActiveClass="text-gray-700 border-2 border-neutral md:border-2 md:my-0 my-2 bg-red w-full md:w-24 px-10 h-10 flex justify-center items-center uppercase text-white font-roboto font-bold text-lg"
				{hidden}
			>
				<NavLi class="border-2 bg-orange " href="/">Home</NavLi>

				<NavLi class="bg-purple " href="/work">Work</NavLi>
				<NavLi class="bg-sage" href="/blog">Blog</NavLi>
				<NavLi class="bg-blue" href="/">Contact</NavLi>
				<NavLi class="self-end w-full cursor-pointer md:w-12 ">
					<MoreHorizontal class="inline w-6 h-6 text-primary-800" />
				</NavLi>
				<MegaMenu
					items={menu}
					let:item
					ulClass="grid -mt-2  grid-flow-row gap-y-4 md:gap-x-4 auto-col-max auto-row-max z-[100] "
				>
					<a href={item.href} class="font-bold hover:underline">{item.name}</a>
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
