import { initializeApp } from "firebase/app";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyDtSsC_sxR5jAHebVyByvYwE5WJ-CBPUyc",
  authDomain: "project-n-eff9b.firebaseapp.com",
  projectId: "project-n-eff9b",
  storageBucket: "project-n-eff9b.firebasestorage.app",
  messagingSenderId: "339099709111",
  appId: "1:339099709111:web:55dfe6b8c26f46c867e732",
  measurementId: "G-EDS1CYHTR0"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);



export { storage };

//create
export const genarateImageName = () => { return v4() }

export async function uploadImageToFirebase(
  image: File, 
  imageName: string,
  folder: string) {
    try {
      // Create a reference to the storage location
      const Ref = ref(storage, `${folder}/${imageName}`);
  
      // Upload the image
      await uploadBytes(Ref, image);
  
      // Get the download URL
      const downloadURL = await getDownloadURL(Ref);
      
      //return the download URL
      return {downloadURL,Ref};
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    }
}


// part delete fild 

export const extractFileNameFromUrl = (folder: string, url: string): string | null => {
  const regex = new RegExp(`${folder}%2F([^?]+)`);
  const match = url.match(regex);

  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }

  return null; // ถ้าไม่พบผลลัพธ์จะคืนค่า null
};

export const deleteUploadedImage = async (folder: string, imageUrl: string) => {
  try {

    const fileName = extractFileNameFromUrl(folder, imageUrl);
    const refPath = `${folder}/${fileName}`;
    const storageRef = ref(storage, refPath);
    
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting uploaded image", error);
  }
};