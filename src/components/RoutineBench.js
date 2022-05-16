import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

import { CARD_TYPES } from '../custom/data';

const RoutineBench = ({ isDropDisabled, selectedCard, cards = [], id }) => {
    const MAX_SLOTS = 7;
    const getDropDisabledStatus = (isDragDisabled) => {
        return isDragDisabled || selectedCard?.type !== CARD_TYPES.ROUTINE;
    }

    return (
    <div className="column col-6 ">
      <div className="divider" data-content={id.toUpperCase()} />
      <Droppable
        droppableId={id}
        isCombineEnabled
        direction="horizontal"
        isDropDisabled={getDropDisabledStatus(isDropDisabled)}>
            {provided => {
            return (
                <div className="menu routine-bench hero-list" {...provided.droppableProps} ref={provided.innerRef}>
                   {cards.map(({ name, type, exp, tier, cardId }, index) => (
                        <Card
                            key={name+index}
                            name={name}
                            index={index}
                            cardId={cardId}
                            parentId={id}
                            type={type}
                            exp={exp}
                            tier={tier}
                            emptyText="IDLE"/>
                    ))}
                    {provided.placeholder}
                </div>
            );
            }}
      </Droppable>
    </div>
  );
}
export default RoutineBench;
