# NHS.UK Frontend Library (Alpha)

[![Greenkeeper badge](https://badges.greenkeeper.io/nhsuk/frontend-library.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/nhsuk/frontend-library.svg?branch=master)](https://travis-ci.org/nhsuk/frontend-library)

> Version 2 of the frontend library, application non-specific.

This repo has two main purposes:
* Generate shareable `css` and `js` assets for use by others
* Provide a development environment for reviewing changes to those assets

In order to achieve these objectives the repo is built on
[Brunch](http://brunch.io/). Additional information about the decision to use
Brunch can be found in the [ADR record](./doc/adr/0003-use-brunch.md).

The demo site is available as a [GitHub Pages](https://pages.github.com/) site
[https://nhsuk.github.io/frontend-library/](https://nhsuk.github.io/frontend-library/).
The site is updated automatically by [Travis CI](https://travis-ci.org/) via
[GitHub Pages Deployment](https://docs.travis-ci.com/user/deployment/pages/).
The deployment happens when a change is made to `master`. `master` is a
protected branch and changes are only able to be applied via a reviewed Pull
Request. The deployment to the GitHub Pages site uploads all artefacts in
`./public` to the `gh-pages` branch. This is configured in `.travis.yml`.

## Install

* Clone the repo: `git clone https://github.com/nhsuk/frontend-library.git`
* Install dependencies: `cd frontend-library && ./scripts/bootstrap`

## Usage

* Start the server in development mode: `./scripts/start`
* View the site in a browser: `open http://localhost:3333`

## Architecture Decision Records

This repo uses
[Architecture Decision Records](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions)
to record architectural decisions for this project.
They are stored in [doc/adr](doc/adr).
