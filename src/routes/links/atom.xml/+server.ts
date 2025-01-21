export const prerender = true;

export async function GET() {
	const posts = await getSortedPosts(
		import.meta.glob('../../../content/links/*.mdx', { eager: true })
	);

	const feed = `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Aman Bhargava's Links</title>
    <subtitle>Quick thoughts and interesting links I've found around the web</subtitle>
    <link href="https://aman.bh/links/atom.xml" rel="self"/>
    <link href="https://aman.bh/links"/>
    <updated>${new Date().toISOString()}</updated>
    <id>https://aman.bh/links</id>
    <author>
      <name>Aman Bhargava</name>
    </author>
    ${posts
			.map(
				(post) => `
      <entry>
        <title>${escapeXml(post.title)}</title>
        <link href="https://aman.bh/links/${new Date(post.date).getFullYear()}/${post.slug}"/>
        <id>https://aman.bh/links/${new Date(post.date).getFullYear()}/${post.slug}</id>
        <updated>${new Date(post.date).toISOString()}</updated>
        <summary>${escapeXml(post.excerpt || '')}</summary>
        <content type="html">
          <![CDATA[${post.content}]]>
        </content>
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
			// Ignore posts where published === false in frontmatter
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
