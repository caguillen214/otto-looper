import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

import { CARD_TYPES } from '../custom/data';
import IfCard from './IfCard';

const RoutineBench = ({ isDropDisabled, selectedCard, cards = [], id }) => {
    const MAX_SLOTS = 6;
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
                <div className="menu hero-list routine-bench " {...provided.droppableProps} ref={provided.innerRef}>
                   {cards.map((props, index) => {
                        const { name, type, exp, tier, cardId } = props;
                        if (name === 'if') {
                            return <IfCard  key={name+index}
                                    name={name}
                                    index={index}
                                    cardId={cardId}
                                    parentId={id}
                                    type={type}
                                    slots={props.slots}
                                    conditionExp={props.conditionExp}
                                    rangeExp={props.rangeExp}
                                    tier={tier} />
                        }
                        return <Card
                            key={name+index}
                            name={name}
                            index={index}
                            cardId={cardId}
                            parentId={id}
                            type={type}
                            exp={exp}
                            tier={tier}
                            emptyText="IDLE"/>
                    })}
                    {provided.placeholder}
                </div>
            );
            }}
      </Droppable>
    </div>
  );
}
export default RoutineBench;