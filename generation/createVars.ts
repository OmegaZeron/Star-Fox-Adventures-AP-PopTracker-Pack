import { varDefinitions, writeToFile } from "./utils.ts"

// export variables to Lua to keep in sync
export default function createVars() {
	let output = ""
	for (let [itemType, list] of Object.entries(varDefinitions)) {
		output += `-- ${itemType}\n`
		for (let [name, val] of Object.entries(list)) {
			output += `${name} = "${val}"\n`
		}
	}
	writeToFile("scripts/variable_definitions.lua", output)
}

// @ts-ignore
if (import.meta.main) {
	createVars()
}