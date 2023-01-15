import useSWR from "swr";
import { fetcher } from "@/lib/utils";

export const useSubmissions = (workspaceId: string, formId: string) => {
  const { data, error, mutate } = useSWR(
    `/api/workspaces/${workspaceId}/forms/${formId}/submissions`,
    fetcher
  );

  return {
    submissions: data,
    isLoadingSubmissions: !error && !data,
    isErrorSubmissions: error,
    mutateSubmissions: mutate,
  };
};

export const deleteSubmission = async (workspaceId: string, formId: string, submissionId: string) => {
  try {
    await fetch(`/api/workspaces/${workspaceId}/forms/${formId}/submissions/${submissionId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
    throw Error(`deleteSubmission: unable to delete submission: ${error.message}`);
  }
};

export const persistSubmission = async (submission, workspaceId) => {
  try {
    await fetch(`/api/workspaces/${workspaceId}/forms/${submission.formId}/submissions/${submission.id}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });
  } catch (error) {
    console.error(error);
  }
};

export const MergeWithSchema = (submissionData, schema) => {
  if (Object.keys(schema).length === 0) {
    // no schema provided
    return submissionData;
  }
  const mergedData = {};
  for (const elem of schema.children) {
    if (["submit"].includes(elem.type)) {
      continue;
    }
    if (elem.name in submissionData) {
      mergedData[elem.label] = submissionData[elem.name];
    } else {
      mergedData[elem.label] = "not provided";
    }
  }
  return mergedData;
};