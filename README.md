# Assigment OA


* Gallery front end - 10 points
* Pagination/vistualisation (infinite-scroll) of the gallery - 10 points
* Google login - 10 points
* Username password-based login - 10 points
* Able to use s3 bucket to fetch images - 15 points
* Able to use Google Drive to fetch images - 15 points
* Code quality - 15 points ( for parameters view bottom of the file )
* UI/UX - 15 points ( directly copying the sample Figma given above will give 7 points )


# Tech Stack Used
- ReactJS for the frontend. ( TypeScript )
- Node.js for the backend. ( TypeScript )
- TailwindCSS as the styling library.
- SQLite for storing user details.
- Prisma as the ORM.


# Running the website
- 1. Run npm install in the frontend folder (filter-pixel) and then in the server folder.
- 2. Use npm run dev to run both the backend and frontend parts. ( Run this in both frontend and backedn folder separatelt and simultaneously.
- 3. Make sure that the backend port ":3000" is free. Or else will have to change it in the frontend.( _This can be improved
    be using environment variable for PORT number in the frontend so that all API calls can reference a single variable and no need for hardcoding the port everytime._)

 
 # Tasks
 
 - <input type="checkbox" checked /> Created Frontend 
 - <input type="checkbox" checked /> Login Functionality
 > - Added Google Login using "@react-oauth/google"
 > - For Username login functionality created a Node.js server to store user logins and signup request.
 > - Maintained the login state throughout the app using useContext() hook in react.
 - <input type="checkbox" checked /> Added Infinite Scroll on the main image dashboard.
 > - Made using the react-infinite-scroll library.
 - <input type="checkbox" checked /> Added S3 bucket functionality in the backend to fetch image sources.
 > - To solve this 
 > > - In the backend, made a call to the bucket to retrieve the image keys.
 > > - In the frontend, hardcoded the base bucket url, and appended the Keys to it (using encodeURIComponent)
       and passed these final url to image elements as source.
- <input type="checkbox" checked /> Tried Improving Code Quality
> - Refactored Code to have one component per file in the frontend.
> - In the backend, separated the routes, handlers and middlewares.
> - More Scope for improvement.
- <input type="checkbox" checked /> Fully Replicated thmade persistant.
- 

# To Do Tasks
- Add Drive Funcitonality


# Scope for Improvement
- Currently the images have varying Aspect Ratios, they can be improved to look more visually pleasing.
- Currently, the password is being stored as plaintext, encryption can be added using bcrypt library.
- The login state is gone after a refresh, can be made persistent.
- Infinite Scroll UI can be improved by adding Loading animations.
- Infinite Scroll can be implemented using plain Javascript and events.
- Can add a better DB in the backend to allow user Avatars be stored.
- Extract Data Services from Data Controllers
- Add Validation for Email in Login and SignUp


