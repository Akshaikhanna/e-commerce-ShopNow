import React, { useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX, ERROR_MESSAGE } from "../Error/Error";
import { auth } from "../Auth/Auth";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const StyledCard = styled(Grid)`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 8px 8px 8px 6px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled("form")`
  width: 100%;
  borderradius: 2%;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = ERROR_MESSAGE.EMAIL_REQUIRED;
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = ERROR_MESSAGE.INVALID_EMAIL;
  } else if (values.email.length > 30) {
    errors.email = ERROR_MESSAGE.LONG_EMAIL;
  }

  if (!values.password) {
    errors.password = ERROR_MESSAGE.PASSWORD_REQUIRED;
  } else if (values.password.length < 8) {
    errors.password = ERROR_MESSAGE.INVALID_PASSWORD;
  }

  return errors;
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    try {
      const { email, password } = values;
      await auth.createUserWithEmailAndPassword(email, password);
      nav("/login");
    } catch (error) {
      console.error("Register Error", error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <StyledCard>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <StyledForm onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 5 }}>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                helperText={formik.touched.email && formik.errors.email}
                inputProps={{ maxLength: 30 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                helperText={formik.touched.password && formik.errors.password}
                inputProps={{ maxLength: 8 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <StyledButton type="submit" variant="contained">
            Create
          </StyledButton>
        </StyledForm>
        <Typography variant="body2" mt={3}>
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </StyledCard>
    </Container>
  );
};

export default SignUp;
