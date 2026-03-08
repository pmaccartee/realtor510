const fs = require('fs');

const file = fs.readFileSync('client/src/App.tsx', 'utf8');
const fixed = file.replace("import AnswerDetail from \"@/pages/AnswerDetail\";", "import AnswerDetail from \"./pages/AnswerDetail\";");
fs.writeFileSync('client/src/App.tsx', fixed);

const detail = fs.readFileSync('client/src/pages/AnswerDetail.tsx', 'utf8');
const fixedDetail = detail.replace(/import { insights } from "@\/data\/insights";/g, "import { insights } from \"../data/insights\";");
fs.writeFileSync('client/src/pages/AnswerDetail.tsx', fixedDetail);

const ans = fs.readFileSync('client/src/pages/Answers.tsx', 'utf8');
const fixedAns = ans.replace(/import { insights } from "@\/data\/insights";/g, "import { insights } from \"../data/insights\";");
fs.writeFileSync('client/src/pages/Answers.tsx', fixedAns);
