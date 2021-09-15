import apisauce from 'apisauce';

export const api = apisauce.create({
  baseURL: 'https://apitest.demos.classicinformatics.net/',
  headers: {"Cache-Control": "no-cache"},
  timeout: 30000
});


export const addTask = (body: any) => {
  console.log('Body in add task---->', body);
  return api.post(`task`, body, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const updateTask = (body: any) => {
  return api.put(`task/${body.id}`, body, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const deleteTask = (payload: any) => {
  return api.delete(`task/${payload.taskId}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const getTask = () => {
  return api.get(`task/${new Date().toISOString()}`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
