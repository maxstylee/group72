import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import useWindowWidth from "../hooks/useWindowWidth";
import DeviceList from "./DeviceList";

function Counter() {
  const [count, setCount] = useState(0);
  const [nameIndex, setNameIndex] = useState(0);
  const namesList = ["გიორგი", "ანი", "ლუკა", "მარიამ"];
  const { user, toggleLogin } = useContext(UserContext);
  const width = useWindowWidth();

  const expensiveCalculation = (num) => {
    let result = 0;
    for (let i = 0; i < 1000; i++) {
      result += num;
    }
    return result;
  };

  const memoizedValue = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);

  const changeName = useCallback(() => {
    if (nameIndex < namesList.length - 1) {
      setNameIndex(nameIndex + 1);
    } else {
      setNameIndex(0);
    }
  }, [nameIndex, namesList]);

  useEffect(() => {
    console.log("კომპონენტი წარმატებით ჩაიტვირთა ეკრანზე! 🚀");
  }, []);

  useEffect(() => {
    if (count !== 0) {
      console.log(`ქაუნთერის მნიშვნელობა შეიცვალა და გახდა: ${count}`);
    }
  }, [count]);

  return (
    <div
      className={`w-full bg-white p-6 rounded-2xl border-2 text-center my-6 shadow-md transition-all ${
        width < 768 ? "border-red-500" : "border-black"
      }`}
    >
      <div className="mb-4 p-2 bg-slate-100 rounded-lg text-xs font-mono text-slate-600">
        💻 ეკრანის სიგანე:{" "}
        <span className="font-bold text-slate-900">{width}px</span>
        {width < 768 ? " (მობილური ვერსია)" : " (დესკტოპ ვერსია)"}
      </div>

      <div className="mb-6 pb-6 border-b border-slate-200 bg-slate-50 p-4 rounded-xl">
        <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">
          Context-ის ზონა
        </h4>
        <p className="text-sm text-slate-700 mb-3">
          სტატუსი: <b>{user.isLoggedIn ? "სისტემაშია" : "გასულია"}</b>
        </p>
        <button
          onClick={toggleLogin}
          className="px-3 py-1 bg-slate-800 text-white rounded text-xs font-medium hover:bg-slate-700 transition"
        >
          {user.isLoggedIn ? "სისტემიდან გასვლა" : "სისტემაში შესვლა"}
        </button>
      </div>

      <div className="mb-6 pb-6 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-700 mb-2">ქაუნთერი</h3>
        <p className="text-4xl font-black text-blue-600 mb-2">{count}</p>
        <p className="text-xs text-slate-500 mb-4 font-mono">
          useMemo გამოთვლა: {memoizedValue}
        </p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setCount(count - 1)}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg"
          >
            -
          </button>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
          >
            +
          </button>
        </div>
      </div>

      <div className="pb-6 border-b border-slate-100">
        <p className="text-xl font-medium text-slate-800 mb-4">
          მიმდინარე მომხმარებელი:{" "}
          <span className="text-emerald-600 font-bold">
            {namesList[nameIndex]}
          </span>
        </p>
        <button
          onClick={changeName}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm"
        >
          შემდეგი სახელი 🔄
        </button>
      </div>

      <DeviceList />
    </div>
  );
}

export default Counter;
