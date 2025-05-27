import { ApiError } from "../lib/utils.js";

export function artist(req, res, next) {
  // Assuming req.user is already set by auth middleware
  if (!req.user) {
    return next(new ApiError(401, "Unauthorized: User not logged in"));
  }

  if (req.user.role !== "artist") {
    return next(new ApiError(403, "Forbidden: Access allowed only for artists"));
  }

  next(); // User is an artist, allow access
}
