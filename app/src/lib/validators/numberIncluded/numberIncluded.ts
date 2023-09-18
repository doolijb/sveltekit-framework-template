import type { IFieldValidator } from "@interfaces"
import utils from "@validators/utils"

/**
 * Validates that a string contains at least one number
 * 
 * @param args { label?: string, count: number }
 * @returns IFieldValidator
 */

export default function ({ 
    label,
    count = 1
}: {
    label?: string; 
    count?: number
} = {} ): IFieldValidator {
    return {
        args: { label, count },
        badge: "Number Required",
        key: "numberIncluded",
        message: `Must have at least ${count} number${count > 1 ? "s" : ""
            }`,
        popup: utils.makePopup(),
        sticky: false,
        test: (value: string) => {
            const numbers = value.match(/\d/g) || []
            return value.length ? numbers.length >= count : true
        }
    }
}
