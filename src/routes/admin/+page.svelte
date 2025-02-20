<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  onMount(() => {
    if (browser) {
      // Load Netlify Identity
      const script1 = document.createElement('script');
      script1.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
      document.head.appendChild(script1);

      // Load Decap CMS
      const script2 = document.createElement('script');
      script2.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js';
      document.body.appendChild(script2);
    }
  });
</script>

<svelte:head>
  <title>Content Manager</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />
</svelte:head>

<div id="nc-root"></div>
