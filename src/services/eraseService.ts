import { deleteUserById } from "../repositories/eraseRepositorie";



export async function eraseUserByIdService(userId: number) {
  await deleteUserById(userId);
}