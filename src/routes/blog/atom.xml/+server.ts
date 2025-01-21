export const prerender = true;

export async function GET() {
	const posts = await getSortedPosts(
		import.meta.glob('../../../content/blog/*.mdx', { eager: true })
	);

	const feed = `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Aman Bhargava's Blog</title>
    <subtitle>Writing about software, design, and the web</subtitle>
    <link href="https://aman.bh/blog/atom.xml" rel="self"/>
    <link href="https://aman.bh/blog"/>
    <updated>${new Date().toISOString()}</updated>
    <id>https://aman.bh/blog</id>
    <author>
      <name>Aman Bhargava</name>
    </author>
    ${posts
			.map(
				(post) => `
      <entry>
        <title>${escapeXml(post.title)}</title>
        <link href="https://aman.bh/blog/${post.slug}"/>
        <id>https://aman.bh/blog/${post.slug}</id>
        <updated>${new Date(post.date).toISOString()}</updated>
        <summary>${escapeXml(post.excerpt || '')}</summary>
        <content type="html">
          <![CDATA[${post.content}]]>
        </content>
        ${
					post.tags
						? post.tags.map((tag) => `<category term="${escapeXml(tag)}"/>`).join('\n        ')
						: ''
				}
      </entry>`
			)
			.join('')}
  </feed>`;

	return new Response(feed, {
		headers: {
			'Content-Type': 'application/atom+xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}

async function getSortedPosts(paths) {
	const posts = [];

	for (const path in paths) {
		const file = paths[path];

		if (file && typeof file === 'object' && 'metadata' in file) {
			const { metadata, default: content } = file;
			if (metadata.published === false) continue;

			const post = {
				...metadata,
				content: content.render().html
			};
			posts.push(post);
		}
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function escapeXml(unsafe: string): string {
	return unsafe.replace(/[<>&'"]/g, (c) => {
		switch (c) {
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '&':
				return '&amp;';
			case "'":
				return '&apos;';
			case '"':
				return '&quot;';
			default:
				return c;
		}
	});
}
