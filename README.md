# Hyrule Archives

#### A full-stack web application for user-generated content about The Legend of Zelda: Tears of the Kingdom.
<img src="./public/Screenshot 2023-06-11 at 3.25.25 PM.png" alt="Landing Page"/>
<img src="./public/Screenshot 2023-06-11 at 3.28.25 PM.png" alt="Monsters Index Page"/>
<img src="./public/Screenshot 2023-06-11 at 4.12.44 PM.png" alt="Show page monster"/>
<img src="./public/Screenshot 2023-06-11 at 4.16.47 PM.png" alt="Login"/>

## Description
Hyrule Archives is an old-school video game site for the game The Legend of Zelda: Tears of the Kingodm. It allows users to contribute to the Hyrule Compendium entries(monsters, creatures, equipment, materials), add Korok locations and write shrine guides. It features full-crud operations of seven models, a public user profile, login/logout features and a responsive mobile design.

## Table of Contents                                                                 
* [Technologies Used](#technologiesused)
* [Features](#features)
* [Project Next Steps](#nextsteps)
* [Deployed App](#deployment)
* [Wireframes](#wireframes)
* [Installation](#installation)
* [User Stories](#userStories)
* [MVP Goals](#mvpGoals)
* [Stretch Goals](#stretchGoals)

## <a name="technologiesused"></a>Technologies Used
[![My Skills](https://skillicons.dev/icons?i=javascript,nodejs,html,css,express,mongodb,nextjs,react,vercel&theme=light)](https://skillicons.dev)
* JavaScript
* HTML5
* CSS3
* Node.Js
* MongoDB
* Next.js
* React.js
* Express.js
* RESTful Routes


## Features
* Logged in users can do full crud operations on 7 different models.
* All site content can be viewed by users that are not logged in.
* User profiles, with avatars and all content additions attributed to that user.
* Ability to search through compendium entries.
* Responsive for mobile.


## <a name="nextsteps"></a>Project Next Steps
* Forums/message boards
* Continued improvements in CSS
* Ability to add articles/blog posts


## <a name="deployment"></a>Deployed Link
* [Deployment Link](https://hyrule-archives-frontend.vercel.app/)

* You can view the repository:
[Github.com](https://github.com/markjt031/hyrule-archives-frontend)

## <a name="installation"></a>Installation

- Run npm i to install dependencies( 
- List of dependencies:
    @fortawesome/fontawesome-svg-core": "^6.4.0",  
    "@fortawesome/free-solid-svg-icons": "^6.4.0",  
    "@fortawesome/react-fontawesome": "^0.2.0",  
    "date-fns": "^2.30.0",  
    "eslint": "8.41.0",  
    "eslint-config-next": "13.4.4",  
    "font-awesome": "^4.7.0",  
    "next": "13.4.4",  
    "react": "18.2.0",  
    "react-dom": "18.2.0"  
- Add a .env file with a variable FETCH_URL with the value of https://hyrule-archive.herokuapp.com/

## <a name="wireframes"></a>Wireframes
- Landing Page
<img width="517" alt="Screenshot 2023-05-20 at 10 17 06 AM" src="https://media.git.generalassemb.ly/user/46786/files/d783d154-15cf-4839-88e0-3a2ceb866495">

- Landing Page(menu active)
<img width="832" alt="Screenshot 2023-05-20 at 10 23 51 AM" src="https://media.git.generalassemb.ly/user/46786/files/8aa6f38b-a325-4190-a869-12af33c07067">

- Login Page
<img width="852" alt="Screenshot 2023-05-20 at 10 41 41 AM" src="https://media.git.generalassemb.ly/user/46786/files/9b46f687-c570-4a56-b25a-920a8f51c586">

- Register
<img width="850" alt="Screenshot 2023-05-20 at 10 45 24 AM" src="https://media.git.generalassemb.ly/user/46786/files/2513e2b7-a572-4fcd-947c-463cbf576548">

- Show Page Example
<img width="824" alt="Screenshot 2023-05-20 at 11 02 29 AM" src="https://media.git.generalassemb.ly/user/46786/files/58c9651e-b99e-4da7-85c8-8e5526a69daf">

- Form Page Example
<img width="656" alt="Screenshot 2023-05-20 at 11 21 58 AM" src="https://media.git.generalassemb.ly/user/46786/files/1fb3a9ab-884a-41f0-9332-6f69b743cf40">



## <a name="userStories"></a>User Stories

- AAU, I can use a secure login to access my account
- AAU, I can find information on the site organized by category so that I can easily find it
- AAU, I can search for items by name so that I can easily find it.
- AAU, I can contribute to the site by adding missing items or edit out errors in the site's information.
- AAU, I can see my contributions on my user profile so that I can access them.
- AAU, I can delete my own contributions that have been made in error.
- AAU, I can edit my contributions that have been posted.


## <a name="mvpGoals"></a>MVP Goals
- :white_check_mark: Working user authentication.
- :white_check_mark: A more visually appealing website than the wireframes.
- :white_check_mark: Full CRUD on all of the models except users
- :white_check_mark: Responsive for mobile, tablets, and wide screens(designed mobile-first)
- :white_check_mark: Semantic HTML used
- :white_check_mark: At least 50 database entries created.

## <a name="stretchGoals"></a>Stretch Goals
- A more detailed database than what is listed above included cooking recipes and weapon fusions.
- Add multiple different solutions to shrine puzzles through a one-to-many association(make the shrine model contain an array  of solution models).
- :white_check_mark: I want to make the "form" for inputting shrine walkthroughs to be in a variable amount of "blocks" where each block has its own body text and images that can be uploaded.
- :white_check_mark: Collect LOTS of in-game images and Hyrule Compendium data in-game.
- :white_check_mark: User profile pages
    
