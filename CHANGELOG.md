# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.0.4"></a>
## [0.0.4](https://github.com/acburdine/denali-mailer/compare/v0.0.3...v0.0.4) (2017-05-12)


### Bug Fixes

* **build:** fix babel config ([bc517db](https://github.com/acburdine/denali-mailer/commit/bc517db))
* **mailer:** various code fixes ([667f848](https://github.com/acburdine/denali-mailer/commit/667f848))



<a name="0.0.3"></a>
## [0.0.3](https://github.com/denali-js/denali-mailer/compare/v0.0.1...v0.0.3) (2017-02-20)


### Bug Fixes

* use initializer to setup transport + bugfixes ([138e372](https://github.com/denali-js/denali-mailer/commit/138e372))



<a name="0.0.1"></a>
## 0.0.1 (2016-11-07)


### Bug Fixes

* add logger getter to mailer class ([ec4be35](https://github.com/denali-js/denali-mailer/commit/ec4be35))
* build creating both files ([a294317](https://github.com/denali-js/denali-mailer/commit/a294317))
* drop .js extension from container lookups of templates ([56d7112](https://github.com/denali-js/denali-mailer/commit/56d7112))
* ejs function ([99724a6](https://github.com/denali-js/denali-mailer/commit/99724a6))
* fix export syntax for precompiled templates ([f48cab4](https://github.com/denali-js/denali-mailer/commit/f48cab4))
* fix reference to sentMails on test transport ([6ec3e74](https://github.com/denali-js/denali-mailer/commit/6ec3e74))
* make sure promises are returned throughout each layer ([3379526](https://github.com/denali-js/denali-mailer/commit/3379526))
* Move denali-build to toplevel ([c9aa221](https://github.com/denali-js/denali-mailer/commit/c9aa221))
* path to main file (dist no longer required) ([0836bad](https://github.com/denali-js/denali-mailer/commit/0836bad))
* Remove index and fix main path (#2) ([7407966](https://github.com/denali-js/denali-mailer/commit/7407966)), closes [#2](https://github.com/denali-js/denali-mailer/issues/2)
* remove leftover emitter code from test transport ([b37f5a2](https://github.com/denali-js/denali-mailer/commit/b37f5a2))
* Replace unavailable this.lookup with container ([c610e87](https://github.com/denali-js/denali-mailer/commit/c610e87))
* revert ejs file to es module ([9a00c0a](https://github.com/denali-js/denali-mailer/commit/9a00c0a))
* Update babel to latest preset (#3) ([dc8c973](https://github.com/denali-js/denali-mailer/commit/dc8c973))
* update builder to use processEach hook ([ba521be](https://github.com/denali-js/denali-mailer/commit/ba521be))
* update package exports ([c39d1aa](https://github.com/denali-js/denali-mailer/commit/c39d1aa))
* **blueprint:** remove to: and add subject: to mailer blueprint ([55a809d](https://github.com/denali-js/denali-mailer/commit/55a809d))


### Features

* add htmlContent, textContent, and subject accessors to sent mail object ([0f2a5a4](https://github.com/denali-js/denali-mailer/commit/0f2a5a4))
* add test helper to inspect emails sent through test transport ([ec1c3ba](https://github.com/denali-js/denali-mailer/commit/ec1c3ba))
* add test transport and default to it in test environment ([b433921](https://github.com/denali-js/denali-mailer/commit/b433921))
* default to base mailer class if none is provided ([f75cbe4](https://github.com/denali-js/denali-mailer/commit/f75cbe4))
* drop hardcoded test behavior from mailer (use the test transport instead), and allow config functions that return a transport ([6232605](https://github.com/denali-js/denali-mailer/commit/6232605))
* Export mailer class for consumption (#4) ([155a114](https://github.com/denali-js/denali-mailer/commit/155a114))
* first pass at mailer implementation ([c938c12](https://github.com/denali-js/denali-mailer/commit/c938c12))
* mailer defaults to `to` and `from` of supplied data ([7b06050](https://github.com/denali-js/denali-mailer/commit/7b06050))
