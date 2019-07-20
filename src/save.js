const cmd = require("atocha");
const meow = require("meow");

module.exports = cli => ({
  title: "Saving changes",
  skip: async () => {
    const status = await cmd(`git status`);
    const hasEdited = /Changes not staged for commit/.test(status);
    const hasUncommited = /Changes to be committed/.test(status);
    if (!hasEdited && !hasUncommited) return true;
  },
  task: async () => {
    const message = cli.input[1] || `Saved on ${time()}`;
    await cmd(`git add . -A`);
    return await cmd(`git commit -m "${message}"`);
  }
});
