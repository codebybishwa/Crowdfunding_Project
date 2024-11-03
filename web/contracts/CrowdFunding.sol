// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/AggregatorV3Interface.sol";

contract CrowdFunding {
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
    // event FundsWithdrawn(string projectId, uint amount);
    // event RefundIssued(string projectId, string contributor, uint amount);
    event ETHtoUSDConversion(uint ethAmount, uint usdAmount);


    constructor() {
        priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306); // Sepolia ETH/USD Chainlink price feed
    }

    // Function to get the latest ETH/USD price from Chainlink oracle
    function getLatestETHUSDPrice() public view returns (uint) {
        (, int price, , ,) = priceFeed.latestRoundData();
        return uint(price * 10 ** 10); // Convert to 18 decimal places
    }

    function getETHInUSD(uint ethAmount) public returns (uint256) {
        uint price = getLatestETHUSDPrice();
        uint256 ethAmountInUsd = (uint256(price) * ethAmount) / 1e18;
        emit ETHtoUSDConversion(ethAmount, ethAmountInUsd);
        return ethAmountInUsd;
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
        
        uint price = getLatestETHUSDPrice();
        uint contributionInUSD = (msg.value * uint256(price)) / 1e18;

        emit ContributionReceived(_projectId, _contributorId, msg.value, contributionInUSD);
    }


    // function withdrawFunds(string memory _projectId, address payable _creator) public {
    //     Project storage project = projects[_projectId];

    //     require(!project.isCompleted, "Funds have already been withdrawn");

    //     uint amountToWithdraw = project.fundsRaised;
    //     project.isCompleted = true; 

    //     _creator.transfer(amountToWithdraw); // Transfer funds to the creator

    //     emit FundsWithdrawn(_projectId, amountToWithdraw);
    // }


    // function refund(string memory _projectId, string memory _contributorId) public {
    //     Project storage project = projects[_projectId];

    //     require(project.contributions[_contributorId] > 0, "No contributions to refund");

    //     uint amountToRefund = project.contributions[_contributorId];
    //     project.contributions[_contributorId] = 0; 

    //     payable(msg.sender).transfer(amountToRefund); 

    //     emit RefundIssued(_projectId, _contributorId, amountToRefund);
    // }
}