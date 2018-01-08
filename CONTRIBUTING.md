# Contributing to `redux-coreapi`

Contributions to `redux-coreapi` in any form are appreciated. When making
contributions, please adhere to the guidelines below and the
[code of conduct](./CODE_OF_CONDUCT.md).

## Reporting bugs

File bug reports on [GitHub](https://github/bitsick/redux-coreapi/issues). Good
bug reports should include, at a minimum, the following:

* A concise title describing what expected behavior is failing
* A list of clear steps to reproduce the problem
* The expected outcome of the listed steps
* The observed outcome of the listed steps
* If the offending behavior produces one, a stack trace

## Contributing code

### Style

When making changes, match the style of existing code and follow these
guidelines:

* Indent two spaces
* Limit lines to 80 characters (when it makes sense)
* Use single quotes
* Omit semicolons
* Document everything using the [jsdoc](http://usejsdoc.org) format

### Tests

Any behavioral changes should also have accompanying unit tests.

After making changes, run `$ npm run prepare` to lint the code, run tests,
generate new documentation, and build the project. Changes that fail at any of
these steps will not be accepted.

### Commits

When committing, follow the guidelines
[here](https://chris.beams.io/posts/git-commit/) for writing good commit
messages. If the change is to address a bug,
[say as much](https://help.github.com/articles/closing-issues-using-keywords/)
in the commit message.

### Pull requests

Once the changes are complete and committed, submit pull requests on
[GitHub](https://github.com/bitsick/redux-coreapi/pulls).

## Improving documentation

Documentation improvements from fixing typos and missing punctuation to full
translations are welcome. All documentation is expected to be free from
spelling and grammar errors.
