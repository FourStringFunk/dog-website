# Pupper picker
A go to website for dog owners for tools, resources, and facts.

## PROJECT DESCRIPTION
Being dog owners, our motivation is to encourage new dog owners or aspiring dog owners to adopt responsibly with all the information provided. Should the user already be a dog owner, to provide additional information and facts that they did not know already.

The website should start getting the user to think about or start the adoption process by providing information and directing them to the organization that is caring for the dog.

### Javier's Learning
What I learned is that I need a better system for debugging. Although console logging and checking the web console is helpful, I need a better tool or method for a bird's eye view for what is going on. I learned what a header is when requesting information via API calls. My favorite thing I learned is that you can clone a section of html using cloneNode. 

### Chris's Learning
I learned how to call data from multiple APIs and append the data to various page sections, both on page load and on page click. This was a good lessons in creating responsive design with bootstrap, laying out information, and working with github to resolve merge conflicts as well.

### USER STORY
- **AS AN** Aspiring/Current dog owner,

- **I WANT** An application that will get me started in my research prior to my adoption process.

- **SO THAT** I am fully informed before making a big decision. 

### ACCESSIBILITY CRITERIA
**GIVEN** I am a prospective dog owner,

- **WHEN** I visit Pupper Picker Home, 
    - **THEN** I want to be able to easily access breed information and search adoptable pets.
    - **THEN** Images and dog facts should automatically populate from an API
    - **THEN** The site should be a responsive design formatted for multiple device types.

- **WHEN** I visit Pupper Picker Breeds, 
    - **THEN** A list of breed buttons should populate from an API
    - **THEN** When I click on the breed buttons, breed stats should automatically populate in the Lifespan, Gender, and Traits section below.
    - **THEN** Fun facts about dogs should be populated from an API

- **WHEN** I visit the Pupper Picker Search, 
    - **THEN** I want to be able to see which dogs are available for adoption.
    - **THEN** Images, dog names, age, breed type, and a short description should display for each adoptable dog.
    - **THEN** I want to be able to click on a learn more button and be directed to a page with more information about the specific dog.

- **WHEN** I click on an adoptable dog,
    - **THEN** I want to be able to access specific, detailed information about that dog--including name, adoption status, age, gender, breed, hair type, a description, what type of environment the dog thrives in, notable adjectives, and health/training attributes--and who I can contact about the adoption process. 


## TECHNOLOGIES

### APIs
- PetFinder: https://www.petfinder.com/developers/v2/docs/ 
- API Ninjas: https://api-ninjas.com/api/dogs 
- Dog API (Kinduff): https://dogapi.dog/ 

### Frameworks
- Bootstrap 5
- Jquery 3.7.0
- Popper 1.12.9

## USAGE
1. To use, go to live website where you will be directed to the main page. 

![Homepage](/assets/images/pupper-picker-home-page.png)

2. Select the first button or breed info in top right corner to research a dog and view it's stats.

![Search Breed button](/assets/images/pupper-picker-search-breeds-button.png)

![Navigation](/assets/images/pupper-picker-navigation.png)

![Stats](/assets/images/pupper-picker-stats.png)

3. After doing research, go to second button on home page or select search in top right.

![Adoptable Button](/assets/images/pupper-picker-adoptable-button.png)

![Navigation](/assets/images/pupper-picker-navigation.png)

4. After looking at the available dogs for adoption, select "Learn more" to get more information about the dog.

![Card](/assets/images/pupper-picker-card.png)

5. You be displayed more information about the dog as well as contact information of the organization currently caring for the dog. 

![Contact Organization](/assets/images/pupper-picker-contact.png)

6. Once you are ready, contact the organization to initiate the adoption process.

### GITHUB REPOSITORY
https://github.com/FourStringFunk/dog-website 

### LIVE SITE
https://fourstringfunk.github.io/dog-website/

### CREDITS
- Cloning a Node: https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode 


### LICENSE
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MIT License

Copyright (c) 2023 Chris Harris, Ren Rojas, and Javy B

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


### CONTRIBUTORS
- Ren Rojas
- Javy B
- Chris Harris
