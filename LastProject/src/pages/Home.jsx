import Counter from "../components/Counter";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">მთავარი გვერდი</h2>
      <Counter />
    </div>
  );
}

export default Home;