import mongoose from 'mongoose';

// Extracting the ObjectId property from mongoose.Schema
const { ObjectId } = mongoose.Schema;

// Defining a Mongoose schema for reviews
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    // User who created the review, reference to the "User" collection
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default reviewSchema;
