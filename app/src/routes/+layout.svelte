<script>
	import "../app.postcss"
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom"
	import { storePopup, initializeStores, Modal, Toast } from "@skeletonlabs/skeleton"

	initializeStores()
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow })
</script>

<svelte:head>
	<title> - SvelteKit Template</title>
</svelte:head>

<Toast />
<Modal />

<slot/>
