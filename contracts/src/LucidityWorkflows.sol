// SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.24;

import "./LucidityLibrary.sol";
import "./LucidityErrors.sol";
import "openzeppelin-contracts/contracts/utils/structs/EnumerableSet.sol";

contract LucidityWorkflows {
    using EnumerableSet for EnumerableSet.UintSet;

    uint256 public workflowCounter;

    modifier onlyCreator(uint256 counter) {
        if (!_workflowsToCreator[msg.sender].contains(counter)) {
            revert LucidityErrors.NotCreator();
        }
        _;
    }

    mapping(uint256 => LucidityLibrary.Workflow) private _workflows;
    mapping(address => EnumerableSet.UintSet) private _workflowsToCreator;

    event WorkflowCreated(
        string workflowMetadata,
        address creator,
        uint256 counter
    );
    event WorkflowDeleted(uint256 counter);

    function createWorkflow(string memory workflowMetadata) public {
        workflowCounter++;

        _workflows[workflowCounter] = LucidityLibrary.Workflow({
            workflowMetadata: workflowMetadata,
            counter: workflowCounter,
            creator: msg.sender
        });
        _workflowsToCreator[msg.sender].add(workflowCounter);

        emit WorkflowCreated(workflowMetadata, msg.sender, workflowCounter);
    }

    function deleteWorkflow(uint256 counter) public onlyCreator(counter) {
        delete _workflows[counter];

        _workflowsToCreator[msg.sender].remove(counter);

        emit WorkflowDeleted(counter);
    }

    function getWorkflowCreator(uint256 counter) public view returns (address) {
        return _workflows[counter].creator;
    }

    function getWorkflowMetadata(
        uint256 counter
    ) public view returns (string memory) {
        return _workflows[counter].workflowMetadata;
    }
}
