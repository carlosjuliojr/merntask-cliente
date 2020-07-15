import clienteAxios from './axios'

const tokenAuth = token =>{
    if(token){
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    }else{
        console.log("delete token")
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;