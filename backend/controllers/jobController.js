import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });

  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this feature", 400)
    );
  }

  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryStart,
    salaryEnd,
  } = req.body;

  if (
    !title ||
    !description ||
    !category ||
    !country ||
    !city ||
    !location /*||
    !fixedSalary ||
    !salaryStart ||
    !salaryEnd*/
  ) {
    return next(new ErrorHandler("Please provide full job details"));
  }

  /*if ((!salaryStart || !salaryEnd) && !fixedSalary) {
    return next(
      new ErrorHandler("Please provide either ranged salary or fixed salary")
    );
  }
  if (salaryStart && salaryEnd && fixedSalary) {
    return next(
      new ErrorHandler("Can't provide fixed and ranged salary together")
    );
  }*/

  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryStart,
    salaryEnd,
    postedBy,
  });

  res.status(200).json({
    success: true,
    message: "Job posted successfully",
    job,
  });
});

export const getmyJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employee") {
    return next(
      new ErrorHandler("Empoloyees are not allowed to access this feature", 400)
    );
  }

  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

export const updateJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employee") {
    return next(
      new ErrorHandler("Empoloyees are not allowed to access this feature", 400)
    );
  }

  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found", 404));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    Job,
    message: "Job Updated Successfully",
  });
});

export const deleteJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Empoloyees are not allowed to access this feature", 400)
    );
  }

  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job deleted successfully!",
  });
});

export const getSingleJob = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});
/*
{
    "title":"Software Dev",
    "description":"jgvukhbukvhicygsdfvsrfbvdfbdfbgfgngb fgfgfgnfgbfghbfgnfhnghmgndfbsfndg",
    "category":"CSE",
    "country":"BD",
    "city":"Chittagong",
    "location":"ibikujbwicdujbibijbksdcjbiwdvjbiecbvjiekjcbvefvj",
    "fixedSalary":2000
  //  "salaryStart":
}
  */
