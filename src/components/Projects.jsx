import SectionHeading from './SectionHeading.jsx';
import ProjectCard from './ProjectCard.jsx';
import { projects } from '../data/projects.js';

export default function Projects() {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading id="projects-title" index="03" label="Projects" title="Featured Projects" variant="tracking" />

        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
