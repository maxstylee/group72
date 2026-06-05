import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("სახელის შეყვანა აუცილებელია")
    .min(2, "სახელი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსგან"),
  email: yup
    .string()
    .email("ელფოსტის ფორმატი არასწორია")
    .required("ელფოსტის შეყვანა აუცილებელია"),
  password: yup
    .string()
    .required("პაროლის შეყვანა აუცილებელია")
    .min(6, "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო"),
});

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("რეგისტრაციის მონაცემები წარმატებით გაიგზავნა:", data);
    alert("რეგისტრაცია წარმატებით დასრულდა! 🎉");
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-black max-w-md mx-auto my-6 shadow-md">
      <h2 className="text-2xl font-black text-slate-800 mb-6 text-center">
        რეგისტრაცია
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            სახელი
          </label>
          <input
            type="text"
            {...register("name")}
            className={`w-full p-2 border rounded-lg text-sm outline-none transition ${
              errors.name
                ? "border-red-500 bg-red-50"
                : "border-slate-300 focus:border-blue-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            ელფოსტა
          </label>
          <input
            type="text"
            {...register("email")}
            className={`w-full p-2 border rounded-lg text-sm outline-none transition ${
              errors.email
                ? "border-red-500 bg-red-50"
                : "border-slate-300 focus:border-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            პაროლი
          </label>
          <input
            type="password"
            {...register("password")}
            className={`w-full p-2 border rounded-lg text-sm outline-none transition ${
              errors.password
                ? "border-red-500 bg-red-50"
                : "border-slate-300 focus:border-blue-500"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium text-sm transition"
        >
          რეგისტრაციის გავლა ✨
        </button>
      </form>
    </div>
  );
}

export default Register;
