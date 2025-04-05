import {
  WorkflowCreated as WorkflowCreatedEvent,
  WorkflowDeleted as WorkflowDeletedEvent
} from "../generated/LucidityWorkflows/LucidityWorkflows"
import { WorkflowCreated, WorkflowDeleted } from "../generated/schema"

export function handleWorkflowCreated(event: WorkflowCreatedEvent): void {
  let entity = new WorkflowCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.workflowMetadata = event.params.workflowMetadata
  entity.creator = event.params.creator
  entity.counter = event.params.counter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWorkflowDeleted(event: WorkflowDeletedEvent): void {
  let entity = new WorkflowDeleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.counter = event.params.counter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
