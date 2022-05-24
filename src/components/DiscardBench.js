import React from 'react';
import { Droppable} from 'react-beautiful-dnd';
import { EMPTY_CARD } from '../custom/data';
import Card from './Card';
import EmptySlot from './EmptySlot';

const DiscardBench = ({ isDropDisabled, selectedCard, id }) => {
  const getDropDisabledStatus = (isDragDisabled) => {
      return isDragDisabled ;
  }
  return <div className="column col-2">
    <div className="divider" data-content={id.toUpperCase()} />
    <Droppable
        key={id}
        droppableId={id}
        direction="horizontal"
        isCombineEnabled
        isDropDisabled={getDropDisabledStatus(isDropDisabled)}>
      {provided => {
        return (
          <div className="menu discard-bench" {...provided.droppableProps} ref={provided.innerRef}>
              <EmptySlot parentId={id} index={0} key={0} emptyText={"TRASH"}/>
              {/* {provided.placeholder} */}
          </div>
        );
      }}
    </Droppable>
  </div>
};

export default DiscardBench;