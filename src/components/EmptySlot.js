import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const EmptySlot = ({ parentId, index, emptyText, programCounter }) => {
  const id = `${parentId}-empty:${index}`;
  const styleThing = parentId !== 'discard' ? {style:{transform:'none !important'}} : {}

  const showCombineHover = (combineTargetFor) => {
    return programCounter === index || combineTargetFor ? 'combined-hover' : '';
  }

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
            className={`${parentId}-card tile tile-centered card empty-slot ${showCombineHover(snapshot.combineTargetFor)}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            {...styleThing}
          >
            {emptyText}
          </div>
        );
      }}
    </Draggable>
  );
}

  export default EmptySlot;