// open-in-editor.ts
// DEV utility: open source file in local editor

import { spawn } from "child_process";
import fs from "fs";
import path from "path";

/* -------------------------------------------------------
 * Types
 * ----------------------------------------------------- */

export interface EditorOptions {
	line?: number;
	column?: number;
	editor?: "vscode" | "cursor" | "windsurf" | "antigravity" | "subl";
}

/* -------------------------------------------------------
 * Editor commands
 * ----------------------------------------------------- */

const EDITORS = {
	vscode: "code",
	cursor: "cursor",
	windsurf: "windsurf",
	antigravity: "antigravity",
	subl: "subl",
} as const;

const buildCommand = (
	editor: keyof typeof EDITORS,
	file: string,
	line = 1,
	column = 1,
): [string, ...string[]] => {
	const cmd = EDITORS[editor];
	const location = `${file}:${line}:${column}`;

	return editor === "subl" ? [cmd, location] : [cmd, "--goto", location];
};

/* -------------------------------------------------------
 * Main function
 * ----------------------------------------------------- */

export function openInEditor(
	filePath: string,
	options: EditorOptions = {},
): void {
	// Resolve path
	const absolutePath = path.isAbsolute(filePath)
		? filePath
		: path.join(process.cwd(), filePath);

	if (!fs.existsSync(absolutePath)) {
		console.error("[openInEditor] File not found:", absolutePath);
		return;
	}

	const { line, column, editor } = options;

	// Launch helper
	const launch = (editorKey: keyof typeof EDITORS) => {
		const [cmd, ...args] = buildCommand(editorKey, absolutePath, line, column);
		spawn(cmd, args, { stdio: "ignore", detached: true }).unref();
	};

	// 1. Explicit editor
	if (editor) {
		launch(editor);
		return;
	}

	// 2. ENV detection
	const envEditor = (
		process.env.VISUAL ||
		process.env.EDITOR ||
		""
	).toLowerCase();
	const detectedEditor = Object.keys(EDITORS).find((key) =>
		envEditor.includes(key),
	) as keyof typeof EDITORS | undefined;

	if (detectedEditor) {
		launch(detectedEditor);
		return;
	}

	// 3. Fallback priority
	const fallbackOrder: (keyof typeof EDITORS)[] = [
		"cursor",
		"windsurf",
		"vscode",
		"antigravity",
		"subl",
	];

	for (const editorKey of fallbackOrder) {
		try {
			launch(editorKey);
			return;
		} catch {}
	}

	console.error("[openInEditor] No supported editor detected");
}

/* -------------------------------------------------------
 * Usage
 * ----------------------------------------------------- */
/*
openInEditor("src/pages/dashboard/index.tsx", { line: 31, column: 5 })
openInEditor("src/app.tsx", { editor: "cursor" })
*/
