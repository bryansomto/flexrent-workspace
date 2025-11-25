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
  FormHelperText,
  Alert,
} from "@mui/material";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { SignupFormData, signupSchema } from "../../../lib/validations/zodAuth";
import PageLoader from "../../../components/PageLoader";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import { signIn } from "next-auth/react";
import { registerUser } from "@/lib/actions";

export default function SignupClient() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const callbackUrl = searchParams.get("callbackUrl") || "/auth/login";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
  });

  const passwordValue = useWatch({ control, name: "password" });

  const onSubmit = async (data: SignupFormData) => {
    setServerError(null);

    try {
      const result = await registerUser(data);

      if (result.success) {
        router.push("/auth/login?success=true");
      } else {
        setServerError(result.message);
      }
    } catch (error) {
      setServerError("An unexpected error occurred.");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // ... SocialButton helper ...
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
      {/* LEFT SIDE (Image) - Kept same */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          backgroundImage:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.6) 100%), url('/login-bg.png')",
          backgroundRepeat: "no-repeat",
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
            "The easiest way to pay rent and build credit."
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            — Sarah K., Graphic Designer
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
          <Box sx={{ width: "100%", maxWidth: 480, mx: "auto" }}>
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
              Create an account
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Start your journey to flexible living today.
            </Typography>

            {serverError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {serverError}
              </Alert>
            )}

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ width: "100%" }}
            >
              <Stack spacing={2.5}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="First Name"
                        fullWidth
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        variant="outlined"
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Last Name"
                        fullWidth
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </Stack>

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

                {passwordValue && (
                  <PasswordStrengthMeter password={passwordValue} />
                )}

                {/* Show Zod error message below the meter if validation failed */}
                {errors.password && (
                  <FormHelperText error sx={{ mt: 0.5 }}>
                    {errors.password.message}
                  </FormHelperText>
                )}

                {/* Terms Checkbox - Controlled by Zod */}
                <Controller
                  name="agreeToTerms"
                  control={control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={value}
                            onChange={onChange}
                            color="primary"
                          />
                        }
                        label={
                          <Typography variant="body2">
                            I agree to the{" "}
                            <MuiLink
                              component={Link}
                              href="/terms"
                              color="primary"
                              fontWeight="600"
                            >
                              Terms & Conditions
                            </MuiLink>{" "}
                            and{" "}
                            <MuiLink
                              component={Link}
                              href="/privacy"
                              color="primary"
                              fontWeight="600"
                            >
                              Privacy Policy
                            </MuiLink>
                            .
                          </Typography>
                        }
                      />
                      {/* Show Zod Error for Checkbox */}
                      {fieldState.error && (
                        <FormHelperText error>
                          {fieldState.error.message}
                        </FormHelperText>
                      )}
                    </Box>
                  )}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    borderRadius: 2,
                  }}
                >
                  Create account
                </Button>
              </Stack>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              <Stack spacing={2}>
                <SocialButton
                  icon={<GoogleIcon />}
                  label="Sign up with Google"
                  onClick={() => signIn("google", { callbackUrl })}
                />
                <SocialButton
                  icon={<AppleIcon />}
                  label="Sign up with Apple"
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
                  Already have an account?
                </Typography>
                <MuiLink
                  component={Link}
                  href="/auth/login"
                  variant="body2"
                  fontWeight="600"
                  underline="hover"
                  color="primary"
                >
                  Sign in
                </MuiLink>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
