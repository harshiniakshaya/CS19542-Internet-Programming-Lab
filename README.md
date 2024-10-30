# **FEED**

FEED is a platform where users can share food donation events and promote community involvement through interactive maps. It also facilitates sustainable food waste management by allowing users to submit recycling requests. These requests specify whether food will be dropped off at a biogas plant or picked up by the plant. The platform ensures efficient handling of requests through admin verification and approval by biogas plant administrators, helping reduce food waste and promote eco-friendly practices.

---

## **Features**
- **Food Donation Sharing:** Users can post and view food donation events on maps.  
- **Community Engagement:** Users can like and share donation events to promote participation.  
- **Recycling Requests:** Users submit requests specifying pickup or drop-off for food waste.  
- **Admin Verification:** All recycling requests are verified by admins.  
- **Biogas Plant Admin Approval:** Biogas plant admins approve or reject verified requests.  

---

## **System Architecture**  
![System Architecture]()   

---

## **Flow Chart**  
![Flow Chart]()  
  

---

## **Tech Stack**
### **Frontend**

#### Libraries and Frameworks
- **React** – Library for building user interfaces  
- **React Router DOM** – Client-side routing for React  
- **Leaflet & React-Leaflet** – Display interactive maps  
- **Recharts** – Library for visualizing data  

#### Development Tools
- **Vite** – Fast development server and build tool  
- **Axios** – HTTP client for making API requests  
- **JS-Cookie** – Manage cookies on the frontend  

#### Styling
- **Tailwind CSS + shadcn** – Utility-first CSS framework with accessible UI components  
- **React Icons** – Icon library for UI elements  

---

### **Backend**

#### Frameworks and Libraries
- **Node.js** – JavaScript runtime for backend services  
- **Express.js** – Web framework for building REST APIs  
- **MongoDB & Mongoose** – NoSQL database and data modeling  

#### Security and Authentication
- **bcrypt.js** – Hash passwords securely  
- **JWT (jsonwebtoken)** – Token-based authentication  

#### File Handling
- **Multer** – Handle file uploads (e.g., certificates, documents)  

#### Configuration and Middleware
- **dotenv** – Manage environment variables  
- **cookie-parser** – Parse cookies from incoming requests  
- **CORS** – Enable cross-origin requests  
- **Nodemon** – Auto-restart the server during development  
 

---

## **Setup and Installation**

### **Prerequisites**
- **Node.js** installed  
- **MongoDB Atlas** account and cluster set up   

### **Steps to Run Locally**
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/harshiniakshaya/Feed.git
   cd Feed
   ```
2. **Install Dependencies:**
   ```bash
   cd client & npm install
   cd server & npm install
   ```
3. **Set up Environment Variables:**
- Create a .env file in the server folder 
   ```bash
   MONGO_URI=<mongodb-atlas-uri>   
   JWT_SECRET=<jwt-secret>
   PORT=8080
   ```
- Replace <your-mongodb-atlas-uri> with your MongoDB Atlas connection string.
4. **Run the Frontend and Backend Servers:**
   ```bash
   cd client && npm run dev
   cd server && nodemon index.js
   ```
5. **Access the Application:**
- Visit: http://localhost:5173

## **Contributing**

#### Fork the Repository:
```bash
git fork https://github.com/harshiniakshaya/Feed 
```
#### Create a New Branch:
```bash
git checkout -b feature-name
```
#### Make Changes and Commit:
```bash
git commit -m "Added feature"
```
#### Push to the Branch:
```bash
git push origin feature-name
```
#### Open a Pull Request on GitHub
   
