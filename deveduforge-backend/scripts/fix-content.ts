import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const fp = resolve('prisma/content/frontend/vuejs-advanced/courses/vuejs-advanced-courses.ts');
let src = readFileSync(fp, 'utf-8');

// The problem: on line 18, a double-quoted contentMarkdown string contains
// actual newlines instead of \n. The string spans line 18 -> (empty line 19) -> line 20.
// Fix: wrap contentMarkdown values that span multiple lines in backtick template literals.

// Strategy: find each "contentMarkdown": "..." and ensure it's a single-line string
// or convert to backtick template literal.

// Convert the outer double quotes of contentMarkdown values to backtick template literals.
// This works because backtick strings can span multiple lines.

// Find "contentMarkdown": " and replace the opening " with `
src = src.replace(/"contentMarkdown": "/g, '"contentMarkdown": `');
// Find the closing ", and replace with ` (be careful: not all " are closing)
// The closing ", appears at end of contentMarkdown lines
// We need to find the last " before the comma that ends the contentMarkdown value

// Replace: ...content", followed by newline and next property
// Pattern: `",` then newline then spaces then `"title"` or `}` or `{`
// Actually, the closing is `",` at the end of the contentMarkdown line
// Then on the next line comes `    },` or `    {`

// The closing double quote + comma: ",
// We need to match the last ", before }, or {
// This is tricky because the content itself contains "

// Simpler approach: for each contentMarkdown line, find the LAST unescaped ", 
// and replace it with `,

// Even simpler: since we know the exact issue, let's use a very targeted fix.
// Line 18 ends with \n]\n``` and line 19 is blank, line 20 starts with ```vue\n
// Merge them by removing the actual newline characters in the contentMarkdown string.

// Actually the simplest fix: remove actual newlines from within contentMarkdown values.
// ContentMarkdown values use \n for newlines, so actual newlines in the file are
// errors. Let's remove them.

// Find the pattern: contentMarkdown: `...` (with backticks now) and remove newlines
// But we want to KEEP the \n escape sequences.

// New approach: just clean up actual newlines inside contentMarkdown backtick strings.
// A backtick spans from ` after "contentMarkdown": " to the closing `,
// We need to remove actual newlines inside these backtick strings.

// Actually, let's just leave them as backtick template literals. That's cleaner.
// The real fix was to convert " to ` for the opening.

// But we also need to handle escaped quotes inside: \" should work inside backtick
// strings as regular quotes (backticks don't need escaping for ").

// Also need to handle the closing: find the last `",` -> change to `,`

// Let me trace through: after replacing opening "contentMarkdown": " with 
// "contentMarkdown": `, now we have backtick strings that span lines.
// The closing ", pattern is more complex.

// Let me just verify the replacement worked for line 18 and 20.
// After the replace above, line 18 becomes: "contentMarkdown": `# Vue Router...
// And it continues on line 20: ```vue\n<script...
// The closing on line 20: ...navigation"
// We need: ...navigation`

// So the closing is ...navigation" on line 20. 
// It should be: ...navigation`
// But there might be other " characters before the closing.

// This is getting complex. Let me take a completely different approach:
// Just find lines 18-20 and merge them into a single sanitized line.

// Line 18 is index 17 (0-based)
// Line 20 is index 19
// Line 19 (index 18) is empty

const lines = src.split('\n');
// Verify our understanding
console.log('Line 18 (idx 17) ends with:', lines[17].slice(-30));
console.log('Line 20 (idx 19) starts with:', lines[19].slice(0, 30));
console.log('Line 19 (idx 18) is empty?', lines[18].length === 0);

// Fix: merge line 20 content into line 18, remove line 19 and 20
// Line 18 ends with "...```
// Line 20 starts with "```vue\n..."
// The merger: line18_no_newline + line20_content_on_same_line

// But line 20 also has actual newlines in it that break the string.
// Actually, looking more carefully at the file, line 20 has actual newlines too:
// ```vue\n<script setup lang=\"ts\">\n...
//
// Wait, those are \n escape sequences (backslash-n). So line 20 is a single
// long line with escaped newlines. Good.

// So the fix is just: append line 20's content to line 18 (removing the actual newline)
// and delete lines 19 and 20.

const fixedLine18 = lines[17] + lines[19]; // merge
lines[17] = fixedLine18;
lines.splice(18, 2); // remove old lines 19 and 20 (now empty and line 20 content)

src = lines.join('\n');
writeFileSync(fp, src, 'utf-8');
console.log('Fixed! New line count:', lines.length);
