import React, { useContext } from "react";

import { GroupsContext } from "..//../context/GroupsContext";
import { SensorGroup } from "./SensorGroup";

import "./sensorGroups.scss";

export const SensorGroups = () => {
  const { groups } = useContext(GroupsContext);

  return (
    <>
      <h2 className="title groups">Groups</h2>
      {groups.length === 0 && <p>No groups to show</p>}
      {groups &&
        groups.map((group) => (
          <SensorGroup
            groupName={group.groupName}
            group={group}
            key={group.id}
          />
        ))}
    </>
  );
};
