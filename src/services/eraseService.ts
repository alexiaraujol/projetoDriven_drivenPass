import { deleteAll } from "../repositories/eraseRepositorie";


export async function eraseAllUsers() {
  await deleteAll();
}