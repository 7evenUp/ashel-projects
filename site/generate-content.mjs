import { readFileSync, writeFileSync } from 'node:fs';
const sourceNotes = Array.from({length: 7}, (_, i) => {
  const text = readFileSync(new URL(`../projects-info/project-${i + 1}.md`, import.meta.url), 'utf8');
  const code = text.match(/Исходный код: (.+)/)[1].trim();
  const deploy = text.match(/Деплой: (.+)/)[1].trim();
  const body = text.replace(/^Исходный код:.*\r?\nДеплой:.*\r?\nСтатус:.*\r?\n/, '').trim();
  return {code, deploy, body};
});
writeFileSync(new URL('./dist/source-notes.js', import.meta.url), `// Generated from projects-info. Run npm run content after editing the source notes.\nexport const sourceNotes = ${JSON.stringify(sourceNotes, null, 2)};\n`);
console.log(`Prepared ${sourceNotes.length} project stories.`);
