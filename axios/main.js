// AXIOS GLOBALS
axios.defaults.headers.common['x-auth-token'] = 'random token';

// GET REQUEST
function getTodos() {

    // 1st method
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params:{
    //         _limit: 5
    //     }
    // })
    // .then(res => showOutput(res))
    // .catch(error => console.log(error));


    // 2nd method
    // axios.get('https://jsonplaceholder.typicode.com/todos',{
    //     params:{
    //         _limit: 5
    //     }
    // })
    // .then(res => showOutput(res))
    // .catch(error => console.log(error));


    // 3rd method
    axios('https://jsonplaceholder.typicode.com/todos?_limit=5',{timeout: 5000})
    .then(res => showOutput(res))
    .catch(error => console.log(error));
  }
  
  // POST REQUEST
  function addTodo() {
    // 1st method
    // axios({
    //     method: 'post',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     data:{
    //         title: 'New todo',
    //         completed: false
    //     }
    // })
    // .then(res => showOutput(res))
    // .catch(error => console.log(error));

    // 2nd method
    axios.post('https://jsonplaceholder.typicode.com/todos',{title: 'New todo 2',completed: true})
    .then(res => showOutput(res))
    .catch(error => console.log(error));
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {

    // PUT 
    // axios.put('https://jsonplaceholder.typicode.com/todos/1',{title: 'Updated todo',completed: false})
    // .then(res => showOutput(res))   
    // .catch(error => console.log(error));

    // PATCH
    axios.patch('https://jsonplaceholder.typicode.com/todos/1',{title: 'Note todo',completed: false})
    .then(res => showOutput(res))   
    .catch(error => console.log(error));
  }
  
  // DELETE REQUEST
  function removeTodo() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))   
    .catch(error => console.log(error));
  }
  
  // SIMULTANEOUS DATA
  function getData() {

    // 1st method
    // axios.all([
    //     axios.get('https://jsonplaceholder.typicode.com/todos'),
    //     axios.get('https://jsonplaceholder.typicode.com/posts'),
    // ])
    // // .then(res => console.log(res))
    // .then(res => showOutput(res[1]))
    // .catch(err => console.log(err));

    // 2nd method
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos'),
        axios.get('https://jsonplaceholder.typicode.com/posts'),
    ])
    .then(axios.spread((todos,posts) => showOutput(posts)))
    .catch(err => console.log(err));
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    const config = {
        headers:{
            'Content-Type':'application/json',
            'Authorization':'tokens'
        }
    }
    axios.post('https://jsonplaceholder.typicode.com/todos',{title: 'New todo 2',completed: true},config)
    .then(res => showOutput(res))
    .catch(error => console.log(error));
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data:{
            title: 'Hello world'
        },
        transformResponse: axios.defaults.transformResponse.concat((data) => {
            data.title = data.title.toUpperCase();
            return data;
        })
    };
    axios(options).then(res => showOutput(res)).catch(err => console.log(err));
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios('https://jsonplaceholder.typicode.com/todoss',{
        validateStatus: function(status){
            return status < 500; // will return only if status is less than 500
        }
    })
    .then(res => showOutput(res))
    .catch(error => {
        if(error.response){
            // status != 200
            console.log(error.response.data, error.response.status, error.response.headers);
        }
    });
  }
  
  // CANCEL TOKEN
  function cancelToken() {

    const source = axios.CancelToken.source();

    axios('https://jsonplaceholder.typicode.com/todos?_limit=5',{
        cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
        if(axios.isCancel(thrown)){
            console.log("Request cancelled", thrown.message)
        }
    });

    if(true) source.cancel("Request cancelled");
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use((config) =>{
      console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
      return config;
  },(error) => {
    return Promise.reject(error);
  });

  // AXIOS INSTANCES
  const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
  })
  
  axiosInstance.get("/comments").then(res => console.log(res));

  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);