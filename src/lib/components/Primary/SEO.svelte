<script lang="ts">
	import { onMount } from 'svelte';

	// Basic SEO props
	export let title: string = 'Default Title';
	export let description: string = 'Default description of your website';
	export let keywords: string = 'svelte, seo, web development';
	export let author: string = 'Your Name';
	export let canonicalUrl: string = '';
	export let ogImage: string = '';
	export let twitterHandle: string = '@yourtwitterhandle';
	export let twitterCardType: 'summary' | 'summary_large_image' = 'summary_large_image';

	// Additional props from the original component
	export let url: string = '';
	export let isBlogPost: boolean = false;
	export let excerpt: string = '';
	export let publishDate: string = '';
	export let category: string[] = [];
	export let tags: string[] = [];
	export let authorName: string = '';
	export let name: string = '';
	export let jobTitle: string = '';
	export let skills: string[] = [];
	export let sameAs: string[] = [];

	let currentUrl: string;
	let fullOgImageUrl: string;

	onMount(() => {
		currentUrl = window.location.href;
	});

	$: fullOgImageUrl = ogImage ? new URL(ogImage, 'https://aman.bh/').toString() : null;

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
			url: url || currentUrl,
			image: fullOgImageUrl
		};

		if (isBlogPost) {
			jsonLd.headline = title;
			jsonLd.description = excerpt || description;
			jsonLd.datePublished = publishDate;
			jsonLd.dateModified = publishDate;
			jsonLd.author = { '@type': 'Person', name: authorName || author };
			jsonLd.articleSection = category;
			jsonLd.keywords = tags.length > 0 ? tags.join(', ') : keywords;
		} else {
			jsonLd.name = name || author;
			jsonLd.jobTitle = jobTitle;
			jsonLd.knowsAbout = skills;
			jsonLd.sameAs = sameAs;
		}

		return jsonLd;
	};

	let jsonSchema = generateJsonLd();
</script>

<svelte:head>
	<!-- Basic Meta Tags -->
	<title>{title}</title>
	<meta name="description" content={isBlogPost ? excerpt : description} />
	<meta name="keywords" content={isBlogPost ? tags.join(', ') : keywords} />
	<meta name="author" content={authorName || author} />
	<meta name="robots" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl || url || currentUrl} />

	<!-- Open Graph Tags -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={isBlogPost ? excerpt : description} />
	<meta property="og:image" content={fullOgImageUrl} />
	<meta property="og:url" content={canonicalUrl || url || currentUrl} />
	<meta property="og:type" content={isBlogPost ? 'article' : 'website'} />

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content={twitterCardType} />
	<meta name="twitter:site" content={twitterHandle} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={isBlogPost ? excerpt : description} />
	<meta name="twitter:image" content={fullOgImageUrl} />

	<!-- Additional Meta Tags -->
	<meta name="language" content="English" />
	<meta name="revisit-after" content="7 days" />
	<meta name="distribution" content="global" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<!-- JSON-LD -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonSchema)}</script>`}

	{#if isBlogPost}
		<meta property="article:published_time" content={publishDate} />
		<meta property="article:author" content={authorName || author} />
		{#each category as cat}
			<meta property="article:section" content={cat} />
		{/each}
		{#each tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}
</svelte:head>
