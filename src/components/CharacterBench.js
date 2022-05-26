import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import EmptySlot from './EmptySlot';

import * as constants from "../custom/data";
import { CARD_TYPES, EMPTY_CARD } from '../custom/data';

const CharacterBench = ({ 
     isDropDisabled,
     selectedCard,
     cards = [],
     id,
     characterStats = {},
     level,
     showBench = true}) => {
    const MAX_SLOTS = 5;
    const emptySlots = Array(MAX_SLOTS - cards.length).fill(EMPTY_CARD);
    const getDropDisabledStatus = (isDragDisabled) => {
        return isDragDisabled || selectedCard?.type !== CARD_TYPES.CHARACTER;
    }
    return (
    <div className="column col-4 ">
      <div className="divider" data-content={id.toUpperCase()} />
      <div className="character-stats-container">
          <div>
            <div>Attack: {characterStats[constants.ATTACK]}</div>
            <div>Level: {level}</div>
            <div>Dexterity: {characterStats[constants.DEXTERITY]}</div>
          </div>
          <img src={`./misc/otto.png`} style={{width: '150px', height: '200px'}} />
          <div>
            <div>Health: {characterStats[constants.HEALTH]}</div>
            {showBench ? <div>Income: {characterStats[constants.GOLD]}</div> 
                    : <div>Armor: {characterStats[constants.ARMOR]}</div>}
            <div>Heal: {characterStats[constants.HEAL]}</div>
          </div>
      </div>
      {showBench && <Droppable
        key={id}
        droppableId={id}
        direction="horizontal"
        isCombineEnabled
        isDropDisabled={getDropDisabledStatus(isDropDisabled)}>
            {provided => {
            return (
                <div className="menu character-bench " {...provided.droppableProps} ref={provided.innerRef}>
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
                            emptyText="Empty"/>
                    ))}
                    {/* {provided.placeholder} */}
                </div>
            );
            }}
      </Droppable>}
    </div>
  );
}

export default CharacterBench;