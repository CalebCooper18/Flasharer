import User, { IUser, IUserDocument } from '../models/user';

export async function createUser(userInput: IUser): Promise<IUserDocument> {
  const user = new User({
    username: userInput.username,
    name: userInput.name,
    password: userInput.password,
    decks: [],
  });

  await user.save();

  const loggedInUser = await User.findOne({ username: userInput.username });

  if (!loggedInUser) {
    throw new Error('Internal Error');
  }

  return loggedInUser;
}

export async function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await User.findOne({ username });

  if (!user) {
    return false;
  }

  const validatedPassword = await user.comparePasswords(
    password,
    user.password
  );

  if (!validatedPassword) {
    return false;
  }

  return user;
}
