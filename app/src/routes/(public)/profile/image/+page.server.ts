import type { PageServerLoad } from "./$types"

export const load = (async () => {
	return { title: "Profile Image" }
}) satisfies PageServerLoad
