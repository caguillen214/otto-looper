import React from 'react';
import { Droppable} from 'react-beautiful-dnd';
import { EMPTY_CARD } from '../custom/data';
import Card from './Card';

const DiscardBench = ({ isDropDisabled, selectedCard, id }) => {
  const getDropDisabledStatus = (isDragDisabled) => {
      return isDragDisabled ;
  }
  return <div className="column col-1">
    <div className="divider" data-content={id.toUpperCase()} />
    <Droppable
        key={id}
        droppableId={id}
        direction="horizontal"
        isCombineEnabled
        isDropDisabled={isDropDisabled}>
      {provided => {
        return (
          <div className="menu" {...provided.droppableProps} ref={provided.innerRef}>
            <div className='discard-bench'>
              TRASH
              {provided.placeholder}
            </div>
          </div>
        );
      }}
    </Droppable>
  </div>
};

export default DiscardBench;