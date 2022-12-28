import * as shell from "shelljs";

// Copy all the view templates
shell.cp( "-Ru", "./src/assets", "./server/assets/");
shell.cp( "-Ru", "./src/public", "./server/public/");
shell.cp( "-Ru", "./src/config/keys", "./server/config/keys/");

