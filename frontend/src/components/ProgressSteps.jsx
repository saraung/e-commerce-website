import React from 'react';
import { Step, StepLabel, Stepper } from "@mui/material";

const ProgressSteps = ({ step1, step2, step3 }) => {
  const activeStep = step3 ? 2 : step2 ? 1 : step1 ? 0 : -1;

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{
        marginTop: "100px",
        "& .MuiStepLabel-label": { color: "white" }, // Default label color
        "& .Mui-active .MuiStepLabel-label": { color: "yellow" }, // Active step label color
        "& .Mui-completed .MuiStepLabel-label": { color: "yellow" }, // Completed step label color
        "& .MuiStepIcon-root": { color: "yellow" }, // Step icons color
        "& .Mui-active .MuiStepIcon-root": { color: "yellow" }, // Active icon color
        "& .Mui-completed .MuiStepIcon-root": { color: "yellow" }, // Completed icon color
        "& .MuiStepIcon-text": { fill: "black" }, // Text (123) inside the step icons
      }}
    >
      <Step>
        <StepLabel
          sx={{
            "& .MuiStepLabel-label": { color: step1 ? "yellow" : "white" },
            "& .MuiStepIcon-root": { color: step1 ? "yellow" : "white" },
            "& .MuiStepIcon-text": { fill: "black" }, // Set step number text to black
          }}
        >
          Login
        </StepLabel>
      </Step>
      <Step>
        <StepLabel
          sx={{
            "& .MuiStepLabel-label": { color: step2 ? "yellow" : "white" },
            "& .MuiStepIcon-root": { color: step2 ? "yellow" : "white" },
            "& .MuiStepIcon-text": { fill: "black" }, // Set step number text to black
          }}
        >
          Shipping
        </StepLabel>
      </Step>
      <Step>
        <StepLabel
          sx={{
            "& .MuiStepLabel-label": { color: step3 ? "yellow" : "white" },
            "& .MuiStepIcon-root": { color: step3 ? "yellow" : "white" },
            "& .MuiStepIcon-text": { fill: "black" }, // Set step number text to black
          }}
        >
          Summary
        </StepLabel>
      </Step>
    </Stepper>
  );
};

export default ProgressSteps;
