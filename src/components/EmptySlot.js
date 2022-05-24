import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const EmptySlot = ({ parentId, index, emptyText }) => {
  const id = `${parentId}-empty:${index}`;
  const stylething = parentId !== 'discard' ? {style:{transform:'none !important'}} : {}

  return (
    <Draggable key={id} draggableId={id} index={index} isDragDisabled={true}>
      {(provided, snapshot) => {
        // if (provided.draggableProps.style.transform) {
        //   provided.draggableProps.style = {...provided.draggableProps.style,
        //     transform:'none !important'};
        // }
        return (
          // snapshot.combineTargetFor ? <div
          // className={`${parentId}-card tile tile-centered card empty-slot  `}
          // {...provided.draggableProps}
          // {...provided.dragHandleProps}
          // style={{transform: 'none !important'}}
          // >Drop</div> :
          <div
            className={`${parentId}-card tile tile-centered card empty-slot ${snapshot.combineTargetFor ? 'combined-hover': ''}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            {...stylething}
          >
            {emptyText}
          </div>
        );
      }}
    </Draggable>
  );
}

  export default EmptySlot;