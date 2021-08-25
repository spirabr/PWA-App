<template>
  <router-link to="/">
		<v-icon 
			class="close-btn"
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
}
</script>

<style scoped>
	.close-btn {
		position: absolute !important;
		top: 1.5rem;
		left: 1rem;
	}
</style>