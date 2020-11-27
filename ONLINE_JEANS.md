## Architecture

Data stored in a relational db so that queries can be made across different tables easily

GraphQL sitting on top to provide the FE with a custom query solution which it understands and can build up queries on the fly

FE application to be web app, either working in the browser, in electron or in a PWA.

## Design

Data primarily driven by a date picker and a free text search with the user having the ability to build up their query (similar to the human readable query search in Jira...)

## Selection of libraries

#### graphQL and apollo

- Gives you the flexibility with queries so you can adapt them on the fly based on the sales teams' needs.
- Allows the FE to build up requests easily in a language it understands. Will therefore make the code cleaner and easier to maintain
- Combine requests to multiple APIs into one request

#### react

React in the FE. Possibly a state management tool, depending on the sales teams' needs. If it's simply a case of displaying what the server is giving you, then perhaps no state management is required.

#### styled components

A css-in-js library to allow for easier manipulation of styles based on app logic. Allows the FE application to be built as a JS bundle which makes the app easier to be consumed by applications running on native or web applications.

#### storybook

Aid FE development. Encourages shareable components. Allows designers to interact with components.

## Visualization of the data

#### d3 or react-d3-library

Possibly require a version of d3 built upon react, so that it integrates easier.

I would also look into _observableHQ_ as it has some nice visualisations, but might be overkill

## Testing considerations

To cover the testing pyramid in the FE

#### jest + RTL

For unit testing and integration testing in React

#### cypress

For automation testing. Cypress is built using JS and therefore is run in an environment it understands.

#### miragejs

I would also use miragejs to mock out the API requests for testing and for developing locally
