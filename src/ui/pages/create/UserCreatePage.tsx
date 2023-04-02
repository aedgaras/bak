import { Heading, useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import { useUserContext } from "../../../context/UserContext";
import { UserRegisterDto } from "../../../utils/dto";
import { Classification } from "../../../utils/Models";
import {
  FormBox,
  GenericInput,
  GenericSelect,
  SubmitButton,
} from "../../components/form";
import {
  validatePassword,
  validateUsername,
} from "../../components/form/validation/validation";
import { AppWrapper } from "../../components/wrappers/AppWrapper";
import { DataDisplay } from "../../components/wrappers/DataDisplay";

export const UserCreatePage = () => {
  const toast = useToast();

  return (
    <AppWrapper>
      <DataDisplay
        isLoaded={true}
        element={
          <FormBox
            upperSection={<Heading>User Creation</Heading>}
            innerForm={<UserCreationForm />}
          />
        }
      />
    </AppWrapper>
  );
};

const UserCreationForm = () => {
  const { state } = useUserContext();
  const specification: Classification[] = ["Veterinarian", "Specialist"];

  return (
    <Formik
      initialValues={{} as UserRegisterDto}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
      }}
    >
      {({ handleSubmit, errors, touched, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <GenericInput
            fieldTitle="Form.Username"
            fieldName={"Username"}
            fieldType={"string"}
            isRequired={true}
            errorField={errors.username}
            touchedField={touched.username}
            validation={validateUsername}
          />
          <GenericInput
            fieldTitle="Form.Password"
            fieldName={"Password"}
            fieldType={"string"}
            isRequired={true}
            errorField={errors.password}
            touchedField={touched.password}
            validation={validatePassword}
          />
          <GenericSelect
            fieldTitle="Form.Classification"
            keys={specification}
          />
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      )}
    </Formik>
  );
};
