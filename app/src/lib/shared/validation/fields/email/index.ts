import { validators as v } from "$validation"

export const email = () =>  v.String.init().minLength({minLen: 8}).maxLength({maxLen: 100}).emailAddressComplete()