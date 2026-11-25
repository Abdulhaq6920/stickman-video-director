import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const REPO_ROOT = path.resolve(process.cwd(), '..', '..');
const RULES_FILE = path.join(REPO_ROOT, 'AUTHENTIC_DEEN_RULES.md');
const SKILL_FILE = path.join(process.cwd(), 'SKILL.md');
const README_FILE = path.join(REPO_ROOT, 'README.md');

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

async function t(name, fn) {
  // node --test runs top-level await and assertions directly
  await fn();
}

export { t };

// Helper: run a named subtest
async function describe(name, fn) {
  await fn();
}

// ---- Tests ----

// 1. AUTHENTIC_DEEN_RULES.md exists at repository root
{
  assert.ok(fs.existsSync(RULES_FILE), 'AUTHENTIC_DEEN_RULES.md must exist at repository root');
  const rules = read(RULES_FILE);
  assert.ok(rules.length > 0, 'AUTHENTIC_DEEN_RULES.md must not be empty');
}

// 2. Rules document contains all required sections A through Q
{
  const rules = read(RULES_FILE);
  const requiredSections = [
    '## A. Core identity',
    '## B. Islamic authenticity',
    '## C. Hadith verification',
    '## D. Qur\'an verification',
    '## E. No fabricated historical dialogue',
    '## F. Absolute visual restrictions',
    '## G. Absolute Prophet prohibition',
    '## H. Sahabah and historical people',
    '## I. Backgrounds',
    '## J. Story structure',
    '## K. Script quality',
    '## L. No sensationalism',
    '## M. Research-first workflow',
    '## N. Video output requirements',
    '## O. Prompt enforcement for image and video generation',
    '## P. Final quality assurance checklist',
    '## Q. Mandatory agent instruction',
  ];
  for (const section of requiredSections) {
    assert.ok(rules.includes(section), `Rules must contain section: ${section}`);
  }
}

// 3. Core identity: AUTHENTIC DEEN project name, purpose, defaults
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('**Project name:** AUTHENTIC DEEN'), 'Rules must name project AUTHENTIC DEEN');
  assert.ok(rules.includes('9:16 portrait'), 'Rules must default to 9:16 portrait');
  assert.ok(rules.includes('30–90 seconds'), 'Rules must default to 30–90 seconds');
  assert.ok(rules.includes('completely faceless'), 'Rules must require completely faceless characters');
  assert.ok(rules.includes('MINIMALIST 2D STICKMAN ANIMATION'), 'Rules must require minimalist 2D stickman animation');
}

// 4. Core principles priority
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('AUTHENTICITY > VIRALITY'), 'Rules must state AUTHENTICITY > VIRALITY');
  assert.ok(rules.includes('ACCURACY > DRAMA'), 'Rules must state ACCURACY > DRAMA');
  assert.ok(rules.includes('TRUST > ENTERTAINMENT'), 'Rules must state TRUST > ENTERTAINMENT');
}

// 5. Islamic authenticity: never invent hadith/Qur'an/Prophet stories etc.
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('Never invent or fabricate'), 'Rules must prohibit inventing Islamic content');
  assert.ok(rules.includes('Hadith'), 'Rules must mention Hadith');
  assert.ok(rules.includes('Qur\'an'), 'Rules must mention Qur\'an');
  assert.ok(rules.includes('Prophet stories'), 'Rules must mention Prophet stories');
  assert.ok(rules.includes('I could not reliably verify this.'), 'Rules must include unverifiable claim statement');
}

// 6. Hadith verification: classifications and collections
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('VERIFIED'), 'Rules must include VERIFIED classification');
  assert.ok(rules.includes('WEAK'), 'Rules must include WEAK classification');
  assert.ok(rules.includes('FABRICATED'), 'Rules must include FABRICATED classification');
  assert.ok(rules.includes('UNVERIFIED'), 'Rules must include UNVERIFIED classification');
  assert.ok(rules.includes('Sahih al-Bukhari'), 'Rules must reference Sahih al-Bukhari');
  assert.ok(rules.includes('Sahih Muslim'), 'Rules must reference Sahih Muslim');
  assert.ok(rules.includes('Never present weak, fabricated or unverified narrations as authentic'), 'Rules must prohibit weak/fabricated/unverified as authentic');
}

// 7. Qur'an verification: surah name, number, ayah
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('Surah name'), 'Rules must require Surah name');
  assert.ok(rules.includes('Surah number'), 'Rules must require Surah number');
  assert.ok(rules.includes('Ayah number'), 'Rules must require Ayah number');
  assert.ok(rules.includes('Never invent Arabic wording'), 'Rules must prohibit inventing Arabic wording');
}

// 8. No fabricated historical dialogue
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('Never invent conversations'), 'Rules must prohibit invented conversations');
  assert.ok(rules.includes('Visual dramatization — not part of the original narration'), 'Rules must require dramatization label');
}

// 9. Absolute visual restrictions: allowed and forbidden
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('MINIMALIST 2D STICKMAN ANIMATION'), 'Rules must mandate minimalist 2D stickman animation');
  assert.ok(rules.includes('no facial features whatsoever'), 'Rules must require no facial features');
  assert.ok(rules.includes('Realistic human beings'), 'Rules must forbid realistic humans');
  assert.ok(rules.includes('Photographs'), 'Rules must forbid photographs');
  assert.ok(rules.includes('Facial close-ups'), 'Rules must forbid facial close-ups');
  assert.ok(rules.includes('Realistic AI-generated humans'), 'Rules must forbid AI-generated humans');
}

// 10. Absolute Prophet prohibition
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('NEVER depict'), 'Rules must prohibit Prophet depiction');
  assert.ok(rules.includes('Prophet Muhammad'), 'Rules must name Prophet Muhammad');
  assert.ok(rules.includes('Any other Prophet'), 'Rules must prohibit any other Prophet');
  assert.ok(rules.includes('Any Messenger'), 'Rules must prohibit any Messenger');
  assert.ok(rules.includes('environmental and symbolic storytelling exclusively'), 'Rules must require symbolic storytelling for Prophet topics');
}

// 11. Sahabah and historical people
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('Never invent physical appearances'), 'Rules must prohibit invented physical appearances');
  assert.ok(rules.includes('anonymous, completely faceless stickmen'), 'Rules must require faceless stickmen for historical people');
}

// 12. Backgrounds: only 2D illustrated
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('Desert'), 'Rules must list Desert as allowed background');
  assert.ok(rules.includes('Mosque'), 'Rules must list Mosque as allowed background');
  assert.ok(rules.includes('Night sky'), 'Rules must list Night sky as allowed background');
  assert.ok(rules.includes('Never use photographic or photorealistic backgrounds'), 'Rules must forbid photographic backgrounds');
}

// 13. Story structure
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('0–3 seconds'), 'Rules must define 0–3 seconds hook');
  assert.ok(rules.includes('Honest hook'), 'Rules must require honest hook');
  assert.ok(rules.includes('Do not use misleading clickbait'), 'Rules must forbid clickbait');
}

// 14. Script quality
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('Natural'), 'Rules must require natural scripts');
  assert.ok(rules.includes('Warm'), 'Rules must require warm scripts');
  assert.ok(rules.includes('Respectful'), 'Rules must require respectful scripts');
}

// 15. No sensationalism
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('Fake miracles'), 'Rules must forbid fake miracles');
  assert.ok(rules.includes('Fearmongering'), 'Rules must forbid fearmongering');
  assert.ok(rules.includes('Viral misinformation'), 'Rules must forbid viral misinformation');
}

// 16. Research-first workflow sequence
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('TOPIC'), 'Rules must start with TOPIC');
  assert.ok(rules.includes('RESEARCH'), 'Rules must include RESEARCH');
  assert.ok(rules.includes('SOURCE VERIFICATION'), 'Rules must include SOURCE VERIFICATION');
  assert.ok(rules.includes('AUTHENTICITY CLASSIFICATION'), 'Rules must include AUTHENTICITY CLASSIFICATION');
  assert.ok(rules.includes('SCRIPT'), 'Rules must include SCRIPT');
  assert.ok(rules.includes('STORYBOARD'), 'Rules must include STORYBOARD');
  assert.ok(rules.includes('FINAL QUALITY ASSURANCE'), 'Rules must include FINAL QUALITY ASSURANCE');
  assert.ok(rules.includes('When I request research only, do not generate scripts or videos'), 'Rules must restrict research-only requests');
}

// 17. Video output requirements
{
  const rules = read(RULES_FILE);
  const requiredOutputs = ['Title', 'Core lesson', 'Authenticity status', 'Primary sources', 'Hook', 'Full voice-over', 'Scene-by-scene storyboard', 'Stickman animation directions', 'Individual AI visual prompts', 'Camera movement', 'On-screen text', 'Captions and subtitles', 'Social media caption', 'YouTube Shorts title', 'Hashtags'];
  for (const output of requiredOutputs) {
    assert.ok(rules.includes(output), `Rules must require output: ${output}`);
  }
}

// 18. Prompt enforcement: image/video prompts include required language
{
  const rules = read(RULES_FILE);
  const requiredPrompt = 'Minimalist 2D stickman animation, completely faceless characters, simple line art, clean illustrated environment, symbolic storytelling, vertical 9:16, educational style, no facial features, no realistic humans, no photography, no photorealism, no portraits';
  assert.ok(rules.includes(requiredPrompt), 'Rules must include required prompt enforcement language');
  const prophetPrompt = 'Do not depict any Prophet or Messenger. Use environmental and symbolic storytelling only.';
  assert.ok(rules.includes(prophetPrompt), 'Rules must include Prophet-related prompt enforcement');
  assert.ok(rules.includes('text prompts alone guarantee safety'), 'Rules must warn text prompts alone do not guarantee safety');
}

// 19. Final QA checklist items
{
  const rules = read(RULES_FILE);
  const qaItems = [
    'No Prophet or Messenger is depicted',
    'No human faces or facial features are visible',
    'No realistic humans are present',
    'No photographic or photorealistic content is present',
    'All human characters are faceless stickmen',
    'Backgrounds are 2D illustrations',
    'Hook is honest',
    'Lesson is clear',
    'Sources are provided',
    'Final video is suitable for 9:16 publication',
  ];
  for (const item of qaItems) {
    assert.ok(rules.includes(item), `QA checklist must include: ${item}`);
  }
}

// 20. SKILL.md integrates mandatory instruction for Islamic content
{
  const skill = read(SKILL_FILE);
  assert.ok(skill.includes('AUTHENTIC DEEN — Islamic content mandatory policy'), 'SKILL.md must include AUTHENTIC DEEN mandatory policy section');
  assert.ok(skill.includes('Read `AUTHENTIC_DEEN_RULES.md` before planning'), 'SKILL.md must instruct to read rules before planning');
  assert.ok(skill.includes('Treat it as mandatory production policy'), 'SKILL.md must treat rules as mandatory');
  assert.ok(skill.includes('Verify Islamic claims before scripting'), 'SKILL.md must instruct to verify Islamic claims');
  assert.ok(skill.includes('Apply the visual restrictions to every generated scene'), 'SKILL.md must instruct to apply visual restrictions');
  assert.ok(skill.includes('Validate all prompts before sending them to image or video generation tools'), 'SKILL.md must instruct to validate prompts');
  assert.ok(skill.includes('Review actual rendered outputs for visual violations'), 'SKILL.md must instruct to review outputs');
  assert.ok(skill.includes('Never override these rules merely to satisfy a stylistic preference'), 'SKILL.md must forbid overriding rules');
  assert.ok(skill.includes('`AUTHENTIC_DEEN_RULES.md` is the single canonical source'), 'SKILL.md must declare single canonical source');
  assert.ok(skill.includes('completely faceless characters'), 'SKILL.md must restate faceless character rule');
  assert.ok(rulesContainsProphetRule(skill), 'SKILL.md must restate Prophet prohibition');
}

function rulesContainsProphetRule(skill) {
  return skill.includes('No Prophet or Messenger depiction') || skill.includes('Prophet or Messenger depiction');
}

// 21. README.md references AUTHENTIC DEEN and links to rules
{
  const readme = read(README_FILE);
  assert.ok(readme.includes('AUTHENTIC DEEN'), 'README.md must mention AUTHENTIC DEEN');
  assert.ok(readme.includes('AUTHENTIC_DEEN_RULES.md'), 'README.md must link to AUTHENTIC_DEEN_RULES.md');
  assert.ok(readme.includes('Never depict any Prophet or Messenger'), 'README.md must restate Prophet prohibition');
}

// 22. Existing SKILL.md structure preserved (style references intact)
{
  const skill = read(SKILL_FILE);
  assert.ok(skill.includes('## Two modes, one Skill'), 'SKILL.md must preserve Two modes section');
  assert.ok(skill.includes('A · Model Engine'), 'SKILL.md must preserve Model Engine reference');
  assert.ok(skill.includes('B · Code Engine'), 'SKILL.md must preserve Code Engine reference');
  assert.ok(skill.includes('references/autopilot.md'), 'SKILL.md must preserve autopilot reference');
  assert.ok(skill.includes('First use and next steps'), 'SKILL.md must preserve First use section');
}

// 23. SKILL.md YAML header preserved
{
  const skill = read(SKILL_FILE);
  const normalized = skill.replace(/\r\n/g, '\n');
  assert.ok(normalized.startsWith('---\nname: directing-stickman-videos'), 'SKILL.md must preserve YAML header');
}

// 24. Prompt enforcement applies to both Model Engine and Code Engine
{
  const rules = read(RULES_FILE);
  assert.ok(rules.includes('image or video generation tools'), 'Rules must cover both image and video generation');
  assert.ok(rules.includes('stop using that generation route for the affected content'), 'Rules must require stopping when restrictions cannot be met');
}

console.log('All AUTHENTIC DEEN rules integration tests passed.');