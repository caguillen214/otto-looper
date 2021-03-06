import React from 'react';
import { Droppable} from 'react-beautiful-dnd';
import { CARD_TYPES, EMPTY_CARD } from '../custom/data';
import Card from './Card';

const UltBench = ({isDragDisabled, isDropDisabled, selectedCard, cards, id }) => {
  const MAX_SLOTS = 1;
  const emptySlots = Array(MAX_SLOTS - cards.length).fill(EMPTY_CARD);
  const getDropDisabledStatus = (isDropDisabled) => {
      return isDropDisabled || selectedCard?.type !== CARD_TYPES.ULT;
  }
  return <div className="column col-1L" style={{alignSelf: 'end', marginLeft: '-2%'}}>
    {/* <div className="divider" data-content={id.toUpperCase()} /> */}
    <Droppable
        key={id}
        droppableId={id}
        direction="horizontal"
        isCombineEnabled
        isDropDisabled={isDropDisabled}>
      {provided => {
        return (
          <div className="menu ult-bench" {...provided.droppableProps} ref={provided.innerRef}>
                {[...cards, ...emptySlots].map(({ name, type, exp, tier, cardId }, index) => (
                  <Card
                      key={name+':'+index}
                      name={name}
                      index={index}
                      cardId={cardId}
                      parentId={id}
                      type={type}
                      exp={exp}
                      tier={tier}
                      isDragDisabled={isDragDisabled}
                      emptyText="NO ULT"/>
              ))}
          </div>
        );
      }}
    </Droppable>
  </div>
};

export default UltBench;