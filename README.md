## Tatra Ridge - Educational application

<hr>
During one of our university classes, a good friend of mine asked me if I could make an application that would help him study the topology of Tatra Mountains, which he needs to study in order to pass an exam to become a mountain guide - which is his dream job. I happily accepted the challenge and that's how this application came to life!</br>

## The project

<hr>
The project currently consists of four major features:</br></br>
<li>Edit mode
<li>Learning mode
<li>Practice mode
<li>Game mode

Edit mode allows the user to put new pins on the map in one of four different shapes, as well as include the description of the particular topological object. It also allows the user to delete any previously placed pins.

Learning mode allows the user to study through previously placed pins in order to memorize the knowledge.

Practice mode hides the object's name, allowing the user to input what they think the object is. The app actively compares the input to the actual name of the object, returning information whether the user was correct or not in form of adequate colouring. In case the user doesn't know the correct answer - a button to check the answer allows to look it up.

Game mode is essentially just a pin randomizer, it randomly places one pin in a random order on the map, then on mouse left click the camera pans to the pin and asks the user for the correct answer. No more hints available at this stage - it's either right or wrong (indicated by green or red colour of the pin), after which the user can ask for another random pin by clicking the corresponding button.

## What I've learned

<hr>
The main thing I've learned was the use of the Leaflet library, which allowed me to create this interactive map. I also honed some of my previously attained Firebase skills, which was used for storage and database.

## Technologies

<hr>
<img align="center" alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/><img align="center" alt="JavaScript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/><img align="center" alt="React.js" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/><img align="center" alt="Firebase" src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black"/><img align="center" alt="Leaflet"  src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=Leaflet&logoColor=white"/><img align="center" alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/><img align="center" alt="Styled-components"  src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

## TODO

<hr>
There's many things I want to improve in the near future, some of them being:
<li> Overall structure of the project
<li> Better UI/UX, particularly in the Edit Mode
<li> An option to add polygons that would indicate the exact area of a pin corresponding to a valley
<li> Improve Game Mode with more seemless 'gameplay', where it automatically open the pin and focus the input, also allowing to 'play' using only keyboard. That would allow for faster playing overall, and effectively faster learning process.
<li> Tiling of the map. The image is huge and tiling it properly in Leaflet would increase the performance significantly.

## Resources

<hr>
<li> <a href="https://firebase.google.com/docs">Firebase documentation 🔥</a>
<li> <a href="https://react-leaflet.js.org/">Leaflet documentation 🍃</a>
<li> <a href="https://stackoverflow.com/">StackOverflow, as usual 🙃</a>
<li> <a href="http://pza.org.pl/download/314598.pdf">The incredible map of Tatra Mountains 🗺️</a>

## Thanks for reading!
