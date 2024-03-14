import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const helpData = [
  {
    id: 1,
    title: "What is the mini license?",
    content: `There's nothing small about our license. minisocial campaigns
    produce fully licensed user generated content for brands. Each
    asset is covered by our "mini license," in a nutshell, brands
    are free to do what they like with the content delivered to
    them. This includes use on organic social, acquisition, web,
    print, and beyond all without needing to worry about expiring
    usage rights, model releases, etc.`,
  },
  {
    id: 2,
    title: "How does it work for brands?",
    content: `There's nothing small about our license. minisocial campaigns
    produce fully licensed user generated content for brands. Each
    asset is covered by our "mini license," in a nutshell, brands
    are free to do what they like with the content delivered to
    them. This includes use on organic social, acquisition, web,
    print, and beyond all without needing to worry about expiring
    usage rights, model releases, etc.`,
  },
  {
    id: 3,
    title: "How does it work for creators?",
    content: `There's nothing small about our license. minisocial campaigns
    produce fully licensed user generated content for brands. Each
    asset is covered by our "mini license," in a nutshell, brands
    are free to do what they like with the content delivered to
    them. This includes use on organic social, acquisition, web,
    print, and beyond all without needing to worry about expiring
    usage rights, model releases, etc.`,
  },
  {
    id: 4,
    title: "What do I need to get started?",
    content: `There's nothing small about our license. minisocial campaigns
    produce fully licensed user generated content for brands. Each
    asset is covered by our "mini license," in a nutshell, brands
    are free to do what they like with the content delivered to
    them. This includes use on organic social, acquisition, web,
    print, and beyond all without needing to worry about expiring
    usage rights, model releases, etc.`,
  },
  {
    id: 5,
    title: "How much does it cost?",
    content: `There's nothing small about our license. minisocial campaigns
    produce fully licensed user generated content for brands. Each
    asset is covered by our "mini license," in a nutshell, brands
    are free to do what they like with the content delivered to
    them. This includes use on organic social, acquisition, web,
    print, and beyond all without needing to worry about expiring
    usage rights, model releases, etc.`,
  },
];

const GetHelp = () => {
  return (
    <Box>
      {helpData.map((item) => {
        return (
          <Accordion
            disableGutters={true}
            sx={{
              "& .MuiButtonBase-root": {
                minHeight: "82px",
                p: 0,
              },
              boxShadow: "none !important",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                "& .MuiAccordionSummary-content": { m: 0 },
              }}
            >
              <Typography variant="h5">{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0 }}>
              <Typography variant="subtitle2">{item.content}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          How does it work for brands?
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          How does it work for creators?
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion> */}
    </Box>
  );
};

export default GetHelp;
