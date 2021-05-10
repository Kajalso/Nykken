import React, { useContext } from "react";

import { GroupsContext } from "..//../context/GroupsContext";
import { SensorGroup } from "./SensorGroup";

import "./sensorGroups.scss";

export const SensorGroups = () => {
  const { groups } = useContext(GroupsContext);

  return (
    <>
      {groups.length === 0 && <div></div>}
      {groups && groups[0] && (
        <>
          <h2 className="title groups">Groups</h2>
          {groups.map((group) => (
            <SensorGroup
              groupName={group.groupName}
              group={group}
              key={group.id}
            />
          ))}
        </>
      )}
    </>
  );
};
