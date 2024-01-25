import { useEffect, useRef, useState } from 'react';
import './App.css';
import {useStore} from './store';

function App() {
  const [elInput,setElInput] = useState();
  const {data,status, action} = useStore();
  const [edit,setEdit] = useState(null);
  useEffect(()=>{  action('get');  },[])

  function insertPut(){
    if(edit){
      action('put',{id:edit,name:elInput});
    }else{
      action('post',{id:Date.now(),name:elInput});
    }
    setEdit(null);
  }
  
  
  return (
    <div className="App">
       <article className='write' style={edit ? {'background-color':'black'}:{}}>
            <input type="file" accept="image/*;capture=camera">
            <input 
            type="text" 
            value={elInput} 
            onChange={(e)=>{setElInput(e.target.value)}} />

            <button onClick={insertPut}> 
              {edit ? '수정' : '저장'}
            </button>
       </article>

      {
        
       (!data.length) ? <div className='none'>이름을작성해주세요.</div> :
       
       <article>
        <h2>리스트</h2>
        {
          (!status) ? <div className='none'>Loading...</div> :
          <ul>
            {
              data.map((obj,k)=>(
                <li key={obj.id}>
                  <p>{k+1}) {obj.name}</p>
                  <p>
                    <button onClick={()=>{action('delete',obj.id)}}>삭제</button>
                    <button onClick={()=>{
                      setEdit(obj.id);
                      setElInput(obj.name)                  
                    }}>수정</button>
                  </p>
                </li>
              ))
            }
          </ul>
        }
       </article>
      }
       

    </div>
  );
}

export default App;
