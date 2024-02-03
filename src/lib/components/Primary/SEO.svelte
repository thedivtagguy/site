<script lang="ts">
	export let title: string;
	export let description: string; // Used for normal pages
	export let url: string;
	export let image: string;
	export let isBlogPost: boolean = false;
	export let lang: string = 'en';

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
		// Normal page specific fields
		name?: string;
		jobTitle?: string;
		knowsAbout?: string[];
		sameAs?: string[];
		// Blog post specific fields
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
</script>

<svelte:head>
	<html {lang} />
	<title>{title}</title>
	<meta name="description" content={isBlogPost ? excerpt : description} />
	<link rel="canonical" href={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={isBlogPost ? excerpt : description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:type" content={isBlogPost ? 'article' : 'website'} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={isBlogPost ? excerpt : description} />
	<meta name="twitter:image" content={image} />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonSchema)}</script>`}
</svelte:head>
