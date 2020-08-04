# fullstack-hy2020-backend

Backend part of Full Stack Open Course 2020 at University of Helsinki

This repo is used for excercises handing-in.

## Exercises 3.1.-3.22.

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

## Step 5

Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.

Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate id's is small.

## Step 6

Implement error handling for creating new entries. The request is not allowed to succeed, if:

- The name or number is missing
- The name already exists in the phonebook

Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error.

## Step 7

Add the [morgan](https://github.com/expressjs/morgan 'expressjs/morgan') middleware to your application for logging. Configure it to log messages to your console based on the _tiny_ configuration.

## Step 8

Configure morgan so that it also shows the data sent in HTTP POST requests

This exercise can be completed in a few different ways. One of the possible solutions utilizes these two techniques:

- [creating new tokens](https://github.com/expressjs/morgan#creating-new-tokens 'Morgan with new Tokens')
- [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify 'JSON Stringify')

## Step 9

Make the backend work with the frontend from the previous part. Do not implement the functionality for making changes to the phone numbers yet, that will be implemented in exercise 3.17.

You will probably have to do some small changes to the frontend, at least to the URLs for the backend.

## Step 10

Deploy the backend to the internet, for example to Heroku.

https://thawing-fjord-84910.herokuapp.com/api/persons

## 3.11 Phonebook Full Stack

Generate a production build of your frontend, and add it to the internet application.

**NB** Make sure the directory build is not gitignored

Also make sure that the frontend still works locally.

## 3.12 Command-line database

Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas.

Create a _mongo.js_ file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

The application should work as follows. You use the program by passing three command-line arguments (the first is the _database password_, 2nd is _name_, 3rd is _number_)

```javascript
node mongo.js DB_PASSWORD Anna 040-1234556
```

As a result, the application will print

```javascript
added Anna number 040-1234556 to phonebook
```

If the password is the only parameter given to the program, then the program should display all of the entries in the phonebook.

```javascript
phonebook:
Anna 040-1234556
Arto Vihavainen 045-1232456
Ada Lovelace 040-1231236
```

## 3.13 Phonebook database, step1

Change the fetching of all phonebook entries so that the data is _fetched from the database_.

In the following exercises, write all Mongoose-specific code into its own module, just like we did in the chapter [Database configuration into its own module](https://fullstackopen.com/en/part3/saving_data_to_mongo_db#database-configuration-into-its-own-module).

## 3.14 Phonebook database, step2

Change the backend so that new numbers are _saved to the database_. Verify that your frontend still works after the changes.

At this point, you can choose to simply allow users to create all phonebook entries. At this stage, the phonebook can have multiple entries for a person with the same name.

## 3.15 Phonebook database, step3

Change the backend so that deleting phonebook entries is reflected in the database.

Verify that the frontend still works after making the changes.

## 3.16 Phonebook database, step4

Move the error handling of the application to a new error handler middleware.

## 3.17 Phonebook database, step5

If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL.

Modify the backend to support this request.

Verify that the frontend works after making your changes.

## 3.18 Phonebook database, step6

Update the handling of the _api/persons/:id_ and _info_ routes to use the database, and verify that they work directly with the browser, Postman, or VS Code REST client.

## 3.19 Phonebook database, step7

Add validation to your phonebook application, that will make sure that a newly added person has a unique name.

Mongoose does not offer a built-in validator for this purpose. Install the mongoose-unique-validator package with npm and use it instead.

If an HTTP POST request tries to add a name that is already in the phonebook, the server must respond with an appropriate status code and error message.

**NB:** unique-validator causes a warning to be printed to the console, find out how to get rid of the warning.

```
(node:49251) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
connected to MongoDB
```

## 3.20 Phonebook database, step8

Expand the validation so that the name stored in the database has to be at least three characters long, and the phone number must have at least 8 digits.

Expand the frontend so that it displays some form of error message when a validation error occurs. Error handling can be implemented by adding a _catch_ block.

## 3.21 Deploying the database backend to production

Generate a new "full stack" version of the application by creating a new production build of the frontend, and copy it to the backend repository. Verify that everything works locally by using the entire application from the address https://localhost:3001.

Push the latest version to Heroku and verify that everything works there as well.

## 3.22 Lint configuration

Add ESlint to your application and fix all the warnings.
