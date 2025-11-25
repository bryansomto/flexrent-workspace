// apps/web/components/kyc/IdentityStep.tsx
"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

interface IdentityStepProps {
  onSuccess: (userData: any) => void;
}

export default function IdentityStep({ onSuccess }: IdentityStepProps) {
  const [bvn, setBvn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call your NestJS Microservice
      const res = await fetch("http://localhost:3001/kyc/verify-bvn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bvn }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Verification failed");

      // SUCCESS! Pass data up to parent to trigger the next step
      onSuccess(data.details);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 4, textAlign: "center" }}>
        <Box sx={{ mb: 3, color: "primary.main" }}>
          <VerifiedUserOutlinedIcon sx={{ fontSize: 48 }} />
        </Box>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Step 1: Identity Check
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Enter your 11-digit BVN to verify your government identity.
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="BVN"
            fullWidth
            value={bvn}
            onChange={(e) => setBvn(e.target.value)}
            disabled={loading}
            slotProps={{
              htmlInput: {
                suppressHydrationWarning: true,
                maxLength: 11,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading || bvn.length < 11}
          >
            {loading ? "Verifying..." : "Verify Identity"}
          </Button>
        </form>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
