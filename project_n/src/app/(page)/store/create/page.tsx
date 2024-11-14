import { submitForm } from "./action";

const CreateStorePage = () => {
  return (
    <div className="flex px-4 ">
      <div className="flex flex-col h-full w-[1200px] p-4 mx-auto border">
        <div className="text-5xl font-bold mb-4">สร้างร้านค้าของคุณ!</div>
        <form action={submitForm}>
          <div className=" space-y-2">
            <div className="mb-3">
              <p className="text-xl font-bold mb-1">ชื่อร้านค้าของคุณ</p>
              <input
                name="name"
                placeholder="ชื่อร้านค้า..."
                type="text"
                className="p-3 rounded-xl border border-black"
              />
            </div>
            <div className="mb-3">
              <p className="text-xl font-bold mb-1">รายละเอียดร้าน</p>
              <input
                name="description"
                placeholder="รายละเอียดร้านค้า..."
                type="text"
                className="p-3 rounded-xl border border-black"
              />
            </div>
            <div>
              <p className="text-xl font-bold mb-1">รูปโลโก้ร้านค้าของคุณ</p>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image-logo"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 120x120px)
                    </p>
                  </div>
                  <input
                    name="image-logo"
                    id="image-logo"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div>
              <p className="text-xl font-bold mb-1">รูปพื้นหลังร้านค้าของคุณ</p>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image-background"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 1400x500px)
                    </p>
                  </div>
                  <input
                    name="image-background"
                    id="image-background"
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button className=" rounded-xl bg-green dark:bg-black py-2 px-6 font-bold text-black hover:text-white duration-200">สร้าง</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStorePage;
