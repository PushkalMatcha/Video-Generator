import EffectCard from './EffectCard';

const effects = [
  { name: 'Anything, Robot', image: '/robot.jpg' },
  { name: 'Holy Wings', image: '/angel.jpg' },
  { name: 'Hulk', image: '/hulk.jpg' },
  { name: 'Kiss', image: '/kiss.jpg' },
  { name: 'Kiss Me AI', image: '/kiss-ai.jpg' },
  { name: 'Microwave', image: '/microwave.jpg' },
  { name: 'Muscle Surge', image: '/muscle.jpg' },
  { name: 'The Tiger Touch', image: '/tiger.jpg' },
  { name: 'Venom', image: '/venom.jpg' },
  { name: 'Warmth Of Jesus', image: '/jesus.jpg' },
];

export default function EffectsGrid({ onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-6">
      {effects.map(e => (
        <div key={e.name} onClick={() => onSelect(e)}>
          <EffectCard {...e} />
        </div>
      ))}
    </div>
  );
}
