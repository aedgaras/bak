import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { logout } from "../../../services/Authentication";
import { API_URL, axiosAuthHeaders } from "../../../utils/constants";
import { ClosableObject, DeleteDialogProps } from "../interfaces";

const BaseDialog = ({
  isOpen,
  cancelRef,
  onClose,
  header,
  body,
  footer,
}: ClosableObject & {
  header: JSX.Element;
  body: JSX.Element;
  footer: JSX.Element;
}) => (
  <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={onClose}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          {header}
        </AlertDialogHeader>

        <AlertDialogBody>{body}</AlertDialogBody>

        <AlertDialogFooter>{footer}</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
);

export const AboutToLogoutDialog = ({
  isOpen,
  cancelRef,
  onClose,
}: ClosableObject) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Session expiry
          </AlertDialogHeader>

          <AlertDialogBody>
            Your session is about to expire, do you want to continue working?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onClose();
              }}
              ml={3}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export const DeleteDialog = ({
  isOpen,
  onClose,
  cancelRef,
  entityName,
  entityToDeleteId,
  refreshData,
}: DeleteDialogProps) =>
  BaseDialog({
    isOpen: isOpen,
    onClose: onClose,
    cancelRef: cancelRef,
    header: <Text>Delete</Text>,
    body: <Text> Are you sure? You can't undo this action afterwards.</Text>,
    footer: (
      <>
        <Button ref={cancelRef} onClick={onClose}>
          Cancel
        </Button>
        <Button
          colorScheme="red"
          onClick={async (e) => {
            if (entityName === "user") {
              await axios.delete(
                API_URL + "/users/" + entityToDeleteId,
                axiosAuthHeaders
              );
            }
            if (entityName === "org") {
              await axios.delete(
                API_URL + "/organizations/" + entityToDeleteId,
                axiosAuthHeaders
              );
            }
            refreshData(true);
            onClose();
          }}
          ml={3}
        >
          Delete
        </Button>
      </>
    ),
  });
export const LogoutDialog = ({
  isOpen,
  cancelRef,
  onClose,
  optionalText,
}: ClosableObject) =>
  BaseDialog({
    isOpen: isOpen,
    cancelRef: cancelRef,
    onClose: onClose,
    header: <Text>Logout</Text>,
    body: (
      <>{optionalText ? optionalText : "Are you sure you want to logout?"}</>
    ),
    footer: (
      <>
        <Button ref={cancelRef} onClick={onClose}>
          Cancel
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            logout();
            onClose();
          }}
          ml={3}
        >
          Logout
        </Button>
      </>
    ),
  });
