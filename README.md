# Noble Stay - AirBnb-inspired Website for Castles (WIP)
This student-project aim is to use our knowledge from earlier courses to build the backend part of an AirBnb-inspired website.

## Tech Stack
- MongoDB Atlas with Mongoose
- Express JS 
- Node.js

## Installation
### Clone this repository
```
git clone https://github.com/RebeckaLar/noblestay-backend.git
cd noblestay-backend
```

### MongoDB Connection Setup
1. **Create a `.env` File:**  
   Copy the example .env file
```
cp .env.example .env
```
2. **Add Your Connection String:**  
Place your MongoDB connection string in the `.env` file like this: \
`MONGO_URI="mongodb+srv://new-user:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority"` \
  Replace `<password>` with the password provided and `mydatabase` with the relevant database name.

3. **Do Not Commit Your `.env` File:**  
Make sure your `.env` file is listed in `.gitignore` so it won’t be pushed to GitHub.

**Note:**  
Never share your actual credentials publicly. Collaborators should request their own credentials from the maintainer if needed.

### Install dependencies
```
npm install
```

### Run the app
```
npm run dev
```

## Credits
I used MERN-stack tutorials from Joakim Lindh: https://www.youtube.com/@LindhCoding