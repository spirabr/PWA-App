<template>
  <router-link class="close-btn" to="/">
		<v-icon
			class="margin-header icon-size" 
			color="var(--purple-color)"
			x-large
		>
			mdi-window-close
		</v-icon>
	</router-link>
</template>

<script>
export default {
  name: 'BackHomeButton'
};
</script>

<style scoped>
	.close-btn {
		text-decoration: none;
	}
	.margin-header {
		margin: 14px 0 28px;
	}
	.icon-size {
		font-size: 2.3rem !important;
	}
</style>