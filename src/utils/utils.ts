export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

export const isPasswordValid = (password: string) => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  return regex.test(password);
};

export const getSender = (participants: any) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const filteredArray = participants.filter(
    (participant) => participant._id !== userInfo && userInfo.id
  );
  return filteredArray[0].username;
};
