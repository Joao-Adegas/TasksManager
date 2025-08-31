import axios from "axios";
const url = "http://127.0.0.1:3000/tasks";

export async function viewTasks(){
    try {
        const response = await axios.get(url);
        console.log(Object.values(response.data)?.[0]);
        return response.data
    } catch (error) {
        console.log("Erro ao buscar tarefas", error);
        return error;
    }
}

export async function createTask(taskData){
    try{
        const response = await axios.post(url,taskData)
        console.log("Tarefa criada com sucesso!! ");
        return response.data
    }catch(e){
        return e
    }
}