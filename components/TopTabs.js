const tabs = ['AI Effects', 'VFX', 'Motion', 'Cartoon', 'Anime'];

export default function TopTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-2 md:gap-4 px-6 pt-6 pb-2 border-b border-gray-800 bg-gray-950 sticky top-0 z-10">
      {tabs.map(tab => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-t-lg font-semibold transition-all duration-200 focus:outline-none ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
