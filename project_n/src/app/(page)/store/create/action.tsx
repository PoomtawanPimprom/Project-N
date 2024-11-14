"use server";

import { CreateStore } from "@/app/service/store/service";

export async function submitForm(formdata: FormData) {
  const name = formdata.get("name");
  const description = formdata.get("description");
  const imageLogo = formdata.get("image-logo");
  const imageBackgroud = formdata.get("image-background");

  const data = {
    name,
    description,
    imageLogo,
    imageBackgroud,
  };
  console.log("data: ", data);
//   const res = await CreateStore(data)
}
