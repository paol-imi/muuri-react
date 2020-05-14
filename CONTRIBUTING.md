# Contributing to Muuri-react

Thanks for the interest in contributing to Muuri-react! Here you will find some instructions on how to create an issue or a pull request.

## Creating an issue

### Is related to Muuri?

Muuri-react is based on the [Muuri](https://github.com/haltu/muuri) layout engine which is used internally. If your issue is related to the layout, sorting or any other feature of Muuri please open the [issue](https://github.com/haltu/muuri/issues) in the Muuri repository.

### Questions

You should check out the existing [questions](https://github.com/paol-imi/muuri-react/issues?q=label%3Aquestion%20) and see if your question has been asked/answered already. If not, you can [create a new issue](https://github.com/paol-imi/muuri-react/issues/new) and explain the problem you're facing.

### Improvements

Improvement ideas are always welcome! Please check first the existing [ideas](https://github.com/paol-imi/muuri-react/issues?utf8=%E2%9C%93&q=label%3Aidea) and [enhancements](https://github.com/paol-imi/muuri-react/issues?q=label%3Aenhancement) so that you won't be creating a duplicate issue.

### Bugs

Please [create an issue](https://github.com/paol-imi/muuri-react/issues/new) and explain the bug in detail. If possible create a [reduced test case](https://css-tricks.com/reduced-test-cases/) and share a link to it. You can, for example, fork this [Codesandbox](https://codesandbox.io/s/muuri-react-grid-1czo5) example and modify it to demonstrate the bug.

## Creating a pull request

1. **Discuss first.**
   - The first step should always be [creating a new issue](https://github.com/haltu/muuri/issues/new) and discussing your pull request suggestion with the authors and the community.
   - After you get green light it's time to get coding.
2. **Fork the repo and create a new branch for your pull request.**
   - [Fork Muuri-react](https://github.com/paol-imi/muuri-react).
   - Create a new branch for your pull request from the master branch. The name of the pull request branch should start with the id of the issue you opened for the pull request (e.g. `#123-fix-something`).
3. **Setup the development environment.**
   - Run `npm install` in the repository's directory.
   - You can now run the following commands:
     - `npm run build`
       - Builds `build/index.js` from `src` directory.
     - `npm run eslint`
       - Lints all files in `src`, `test` and `examples` directories with ESLint.
     - `npm run prettier`
       - Formats all files in `src`, `test` and `examples` directories with Prettier.
     - `npm run test`
       - Runs unit tests for `src`.
4. **Do the updates in `src` folder.**
   - Now is the time to make the actual updates to Muuri.
   - Remember scope. Don't refactor things that are not related to the pull request.
   - After you're done update tests and docs (`README.md`) if necessary.
5. **Format, build and test changes.**
   - Run `npm run format`, `npm run build` and finally `npm run test`.
6. **Create the pull request.**
   - Do your best to explain what the pull request fixes.
   - Mention which issue(s) will be closed by the pull request, e.g. `Closes #123`.
   - After your pull request is accepted it will be merged to the [dev branch](https://github.com/paol-imi/muuri-react/tree/dev) and released with the next release. If you did only some minor change in the documentation it may be merged directly to the master branch.
7. **You made it! Thank you so much for contributing to Muuri-react!**
