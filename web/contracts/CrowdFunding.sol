// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/AggregatorV3Interface.sol";

contract Crowdfunding {
    struct Contributor {
        string contributorAddress; 
        uint amount;
    }

 
    struct Project {
        uint fundsRaised;                  
        bool isCompleted;                  
        Contributor[] contributors;       
        mapping(string => uint) contributions; 
    }

    mapping(string => Project) public projects;  

    AggregatorV3Interface internal priceFeed;   

  
    event ContributionReceived(string projectId, string contributor, uint amount, uint amountInUSD);
    event FundsWithdrawn(string projectId, uint amount);
    event RefundIssued(string projectId, string contributor, uint amount);


    constructor() {
        priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306); // Sepolia ETH/USD Chainlink price feed
    }

    // Function to get the latest ETH/USD price from Chainlink oracle
    function getLatestETHUSDPrice() public view returns (uint) {
        (, int price, , ,) = priceFeed.latestRoundData();
        return uint(price * 10 ** 10); // Convert to 18 decimal places
    }


    function contribute(string memory _projectId, string memory _contributorId) public payable {
        Project storage project = projects[_projectId];

        require(msg.value > 0, "Contribution must be greater than 0");
        require(!project.isCompleted, "Project funding is already completed");

        project.fundsRaised += msg.value;

 
        if (project.contributions[_contributorId] == 0) {
            project.contributors.push(Contributor(_contributorId, msg.value));
        } else {
            for (uint i = 0; i < project.contributors.length; i++) {
                if (keccak256(bytes(project.contributors[i].contributorAddress)) == keccak256(bytes(_contributorId))) {
                    project.contributors[i].amount += msg.value;
                    break;
                }
            }
        }
        project.contributions[_contributorId] += msg.value;

        uint contributionInUSD = (msg.value * getLatestETHUSDPrice()) / 1e18;

        emit ContributionReceived(_projectId, _contributorId, msg.value, contributionInUSD);
    }


    function withdrawFunds(string memory _projectId, address payable _creator) public {
        Project storage project = projects[_projectId];

        require(!project.isCompleted, "Funds have already been withdrawn");

        uint amountToWithdraw = project.fundsRaised;
        project.isCompleted = true; 

        _creator.transfer(amountToWithdraw); // Transfer funds to the creator

        emit FundsWithdrawn(_projectId, amountToWithdraw);
    }

 
    function getContributors(string memory _projectId) public view returns (Contributor[] memory) {
        return projects[_projectId].contributors;
    }

    function getContribution(string memory _projectId, string memory _contributorId) public view returns (uint) {
        return projects[_projectId].contributions[_contributorId];
    }

    function refund(string memory _projectId, string memory _contributorId) public {
        Project storage project = projects[_projectId];

        require(project.contributions[_contributorId] > 0, "No contributions to refund");

        uint amountToRefund = project.contributions[_contributorId];
        project.contributions[_contributorId] = 0; 

        payable(msg.sender).transfer(amountToRefund); 

        emit RefundIssued(_projectId, _contributorId, amountToRefund);
    }
}









// pragma solidity ^0.8.0;

// import "./interfaces/AggregatorV3Interface.sol";

// contract Crowdfunding {
//     struct Contributor {
//         address contributorAddress;
//         uint amount;
//     }

//     // Struct to hold details of a project
//     struct Project {
//         address payable creator;           // Project creator
//         string title;                      // Project title
//         string description;                // Project description
//         uint goalAmount;                   // Goal amount in wei (converted from USD to wei)
//         uint deadline;                     // Deadline for funding
//         uint fundsRaised;                  // Total funds raised
//         bool isCompleted;                  // Funding status
//         Contributor[] contributors;        // Array of contributors
//         mapping(address => uint) contributions; // Map to track each contributor’s amount
//     }

//     uint public projectCount = 0;                 // Total number of projects
//     mapping(uint => Project) public projects;     // Project ID to Project details

//     AggregatorV3Interface internal priceFeed;     // Chainlink price feed interface

//     // Events
//     event ProjectCreated(uint projectId, address creator, string title, uint goalAmount, uint deadline);
//     event ContributionReceived(uint projectId, address contributor, uint amount, uint amountInUSD);
//     event FundsWithdrawn(uint projectId, uint amount);
//     event RefundIssued(uint projectId, address contributor, uint amount);

//     // Constructor: initializes the Chainlink price feed (Sepolia network)
//     constructor() {
//         priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306); // Sepolia ETH/USD Chainlink price feed
//     }

//     // Function to create a new project
//     function createProject(
//         string memory _title,
//         string memory _description,
//         uint _goalAmount, // Goal in USD
//         uint _durationInDays
//     ) public {
//         require(_goalAmount > 0, "Goal amount must be greater than 0");
//         require(_durationInDays > 0, "Duration must be greater than 0");

//         projectCount++; // Increment project ID

//         // Initialize the new project
//         Project storage newProject = projects[projectCount];
//         newProject.creator = payable(msg.sender);
//         newProject.title = _title;
//         newProject.description = _description;
//         newProject.goalAmount = _goalAmount * 1e18 / getLatestETHUSDPrice(); // Convert goal from USD to ETH in wei
//         newProject.deadline = block.timestamp + (_durationInDays * 1 days);
//         newProject.isCompleted = false;

//         emit ProjectCreated(projectCount, msg.sender, _title, _goalAmount, newProject.deadline);
//     }

//     // Function to get the latest ETH/USD price from Chainlink oracle
//     function getLatestETHUSDPrice() public view returns (uint) {
//         (, int price, , ,) = priceFeed.latestRoundData();
//         return uint(price * 10 ** 10); // Convert to 18 decimal places
//     }

//     // Function to contribute to a specific project
//     function contribute(uint _projectId) public payable {
//         Project storage project = projects[_projectId];

//         require(block.timestamp < project.deadline, "Project funding period has ended");
//         require(msg.value > 0, "Contribution must be greater than 0");
//         require(!project.isCompleted, "Project funding is already completed");

//         project.fundsRaised += msg.value;

//         // Update the contributor's amount or add a new contributor
//         if (project.contributions[msg.sender] == 0) {
    
//             project.contributors.push(Contributor(msg.sender, msg.value));
//         } else {
  
//             for (uint i = 0; i < project.contributors.length; i++) {
//                 if (project.contributors[i].contributorAddress == msg.sender) {
//                     project.contributors[i].amount += msg.value;
//                     break;
//                 }
//             }
//         }
//         project.contributions[msg.sender] += msg.value;

//         uint contributionInUSD = (msg.value * getLatestETHUSDPrice()) / 1e18;

//         emit ContributionReceived(_projectId, msg.sender, msg.value, contributionInUSD);
//     }

//     // Function for project creator to withdraw funds if goal is met
//     function withdrawFunds(uint _projectId) public {
//         Project storage project = projects[_projectId];

//         require(msg.sender == project.creator, "Only the project creator can withdraw funds");
//         require(block.timestamp >= project.deadline, "Project deadline has not yet been reached");
//         require(project.fundsRaised >= project.goalAmount, "Funding goal not met");
//         require(!project.isCompleted, "Funds have already been withdrawn");

//         uint amountToWithdraw = project.fundsRaised;
//         project.isCompleted = true; // Mark project as completed

//         project.creator.transfer(amountToWithdraw); // Transfer funds to creator

//         emit FundsWithdrawn(_projectId, amountToWithdraw);
//     }

//     // Function to get the list of all contributors for a specific project
//     function getContributors(uint _projectId) public view returns (Contributor[] memory) {
//         return projects[_projectId].contributors;
//     }

//     // Function to get a user's contribution to a specific project
//     function getContribution(uint _projectId, address _contributor) public view returns (uint) {
//         return projects[_projectId].contributions[_contributor];
//     }

//     // Function to refund contributions if the goal is not met and the deadline has passed
//     function refund(uint _projectId) public {
//         Project storage project = projects[_projectId];

//         require(block.timestamp >= project.deadline, "Project deadline has not yet been reached");
//         require(project.fundsRaised < project.goalAmount, "Funding goal has been met, cannot refund");
//         require(project.contributions[msg.sender] > 0, "No contributions to refund");

//         uint amountToRefund = project.contributions[msg.sender];
//         project.contributions[msg.sender] = 0; // Reset contribution for the user

//         payable(msg.sender).transfer(amountToRefund); // Refund the contributor

//         emit RefundIssued(_projectId, msg.sender, amountToRefund);
//     }
// }
