export default function EffectCard({ name, image }) {
  return (
    <div className="rounded-xl overflow-hidden bg-gray-900 shadow hover:shadow-xl transition group cursor-pointer border border-gray-800">
      <img src={image} alt={name} className="w-full h-40 object-cover group-hover:scale-105 transition" />
      <div className="p-3 text-center font-semibold text-gray-200">{name}</div>
    </div>
  );
}
