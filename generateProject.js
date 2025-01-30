// generateProject.mjs or generateProject.js (if package.json has "type": "module")
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import path from "path";
import handlebars from "handlebars";
import inquirer from "inquirer";

// Calculate __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseDir = path.join(__dirname, "templates");

async function generateFileFromTemplate(templatePath, outputPath, data) {
  const templateContent = await fs.readFile(templatePath, "utf8");
  const compiledTemplate = handlebars.compile(templateContent);
  const outputContent = compiledTemplate(data);

  await fs.outputFile(outputPath, outputContent);
}

async function createDirectoryContents(templatePath, newProjectPath, data) {
  const items = await fs.readdir(templatePath, { withFileTypes: true });

  for (const item of items) {
    const srcFilePath = path.join(templatePath, item.name);
    const destFilePath = path
      .join(newProjectPath, item.name)
      .replace("template", data.projectName);

    if (item.isDirectory()) {
      await fs.ensureDir(destFilePath);
      await createDirectoryContents(srcFilePath, destFilePath, data);
    } else {
      // Skip .gitkeep files during project generation
      if (path.basename(item.name) === ".gitkeep") continue;

      if (path.extname(item.name) === ".hbs") {
        const outputFile = destFilePath.replace(".hbs", "");
        await generateFileFromTemplate(srcFilePath, outputFile, data);
      } else {
        await fs.copy(srcFilePath, destFilePath);
      }
    }
  }
}

async function generateProject() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter the project name:",
      default: "my-app",
    },
    {
      type: "input",
      name: "description",
      message: "Enter the project description:",
      default: "A Node.js project with custom architecture.",
    },
  ]);

  const newProjectPath = path.join(process.cwd(), answers.projectName);
  await fs.ensureDir(newProjectPath);

  await createDirectoryContents(baseDir, newProjectPath, answers);

  console.log(`Project ${answers.projectName} created successfully!`);

  // Inform the user about next steps
  console.log(`\nNext Steps:`);
  console.log(
    `1. Navigate to your project directory: cd ${answers.projectName}`
  );
  console.log(`2. Install dependencies: npm install`);
  console.log(`3. Generate Prisma Client: npx prisma generate`);
  console.log(`4. Start the server: npm start\n`);
}

export default generateProject;
