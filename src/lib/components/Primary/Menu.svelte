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
			href: '/',
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

<nav class="flex justify-center my-1 items-center w-full px-6">
	<ul class="md:flex justify-around items-center md:w-1/3 w-full md:flex-row flex-col gap-4 hidden">
		{#each menuItems as item}
			<a href={item.href}>
				<li
					class="text-xl font-bold {item.color} font-fira tracking-normal uppercase px-6 py-1 rounded-md text-white border-2 border-neutral"
					class:highlight={item.highlight}
				>
					{item.name}
				</li>
			</a>
		{/each}
	</ul>
	<div class="collapse md:hidden bg-base-200 rounded-lg w-4/5">
		<input type="checkbox" />
		<div class="collapse-title text-xl font-medium">Click me to show/hide content</div>
		<div class="collapse-content flex flex-wrap gap-4 justify-center">
			{#each menuItems as item}
				<a href={item.href}>
					<li
						class="text-xl text-center list-none font-bold {item.color} font-fira tracking-normal uppercase px-6 py-1 rounded-md text-white border-2 border-neutral"
						class:highlight={item.highlight}
					>
						{item.name}
					</li>
				</a>
			{/each}
		</div>
	</div>
</nav>

<style>
	li {
		box-shadow: 0px 2px 0px 0px #2b2b2b;
	}

	li.highlight {
		box-shadow: none;
		outline: #2b2b2b solid 2px;
		outline-offset: 3px;
	}
</style>
