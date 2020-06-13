import {actionNames} from "../utils/constants/actionConstants";

export function closeModal() {
  return {
    type: actionNames.closeModal,
  }
}