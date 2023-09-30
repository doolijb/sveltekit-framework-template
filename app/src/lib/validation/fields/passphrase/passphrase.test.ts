import { expect, test } from "vitest"
import definition from "."
import { utils } from "@validation"

test("passphrase field validation passes", async () => {
    const field = utils.fieldValidator({definition})
    const input = "$some 5tr0ng p4ssphr4se!"
    const errors = await field.test(input)
    expect(Object.keys(errors)).toHaveLength(0)
})

test("passphrase field validation fails", async () => {
    const field = utils.fieldValidator({definition})
    const input = "password"
    const errors = await field.test(input)
    console.log(errors) 
    expect(Object.keys(errors)).toHaveLength(1)
})