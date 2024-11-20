import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

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
const analytics = getAnalytics(app);
const storage = getStorage(app);

export {storage};