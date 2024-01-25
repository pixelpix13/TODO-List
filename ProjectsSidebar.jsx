import Button from "./Button";

function ProjectsSidebar({ onStartAddProject, projects, onSelectProject, selectedProjectId}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Projects</Button>
      </div>
      <ul className="mt-8">
        {//this will display a button list with the title of the project
        projects?.map((project) => {
          let cssClassName='w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800'

          if(project.id === selectedProjectId){
            cssClassName += ' bg-stone-800 text-stone-200'
          }else{
            cssClassName += ' text-stone-400'     
          }
          
          return(
            <li key={project.id}> 
              <button onClick={() => onSelectProject(project.id)} className={cssClassName}>
                {project.title}
              </button>
            </li>)
            }
          )
        }
      </ul>
    </aside>
  );
}
export default ProjectsSidebar;