# Social-Network-Api

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

[Description](#description)<br>
[Installation](#installation)<br>
[User Story](#user-story)<br>
[Acceptance Criteria](#acceptance-criteria)<br>
[Questions](#questions)<br>
[Links](#links)<br>
[License](#license)<br>

## Description

An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. To test the routes, run the command:

```
npm start
```

## Installation

**_Requirments_**

[Mongoose](https://www.npmjs.com/package/mongoose) | [Express](https://www.npmjs.com/package/express) | [Postman](https://www.postman.com/downloads/)

**_Initial Cloning/Download:_**

1. Clone the repository or download the zipfile from Github.
2. Open the file/repo in your preferred code editor.

**_Starting the Server:_**

1. Open the intergrated terminal in the root folder.
1. Run the command `npm i` to install any necessary packages.
1. Run the command `npm run seed` to drop existing data and populate the database.
1. Run the command `npm start` to start the server.

## User Story

```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Questions

What is my github repository?<br>
https://github.com/nguyent0275

What is my email and how can you reach me?<br>
My email is nguyentoan0275@gmail.com, please feel free to send me an email with any questions regarding projects or colllaborations.

## Links

![Postman Routes](/assets/images/postman-routes.png)

A link to the [Video](https://www.youtube.com/watch?v=pJiMb1ZDbV4):

```
https://www.youtube.com/watch?v=pJiMb1ZDbV4
```

A link to the [repository](https://github.com/nguyent0275/social-network-api):

```
https://github.com/nguyent0275/social-network-api
```

## License

Social-Network-Api is licensed under the MIT (or any later version). Refer to the LICENSE.txt.
