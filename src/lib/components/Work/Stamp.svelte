<div class="stamp">
	<slot />
</div>

<style>
	:root {
		--stamp-cut-scale: 0.4;
		--stamp-min-height: 100px;
		--stamp-background-color: #ededed;
		--rotation: 0;
	}

	.stamp {
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'Libre Caslon Text', serif;
		width: 100%;
		margin-bottom: 30px;
		position: relative;
		min-height: var(--stamp-min-height);
		background: var(--stamp-background-color);
		transform: rotate(--rotation);
	}

	.stamp:before,
	.stamp:after {
		position: absolute;
		content: '';
		display: block;
		background: radial-gradient(
			circle,
			transparent calc(15px * var(--stamp-cut-scale)),
			var(--stamp-background-color) calc(16px * var(--stamp-cut-scale))
		);
		background-size: calc(50px * var(--stamp-cut-scale)) calc(40px * var(--stamp-cut-scale));
		background-position: calc(-20px * var(--stamp-cut-scale)) calc(-20px * var(--stamp-cut-scale));
		width: 100%;
		height: calc(40px * var(--stamp-cut-scale));
		z-index: -1;
	}

	.stamp:before {
		top: calc(-20px * var(--stamp-cut-scale));
	}

	.stamp:after {
		bottom: calc(-20px * var(--stamp-cut-scale));
	}
</style>
