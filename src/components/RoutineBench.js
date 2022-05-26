import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

import { CARD_TYPES, EMPTY_CARD } from '../custom/data';
import IfCard from './IfCard';

const RoutineBench = ({programCounter, isDragDisabled, isDropDisabled, selectedCard, cards = [], id }) => {
    const MAX_SLOTS = 7;
    const emptySlots = Array(MAX_SLOTS - cards.length).fill(EMPTY_CARD);
    const getDropDisabledStatus = (isDragDisabled) => {
        return isDragDisabled || selectedCard?.type !== CARD_TYPES.ROUTINE;
    }

    return (
    <div className="column col-12 ">
      {/* <div className="divider" data-content={id.toUpperCase()} /> */}
      <Droppable
        key={id}
        droppableId={id}
        isCombineEnabled
        direction="horizontal"
        isDropDisabled={getDropDisabledStatus(isDropDisabled)}>
            {(provided, snapshot) => {
                return (
                <div className="menu hero-list routine-bench " {...provided.droppableProps} ref={provided.innerRef}>
                   {[...cards, ...emptySlots].map((props, index) => {
                        const { name, type, exp, tier, cardId } = props;
                        // if (name === 'if') {
                        //     return <IfCard  key={name+index}
                        //             name={name}
                        //             index={index}
                        //             cardId={cardId}
                        //             parentId={id}
                        //             type={type}
                        //             slots={props.slots}
                        //             conditionExp={props.conditionExp}
                        //             rangeExp={props.rangeExp}
                        //             tier={tier} />
                        // }
                        return <Card
                            key={name+index}
                            name={name}
                            index={index}
                            cardId={cardId}
                            parentId={id}
                            type={type}
                            exp={exp}
                            tier={tier}
                            isDragDisabled={isDragDisabled}
                            programCounter={programCounter}
                            emptyText="IDLE"/>
                    })}
                    {/* {provided.placeholder} */}
                </div>
            );
            }}
      </Droppable>
    </div>
  );
}
export default RoutineBench;
