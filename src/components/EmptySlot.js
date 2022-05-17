import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const EmptySlot = ({ parentId, index, emptyText }) => {
  const id = `${parentId}:empty:${index}`;
  return (
    <Draggable key={id} draggableId={id} index={index} isDragDisabled={true}>
      {provided => {
        return (
          <div
            className="tile tile-centered card empty-slot"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {emptyText}
          </div>
        );
      }}
    </Draggable>
  );
}

  export default EmptySlot;