## Run the app!

- npm start
- env variables needed to run app REACT_APP_PROVIDERS_API REACT_APP_CHILDREN_API (providers/children)

## Run tests

- npm test

## Initial approach

- Write down the four user stories as test cases in app.test.js
- Do a couple low level mockups of how a potential flow of the user journey could look like
- Once I was content with a base flow, I annotated my sketch with how they'd sit together in the file structure and determine where business logic will sit (i.e. what kind of state would be needed in dashboard-profile-details vs dashbboard-minders-lists).

## Issue of design

- The biggest issue I had was determining whether to use a Table or a list item view. Material UI does offer quick filtering tables but I wanted to make sure filtering and sorting had the same structure and control flows. Also there is a lot of work needed to customise material ui tables in a way that could also scale from a pure UI standpoint - notably using icons.
- I decided on List items with the help of menu items to toggle through filtering/sorting options
- Given the responsive nature of the app, I was aiming for the best experience for mobile and desktop at the lowest cost. Hence why I chose the combination of floating action buttons & modals to cover user stories 3 & 4 avoiding any unnecessary additional design/development work needed to address screen sizes.

## Architecture

The start of the flow starts with Apps.js. In App.js we call and manipulate the data to be passed down into the Dashboard component which acts as a container for the UI components and business logic.

I determined that the entry point of search would be via the childminders and so I mapped enrollment information inside of the available childminder data structure. The benefit of this was to avoid unnecessary loops over the data when filtering for a particular minder/child lower in the component tree and just have the data available in props - allowing deeper nested components to act as pure functions. For example, converting dob to age in App.js means we don't convert it by X amount of times the modal is opened/reopened when showing personal information.

The post call to add another user is also handled in App.js and not in the dashboard because state is only changed in App.js with the dashboard page only accepting props.

The filter and sort functionality sit in separate hooks within the dashboard page and follow the same pattern, passing control and values into the 'select-options'. The use of hooks here means we can easily scale up other filtering/sorting functionality by adding additional hooks. For example, if we were to add 'sort by closest childminder', we'd just need to pass the array, and call 'arr.sort(sortByLocationUtil)' - once we have the specific logic for geolocation.

The form to fill out the new user is created using react-hook-forms. The fields sit in a separate folder 'form-fields' and any additional fields needed can added by referencing the type of input component and adding additional custom validation if necessary - like what we have done with date of birth input.

The components content is setup to be independent of the pages' content! Forms for example, is not exclusive to our dashboard page and can be used in a separate page just by creating a 'form-fields' file.

There is a service file created just to hold the API calls and pull in the relevant data from the response. Though this wasn't absolutely necessary at this scale of an app, I done this just for the readability of code in App.js.

## Testing

I follow the Kent Dodds approach to testing meaning I like to test as much of a journey within a specified test block - instead of testing independent components. As mentioned, I first wrote up the cases for the user stories, but these also cover edge case issues such as validation from the forms, error handling of failing to pull in data and failing to create a new user. By doing so, we have indirectly tested our components & utils.

## If I had more time

- Add pagination and/or lazy loading functionality given the amount of users we are pulling in at one time (Big one!)
- Refactor the snackbar alerts in App.js in to one scalable component
- Not use 'type="date"' for the forms due to compatibility with other browsers (perhaps use a reliable date picker dependency)
- Improve the truncation of the list item names to work in conjunction with media queries (i.e. long names are possible). I noticed this one relatively late when I added a 100 character name!
- Directly change the base of the material-ui styles at the root with 'Mui-' files (but this would probably be overkill for the scale of this project)
- Make sort case insensitive
- Improve the UI of the dashboard profile displaying personal information (ugly!)
- Reduce the amount of data used in testing. I used most of what was available from the endpoints and pasted it into the mock-data.js file. (It did slow down my test suite)
- Tighten up validation of the form (i.e. default values at 18 years old and disable lowering the age)
- Investigate why the circular progress loader is sometimes laggy
- etc, etc!!!
