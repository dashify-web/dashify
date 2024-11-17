import { ReactNode } from "react";
import { mapReactChildrens } from "../utils/react-tools";
import { CommonFieldProps } from "../types";

export const useRetrieveLabels = (children: ReactNode) => {
  return mapReactChildrens<CommonFieldProps, string>(children, (child) => child.props.label || "");
}
