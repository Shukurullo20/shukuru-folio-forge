import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function SkillsPage() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['stacks'],
    queryFn: () => api.stacks(),
  });

  return (
    <div className="animate-fade-in">
      <h1 className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>Skills</h1>
      <p className="text-sm mt-1 mb-6" style={{ color: 'var(--fg3)' }}>Technologies and tools I work with</p>

      {isLoading && (
        <div className="text-xs" style={{ color: 'var(--fg3)' }}>Loading...</div>
      )}

      <div className="flex flex-col gap-6">
        {categories?.map(category => (
          <div key={category.id}>
            <h2 className="text-xs font-medium uppercase tracking-wide mb-3" style={{ color: 'var(--fg3)' }}>
              {category.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {category.stacks.map(stack => (
                <span
                  key={stack.id}
                  className="text-xs px-2.5 py-1 rounded"
                  style={{ backgroundColor: 'var(--bg3)', color: 'var(--fg2)' }}
                >
                  {stack.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
