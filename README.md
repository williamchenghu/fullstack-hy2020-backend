# fullstack-hy2020-backend

Backend part of Full Stack Open Course 2020 at University of Helsinki

This repo is used for excercises handing-in.

## Exercises 3.1.-3.8.

Run the exercise with:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

## Step 1

Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons

Notice that the forward slash in the route api/persons is not a special character, and is just like any other character in the string.

The application must be started with the command **npm start**.

The application must also offer an **npm run dev** command that will run the application and restart the server whenever changes are made and saved to a file in the source code.

## Step 2

Implement a page at the address http://localhost:3001/info to show the time that the request was received and how many entries are in the phonebook at the time of processing the request.

## Step 3

Implement the functionality for displaying the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5

If an entry for the given id is not found, the server has to respond with the appropriate status code.

## Step 4

Implement functionality that makes it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.

Test that your functionality works with either Postman or the Visual Studio Code REST client.
