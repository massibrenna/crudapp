import "./styles.css";
import React, { useState, useEffect } from "react";
import EditUserForm from "./components/EditUserForm";
import AddUserForm from "./components/AddUserForm";
import { defaultUsers, initCurrentUser } from "./components/Constants";
import { IUser, IBaseUser } from "./components/interface";
import UserTable from "./components/userTable";
import { NodeService } from "./services/NodeService";
import { AxiosError } from "axios";
function App() {
  const [editing, setEdit] = useState(false);
  const [users, setUsers] = useState<Array<IUser>>([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const nodeService = new NodeService();
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = nodeService.getUsersData();
        console.log(response);
        if ((await response).status !== 200)
          throw Error("Did not receive expected data");
        const usersData = (await response).data;
        setUsers(usersData);
        setFetchError(null);
      } catch (err: any) {
        if (err instanceof AxiosError) {
        }

        if (err.code) setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => fetchItems(), 5000);
  }, []);

  const [editUser, setEditUser] = useState(initCurrentUser);
  const onAddUser = (newUser: IBaseUser) => {
    const id = users.length + 1;
    setUsers([...users, { ...newUser, id }]);
  };
  const onCurrentUser = (user: IUser) => {
    setEditUser(user);
    setEdit(true);
  };
  const onUpdateUser = (id: number, newUser: IUser) => {
    setEdit(false);
    setUsers(users.map((i) => (i.id === id ? newUser : i)));
  };
  const onDeleteUser = (currentUser: IUser) => {
    setUsers(users.filter((i) => i.id !== currentUser.id));
  };
  return (
    <div className="App">
      <h1>CRUD App with Hooks</h1>
      <div className="user-flex-wrapper">
        {editing ? (
          <>
            <br />
            <EditUserForm
              user={editUser}
              onUpdateUser={onUpdateUser}
              setEdit={setEdit}
            />
          </>
        ) : (
          <AddUserForm onAddUser={onAddUser} />
        )}
      </div>
      {isLoading && <p>Loading USers from database...</p>}
      <UserTable users={users} onEdit={onCurrentUser} onDelete={onDeleteUser} />
    </div>
  );
}

export default App;
