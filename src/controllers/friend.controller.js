// controllers/friend.controller.js

import { User } from "../models/user.model.js";
import { asyncHandler } from "../lib/utils.js";
import { ApiError, ApiResponse } from "../lib/utils.js";

// Send Friend Request
export const sendFriendRequest = asyncHandler(async (req, res) => {
  const { recipientId } = req.params;
  const senderId = req.user._id;

  if (senderId.toString() === recipientId) {
    throw new ApiError(400, "Cannot send friend request to yourself");
  }

  const sender = await User.findById(senderId);
  const recipient = await User.findById(recipientId);

  if (!recipient) throw new ApiError(404, "User not found");

  if (sender.friends.includes(recipientId)) {
    throw new ApiError(400, "You are already friends");
  }

  if (sender.friendRequestsSent.includes(recipientId)) {
    throw new ApiError(400, "Friend request already sent");
  }

  if (recipient.friendRequestsReceived.includes(senderId)) {
    throw new ApiError(400, "Friend request already received");
  }

  sender.friendRequestsSent.push(recipientId);
  recipient.friendRequestsReceived.push(senderId);

  await sender.save();
  await recipient.save();

  return res.status(200).json(new ApiResponse(200, {}, "Friend request sent"));
});

// Accept Friend Request
export const acceptFriendRequest = asyncHandler(async (req, res) => {
  const { senderId } = req.params;
  const recipientId = req.user._id;

  const sender = await User.findById(senderId);
  const recipient = await User.findById(recipientId);

  if (!sender || !recipient) throw new ApiError(404, "User not found");

  const requestIndex = recipient.friendRequestsReceived.indexOf(senderId);
  if (requestIndex === -1) {
    throw new ApiError(400, "No friend request from this user");
  }

  recipient.friendRequestsReceived.splice(requestIndex, 1);
  sender.friendRequestsSent = sender.friendRequestsSent.filter(
    (id) => id.toString() !== recipientId.toString()
  );

  recipient.friends.push(senderId);
  sender.friends.push(recipientId);

  await recipient.save();
  await sender.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Friend request accepted"));
});

// cancel request


export const cancelFriendRequest = asyncHandler(async (req, res) => {
  const senderId = req.user._id;
  const { recipientId } = req.params;

  const sender = await User.findById(senderId);
  const recipient = await User.findById(recipientId);

  if (!recipient) throw new ApiError(404, "Recipient not found");

  const sentIndex = sender.friendRequestsSent.indexOf(recipientId);
  const receivedIndex = recipient.friendRequestsReceived.indexOf(senderId);

  if (sentIndex === -1 || receivedIndex === -1) {
    throw new ApiError(400, "Friend request not found");
  }

  sender.friendRequestsSent.splice(sentIndex, 1);
  recipient.friendRequestsReceived.splice(receivedIndex, 1);

  await sender.save();
  await recipient.save();

  res.status(200).json(new ApiResponse(200, {}, "Friend request cancelled"));
});

//reject  friend request
export const rejectFriendRequest = asyncHandler(async (req, res) => {
  const receiverId = req.user._id;
  const { senderId } = req.params;

  const receiver = await User.findById(receiverId);
  const sender = await User.findById(senderId);

  if (!sender) throw new ApiError(404, "Sender not found");

  const receivedIndex = receiver.friendRequestsReceived.indexOf(senderId);
  const sentIndex = sender.friendRequestsSent.indexOf(receiverId);

  if (receivedIndex === -1 || sentIndex === -1) {
    throw new ApiError(400, "Friend request not found");
  }

  receiver.friendRequestsReceived.splice(receivedIndex, 1);
  sender.friendRequestsSent.splice(sentIndex, 1);

  await receiver.save();
  await sender.save();

  res.status(200).json(new ApiResponse(200, {}, "Friend request rejected"));
});
