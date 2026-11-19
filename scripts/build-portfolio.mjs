import { cp, mkdir, writeFile, rm } from "node:fs/promises";
import { resolve, relative } from "node:path";
const workspace = process.cwd();
const output = resolve(workspace, "dist");
if (relative(workspace, output) !== "dist")
  throw new Error("Unexpected build output path");
await rm(output, { recursive: true, force: true });
await mkdir(resolve(output, "itcs"), { recursive: true });
await cp("index.html", resolve(output, "index.html"));
await cp("itcs/dist", resolve(output, "itcs"), { recursive: true });
await cp("fielden/dist", resolve(output, "fielden"), { recursive: true });
await writeFile(resolve(output, ".nojekyll"), "");
