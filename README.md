# UnityFund

UnityFund, an open-source crowdfunding platform built to empower innovative and noble projects by providing them with the necessary funding from the masses. It uses modern technology to connect project creators with potential backers and ensures a smooth, secure, and efficient fundraising experience for everyone involved.

## 🌐 Live Demo
Check out UnityFund in action here: [UnityFund](link)


## Project Overview
<b>UnityFund</b> allows users to set up, verify, and fund impactful projects. Our platform prioritizes security and authenticity, requiring both project creators and backers to authenticate before participating. Projects undergo a verification process involving an AI model (soon to be implemented) that assesses feasibility, with the potential for manual review to further ensure the project's integrity.

Once a project is approved, it’s displayed with comprehensive details and supporting documents for public viewing, making it easy for backers to make informed decisions. Multiple payment methods, including Google Pay, Stripe, and cryptocurrency, make it convenient to support projects from around the globe.


## User-Friendly Interface
The platform is designed with a clean, intuitive, and responsive UI using React and Material UI, providing users with an attractive and seamless experience. Our aim is to ensure that project creators and backers alike can navigate and use the platform with ease.



## 📚 Features
- <b>Secure Project Creation and Authentication:</b>  Only authenticated users can create projects or fund them, ensuring platform security.
- <b>Project Feasibility Analysis:</b>  Projects undergo verification through our upcoming AI model and manual reviews as needed.
- <b>Flexible Payment Options:</b>  Support for Google Pay, Stripe, and cryptocurrency to cater to global users.
- <b>Transparent Project Display:</b>  Each approved project is displayed with full details and relevant documentation.
- <b>Decentralized Funding Options:</b>  Web3 integration for blockchain enthusiasts to fund projects via crypto.

## ⚙️ Tech Stack
- Frontend:  JavaScript, React, Material UI
- Backend:  Node.js, Express, MongoDB
- Web3 Integration:  Cryptocurrency and blockchain-based transactions
- Payment Processing:  Google Pay, Stripe, Crypto Wallets
- Machine Learning (Upcoming):  AI model for project feasibility analysis
  
## Contributors
This project was made possible through the combined efforts of:

[Yashkrit](https://github.com/Yashkrit-Singh):

- Led backend setup, including creating the project API endpoints.
- Implemented user authentication
- Web3 integration for cryptocurrency transactions.

[Bishwa](https://github.com/codebybishwa):

- Contributed to the UI and backend, including payment endpoints.
- Implemented payment functionality with Google Pay.
- Currently working on the AI model for project feasibility analysis.

[Sukrit](https://github.com/Sukrit27):

- Contributed significantly to the frontend.
- Developed additional APIs and enhanced the platform’s UI for better user interaction.
  


## 🔧 Getting Started with UnityFund

To set up and start UnityFund on your local machine, follow these steps.

### 1. Clone the Repository
Open your terminal and clone the repository by running:
```bash
git clone https://github.com/YourRepo/Crowdfunding_Project.git
cd Crowdfunding_Project
```

### 2. Install Dependencies
You need **npm** installed on your system to manage dependencies. If npm is not installed, install it from [Node.js](https://nodejs.org).

To install all dependencies, run:
```bash
npm install
```

### 3. Start the Server
Navigate to the server directory and start the backend server:
```bash
cd server
node index.js
```

### 4. Start the Frontend
In a new terminal window, navigate to the client directory and start the frontend development server:
```bash
cd client
npm run dev
```

### 5. Access the Application
After both servers are running, open your browser and go to `http://localhost:3000` (or the configured port) to view the UnityFund application.


## Future Enhancements
- AI-driven Feasibility Analysis: A machine learning model to assess the viability and impact of each project before approval.
- Enhanced Security: Strengthening authentication and verification processes for both creators and backers.
- Additional Payment Methods: Expanding options to support even more global payment systems.
