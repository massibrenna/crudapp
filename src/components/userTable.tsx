import React from "react";

import { IUser, IReadProps } from "./interface";
import { JsxElement } from "typescript";

const UserTable: React.FunctionComponent<IReadProps> = (
  props: IReadProps
): JSX.Element => {
  return (
    <div className="user-table">
      <h1>View users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>profession</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length > 0 ? (
            props.users.map((u) => (
              <tr key={u.id}>
                <td>{u["name"]}</td>
                <td>{u["age"]}</td>
                <td>{u["profession"]}</td>
                <td>
                  <button onClick={() => props.onEdit(u)}>edit</button>
                  <button onClick={() => props.onDelete(u)}>delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>no users</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
