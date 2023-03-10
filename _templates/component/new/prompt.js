module.exports = {
  prompt: ({ prompter }) => {
    return new Promise((resolve) => {
      prompter
        .prompt([
          {
            type: 'input',
            name: 'packageOrApp',
            default: 'app',
            message: 'Package or App?',
          },
          {
            type: 'input',
            name: 'project',
            message: 'App or Package Name? e.g "pixelmord"',
          },
        ])
        .then(({ packageOrApp, project }) => {
          const packageOrAppPath = packageOrApp === 'app' ? 'apps' : 'packages';
          resolve({
            appPath: `${packageOrAppPath}/${project}`,
          });
        });
    });
  },
};
