import React, { useMemo } from 'react'
import { useDataContext } from '../context/DataProvider';

const ListLayout = () => {
    const {
      todoState = []
    } = useDataContext();

     console.log(todoState) 

  const formatedTodos = useMemo(() => {
    if(todoState.length === 0) return null;
    const state = {};
    for(const item of todoState){
      console.log(item)
      if(!state[item.key]){
        state[item.key] = []
      }

      state[item.key] =  [...state[item.key], item]
    };
    return state;
  }, [todoState])

  console.log(formatedTodos) 

  return (
   <div className="WrapperList flex gap-2 border-r-2">
    {Object.keys(formatedTodos)?.map(section => {
      const listItems = formatedTodos[section];
      
      if(!listItems) return null;
      return (
        <ListRender section={section} listItems={listItems}/>
      )
    })}
   </div>
  )
}

export default ListLayout




const ListRender = ({ section="", listItems=[] }) => {
  return (
    <div className='flex flex-col gap-1'>
      <h2>{section}</h2>
      <items className="wrap">
            {listItems?.map(itm => (
              <div>{itm?.value}</div>
            ))}
      </items>
    </div>
  )
}