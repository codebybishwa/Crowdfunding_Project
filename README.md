# UnityFund

UnityFund, an open-source crowdfunding platform built to empower innovative and noble projects by providing them with the necessary funding from the masses. It uses modern technology to connect project creators with potential backers and ensures a smooth, secure, and efficient fundraising experience for everyone involved.


## Project Overview
<b>UnityFund</b> allows users to set up, verify, and fund impactful projects. Our platform prioritizes security and authenticity, requiring both project creators and backers to authenticate before participating. Projects undergo a verification process involving an AI model (soon to be implemented) that assesses feasibility, with the potential for manual review to further ensure the project's integrity.

Once a project is approved, it’s displayed with comprehensive details and supporting documents for public viewing, making it easy for backers to make informed decisions. UnityFund supports multiple payment methods, including Google Pay, Stripe, and cryptocurrency options, ensuring convenience for global users and catering to blockchain enthusiasts through Web3 integration.


## User-Friendly Interface
The platform is designed with a clean, intuitive, and responsive UI using React and Material UI, providing users with an attractive and seamless experience. Our aim is to ensure that project creators and backers alike can navigate and use the platform with ease.

![image](https://github.com/user-attachments/assets/b71fd479-25b9-44b3-b172-b3a78a53d45f)

![image](https://github.com/user-attachments/assets/96db0ec7-447f-460d-b63c-bec875a21731)

![image](https://github.com/user-attachments/assets/7f5fd445-2126-4f53-bcf3-a391f2728fee)






## 📚 Features
- <b>Secure Project Creation and Authentication:</b>  Only authenticated users can create projects or fund them, ensuring platform security.
- <b>Project Feasibility Analysis:</b>  Projects undergo verification through our upcoming AI model and manual reviews as needed.
- <b>Flexible Payment Options:</b>  Support for Google Pay, Stripe, and cryptocurrency to cater to global users.
- <b>Transparent Project Display:</b>  Each approved project is displayed with full details and relevant documentation.
- <b>Decentralized Funding Options:</b>  Web3 integration for blockchain enthusiasts to fund projects via crypto.

## ⚙️ Tech Stack
- <b>Frontend:</b>  JavaScript, React, Material UI
- <b>Backend:</b>  Node.js, Express, MongoDB
- <b>Web3 Integration:</b>  Cryptocurrency and blockchain-based transactions
  - <b>Smart Contract:</b>  Solidity
  - <b>Development & Testing:</b>  Hardhat
  - <b>Libraries:</b>  Ethers.js for Ethereum blockchain interaction
- <b>Payment Processing:</b>  Google Pay, Stripe, Crypto Wallets
- <b>Machine Learning (Upcoming):</b>  AI model for project feasibility analysis
  
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

### Prerequisites
<b>MetaMask:</b>  You should have MetaMask installed in your browser to enable crypto transfers on the platform. MetaMask will act as your Web3 wallet, allowing you to connect to Ethereum or other supported networks. [Get MetaMask here](https://metamask.io/).

<b>npm:</b>  You need **npm** installed on your system to manage dependencies. If npm is not installed, install it from [Node.js](https://nodejs.org).

### 1. Clone the Repository
Open your terminal and clone the repository by running:
```bash
git clone https://github.com/YourRepo/Crowdfunding_Project.git
cd Crowdfunding_Project
```

### 2. Install Dependencies

To install all dependencies, run:
```bash
cd client
npm install
cd ..

cd server
npm install
cd ..

cd web
npm install
cd ..
```

### 3. Set Up Environment Variables
Create a ```.env``` file in the root directory and add the following environment variables:
  - <b>Database Configuration:</b>  MongoDB connection URI.
  - <b>Payment API Keys:</b>  API keys for Stripe and Google Pay.
  - <b>Web3 Details:</b>
      - API key from a blockchain provider, such as Infura or Alchemy, for blockchain connections.
      - Private key from a MetaMask account for deploying contracts.
  - <b>JWT Secret:</b>  Secret key for generating and verifying JSON Web Tokens.

Make sure to keep this file secure in a ```.gitignore``` file and never commit it to version control.

### 4. Deploy Smart Contract (Web3)
To deploy the smart contract, first set up Hardhat:

  - <b>Set up Hardhat for Contract Compilation and Deployment:</b>
    - First, navigate to the web directory where your Hardhat project is located.
      ```bash
      cd web
      ```
    - Compile and deploy the Solidity contract:
      ```bash
      npx hardhat compile
      npx hardhat run scripts/deploy.js --network <network_name>
      ```
    - Replace ```<network_name>``` with the actual network (e.g., rinkeby, sepolia, mainnet) you're using and add the respective network in ```hardhat.config.cjs``` file
    
  - <b>Store the ABI File for Frontend Access:</b>
    - After deploying the contract, locate the ABI (Application Binary Interface) JSON file in artifacts folder
    - Place this file in the ```src/CrowdFundingJson``` folder for easy access in the frontend application.
      
  - <b>Reference the Contract Address in the Frontend:</b>
    - In the frontend, go to ```src/pages/Payment/CryptoPaymentButton.jsx```.
    - Directly reference the deployed contract’s address here. This setup allows your React components to interact with the contract via Web3 or Ethers.js.
    
### 5. Start the Server
Navigate to the server directory and start the backend server:
```bash
cd server
node index.js
```

### 6. Start the Frontend
In a new terminal window, navigate to the client directory and start the frontend development server:
```bash
cd client
npm run dev
```

### 7. Access the Application
After both servers are running, open your browser and go to `http://localhost:3000` (or the configured port) to view the UnityFund application.


## Future Enhancements
- AI-driven Feasibility Analysis: A machine learning model to assess the viability and impact of each project before approval.
- Enhanced Security: Strengthening authentication and verification processes for both creators and backers.
- Additional Payment Methods: Expanding options to support even more global payment systems.


## 📜 License
This project is licensed under the MIT License.
