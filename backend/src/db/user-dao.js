import {User} from './user-schema';

export async function createUser(user) {
  const dbUser = new User(user);
  await dbUser.save();
  return dbUser;
}

export async function retrieveUser(id) {
  return await User.findById(id);
}

export async function updateUser(user) {
  const result = await User.findByIdAndUpdate(user._id, user, {new: true, useFindAndModify: false});
  return result ? true : false;
}

export async function deleteUser(id) {
  await User.deleteOne({_id: id});
}