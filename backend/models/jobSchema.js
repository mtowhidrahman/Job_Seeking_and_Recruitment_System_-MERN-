import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a job title"],
    minLength: [3, "Job title must be of at least 3 characters"],
    maxLength: [50, "Job title cannot exceed 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide all the information"],
    minLength: [20, "Job description must be of at least 20 characters"],
    maxLength: [300, "Job description cannot exceed 50 characters"],
  },
  category: {
    type: String,
    required: [true, "Job catagory is required"],
  },
  country: {
    type: String,
    required: [true, "Please provide the country name"],
  },
  city: {
    type: String,
    required: [true, "Please provide the city name"],
  },
  location: {
    type: String,
    required: [true, "Please provide the accurate location"],
    minLength: [20, "Job Location must contain at least 20 characters"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Salary must be of at least 4 digits"],
    maxLength: [9, "Salary can't exceed 9 digits"],
  },
  salaryStart: {
    type: Number,
    minLength: [4, "Salary must start from at least 4 digits"],
    maxLength: [9, "Starting salary can't exceed 9 digits"],
  },
  salaryEnd: {
    type: Number,
    minLength: [4, "Salary can't be less than at least 4 digits"],
    maxLength: [9, "Salary can't exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
/*{
  "title":"CSE",
  "description":"jgvjhjvjhvjhvjhjkvjhvjhvjhvjhvjvjhm vjhvjhvchgjhgchjskskh",
  "category":"developer",
  "country": "bd",
  "city": "dhaka",
  "location": "gulshangvujhbjhvjhjvhjjhvjhbjvjv",
  "fixedSalary":2000
}*/