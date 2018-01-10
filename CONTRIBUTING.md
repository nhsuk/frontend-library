# Contribution Guidelines

Thanks for wanting to contribute to the repository. Please take the time to
read through this guide in order to make the process as easy as possible.

## Getting started

The first thing you want to do is review the guidance within the
[PULL_REQUEST_TEMPLATE](./.github/PULL_REQUEST_TEMPLATE.md). This will ensure
there is an issue already created, providing visibility to others working on
the project about what the change might entail and what impact that could have.

When an issue exists and the project maintainers are aware of the contribution
the next thing you want to do is to setup your local development environment.

## Development workflow

Fundamentally, the way to approach making changes to the code base is the same
regardless of whether you are a member of the GitHub Organisation or not. The
one difference is that non-members of the GitHub Org will need to fork the
repo due to lack or permissions on the main repo. Once the repo has been forked
the following guidance is the same.

- Clone the repo in the standard manner. The repo uses
  [Trunk Based Development](https://trunkbaseddevelopment.com/). This means
  `master` should be up to date and branched from for all new branches
- Ensure all tests run successfully
- Make all changes to a branch, that has been branched from `master`
- Branch conventions are to prepend either feature or fix to the name of the
  branch, depending on the nature of the change e.g. `feature/new-buttons` or
  `fix/ie-display`
- Review the
  [Git style guide](https://github.com/nhsuk/styleguides/blob/master/git.md) for
  additional guidance
- Each logical chunk of work should be added to the branch with a commit. It is
  much easier to see how the feature was built using this approach. Small
  commits also makes it easier to identify when bugs were introduced
- It is strongly encouraged to use a single emoji to start every commit
  message. See the other commits in the repo for examples
- When the feature is complete ensure all of the latest changes from `master`
  are included within the feature branch. This should be done via
  `git rebase -i master`
- With all of the latest changes included in the feature branch, ensure all
  tests still pass. At this point, the branch can be pushed to GitHub
  and a PR created
- As the branch is pushed to GitHub a number of automated checks
  which will be executed, some of which will be repeated (where appropriate)
  for the PR. Please ensure the pull request is completed as per the guidance 

## Code

- The best approach to making code changes is to match existing conventions and
  styles
- Clarity and verbosity is favoured over terseness e.g. do not use single
  character variable names instead use short but descriptive names

## Testing

- Where tests already exist, they should be extended to cover any additional
  functionality

## Browser support

Your code should be tested in the browsers listed below.

The lists are based on usage statistics for NHS Choices (current NHS.UK) and
represent approximately 95% of the most popular browsers.

Each browser is assigned a ‘level of support’ that your service should meet.
‘Compliant’ means your service must look as good as it does in other modern
browsers.

If a browser is assigned a ‘functional’ level of support, it means your service
might not look perfect but must still be usable.

‘Latest version’ refers to the latest stable version and the version immediately
before that.

### Desktop

| Operating system | Browser                          | Support   |
| ---------------- | -------                          | -------   |
| Windows          | Internet Explorer 8+             | Compliant |
|                  | Edge (latest version)            | Compliant |
|                  | Google Chrome (latest version)   | Compliant |
|                  | Mozilla Firefox (latest version) | Compliant |
| Mac OS X         | Safari 8+                        | Compliant |
|                  | Google Chrome (latest version)   | Compliant |
|                  | Mozilla Firefox (latest version) | Compliant |

### Small screen devices

| Operating system | Version | Browser           | Support   |
| ---------------- | ------- | -------           | -------   |
| iOS              | 7+      | Mobile Safari     | Compliant |
|                  |         | Google Chrome     | Compliant |
| Android          | 4.x     | Google Chrome     | Compliant |
|                  |         | Android Browser   | Compliant |
| Windows Phone    | 8.1     | Internet Explorer | Compliant |

## Anything else

If you have any questions about anything please get in touch with the repository maintainers.
