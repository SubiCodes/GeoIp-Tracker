import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema({
  user: {
    type: String,
    ref: "User",
    required: true,
    unique: true, // ensures one document per user
  },
  queries: {
    type: [String],
    default: [], // start with empty array
  }
}, {
  collection: "searchHistory",
  timestamps: true,
});

const SearchHistory = mongoose.model("SearchHistory", searchHistorySchema);
export default SearchHistory;
