"use client";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Stack,
  Container,
  CircularProgress,
  Paper,
  Chip,
  Divider,
  Alert,
} from "@mui/material";
import {
  CloudUploadOutlined,
  CheckCircleOutlined,
  CancelOutlined,
  LockOutlined,
  RefreshOutlined,
  WorkOutline,
} from "@mui/icons-material";

export default function BankStatementUpload() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [passwordNeeded, setPasswordNeeded] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  async function handleUpload(fileToUpload: File, pwd?: string) {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", fileToUpload);
    if (pwd) formData.append("password", pwd);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.status === "password_required") {
        setPasswordNeeded(true);
      } else if (data.message === "Analysis successful") {
        setResult(data);
        setPasswordNeeded(false);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed. Is the Python server running?");
    } finally {
      setLoading(false);
    }
  }

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
      handleUpload(e.target.files[0]);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, p: 2 }}>
      {/* 1. RESULT CARD */}
      {result ? (
        <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
          {/* Header */}
          <Box
            sx={{
              bgcolor: result.is_creditworthy ? "success.main" : "error.main",
              p: 3,
              textAlign: "center",
              color: "white",
            }}
          >
            {result.is_creditworthy ? (
              <CheckCircleOutlined sx={{ fontSize: 48, mb: 1 }} />
            ) : (
              <CancelOutlined sx={{ fontSize: 48, mb: 1 }} />
            )}
            <Typography variant="h5" fontWeight="bold">
              {result.is_creditworthy
                ? "Steady income detected"
                : "Income below threshold"}
            </Typography>
          </Box>

          {/* Body */}
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={1} alignItems="center" mb={3}>
              <Typography
                variant="caption"
                fontWeight="bold"
                sx={{ letterSpacing: 1.5, color: "text.secondary" }}
              >
                TOTAL DETECTED CREDITS
              </Typography>
              <Typography variant="h3" fontWeight={800} color="text.primary">
                {formatNaira(result.total_income)}
              </Typography>

              {/* Summary Match Badge */}
              <Chip
                icon={
                  result.summary_validation &&
                  result.summary_validation.includes("Match") ? (
                    <CheckCircleOutlined />
                  ) : (
                    <CancelOutlined />
                  )
                }
                label={`Bank Summary: ${result.summary_validation || "N/A"}`}
                color={
                  result.summary_validation &&
                  result.summary_validation.includes("Match")
                    ? "success"
                    : "warning"
                }
                variant="outlined"
                size="small"
                sx={{ mt: 1, backgroundColor: "background.paper" }}
              />
            </Stack>

            {/* Salary Section */}
            {result.salary_estimate > 0 && (
              <Alert
                icon={<WorkOutline fontSize="inherit" />}
                severity="info"
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  Salary Detected: {formatNaira(result.salary_estimate)}
                </Typography>
                <Typography variant="caption">
                  Based on keywords (IPPIS, FGN, Salary, etc.)
                </Typography>
              </Alert>
            )}
          </CardContent>

          <Divider />

          {/* Footer */}
          <Box sx={{ p: 2, bgcolor: "action.hover", textAlign: "center" }}>
            <Button
              startIcon={<RefreshOutlined />}
              color="inherit"
              onClick={() => {
                setResult(null);
                setPasswordNeeded(false);
                setSelectedFile(null);
                setPassword("");
              }}
            >
              Analyze Another File
            </Button>
          </Box>
        </Card>
      ) : (
        /* 2. UPLOAD AREA */
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            borderStyle: "dashed",
            borderWidth: 2,
            borderColor: "divider",
            borderRadius: 3,
            textAlign: "center",
            bgcolor: "background.paper",
            transition: "background-color 0.2s ease",
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          {passwordNeeded ? (
            /* PASSWORD FORM */
            <Stack spacing={3} alignItems="flex-start">
              <Stack direction="row" spacing={1} alignItems="center">
                <LockOutlined color="warning" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Password Required
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                This bank statement is encrypted. Please enter the password to
                unlock it (usually your Account Number).
              </Typography>

              <TextField
                fullWidth
                type="password"
                label="PDF Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                onClick={() =>
                  selectedFile && handleUpload(selectedFile, password)
                }
                sx={{
                  bgcolor: "text.primary",
                  "&:hover": { bgcolor: "text.secondary" },
                }}
              >
                {loading ? "Unlocking..." : "Unlock & Analyze"}
              </Button>
            </Stack>
          ) : (
            /* STANDARD UPLOAD BUTTON */
            <Box
              component="label"
              sx={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  p: 2,
                  borderRadius: "50%",
                  mb: 2,
                  opacity: 0.1,
                }}
              >
                {/* We use a wrapper box for the background opacity trick, 
                    or use standard theme colors */}
              </Box>

              {/* Alternative Icon Style using standard props */}
              <CloudUploadOutlined
                color="primary"
                sx={{ fontSize: 48, mb: 2 }}
              />

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Upload Bank Statement
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                PDF files only (Max 2MB)
              </Typography>

              {loading ? (
                <Stack direction="row" spacing={2} alignItems="center">
                  <CircularProgress size={20} />
                  <Typography variant="body2" color="primary.main">
                    Parsing Statement...
                  </Typography>
                </Stack>
              ) : (
                <Button component="span" variant="contained">
                  Select PDF
                </Button>
              )}

              {/* HIDDEN INPUT */}
              <Box
                component="input"
                type="file"
                accept=".pdf"
                sx={{ display: "none" }}
                onChange={onFileSelect}
                disabled={loading}
              />
            </Box>
          )}
        </Paper>
      )}
    </Container>
  );
}
