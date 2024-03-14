import { offerFormSchema } from "../schema";

export const useOfferForm = () => {
  const generateInitialVariant = () => ({
    variant: "",
    variantValue: "",
  });

  const initialVariantValues = Array.from(
    { length: 1 },
    generateInitialVariant
  );

  const initialValues = {
    productName: "qqqq",
    productDes: "",
    productUrl: "",
    unitsPerCreator: "",
    variants: [...initialVariantValues],
  };

  const handleOfferForm = (values) => {
    console.log("offerFormSchema values -:", values);
  };

  return {
    initialValues,
    schema: offerFormSchema,
    submit: handleOfferForm,
  };
};
