import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

import { CARD_TYPES, EMPTY_CARD } from '../custom/data';
import IfCard from './IfCard';
import LoopCard from './LoopCard';

const CommandBench = ({ isDropDisabled, selectedCard, cards = [], id, onIfConditionChange, onIfTargetChange }) => {
    const MAX_SLOTS = 7;
    const emptySlots = Array(MAX_SLOTS - cards.length).fill(EMPTY_CARD);
    const getDropDisabledStatus = (isDragDisabled) => {
        return isDragDisabled || selectedCard?.type !== CARD_TYPES.COMMAND;
    }

    let colorInd = 0;

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
                <div className="menu hero-list command-bench " {...provided.droppableProps} ref={provided.innerRef}>
                   {[...cards, ...emptySlots].map((props, index) => {
                        const { name, type, exp, tier, cardId } = props;
                        if (name === 'if') {
                            return <IfCard  key={name+index}
                                    name={name}
                                    index={index}
                                    cardId={cardId}
                                    parentId={id}
                                    type={type}
                                    colorInd={colorInd++}
                                    slots={props.slots}
                                    condition={props.condition}
                                    onConditionChange={onIfConditionChange}
                                    onTargetChange={onIfTargetChange}
                                    targettingEnemy={props.targettingEnemy}
                                    conditionExp={props.conditionExp}
                                    rangeExp={props.rangeExp}
                                    tier={tier} />
                        }
                        else if (name === 'loop') {
                            return <LoopCard  key={name+index}
                                name={name}
                                index={index}
                                cardId={cardId}
                                parentId={id}
                                type={type}
                                slots={props.slots}
                                colorInd={colorInd++}
                                counterExp={props.counterExp}
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
                            emptyText="EMPTY"/>
                    })}
                </div>
            );
            }}
      </Droppable>
    </div>
  );
}
export default CommandBench;
