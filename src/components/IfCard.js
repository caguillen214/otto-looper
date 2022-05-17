import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BENCHES, CARD_TYPES } from '../custom/data';
import EmptySlot from './EmptySlot';
import Card from './Card';

const IfCard = (props) => {
  const { name, type, index, conditionExp, rangeExp, tier, cardId, parentId, slots = [] } = props;
  const cardClass = 'card if-card';
  const ifRangeLevel = ~~(rangeExp / 3) + 1;
  const ifConditionLevel = ~~(conditionExp / 3) + 1;
 
 
  const getDropDisabledStatus = () => {
      return slots.length >= ifConditionLevel;
  }
  const dashOrSolid = getDropDisabledStatus() ? 'solid' : 'dashed'


  return (
    <Draggable key={name} draggableId={name+cardId} index={index} type={type}>
      {provided => {
        return (
          <div className={cardClass}    
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
            <div className="if-range-bars" style={{width: ifRangeLevel * 100 +'%'}}>
              <div>IF Bars</div>
              <div className="tile tile-centered">
                <Droppable
                  isDropDisabled={getDropDisabledStatus()}
                  droppableId={'if-slots:'+cardId}
                  direction="vertical">
                      {provided => {
                        return (
                            <div className="if-condition-container"
                                ref={provided.innerRef}
                                style={{border:`1px ${dashOrSolid} red`}}
                                {...provided.droppableProps} >
                                If Cond Box
                                {slots.map(({ name, type, exp, tier, cardId }, index) => (
                                    <Card
                                        key={name+index}
                                        name={name}
                                        index={index}
                                        cardId={cardId}
                                        parentId={'if-slots:'+cardId}
                                        type={type}
                                        exp={exp}
                                        tier={tier}
                                        emptyText="Empty"/>
                                ))}
                                {provided.placeholder}
                            </div>
                        );
                      }}
                </Droppable>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

  export default IfCard;