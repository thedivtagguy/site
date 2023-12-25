<script lang="ts">
	import { Navbar, NavHamburger, NavUl, NavLi, MegaMenu, NavBrand } from 'flowbite-svelte';
	import { MoreHorizontal } from 'lucide-svelte';

	let menu = [
		{ name: 'Now', href: '/now' },
		{ name: 'Links', href: '/links' },
		{ name: 'RSS', href: '/rss' }
	];
</script>

<div>
	<Navbar let:NavContainer let:hidden let:toggle class="py-0 my-0 gap-4 bg-none">
		<NavContainer class="mx-auto w-80 md:w-auto flex justify-end bg-none">
			<NavHamburger on:click={toggle} />
			<NavUl
				divClass="z-[100] w-full md:block "
				nonActiveClass="text-gray-700 border-2 border-neutral md:border-2 md:my-0 my-2 bg-red w-full md:w-24 px-10 h-10 flex justify-center items-center uppercase text-white font-roboto font-bold text-lg"
				{hidden}
			>
				<NavLi class="bg-orange border-2 " href="/">Home</NavLi>

				<NavLi class="bg-purple " href="/work">Work</NavLi>
				<NavLi class="bg-sage" href="/blog">Blog</NavLi>
				<NavLi class="bg-blue" href="/">Contact</NavLi>
				<NavLi class="cursor-pointer w-full md:w-12 self-end ">
					<MoreHorizontal class="w-6 h-6 text-primary-800  inline" />
				</NavLi>
				<MegaMenu
					items={menu}
					let:item
					ulClass="grid  grid-flow-row gap-y-4 md:gap-x-4 auto-col-max auto-row-max z-[100] bg-white"
				>
					<a href={item.href} class=" hover:underline">{item.name}</a>
				</MegaMenu>
			</NavUl>
		</NavContainer>
	</Navbar>
</div>

<style>
	.btn {
		@apply w-full flex justify-center items-center gap-2  font-bold  font-roboto tracking-normal uppercase px-4 py-1 rounded-md text-white border-2 border-neutral;
	}
</style>
