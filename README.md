# TODOs

1. clean up loops. Replace with 'forEach'?
2. break up main script with ES modules
3. separate views for id vis, tag vis, and table.
4. add GitHub page for index

# About:

Task for Data61 (v0.1.0)

My attempt to visualise a social network with data from `store.js`, and tag frequencies.

## author:

norman.vo@gmail.com

    #### Note:
    tags were normalised for what seemed like errors such as `;:().,`

## run the project

1. clone repo & pull branch ('datavis')
2. open index.html in localhost
3. click 'Add' to render follow-relationships. Continue clicking 'Add' to add more data and render 'tags' graph. A table of data is rendered at the bottom



## run test

- have you installed jest? `$ npm i -g jest`


- run token unit test: from project root `$ jest test/getData.test.js`


## bugs to fix

- first render bug

- labels on bar charts

- axes scaling on bar chart

- styles need more whitespace

- visualise the follower relationships as a vertical arc diagram - requires link data formatting (a bit complex at the moment)

- build tooling

- table rendering



## ideas for improvement



- re-think layout to allow more nodes to be displayed

- add support for older browsers (ES6 transpile)

- reduce loops, remove repetitive methods (overused loops)

- abstract out magic numbers, general code cleanup

- add toggle to sort/unsort tags

- Is the data case sensitive? Add toggle to re-render data with case-insensitive matching applied

- animation between data changes

- write better tests

