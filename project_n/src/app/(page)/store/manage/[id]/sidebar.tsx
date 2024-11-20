type Sidebarprop = {
  value: string;
  onclick: (e:any) => void;
};

export default function Sidebar({ value, onclick }: Sidebarprop) {
  const navbardata = [{ text: "ข้อมูลร้านค้า" }, { text: "จัดการสินค้า" }];
  return (
    <div className="flex flex-col w-[400px]">
      <div className="flex flex-col rounded-l-xl border-r-2 h-full w-full">
        <div className="flex w-full h-[60px] p-4 mx-auto justify-center font-bold text-2xl rounded-tl-xl bg-green text-white">
          จัดการร้านค้า
        </div>
        {navbardata.map((item, index) => (
          <button
            onClick={()=>onclick(item.text)}
            className="flex w-full h-[60px] p-4 mx-auto justify-center font-bold text-2xl hover:text-white hover:bg-green"
          >
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
}
