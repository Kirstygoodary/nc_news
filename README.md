# The Good News.inc

Welcome to the Good News.inc, a fictional news website, built as part of a week-long coding sprint to showcase my skills as a back-end Javascript developer. Please feel free to fork, clone and play around!

You can also find the online version of the app  [here](https://nc-news-frontend-kg.herokuapp.com/).

## Getting Started

To get your own copy of the project up-and-running, you'll need to clone the  [repository](https://github.com/Kirstygoodary/nc_news)  from github. For more information on how to do this, click  [here](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).

### [](https://github.com/Kirstygoodary/nc_news#prerequisites)Prerequisites

In order to begin using the project, you will need an Integrated Coding Environment (or IDE) installed on your computer. I used Microsoft's  [VS Code](https://code.visualstudio.com/), but you could use any IDE which is compatible with NPM and javascript.

It would also be a good idea to install  [git](https://git-scm.com/)  on your computer. if you're using a Mac, you would open terminal and enter the following command:

```
npm install git -g

```

Once git is installed, you can clone the repository by navigating Terminal to the folder you wish to clone to and entering the following command:

```
git clone https://github.com/Kirstygoodary/nc_news

```

This should download the project to your chosen folder and you can open it with VSCode

### [](https://github.com/Kirstygoodary/nc_news#installing)Installing

Before you can start using the project, you will need to install some libraries which the project requires. The file package.json contains entries for each one, but they can be installed automatically by entering the following command into Terminal:

```
npm install

```

Before you can being testing the project, you will need to seed the databases. It would be best to seed in a 'test' environment at first, so the examples here will be along those lines. This can be done with some predefined scripts which are saved in package.json:

```
npm run setup-dbs

```

```
npm run seed-test

```

The test database should now be populated with data.

To test the functionality, you can start the server by entering:

```
npm run nodemon-start

```

This will start the server listening on Port 9090. Opening a web browser and navigationg to  [http://localhost:9090](http://localhost:9090/)  should bring up the server's landing page.

## [](https://github.com/Kirstygoodary/nc_news#running-the-tests)Running the tests

NC-News comes pre-laoded with a suite of tests designed to report the functionality of the system. These include tests for the various endpoints of the server, internal error handling and the various util functions used for data handling. The testing scripts are provided for you. Enter the command below to run tests on all endpoints and utils:

```
npm test

```

Alternatively, you can test the util functions in isolation by entering:

```
npm run test-utils

```

## [](https://github.com/Kirstygoodary/nc_news#built-with)Built With

-   [Knex](http://knexjs.org/)
-   [Express JS](http://www.https//www.expressjs.com/)
-   [PSQL](https://www.postgresql.org/)


## [](https://github.com/Kirstygoodary/nc_news#contributing)Contributing

NC News is not currently open for contributions.

## [](https://github.com/Kirstygoodary/nc_news#authors)Authors

-   **Kirsty Goodary**  -  [GitHub](https://github.com/kirstygoodary)

## [](https://github.com/Kirstygoodary/nc_news#acknowledgments)Acknowledgments

-   Many thanks to all at Northcoders for their support and guidance with this project
