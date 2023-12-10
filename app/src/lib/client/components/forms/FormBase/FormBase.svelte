<script lang="ts">
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()

	export let disabled = false
	export let formData: { [key: string]: any }
	export let formErrors: FormErrors = {}
	export let formValidator: FormValidator

	export let submitLabel = "Submit"
	export let cancelLabel = "Cancel"
	export let canSubmit = false
	export let showCancel = true
	export let showSubmit = true

	$: isPopulated = !formValidator.requiredFields.some((field) => !formData[field])
	$: hasErrors = Object.keys(formErrors).some((field) => Object.keys(formErrors[field]).length)
	$: {
		canSubmit = isPopulated && !hasErrors
	}

	async function validate() {
		formErrors = await formValidator.test(formData)
	}

	////
	// Event Handlers
	////

	const onSubmit = async (e: Event) => {
		disabled = true
		dispatch("submit", e)
		disabled = false
	}

	const onCancel = async (e: Event) => {
		dispatch("cancel", e)
	}

	////
	// USE DIRECTIVES
	////

	/**
	 * This directive will submit the form when the user presses enter
	 */
	function submitOnEnter(node: HTMLFormElement) {
		const handler = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				onSubmit(event)
			}
		}

		// Get the last input, select, radio, or checkbox field in the form
		const lastField = Array.from(
			node.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
				'input, select, [type="radio"], [type="checkbox"]'
			)
		)
			.filter((field) => field.type !== "textarea")
			.pop()

		// Add the keydown event listener to the last field
		if (lastField) {
			lastField.addEventListener("keydown", handler)
		}

		return {
			destroy() {
				// Remove the event listener when the action is destroyed
				if (lastField) {
					lastField.removeEventListener("keydown", handler)
				}
			}
		}
	}

	/**
	 * This directive will autofocus the first input field in the form
	 */
	function autofocus(node: HTMLFormElement) {
		// Get the first input field in the form
		const firstField: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement =
			node.querySelector('input, select, textarea [type="radio"], [type="checkbox"]')

		// Focus on the first field when the action is mounted
		if (firstField) {
			firstField.focus()
		}

		return {
			// No cleanup necessary
		}
	}
</script>

<div>
	<form use:submitOnEnter use:autofocus on:submit={onSubmit} class="mb-4">
		<slot />
	</form>

	<div class="flex flex-row justify-between">
		<slot name="cancel">
			{#if showCancel}
				<button type="button" class="btn variant-filled-surface" {disabled} on:click={onCancel}>
					{cancelLabel}
				</button>
			{/if}
		</slot>
		<!-- Cancel button, etc -->
		<slot name="extraButtons" />
		<slot name="submit">
			{#if showSubmit}
				<button
					type="button"
					class="btn variant-filled ms-auto"
					disabled={!canSubmit || disabled}
					on:click={async (e) => {
						disabled = true
						validate()
						canSubmit && onSubmit && (await onSubmit(e))
						disabled = false
					}}
					title={canSubmit ? "" : "Please fill out all required fields"}
				>
					{submitLabel}
				</button>
			{/if}
		</slot>
	</div>
</div>