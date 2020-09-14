const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting () {
    return this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Your project name?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author name?',
        default: ''
      }
    ])
    .then(answers => {
      this.answers = answers;
    })
  }

  writing(){
    const templates = [
      '.gitignore',
      'README.md',
      'package.json',
      'webpack.config.js',
      'public/index.html',
      'src/index.js',
      'src/components/header.js',
      'src/views/home.js'
    ]

    templates.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      )
    })
  }
}