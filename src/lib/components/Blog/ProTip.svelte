<script lang="ts">
	export let title = 'Pro tip';
	export let content = '';
	import { marked } from 'marked';
</script>

<div class="pro-tip-box">
	<div class="pro-tip-title">{title}</div>
	<div class="pro-tip-content">
		<slot>{@html marked(content)}</slot>
	</div>
</div>

<style>
	.pro-tip-box {
		display: flex;
		flex-direction: column;
		gap: 2px;
		background-color: #f0f7ff;
		border: 1px solid #4d80e6;
		border-radius: 6px;
		padding: 12px;
		margin: 20px 0;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	}

	.pro-tip-title {
		color: #4d80e6;
		font-weight: 600;
		margin-bottom: 1px;
		font-size: 1em;
	}

	.pro-tip-content {
		font-size: 0.95em;
	}
</style>
