import type { IValidator } from "@interfaces"
import { utils } from "@validation"

/**
 * Validates that a string is not empty
 * 
 * @param args { label?: string }
 * @returns IValidator
 */

export default function ({
    label
}: { 
    label?: string 
} = {} ): IValidator {
    return {
        args: { label },
        badge: "Required",
        key: "required",
        message: "This field is required",
        popup: utils.makePopup(),
        sticky: true,
        test: (value: string) => !!value
    }
}
