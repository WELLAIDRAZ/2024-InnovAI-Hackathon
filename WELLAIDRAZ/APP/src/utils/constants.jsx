import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First Name must be at least 2 characters")
      .max(20, "First Name must be less than 20 characters")
      .regex(/^[A-Za-z]+$/, "First Name must contain only letters"),

    lastName: z
      .string()
      .min(2, "Last Name must be at least 2 characters")
      .max(20, "Last Name must be less than 20 characters")
      .regex(/^[A-Za-z]+$/, "Last Name must contain only letters"),

    email: z.string().email("Invalid email format"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be less than 20 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be less than 20 characters"),

    birthDate: z.date(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // or you can target both firstName and lastName
  })
  .refine((data) => data.firstName !== data.lastName, {
    message: "First name and last name must be different",
    path: ["lastName"], // or you can target both firstName and lastName
  });

export const vitalsSchema = z.object({
  HR: z.number(), // Heart Rate: beats per minute
  O2Sat: z.number(), // Oxygen Saturation: percentage
  Temp: z.number(), // Temperature: Celsius
  SBP: z.number(), // Systolic Blood Pressure: mmHg
  MAP: z.number(), // Mean Arterial Pressure: mmHg
  DBP: z.number(), // Diastolic Blood Pressure: mmHg
  Resp: z.number(), // Respiratory Rate: breaths per minute
  Etco2: z.number(), // End-Tidal CO2: mmHg
});

export const allValuesSchema = z.object({
  HR: z.number(), // Heart Rate: beats per minute
  O2Sat: z.number(), // Oxygen Saturation: percentage
  Temp: z.number(), // Temperature: Celsius
  SBP: z.number(), // Systolic Blood Pressure: mmHg
  MAP: z.number(), // Mean Arterial Pressure: mmHg
  DBP: z.number(), // Diastolic Blood Pressure: mmHg
  Resp: z.number(), // Respiratory Rate: breaths per minute
  EtCO2: z.number(), // End-Tidal CO2: mmHg
  BaseExcess: z.number(), // Base Excess
  HCO3: z.number(), // Bicarbonate
  FiO2: z.number(), // Fraction of Inspired Oxygen
  pH: z.number(), // pH Level
  PaCO2: z.number(), // Partial Pressure of CO2
  SaO2: z.number(), // Oxygen Saturation in Blood
  AST: z.number(), // Aspartate Aminotransferase
  BUN: z.number(), // Blood Urea Nitrogen
  Alkalinephos: z.number(), // Alkaline Phosphatase
  Calcium: z.number(), // Calcium Level
  Chloride: z.number(), // Chloride Level
  Creatinine: z.number(), // Creatinine Level
  Bilirubin_direct: z.number(), // Direct Bilirubin
  Glucose: z.number(), // Glucose Level
  Lactate: z.number(), // Lactate Level
  Magnesium: z.number(), // Magnesium Level
  Phosphate: z.number(), // Phosphate Level
  Potassium: z.number(), // Potassium Level
  Bilirubin_total: z.number(), // Total Bilirubin
  TroponinI: z.number(), // Troponin I Level
  Hct: z.number(), // Hematocrit
  Hgb: z.number(), // Hemoglobin
  PTT: z.number(), // Partial Thromboplastin Time
  WBC: z.number(), // White Blood Cell Count
  Fibrinogen: z.number(), // Fibrinogen Level
  Platelets: z.number(), // Platelet Count
  Age: z.number().min(0).max(120),
  Gender: z.number().int().min(0).max(1), // Gender must be 0 or 1
  Unit1: z.number(), // Unit 1 (e.g., ICU admission)
  Unit2: z.number(), // Unit 2 (e.g., general ward admission)
  HospAdmTime: z.number(), // Hospital Admission Time
  ICULOS: z.number(), // ICU Length of Stay
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters"),
});
export const emailSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export const forgetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be less than 20 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be less than 20 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // or you can target both firstName and lastName
  });

export const updateOrderSchema = z.object({
  // client_id: z.string().length(24, "client_id must be exactly 24 characters"),  // Must be exactly 24 characters
  // patient_id: z.string().length(24, "patient_id must be exactly 24 characters"),  // Must be exactly 24 characters
  // doctor_id: z.string().length(24, "doctor_id must be exactly 24 characters"),  // Must be exactly 24 characters
  // operator_id: z.string().length(24, "operator_id must be exactly 24 characters"),  // Must be exactly 24 characters
  total_amount: z.number().positive("Total amount must be a positive number"), // Ensuring total amount is a positive number
  status: z.enum(["received", "rejected", "delivered", "accepted"]), // Enum for status
  note: z.string().optional(), // Note is optional, can be a string or undefined
  image_url: z.string().url("Must be a valid URL").optional(), // Validating as a URL, and optional
});

export const updateDrugSchema = z.object({
  drug_name: z.string().optional(), // Optional string
  drug_form: z.string().optional(), // Optional string
  dosage: z.string().optional(), // Optional string
  ppv: z.number().default(0.0), // Required number with a default value
  number_of_sells: z.number().default(0), // Required number with a default value
  expiry_date: z.date().optional(), // Optional date
  note: z.string().optional(), // Optional string
});

export const updatePatientSchema = z.object({
  name: z.string().optional(), // Optional string
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(), // Optional string
  mean_distance: z.string().optional(), // Optional string
  number_of_sells: z.number().default(0), // Required number with a default value
  first_cnx_date: z.date().optional(), // Optional date
  total_amount: z.number().default(0.0), // Required number with a default value
  note: z.string().optional(), // Optional string
});

export const updateDoctorSchema = z.object({
  name: z.string().optional(), // Optional string
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(), // Optional string
  speciality: z.string().optional(), // Optional string
  number_of_orders: z.number().default(0), // Required number with a default value
  first_cnx_date: z.date().optional(), // Optional date
  note: z.string().optional(), // Optional string
});

export const pharmacistSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First Name must be at least 2 characters")
      .max(20, "First Name must be less than 20 characters")
      .regex(/^[A-Za-z]+$/, "First Name must contain only letters"),

    lastName: z
      .string()
      .min(2, "Last Name must be at least 2 characters")
      .max(20, "Last Name must be less than 20 characters")
      .regex(/^[A-Za-z]+$/, "Last Name must contain only letters"),

    email: z.string().email("Invalid email format"),

    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/)
      .min(10)
      .max(15),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be less than 20 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    profileImage: z.union([
      // Option 1: A File instance
      z.instanceof(File).refine(
        (file) => !!file, // Ensure a File object is provided
        {
          message: "Please select a file.",
        }
      ),
      // Option 2: A valid URL
      z
        .string()
        .url({ message: "Please provide a valid link." }) // Must be a valid URL if entered
        .min(1, { message: "Please enter a link." }),
    ]),
  })
  .refine((data) => data.firstName !== data.lastName, {
    message: "First name and last name must be different",
    path: ["lastName"], // or you can target both firstName and lastName
  });

export const pharmacySchema = z.object({
  pharmacy_name: z
    .string()
    .min(2, "First Name must be at least 2 characters")
    .max(20, "First Name must be less than 20 characters")
    .regex(/^[A-Za-z]+$/, "First Name must contain only letters"),

  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .min(10)
    .max(15),

  address: z.string().optional(),
  logo: z.union([
    // Option 1: A File instance
    z.instanceof(File).refine(
      (file) => !!file, // Ensure a File object is provided
      {
        message: "Please select a file.",
      }
    ),
    // Option 2: A valid URL
    z
      .string()
      .url({ message: "Please provide a valid link." }) // Must be a valid URL if entered
      .min(1, { message: "Please enter a link." }),
  ]),
  patentId: z
    .string()
    .regex(
      /^[A-Za-z0-9]{6,12}$/,
      "Patent ID must be alphanumeric and 6-12 characters long"
    )
    .nonempty("Patent ID is required"),
});

export const operatorsSchema = z.object({
  operators: z.array(
    z.object({
      operator: z.string().min(1, "Name is required"),
    })
  ),
});

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const datePart = date.toISOString().split("T")[0];
  const timePart = date.toISOString().split("T")[1].split(".")[0];
  return `${datePart} | ${timePart}`;
}

export function getMonthFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  const month = date.toLocaleString("default", { month: "short" }); // 'short' returns 3-letter month name
  return month;
}

export const userRegisterAPI = "/api/user/userRegisterRoute";
export const userChangePasswordAPI = "/api/user/userChangePasswordRoute";
export const userExistsAPI = "/api/user/userExistsRoute";
export const userMainForgetPasswordAPI =
  "/api/user/userMainForgetPasswordRoute";
export const userResendEmailAPI = "/api/user/userResendEmailRoute";
export const userSubmitDateAPI = "/api/user/userSubmitDateRoute";

export const orderCreateAPI = "/api/order/createOrderRoute";
export const orderExistsAPI = "/api/order/orderExistsRoute";
export const getOrdersAPI = "/api/order/getOrdersRoute";

export const drugCreateAPI = "/api/drug/createDrugRoute";
export const drugExistsAPI = "/api/drug/drugExistsRoute";
export const getDrugsAPI = "/api/drug/getDrugsRoute";
export const getDrugsByOrderIDAPI = "/api/drug/getDrugsByOrderIDRoute";

export const patientCreateAPI = "/api/patient/createPatientRoute";
export const patientExistsAPI = "/api/patient/patientExistsRoute";
export const getPatientsAPI = "/api/patient/getPatientsRoute";

export const doctorCreateAPI = "/api/doctor/createDoctorRoute";
export const doctorExistsAPI = "/api/doctor/doctorExistsRoute";
export const getDoctorsAPI = "/api/doctor/getDoctorsRoute";

export const getprojectsAPI = "/api/patient/getPatientsRoute";

export const getNotificationAPI = "/api/notification/getNotificationsRoute";
