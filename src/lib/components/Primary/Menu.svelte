<script>
	const menuItems = [
		{
			name: 'Home',
			href: '/',
			color: 'bg-orange'
		},
		{
			name: 'Work',
			href: '/work',
			color: 'bg-purple'
		},
		{
			name: 'Blog',
			href: '/blog',
			color: 'bg-sage'
		},
		{
			name: 'Contact',
			href: '/',
			color: 'bg-blue',
			highlight: true
		}
	];
</script>

<nav class="flex justify-center items-center w-full my-3 px-6">
	<ul
		class="md:flex justify-normal md:justify-around items-center max-w-lg w-full flex-row flex-nowrap sm:flex-wrap gap-2 md:gap-4 flex"
	>
		{#each menuItems as item}
			<a href={item.href}>
				<li class="btn-primary {item.color} ">
					{item.name}
				</li>
			</a>
		{/each}
	</ul>
</nav>
