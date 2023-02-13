const slugify = require('slugify');

module.exports = {
  prompt: ({ prompter }) => {
    return new Promise((resolve) => {
      prompter
        .prompt([
          {
            type: 'input',
            name: 'app',
            message: 'App? e.g "pixelmord"',
          },
          {
            type: 'input',
            name: 'title',
            message: 'Title?',
          },
        ])
        .then(({ title, app }) => {
          const date = new Date().toISOString().split('T')[0];
          const slug = slugify(title, { locale: 'en', lower: true });
          resolve({
            slug,
            title,
            date,
            appPath: `apps/${app}`,
          });
        });
    });
  },
};
