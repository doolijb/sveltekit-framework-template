<script lang="ts">
	import { page } from "$app/stores"
	import { FormBase, MultiSelect } from "$client/components"
	import { AdminEditAdminRolesToUser as Form } from "$shared/validation/forms"
	import { onMount } from "svelte"

	////
	// PARENT EXPORTS
	////

	export let adminRoles: SelectAdminRole[]
	export let result: SelectUser & {
		toAdminRoles: (
			SelectUsersToAdminRoles & { adminRole: SelectAdminRole }
		)[]
	}


	////
	// LOCAL EXPORTS
	////

	export const form = Form.init()
	export let data: Form["Data"] = { adminRoles: [] }
	export let errors: FormErrors = {}

	////
	// CHILD EXPORTS
	////

	export let disabled: boolean = undefined
	export let canSubmit: boolean = undefined

	////
	// COMPUTED
	////

	let adminRoleOptions = []

	onMount(() => {
		adminRoleOptions = adminRoles.map((role) => ({
			key: role.id,
			label: role.name
		}))
		if (result) {
			Object.values(result.toAdminRoles).forEach(
				({ adminRole }: { adminRole: SelectAdminRole }) => {
					data.adminRoles.push(adminRole.id)
				}
			)
		}
		if (!data) {
			form.validate({data}).then((result) => {
				errors = result
			})
		}
	})

	$: if (result && !result.isAdmin) {
		canSubmit = false
		disabled = true
	}

</script>

<FormBase
	{form}
	bind:errors
	bind:data
	bind:canSubmit
	bind:disabled
	on:submit
	on:cancel
	showSubmit={false}
	showCancel={false}
>
	{#if result && $page.data.user.id === result.id}
		<div class="card mb-3">
			<section class="p-4">
				<p class="text-red-500">
					<b>Warning:</b> You are editing your own admin roles.
					This may result in you losing access to this page.
				</p>
			</section>
		</div>
	{/if}

	{#if result && result.isAdmin && result.toAdminRoles.length === 0}
		<div class="card mb-3">
			<section class="p-4">
				<p class="text-red-500">
					<b>Warning:</b> This user has no admin roles.
					They will not be able to view or modify any data.
				</p>
			</section>
		</div>
	{/if}

	{#if result && !result.isAdmin}
		<div class="card mb-3">
			<section class="p-4">
				<p class="text-red-500">
					<b>Warning:</b> This user is not an admin.
					Admin roles do not apply.
				</p>
			</section>
		</div>
	{/if}

	{#if result && result.isSuperUser}
		<div class="card mb-3">
			<section class="p-4">
				<p class="text-red-500">
					<b>Warning:</b> This user is a <u>super user</u>.
					All admin permissions are bypassed.
				</p>
			</section>
		</div>
	{/if}

	<MultiSelect
		label="Admin Roles"
		id="adminRoles"
		field="adminRoles"
		size={10}
		{form}
		{errors}
		{data}
		options={adminRoleOptions}
		disabled={disabled || !adminRoleOptions.length}
	/>
</FormBase>
