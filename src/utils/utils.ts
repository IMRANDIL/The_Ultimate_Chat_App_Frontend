export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

export const isPasswordValid = (password: string) => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  return regex.test(password);
};

export const getSender = (chat: any) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  // Find the participant who is not the logged-in user
  const sender = chat.participants.find(
    (participant: any) => participant._id !== (userInfo && userInfo.id)
  );

  // Return the username of the sender, or an empty string if not found
  return sender && sender.username;
};

export const getSenderFull = (chat: any) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  // Find the participant who is not the logged-in user
  const sender = chat.participants.find(
    (participant: any) => participant._id !== (userInfo && userInfo.id)
  );

  // Return the username of the sender, or an empty string if not found
  return sender;
};
