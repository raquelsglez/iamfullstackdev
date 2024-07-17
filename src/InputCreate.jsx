import React, {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const InputCreate = ({urlApi, data}) => {
    const titleRef = useRef(null);
    const [inputTitle, setInputTitle] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const title = titleRef.current.value;

        if(title === ''){
            return null;
        } else {
            try{
                const payload = {title};
                const response = await fetch(`${urlApi}/create`, {
                    method: 'POST', // Método HTTP
                    headers: {
                      'Content-Type': 'application/json', // Indicamos que el contenido es JSON
                    },
                    body: JSON.stringify(payload), // Convertimos el payload de JS a JSON
                });
                if(response.ok){
                    titleRef.current.value = '';
                    setInputTitle('');
                    data();
                    navigate('/');
                }
            } catch (error){
                console.log(error);
            };
        };
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={titleRef} placeholder="Escribe una tarea" onChange={() => setInputTitle(titleRef.current.value)} value={inputTitle}/>
                <button>Añadir tarea</button>
            </form>
        </>
    );
};

export default InputCreate;
