import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonalInformation from "./PersonalInformation";
import ChurchInformation from "./ChurchInformation";
import VotersInformation from "./VotersInformation";
import ReviewInformation from "./ReviewInformation";
import { useProfile } from "../hooks/useProfile";
import Grid from "@mui/material/Grid";

const steps = ["Personal", "Church", "Voter's Info", "Review"];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <PersonalInformation />;
    case 1:
      return <ChurchInformation />;
    case 2:
      return <VotersInformation />;
    case 3:
      return <ReviewInformation />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Registration() {
  const {
    handleSubmit,
    handleResetInfo,
    validProfileInfo,
    validChurchInfo,
    validVotersInfo,
  } = useProfile();

  const [activeStep, setActiveStep] = React.useState(0);

  const resetStep = () => {
    handleResetInfo();
    setActiveStep(0);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const isValid = () => {
    switch (activeStep) {
      case 0:
        return !validProfileInfo;
      case 1:
        return !validChurchInfo;
      case 2:
        return !validVotersInfo;
      default:
        return false;
    }
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} md={8} sx={{ m: 3}}>
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          {activeStep === steps.length ? "Complete!" : "Registration"}
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Thank you for your cooperation.
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Rest assured your information will not be used outside church
              netowrk information. This is used for profiling of each individual
              and for statistics only.
            </Typography>
            <Button variant="contained" onClick={resetStep} sx={{ mt: 3 }}>
              Register new
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                disabled={isValid()}
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1, px: 5 }}
              >
                {activeStep === steps.length - 1 ? "Register" : "Next"}
              </Button>
            </Box>
            {isValid() && (
              <Typography
                textAlign="right"
                variant="body2"
                fontStyle="italic"
                color="grey"
                sx={{ mt: 1 }}
              >
                *Complete input fields to proceed next
              </Typography>
            )}
          </React.Fragment>
        )}
      </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
