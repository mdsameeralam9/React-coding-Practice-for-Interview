// approach 1. Without useCallback

import { useEffect, useState } from 'react';

function Users() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users'
        );

        const data = await response.json();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return <div>{users.length} users</div>;
}

export default Users;

{/**
    # Render flow
1. fetchUsers is created

2. useEffect([], ...) runs
   API is called once


3. setUsers(data)
   Component re-renders; a new function is created

4. Effect does not run again
   Its dependency array is still empty


What happens?
1. The component renders.
2. fetchUsers is created.
3. useEffect runs after the initial render and calls the API.
4. setUsers(data) updates state, causing another render.
5. A new fetchUsers function is created during that render, but the effect does not run again because 
its dependency array is empty.

Important: This example works, but the effect uses a function declared outside it that isn't listed in its 
dependencies. Depending on the function and the values it uses, this can cause dependency or stale-value
 problems. For this simple case, you can define the function inside useEffect instead.    
 
 

 # Solution 
 1. use function ouside use effect when require at more places fetchUsers
 2. else inside useEffect to avoid function create in memory

 3. useCallback to avoid create function reference in each render if need at multiple places
 4. apss in useEffect in dependency to avoide stale closure value
*/}

