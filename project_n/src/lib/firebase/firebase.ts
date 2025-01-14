import { initializeApp } from "firebase/app";
import { deleteObject, getStorage, ref } from "firebase/storage";

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



export {storage};


export const extractFileNameFromUrl = (folder: string,url: string): string | null => {
  const regex = new RegExp(`${folder}%2F([^?]+)`);
  const match = url.match(regex);

  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }

  return null; // ถ้าไม่พบผลลัพธ์จะคืนค่า null
};

export const deleteUploadedImages = async (folder: string,images: string[]) => {
    try {
      console.log("start detele");
      await Promise.all(
        images.map(async (imgUrl) => {
          console.log("folder",folder)
          const fileName = extractFileNameFromUrl(folder,imgUrl);
          const refPath = `${folder}/${fileName}`;


          const storageRef = ref(storage, refPath);

          await deleteObject(storageRef);
          console.log("deleted image done");
        })
      );
    } catch (error) {
      console.error("Error deleting uploaded images", error);
    }
  };