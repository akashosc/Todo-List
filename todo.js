let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// async  function atchapi(){
//     // fetch('https://jsonplaceholder.typicode.com/todos')
//     // .then(function (response){
        
//     //     return response.json();
//     // }).then(function(data){
//     //     tasks=data.slice(0,10);
//     //     renderList();
//     //     console.log(data);
//     // })
//     try{
//         const response=await fetch('https://jsonplaceholder.typicode.com/todos');
//         const data=await   response.json();
//         tasks=data.slice(0,10);
//         renderList();
//     }catch{
//     console.log('error');
//     }
    
// }
console.log('Working');
function addDom(task){
    const li=document.createElement('li');
    li.innerHTML=`<input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ' '}  class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="bin.svg" class="delete" data-id="${task.id}" />`;
    taskList.append(li);
}

function renderList () {
     taskList.innerHTML='';
    
     for(let i=0;i<tasks.length;i++){
        
        addDom(tasks[i]);
     }
     tasksCounter.innerHTML=tasks.length;

}

function markTaskAsComplete (taskId) {
    const newTask=tasks.filter(function (task){
        return task.id===Number(taskId);
   });
   if(newTask.length>0){
     const marking=newTask[0];
     marking.completed= !marking.completed;
     
    renderList();
    showNotification('mark task scussfully');
      return;
   }

     showNotification('could not toggel task');
  
}

function deleteTask(taskId) {
    const newTask=tasks.filter(function (task){
         return task.id!==Number(taskId);
    });
    tasks=newTask.slice();;
    renderList();
    showNotification('Task is cancle')
  
}

function addTask(task) {
    if(task){
        tasks.push(task);
        renderList();
      showNotification('Task is added');
       return ;
    }
    
    showNotification('Task is not added');
}

function showNotification(text) {
    // alert(text);
}

function handelKeypress(e){
     if(e.key==='Enter'){
         const text =e.target.value;
         
     if(!text){
        showNotification('This input can not be added');
     }
     const task={
        title:text,
        id:Date.now(),
        completed:false
     }
     e.target.value='';
    addTask(task);
     }
}
function handelevent(e){
    const target=e.target;
   
    if(target.className=='delete'){
      const taskid=target.dataset.id;
      deleteTask(taskid);
      return ;
    }
   else if(target.className=='custom-checkbox'){
      const taskid=target.id;
        markTaskAsComplete(taskid);
        return;
    }
}
document.addEventListener('click',handelevent);
addEventListener('keyup',handelKeypress);
// atchapi();
function addonclick(){
    const text =addTaskInput.value;
         
    if(!text){
       showNotification('This input can not be added');
       return ;
    }
    const task={
       title:text,
       id:Date.now(),
       completed:false
    }
    addTaskInput.value='';
   addTask(task);
}
document.querySelector('#uio').addEventListener('click',addonclick);
