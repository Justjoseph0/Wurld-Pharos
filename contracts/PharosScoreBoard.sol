// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PharosScoreBoard {
    struct Entry {
        address player;
        uint256 score;
    }

    uint256 public constant TOP_SIZE = 20;

    Entry[] private _leaderboard;

    mapping(address => uint256) public bestScore;

    event ScoreSaved(address indexed player, uint256 score);

    function saveScore(uint256 score) external {
        if (score <= bestScore[msg.sender]) return;
        bestScore[msg.sender] = score;

        emit ScoreSaved(msg.sender, score);

        // Insert or update sender in leaderboard
        bool found = false;
        for (uint256 i = 0; i < _leaderboard.length; i++) {
            if (_leaderboard[i].player == msg.sender) {
                _leaderboard[i].score = score;
                found = true;
                break;
            }
        }
        if (!found) {
            _leaderboard.push(Entry(msg.sender, score));
        }

        // Bubble sort descending (leaderboard is small — max 10 entries)
        for (uint256 i = 0; i + 1 < _leaderboard.length; i++) {
            for (uint256 j = 0; j + 1 < _leaderboard.length - i; j++) {
                if (_leaderboard[j].score < _leaderboard[j + 1].score) {
                    Entry memory tmp = _leaderboard[j];
                    _leaderboard[j] = _leaderboard[j + 1];
                    _leaderboard[j + 1] = tmp;
                }
            }
        }

        // Trim to TOP_SIZE
        while (_leaderboard.length > TOP_SIZE) {
            _leaderboard.pop();
        }
    }

    function getTopScores()
        external
        view
        returns (address[] memory players, uint256[] memory scores)
    {
        uint256 len = _leaderboard.length;
        players = new address[](len);
        scores = new uint256[](len);
        for (uint256 i = 0; i < len; i++) {
            players[i] = _leaderboard[i].player;
            scores[i] = _leaderboard[i].score;
        }
    }
}
