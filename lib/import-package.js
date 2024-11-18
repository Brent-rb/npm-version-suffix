import path from "path"
import fs from "node:fs"

const read = (path) => {
  const data = fs.readFileSync(path);
  return JSON.parse(data);
}

const packageJsonPath = path.join(process.cwd(), 'package.json');
const { version, name } = read(packageJsonPath);

export {
  packageJsonPath,
  version,
  name
}