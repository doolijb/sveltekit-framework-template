import type { StorybookConfig } from "@storybook/sveltekit"
import path from "path"

const config: StorybookConfig = {
	stories: [
		{
			directory: "../src/lib/client/components",
			titlePrefix: "Components"
		}
	],

	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"storybook-addon-mock"
	],
	framework: {
		name: "@storybook/sveltekit",
		options: {}
	},
	docs: {
		autodocs: "tag"
	},
}
export default config
