export const avatarSeleccionado = (avatar) => {
    return `views/assets/img/${avatar}`;
} 

export const alerta = ({titulo,mensaje,tipo_mensaje,callback,bool}) =>{
    swal({
        title : titulo,
        html : mensaje,
        type : tipo_mensaje,
    },
    (isConfirm) => {
        if (isConfirm) {
            if(bool){
                callback();
            }
        }
    })
}

export const loadDatos_user = () => {
    return localStorage.getItem('datos_user');
}