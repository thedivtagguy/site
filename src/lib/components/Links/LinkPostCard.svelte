<script>
  import { formatDate } from '$lib/utils';
  export let post;

  $: year = new Date(post.date).getFullYear();
</script>

<article class="w-full p-4 transition-all border rounded-lg hover:border-primary border-base-300">
  <header class="mb-2">
    <div class="flex items-center justify-between mb-1">
      <time datetime={post.date} class="text-sm text-base-content/60">
        {formatDate(post.date)}
      </time>
      {#if post.tags && post.tags.length > 0}
        <div class="flex gap-2">
          {#each post.tags as tag}
            <span class="px-2 py-0.5 text-xs rounded-full bg-base-200">{tag}</span>
          {/each}
        </div>
      {/if}
    </div>
    <h2 class="text-lg font-medium">
      <a href={post.url} target="_blank" rel="noopener noreferrer" class="hover:text-primary">
        {post.title}
      </a>
      <span class="ml-1 text-sm text-base-content/60">({post.source})</span>
    </h2>
  </header>
  <div class="prose prose-sm max-w-none prose-neutral">
    {@html post.content}
  </div>
  <footer class="mt-2">
    <a href="/links/{year}/{post.slug}" class="text-sm text-primary hover:underline">
      Permalink
    </a>
  </footer>
</article>
