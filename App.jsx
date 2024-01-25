import NewProject from "./components/NewProject";
import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined, //here undefined is writtern so that when there is no data i.e. at the beginning 
    projects: [], //this will contain the list of the projects that have been saved 
    tasks: [] 
  })

  function handleAddTask(text){
    setProjectState(prevState => {
      //this task id is selected at random so that it is unique
      const taskId = Math.random() 
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      }
      return{
        ...prevState,
        //updating the task array
        tasks:[newTask, ...prevState.tasks]
      }
    })
  }

  function handleDeleteTask(id){
    setProjectState(prevState => {
      return{
        ...prevState, //here the tasks are added using the spread operator and the TaskId is over writtern
        tasks: prevState.tasks.filter((task) => task.id !== id)
      };
    });
  }


  //used to set the state of the project 
  function handleStartAddProject(){
    setProjectState(prevState => {
      return{
        ...prevState, //here the projects are added using the spread operator and the selectedProjectId is over writtern
        selectedProjectId:  null
      };
    });
  }

  function handleDeleteProject(){
    setProjectState(prevState => {
      return{
        ...prevState, //here the projects are added using the spread operator and the selectedProjectId is over writtern
        selectedProjectId:  undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      };
    });
  }

  //the purpose of this function is to add the project into the project array
  function handleSelectProject(id){
    setProjectState(prevState => {
      return{
        ...prevState, //here the projects are added using the spread operator and the selectedProjectId is over writtern
        selectedProjectId:  id
      };
    });
  }

  //the purpose of this function is to cancel the adding of the project into the project array 
  function handleCancelAddProject(){
    setProjectState(prevState => {
      return{
        ...prevState, //here the projects are added using the spread operator and the selectedProjectId is over writtern
        selectedProjectId:  undefined
      };
    });
  }

  //this function will save the data of the project 
  function handleAddProject(projectData){
    setProjectState(prevState => {
      //this project id is selected at random so that it is unique
      const projectId = Math.random()
      const newproject = {
        ...projectData, //here we are adding the title des and due data using the spread operator
        id: projectId //setting a random id 
      }
      return{
        ...prevState,
        //setting the project id again so that after saving the component NewProject disappears and NoProjectSelected appears
        selectedProjectId: undefined,
        //updating the project array
        projects:[...prevState.projects, newproject]
      }
    })
  }

  console.log(projectState)

  //here we find the selected Project that we want to display on the selectedProject component 
  //find is used to find an array element with same project id
  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)

  let content = <SelectedProject 
  project={selectedProject} 
  onDelete = {handleDeleteProject} 
  onAddTask={handleAddTask}
  onDeleteTask = {handleDeleteTask}
  tasks = {projectState.tasks} />; // this variable is used to set what component needs to be shown 

  //using this condition the component is set in the content varible which is used in the main return
  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectState.selectedProjectId === undefined){
    content =  <NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  return (
    //here we passed a function as a prop which will be called after save button is pressed
    //projects prop here is used to share the project array that will be presented in a list that will be displayed on the sidebar
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
      onStartAddProject={handleStartAddProject} 
      projects={projectState.projects} 
      onSelectProject={handleSelectProject}
      selectedProjectId={projectState.selectedProjectId}/> 
      {content}
    </main>
  );
}

export default App;
