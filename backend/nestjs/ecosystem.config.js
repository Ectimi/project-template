module.exports = {
  apps: [
    {
      name: 'interview-question-bank',
      script: './dist/main.js',
      watch: false,
      ignore_watch: ['node_modules', 'public'],
    },
  ],
};
