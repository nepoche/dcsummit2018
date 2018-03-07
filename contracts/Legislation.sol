pragma solidity^0.4.18;

contract Legislation {

    struct earmarkedDeposit {
        uint amount;
        bool outcome;
    }

    address public oracle;
    string public billID;
    mapping (address => earmarkedDeposit) public userContributions;
    mapping (address => bool) public politicianVote;
    address[] public politiciansThatVoted;
    address[] public users;
    uint totalFundsForInWei;
    uint totalFundsAgainstInWei;
    uint numVotesFor;
    uint numVotesAgainst;

    event Deposited(address _user, uint _amount, bool _desiredOutcome);

    modifier onlyOracle() {
        require(msg.sender == oracle);
        _;
    }

    function Legislation(string _billID) public {
        billID = _billID;
        oracle = msg.sender;
    }

    function deposit(bool desiredOutcome) public payable {
        users.push(msg.sender);
        userContributions[msg.sender].amount = msg.value;
        if (desiredOutcome) {
            totalFundsForInWei += msg.value;
        } else {
            totalFundsAgainstInWei += msg.value;
        }
        userContributions[msg.sender].outcome = desiredOutcome;

        Deposited(msg.sender, msg.value, desiredOutcome);
    }

    function resolve(bool outcome) onlyOracle {
        
        uint politicianSplit;
        uint i;

        if (outcome) {
            if (numVotesFor != 0)
                politicianSplit = totalFundsForInWei / numVotesFor;

            for (i = 0; i < politiciansThatVoted.length; i++) {
                if (politicianVote[politiciansThatVoted[i]]) {
                    politiciansThatVoted[i].transfer(politicianSplit);
                }
            }

            for (i = 0; i < users.length; i++) {
                if (!userContributions[users[i]].outcome) {
                    users[i].transfer(userContributions[users[i]].amount);
                }
            }

        } else {

            if (numVotesAgainst != 0)
                politicianSplit = totalFundsAgainstInWei / numVotesAgainst;

            for (i = 0; i < politiciansThatVoted.length; i++) {
                if (!politicianVote[politiciansThatVoted[i]]) {
                    politiciansThatVoted[i].transfer(politicianSplit);
                }
            }

            for (i = 0; i < users.length; i++) {
                if (userContributions[users[i]].outcome) {
                    users[i].transfer(userContributions[users[i]].amount);
                }
            }

        }

    }

    function addPoliticianVote(address politician, bool vote) onlyOracle {
        politiciansThatVoted.push(politician);
        politicianVote[politician] = vote;

        if (vote) {
            numVotesFor++;
        } else {
            numVotesAgainst++;
        }

    }
}
