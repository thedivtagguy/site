<script lang="ts">
	export let title: string;
	export let description: string;
	export let url: string;
	export let image: string;
	export let isBlogPost: boolean = false;

	// Blog post specific props
	export let excerpt: string = '';
	export let publishDate: string = '';
	export let category: string[] = [];
	export let tags: string[] = [];
	export let authorName: string = '';

	// Personal profile props for normal pages
	export let name: string = '';
	export let jobTitle: string = '';
	export let skills: string[] = [];
	export let sameAs: string[] = [];

	type JsonLdSchema = {
		'@context': string;
		'@type': string;
		url: string;
		image?: string;
		name?: string;
		jobTitle?: string;
		knowsAbout?: string[];
		sameAs?: string[];
		headline?: string;
		description?: string;
		datePublished?: string;
		dateModified?: string;
		author?: {
			'@type': string;
			name: string;
		};
		articleSection?: string[];
		keywords?: string[];
	};

	const generateJsonLd = (): JsonLdSchema => {
		const jsonLd: JsonLdSchema = {
			'@context': 'http://schema.org',
			'@type': isBlogPost ? 'BlogPosting' : 'Person',
			url: url,
			image: image
		};

		if (isBlogPost) {
			jsonLd.headline = title;
			jsonLd.description = excerpt;
			jsonLd.datePublished = publishDate;
			jsonLd.dateModified = publishDate;
			jsonLd.author = { '@type': 'Person', name: authorName };
			jsonLd.articleSection = category;
			jsonLd.keywords = tags;
		} else {
			jsonLd.name = name;
			jsonLd.jobTitle = jobTitle;
			jsonLd.knowsAbout = skills;
			jsonLd.sameAs = sameAs;
		}

		return jsonLd;
	};

	let jsonSchema = generateJsonLd();

	// Function to ensure the image URL is absolute
	const getAbsoluteImageUrl = (imageUrl: string): string => {
		if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
			return imageUrl;
		}
		return new URL(imageUrl, url).toString();
	};

	// Ensure image URL is absolute
	image = getAbsoluteImageUrl(image);

	// Encode title and date for dynamic OG images
	const encodeTitle = (title: string): string =>
		encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase());
	const encodedTitle = encodeTitle(title);
	const encodedDate = encodeURIComponent(publishDate);

	// Use a fallback image if the dynamic one fails
	const fallbackImage = 'https://aman.bh/sharecard.jpg';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={isBlogPost ? excerpt : description} />
	<link rel="canonical" href={url} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={isBlogPost ? excerpt : description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:secure_url" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:type" content={isBlogPost ? 'article' : 'website'} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={isBlogPost ? excerpt : description} />
	<meta name="twitter:image" content={image} />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonSchema)}</script>`}

	{#if isBlogPost}
		<meta property="article:published_time" content={publishDate} />
		<meta property="article:author" content={authorName} />
		{#each category as cat}
			<meta property="article:section" content={cat} />
		{/each}
		{#each tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
</svelte:head>
