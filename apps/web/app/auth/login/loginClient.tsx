"use client";

import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  InputAdornment,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoginFormData, loginSchema } from "../../../lib/validations/zodAuth";
import PageLoader from "../../../components/PageLoader";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginClient() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard/overview";

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        redirect: false, // Important: Stop automatic redirect
        callbackUrl,
      });

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          setErrorMessage("Invalid email or password.");
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const SocialButton = ({
    icon,
    label,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
  }) => (
    <Button
      variant="outlined"
      fullWidth
      onClick={onClick}
      startIcon={icon}
      sx={{
        color: "text.primary",
        borderColor: theme.palette.divider,
        textTransform: "none",
        fontWeight: 500,
        py: 1.5,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
          borderColor: theme.palette.text.primary,
        },
      }}
    >
      {label}
    </Button>
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <PageLoader />;
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* LEFT SIDE (Image) - Kept same as before */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          backgroundImage:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.6) 100%), url('/login-bg.png')",
          // backgroundBlendMode: "overlay",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 4,
          color: "white",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            component={Link}
            href="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Flex
            <Box component="span" sx={{ color: "primary.light" }}>
              Rent
            </Box>
          </Typography>
        </Box>
        <Box sx={{ position: "relative", zIndex: 2, maxWidth: 480, mb: 8 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            "FlexRent gave me the financial freedom to live where I want."
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            — Alex M., Software Engineer
          </Typography>
        </Box>
      </Grid>

      {/* RIGHT SIDE (Form) */}
      <Grid
        size={{ xs: 12, md: 6 }}
        component={Paper}
        elevation={0}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
            {isMobile && (
              <Typography
                variant="h6"
                fontWeight="bold"
                component={Link}
                href="/"
                sx={{ textDecoration: "none", color: "text.primary", mb: 3 }}
              >
                Flex
                <Box component="span" sx={{ color: "primary.main" }}>
                  Rent
                </Box>
              </Typography>
            )}

            <Typography component="h1" variant="h4" fontWeight="bold" mb={1}>
              Welcome back
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Please enter your details to sign in.
            </Typography>

            {errorMessage && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {errorMessage}
              </Alert>
            )}

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ width: "100%" }}
            >
              <Stack spacing={2.5}>
                {/* Email - No inline rules needed! */}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email address"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      variant="outlined"
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      variant="outlined"
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                                aria-label="toggle password visibility"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={Boolean(value)}
                            onChange={onChange}
                            color="primary"
                          />
                        }
                        label={
                          <Typography variant="body2">Remember me</Typography>
                        }
                      />
                    )}
                  />
                  <MuiLink
                    component={Link}
                    href="/forgot-password"
                    variant="body2"
                    fontWeight="600"
                    underline="hover"
                    color="primary"
                  >
                    Forgot password?
                  </MuiLink>
                </Stack>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    borderRadius: 2,
                  }}
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="text.secondary"
                >
                  OR
                </Typography>
              </Divider>

              <Stack spacing={2}>
                <SocialButton
                  icon={<GoogleIcon />}
                  label="Sign in with Google"
                  onClick={() => signIn("google", { callbackUrl })}
                />
                <SocialButton
                  icon={<AppleIcon />}
                  label="Sign in with Apple"
                  onClick={() => signIn("apple", { callbackUrl })}
                />
              </Stack>

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0.5}
                mt={3}
              >
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?
                </Typography>
                <MuiLink
                  component={Link}
                  href="/auth/signup"
                  variant="body2"
                  fontWeight="600"
                  underline="hover"
                  color="primary"
                >
                  Sign up now
                </MuiLink>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
