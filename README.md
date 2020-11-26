This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

### `npm i` then `npm start`

## Explanation

If you make any change to the app, it calls a redux action which updates the store with that change.

Any change in the store triggers a piece of middleware which dumps it into local storage.

If you refresh the app, your changes will be persisted as the first thing the app does is grabs the local storage and dumps it into the store.

## Improvements

I have to admit, if this was to be built for production, there is a change I would consider making. (Well, of course, other than the fact it's only saved in the local storage!)

The problem with making the change to the store AND THEN trying to dump the store in a db is that data could become out of sync if the call to the db fails (the store would be more up to date than the db). **This means there isn't really a single source of truth**

So, if this was a 'proper' app, I would probably prefer the FE to call a BE using a rest API to update the db and then the FE to be told by the BE what the latest todo list looks like. **This means the source of truth would be the db.**

The reason I did it the way I did in this exercise is to focus more on my state management skillz (which is what I am assuming this exercise is all about) as if I had gone down the 'proper' API / BE route, a fair bit of logic would've been stripped out of the FE and put into the BE.

I also considered using [mirage js](https://miragejs.com/) as it looks cool.

## Tests

I have written two types of tests. Unit, using jest, and automation, using cypress. The cypress tests especially don't cover everything, but are used more as a smoke test to make sure the basic functionality is working. I could've added integration tests using react-testing-library too but I feel like I have to pull myself away from this exercise now!

### `npm test`

Runs unit tests.

### `npm cypress:open`

Runs e2e tests.
