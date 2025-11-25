// apps/web/app/dashboard/verify/page.tsx
"use client";
import { useState } from "react";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
} from "@mui/material";
import IdentityStep from "@/components/kyc/IdentityStep";
import IncomeStep from "@/components/kyc/IncomeStep";

const steps = ["Identity Verification", "Income Verification", "Review"];

export default function VerificationPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [verifiedUser, setVerifiedUser] = useState<any>(null);

  // Callback when Step 1 is done
  const handleIdentitySuccess = (userData: any) => {
    setVerifiedUser(userData);
    setActiveStep(1); // Move to next step automatically
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Tenant Verification
        </Typography>
        <Typography color="text.secondary">
          Complete these steps to become a verified tenant on FlexRent.
        </Typography>
      </Box>

      {/* The Stepper UI */}
      <Box sx={{ width: "100%", mb: 6 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Conditional Rendering of Steps */}
      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        {activeStep === 0 && <IdentityStep onSuccess={handleIdentitySuccess} />}

        {activeStep === 1 && (
          <Box>
            {/* Show who we are verifying for */}
            <Typography
              variant="body2"
              sx={{ mb: 2, textAlign: "center", color: "success.main" }}
            >
              Verifying Income for:{" "}
              <strong>
                {verifiedUser?.firstName} {verifiedUser?.lastName}
              </strong>
            </Typography>

            <IncomeStep />
          </Box>
        )}

        {activeStep === 2 && (
          <Box textAlign="center">
            <Typography variant="h5">Verification Complete!</Typography>
            {/* You can add a redirect button to Dashboard here */}
          </Box>
        )}
      </Box>
    </Container>
  );
}
