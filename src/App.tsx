import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import PersonalInformation from "./pages/PersonalInformation";
import ChurchInformation from "./pages/ChurchInformation";
import VotersInformation from "./pages/VotersInformation";
import ReviewInformation from "./pages/ReviewInformation";
import { useProfile } from "./hooks/useProfile";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        BRC
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Personal", "Church", "Voters Address", "Review"];

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

export default function App() {
  const { handleSubmit, validProfileInfo, validChurchInfo } = useProfile();

  const [activeStep, setActiveStep] = React.useState(0);

  const resetStep = () => {
    setActiveStep(0);
  };

  const handleNext = () => {
    handleSubmit(); // testing only to show data
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    handleSubmit(); // testing only to show data
    setActiveStep(activeStep - 1);
  };

  const isValid = () => {
    switch(activeStep) {
      case 0:
        return !validProfileInfo;
      case 1:
        return !validChurchInfo;
      default:
        return false;
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="primary"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            BRC Profiling
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Registration
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{ pt: 3, pb: 5 }}
            alternativeLabel
          >
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
                netowrk information. This is used for profiling of each
                individual and for statistics only.
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
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
