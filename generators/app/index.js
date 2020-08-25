"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the astounding ${chalk.red(
          "generator-nest-microservices"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "What is the name of your project?",
        default: "my-awesome-nest-app"
      },
      {
        type: "input",
        name: "description",
        message: "Give us some small description of your project",
        default: ""
      },
      {
        type: "input",
        name: "author",
        message: "Who is the author of this project?",
        default: ""
      },
      {
        type: "input",
        name: "appTitle",
        message: "What is the title of your project?",
        default: ""
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // Copy src files
    this.fs.copyTpl(
      this.templatePath("src/**/*"),
      this.destinationPath(`${this.props.name}/src`),
      {
        appTitle: this.props.name,
        description: this.props.description,
        author: this.props.author
      }
    );

    // Copy test files
    this.fs.copyTpl(
      this.templatePath("test/**/*"),
      this.destinationPath(`${this.props.name}/test`),
      {
        appName: this.props.name,
      }
    );

    // Copy config files
    this.fs.copy(
      this.templatePath("nest-cli.json"),
      this.destinationPath(`${this.props.name}/nest-cli.json`)
    );
    this.fs.copy(
      this.templatePath("tsconfig.json"),
      this.destinationPath(`${this.props.name}/tsconfig.json`)
    );
    this.fs.copy(
      this.templatePath("readme.md"),
      this.destinationPath(`${this.props.name}/readme.md`)
    );
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath(`${this.props.name}/package.json`),
      {
        name: this.props.name,
        description: this.props.description,
        author: this.props.author
      }
    );
    this.fs.copy(
      this.templatePath("tsconfig.json"),
      this.destinationPath(`${this.props.name}/tsconfig.json`)
    );
    this.fs.copy(
      this.templatePath("tsconfig.build.json"),
      this.destinationPath(`${this.props.name}/tsconfig.build.json`)
    );
  }

  install() {
    var npmdir = `${process.cwd()}/${this.props.name}`;
    process.chdir(npmdir);
    this.installDependencies({
      bower: false
    });
  }
};
