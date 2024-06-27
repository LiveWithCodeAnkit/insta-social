import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  Modal,
  Radio,
  Select,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CheckBox } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 600,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  // boxShadow: 24,
  p: "30px",
  borderRadius: "30px",
  overflow: "auto",
};

const OptinModal = ({ open, handleClose, data, handleClickByOption }) => {
  // const [checkedProducts, setCheckedProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState({
    offerId: "",
    variant: "",
  });
  console.log(offers);
  const router = useRouter();

  const handleOfferSelect = (offerId, type) => {
    console.log(offerId, type, "details in handleOffer");
    setSelectedOffer({
      offerId: offerId,
      variant: type,
    });
    // const offerIndex = offers.findIndex((offer) => offer._id === offerId);
    // console.log(offerId, type, offers, offerIndex, "offerId");

    // if (offerIndex !== -1) {
    //   const updatedSelectedOffers = [...offers];
    //   const existingOffer = updatedSelectedOffers[offerIndex];

    //   updatedSelectedOffers[offerIndex] = {
    //     ...existingOffer,
    //     selectedVariant: type,
    //   };
    //   console.log(updatedSelectedOffers, "updatedSelectedOffers");
    //   setOffers(updatedSelectedOffers);
    // }
  };

  console.log(offers, "selectedOffers");
  console.log(data, "data in optinmodal");
  const handleSubmit = () => {
    // console.log("Checked Products:", checkedProducts);
    console.log("Checked Offers:", offers);
    handleClickByOption("approved", selectedOffer);
    router.push("/creator/dashboard/my-campaign");
    handleClose();
  };

  useEffect(() => {
    if (data?.offerDetails) {
      setOffers(data?.offerDetails || []);
    }
  }, [data?.offerDetails]);

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>

          <Box sx={{}}>
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                alignItems: "end",
                whiteSpace: "pre",
                mb: "10px",
              }}
            >
              Offers
              <Typography sx={{ paddingBottom: "4px" }}>
                {" "}
                (if offer have variants then please select at least one of them)
              </Typography>
            </Typography>
            {offers?.map(
              (offer) =>
                offer.offerType !== "PAID" && offer?.variant?.variantType && offer?.variant?.variantType?.length > 0 && (
                  <>
                    <Box
                      key={offer._id}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Avatar
                        src={offer.offerImage}
                        sx={{ width: 50, height: 50, mr: "10px" }}
                      />
                      <Box>
                        <Typography>{offer.productName}</Typography>
                        <a
                          href={offer.productLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {offer.productLink}
                        </a>
                      </Box>
                    </Box>
                    <Box key={offer._id}>
                      {offer?.variant?.variantType?.map((type) => (
                        <Box
                          key={type}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <Radio
                            checked={
                              selectedOffer?.offerId === offer._id &&
                              selectedOffer?.variant === type
                            }
                            onChange={(e) => handleOfferSelect(offer._id, type)}
                            inputProps={{ "aria-label": type }}
                          />
                          <Typography>{type}</Typography>
                        </Box>
                      ))}
                      {/* {offer?.variant?.variantType.length > 0 &&
                        !offer?.selectedVariant  && (
                          <Typography
                            className="body1"
                            sx={{ color: "red", ml: "15px" }}
                          >
                            Need to select atleast one variant!
                          </Typography>
                        )} */}
                    </Box>
                  </>
                )
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              // justifyContent: "space-around",
              alignItems: "center",
              mt: "20px",
              width: "430px",
            }}
          >
            <Button
              variant="contained"
              type="button"
              // onClick={(e) => approveRejectHandler("approve", e)}
              onClick={handleSubmit}
              disabled={!(selectedOffer?.offerId && selectedOffer?.variant)}
              sx={{
                "&:hover": { background: "#FFCC33" },
                background: "#FFCC33",
                color: "#212121",
                // height: "40px",
                width: "105px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "none",
                boxShadow: "none",
                mr: "20px",
              }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              type="button"
              onClick={() => {
                setSelectedOffer({
                  offerId: "",
                  variant: "",
                });
                handleClose();
              }}
              sx={{
                border: "1px solid #212121",
                color: "#212121",
                // height: "40px",
                // width: "118px",
                borderRadius: "50px",
                fontSize: "14px",
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default OptinModal;
