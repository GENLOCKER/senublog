import * as Yup from "yup"

export const loginSchema = Yup.object().shape({
   email: Yup.string().email("Please enter a valid email address").required("Email is required!"),
   password: Yup.string().required("Password is required!"),
   rememberMe: Yup.boolean().optional(),
})

export const signupSchema = Yup.object().shape({
   firstName: Yup.string().required("Firstname is required"),
   lastName: Yup.string().required("Lastname is required"),
   email: Yup.string().email("Please enter a valid email address").required("Email is required"),
   companyName: Yup.string().required("Company name is required"),
   password: Yup.string().min(8, "Password must be 8 characters or more").required("Password is required"),
})

export const forgotPasswordSchema = Yup.object().shape({
   email: Yup.string().email("Please enter a valid email address").required("Email is required!"),
})

export const resetPasswordSchema = Yup.object().shape({
   password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
})

export const changePasswordSchema = Yup.object().shape({
   oldPassword: Yup.string().required("Current password is required").min(8, "Password must be at least 8 characters"),
   newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters")
      .notOneOf([Yup.ref("oldPassword")], "New password must be different from current password"),
   confirmNewPassword: Yup.string()
      .required("Confirm new password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
})
