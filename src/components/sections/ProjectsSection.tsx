import React, { useState } from 'react';
import { ProjectsSectionData, PortfolioConfig, ProjectItem } from '../../types/portfolio';
import { THEMES, FONTS, ACCENTS } from '../../utils/themeStyles';
import { ProjectArtPattern } from '../ProjectArtPattern';
import { Plus, ArrowUpRight, Edit3, Trash2, MoveUp, MoveDown } from 'lucide-react';

interface ProjectsSectionProps {
  data: ProjectsSectionData;
  config: PortfolioConfig;
  isEditing: boolean;
  onUpdate: (updated: ProjectsSectionData) => void;
  onOpenProjectModal: (project: ProjectItem) => void;
  onEditProjectItem: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  data,
  config,
  isEditing,
  onUpdate,
  onOpenProjectModal,
  onEditProjectItem,
}) => {
  const theme = THEMES[config.theme];
  const font = FONTS[config.font];
  const accent = ACCENTS[config.accent];

  const handleAddNewProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New Case Study',
      category: 'Digital Product',
      year: '2026',
      description: 'A focused summary of the problem, architectural execution, and tangible outcome.',
      fullContent: 'Comprehensive breakdown of research insights, structural prototypes, interface iterations, and verified performance metrics.',
      patternType: 'architectural',
      tags: ['Interaction', 'Systems', 'Design'],
    };
    onUpdate({
      ...data,
      items: [newProj, ...data.items],
    });
    onEditProjectItem(newProj);
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate({
      ...data,
      items: data.items.filter((item) => item.id !== id),
    });
  };

  const handleMoveProject = (index: number, direction: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.items.length) return;
    const items = [...data.items];
    const temp = items[index];
    items[index] = items[newIndex];
    items[newIndex] = temp;
    onUpdate({ ...data, items });
  };

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-neutral-100 dark:border-neutral-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
            02. Portfolio
          </span>
          {isEditing ? (
            <input
              type="text"
              value={data.heading}
              onChange={(e) => onUpdate({ ...data, heading: e.target.value })}
              className={`text-2xl md:text-4xl font-bold ${font.display} ${theme.textPrimaryClass} bg-transparent border-b border-dashed border-neutral-300 dark:border-neutral-700 outline-none pb-1`}
            />
          ) : (
            <h2 className={`text-2xl md:text-4xl font-bold ${font.display} ${theme.textPrimaryClass} tracking-tight`}>
              {data.heading}
            </h2>
          )}

          {data.subheading && (
            <p className={`mt-2 text-sm md:text-base ${theme.textSecondaryClass}`}>
              {data.subheading}
            </p>
          )}
        </div>

        {isEditing && (
          <button
            onClick={handleAddNewProject}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg text-white ${accent.bg} ${accent.hover} transition-colors shadow-xs`}
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        )}
      </div>

      {/* Projects Grid */}
      {data.items.length === 0 ? (
        <div className={`p-12 text-center border border-dashed rounded-xl ${theme.borderClass}`}>
          <p className="text-sm text-neutral-500 mb-3">No projects added yet.</p>
          {isEditing && (
            <button
              onClick={handleAddNewProject}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white rounded-lg ${accent.bg}`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Your First Project</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.items.map((proj, idx) => (
            <div
              key={proj.id}
              onClick={() => onOpenProjectModal(proj)}
              className={`group relative flex flex-col rounded-xl border ${theme.borderClass} ${theme.cardBgClass} overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${theme.hoverBorderClass}`}
            >
              {/* Cover Art or Generative Pattern */}
              <div className="relative aspect-16/10 w-full overflow-hidden border-b border-neutral-100 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                <ProjectArtPattern
                  type={proj.patternType || 'architectural'}
                  imageUrl={proj.image}
                  title={proj.title}
                />

                {/* Edit Controls Overlay for Project Card */}
                {isEditing && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 flex items-center gap-1 bg-black/85 backdrop-blur-xs p-1 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditProjectItem(proj);
                      }}
                      className="p-1.5 hover:bg-white/20 rounded"
                      title="Edit project details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    {idx > 0 && (
                      <button
                        onClick={(e) => handleMoveProject(idx, 'up', e)}
                        className="p-1.5 hover:bg-white/20 rounded"
                        title="Move left"
                      >
                        <MoveUp className="w-3.5 h-3.5 -rotate-90" />
                      </button>
                    )}
                    {idx < data.items.length - 1 && (
                      <button
                        onClick={(e) => handleMoveProject(idx, 'down', e)}
                        className="p-1.5 hover:bg-white/20 rounded"
                        title="Move right"
                      >
                        <MoveDown className="w-3.5 h-3.5 -rotate-90" />
                      </button>
                    )}
                    <button
                      onClick={(e) => handleDeleteProject(proj.id, e)}
                      className="p-1.5 hover:bg-red-500/80 rounded"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-300" />
                    </button>
                  </div>
                )}
              </div>

              {/* Card Content with Zero-Pill Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                    <span>{proj.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{proj.year}</span>
                  </div>

                  <h3 className={`text-lg font-bold ${font.display} ${theme.textPrimaryClass} group-hover:text-neutral-950 dark:group-hover:text-white transition-colors flex items-center justify-between`}>
                    <span>{proj.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
                  </h3>

                  <p className={`mt-2 text-sm leading-relaxed ${theme.textSecondaryClass} line-clamp-2`}>
                    {proj.description}
                  </p>
                </div>

                {/* Clean unboxed tags with typographic separators */}
                {proj.tags && proj.tags.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center gap-2 text-xs text-neutral-400 font-mono">
                    {proj.tags.map((tag, tIdx) => (
                      <React.Fragment key={tIdx}>
                        {tIdx > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
                        <span>{tag}</span>
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
