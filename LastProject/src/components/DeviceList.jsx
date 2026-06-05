import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { addDevice } from "../store/deviceSlice";
import { useNavigate } from "react-router-dom";

const deviceSchema = yup.object().shape({
  name: yup
    .string()
    .required("მოდელის სახელი სავალდებულოა")
    .min(2, "მინიმუმ 2 სიმბოლო"),
  brand: yup.string().required("ბრენდი სავალდებულოა"),
  category: yup.string().required("კატეგორიის არჩევა აუცილებელია"),
  price: yup
    .number()
    .typeError("ფასი უნდა იყოს რიცხვი")
    .required("ფასი სავალდებულოა")
    .min(1, "უნდა იყოს 0-ზე მეტი"),
  stock: yup
    .number()
    .typeError("რაოდენობა უნდა იყოს რიცხვი")
    .required("მარაგი სავალდებულოა")
    .min(0, "მინიმუმ 0"),
});

function DeviceList() {
  const devices = useSelector((state) => state.devices.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(deviceSchema),
  });

  const onSubmit = (data) => {
    const newDevice = {
      id: String(Date.now()),
      name: data.name,
      brand: data.brand,
      category: data.category,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      desc: "მომხმარებლის მიერ დამატებული ახალი ტექნიკა.",
    };

    dispatch(addDevice(newDevice));
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="p-6 bg-slate-100 rounded-xl border border-slate-200 mt-6 text-center">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-800">
          ტექნიკის ინვენტარი 🚀
        </h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition shadow-sm"
        >
          ტექნიკის დამატება ➕
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {devices.map((device) => (
          <div
            key={device.id}
            onClick={() => navigate(`/product/${device.id}`)}
            className="cursor-pointer bg-white p-4 rounded-xl border border-slate-200 text-left shadow-sm flex flex-col justify-between transition-all hover:shadow-md hover:scale-[1.02]"
          >
            <div>
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-800 text-base">
                  💻 {device.name}
                </h4>
                <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-md">
                  {device.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                <span className="font-semibold text-slate-600">ბრენდი:</span>{" "}
                {device.brand}
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-50 flex justify-between items-center">
              <span className="text-emerald-600 font-black text-sm">
                {device.price} ლარი
              </span>
              <span className="text-xs text-slate-400 font-bold">ნახვა 👁️</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl border-2 border-black max-w-sm w-full mx-4 shadow-2xl text-left">
            <h4 className="text-lg font-black text-slate-800 mb-4">
              ახალი პროდუქტის ჩამატება
            </h4>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  მოდელის დასახელება
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-0.5">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  ბრენდი
                </label>
                <input
                  type="text"
                  {...register("brand")}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm outline-none"
                />
                {errors.brand && (
                  <p className="text-red-500 text-xs mt-0.5">
                    {errors.brand.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  კატეგორია
                </label>
                <select
                  {...register("category")}
                  className="w-full p-2 border border-slate-300 rounded-lg text-sm outline-none bg-white"
                >
                  <option value="">აირჩიე კატეგორია</option>
                  <option value="სმარტფონი">სმარტფონი 📱</option>
                  <option value="ლეპტოპი">ლეპტოპი 💻</option>
                  <option value="ტელევიზორი">ტელევიზორი 📺</option>
                  <option value="აქსესუარი">აქსესუარი 🎧</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-0.5">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    ფასი (ლარი)
                  </label>
                  <input
                    type="text"
                    {...register("price")}
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm outline-none"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    რაოდენობა (მარაგი)
                  </label>
                  <input
                    type="text"
                    {...register("stock")}
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm outline-none"
                  />
                  {errors.stock && (
                    <p className="text-red-500 text-xs mt-0.5">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    reset();
                  }}
                  className="w-1/2 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg"
                >
                  გაუქმება
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg"
                >
                  დამატება ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeviceList;
