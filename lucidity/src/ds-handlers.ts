import {
  Bytes,
  JSONValue,
  JSONValueKind,
  dataSource,
  json,
} from "@graphprotocol/graph-ts";
import { WorkflowMetadata } from "../generated/schema";

export function handleWorkflowMetadata(content: Bytes): void {
  let metadata = new WorkflowMetadata(dataSource.stringParam());
  const value = json.fromString(content.toString()).toObject();
  if (value) {
    let name = value.get("name");
    if (name && name.kind === JSONValueKind.STRING) {
      metadata.name = name.toString();
    }
    let tags = value.get("tags");
    if (tags && tags.kind === JSONValueKind.STRING) {
      metadata.tags = tags.toString();
    }
    let description = value.get("description");
    if (description && description.kind === JSONValueKind.STRING) {
      metadata.description = description.toString();
    }

    let workflow = value.get("workflow");
    if (workflow && workflow.kind === JSONValueKind.STRING) {
      metadata.workflow = workflow.toString();
    }

    metadata.save();
  }
}
