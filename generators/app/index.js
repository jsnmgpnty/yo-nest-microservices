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
        name: "appPort",
        message: "What port would you like your app to use for local development?",
        default: "3000"
      },
      {
        type: "input",
        name: "appTitle",
        message: "What is the title of your project?",
        default: ""
      },
      {
        type: "input",
        name: "useRedis",
        message: "Do you want to use Redis? (Y/N)",
        default: "Y"
      },
      {
        type: "input",
        name: "useOpenApiSources",
        message: "Do you want to use OpenAPI spec sources? (Y/N)",
        default: "Y"
      },
      {
        type: "input",
        name: "useRabbitMq",
        message: "Do you want to use RabbitMQ? (Y/N)",
        default: "Y"
      },
      {
        type: "input",
        name: "useStorage",
        message: "Do you want to use Azure Storage? (Y/N)",
        default: "Y"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // Copy main.ts
    this.fs.copyTpl(
      this.templatePath("src/main.ts"),
      this.destinationPath(`${this.props.name}/src/main.ts`)
    );
    // Copy config.ts
    this.fs.copyTpl(
      this.templatePath("src/config-helper.ts"),
      this.destinationPath(`${this.props.name}/src/config-helper.ts`),
      {
        useRabbitMq: this.props.useRabbitMq.toLowerCase() === 'y',
        useRedis: this.props.useRedis.toLowerCase() === 'y',
        useOpenApiSources: this.props.useOpenApiSources.toLowerCase() === 'y',
        useStorage: this.props.useStorage.toLowerCase() === 'y',
      }
    );
    this.fs.copyTpl(
      this.templatePath("src/config-options.ts"),
      this.destinationPath(`${this.props.name}/src/config-options.ts`),
      {
        useRabbitMq: this.props.useRabbitMq.toLowerCase() === 'y',
        useRedis: this.props.useRedis.toLowerCase() === 'y',
        useOpenApiSources: this.props.useOpenApiSources.toLowerCase() === 'y',
        useStorage: this.props.useStorage.toLowerCase() === 'y',
      }
    );
    // Copy app module
    this.fs.copyTpl(
      this.templatePath("src/app/**/*"),
      this.destinationPath(`${this.props.name}/src/app`),
      {
        useRabbitMq: this.props.useRabbitMq.toLowerCase() === 'y',
        useRedis: this.props.useRedis.toLowerCase() === 'y',
        useOpenApiSources: this.props.useOpenApiSources.toLowerCase() === 'y',
        useStorage: this.props.useStorage.toLowerCase() === 'y',
      }
    );
    // Copy common module
    this.fs.copyTpl(
      this.templatePath("src/common/**/*"),
      this.destinationPath(`${this.props.name}/src/common`)
    );
    // Copy example module
    this.fs.copyTpl(
      this.templatePath("src/example/**/*"),
      this.destinationPath(`${this.props.name}/src/example`),
      {
        useRabbitMq: this.props.useRabbitMq.toLowerCase() === 'y',
        useRedis: this.props.useRedis.toLowerCase() === 'y',
        useOpenApiSources: this.props.useOpenApiSources.toLowerCase() === 'y',
        useStorage: this.props.useStorage.toLowerCase() === 'y',
      }
    );
    // Copy logging module
    this.fs.copyTpl(
      this.templatePath("src/logging/**/*"),
      this.destinationPath(`${this.props.name}/src/logging`)
    );
    // Copy public module
    this.fs.copyTpl(
      this.templatePath("src/public/**/*"),
      this.destinationPath(`${this.props.name}/src/public`),
      {
        appTitle: this.props.name,
        description: this.props.description,
        author: this.props.author
      }
    );
    // Copy public module
    this.fs.copyTpl(
      this.templatePath("src/utils/**/*"),
      this.destinationPath(`${this.props.name}/src/utils`)
    );
    if (this.props.useRabbitMq.toLowerCase() === 'y') {
      // Copy messaging module
      this.fs.copyTpl(
        this.templatePath("src/messaging/**/*"),
        this.destinationPath(`${this.props.name}/src/messaging`)
      );
    }
    if (this.props.useRedis.toLowerCase() === 'y') {
      // Copy redis module
      this.fs.copyTpl(
        this.templatePath("src/redis/**/*"),
        this.destinationPath(`${this.props.name}/src/redis`)
      );
    }
    if (this.props.useStorage.toLowerCase() === 'y') {
      // Copy storage module
      this.fs.copyTpl(
        this.templatePath("src/storage/**/*"),
        this.destinationPath(`${this.props.name}/src/storage`)
      );
    }
    if (this.props.useOpenApiSources.toLowerCase() === 'y') {
      // Copy open api connector module
      this.fs.copyTpl(
        this.templatePath("src/open-api-connector/**/*"),
        this.destinationPath(`${this.props.name}/src/open-api-connector`)
      );
    }

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
    this.fs.copyTpl(
      this.templatePath(".env"),
      this.destinationPath(`${this.props.name}/.env`),
      {
        useRabbitMq: this.props.useRabbitMq.toLowerCase() === 'y',
        useRedis: this.props.useRedis.toLowerCase() === 'y',
        useOpenApiSources: this.props.useOpenApiSources.toLowerCase() === 'y',
        useStorage: this.props.useStorage.toLowerCase() === 'y',
        appName: this.props.name,
        appDescription: this.props.description,
        appTitle: this.props.appTitle,
        appPort: this.props.appPort,
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
