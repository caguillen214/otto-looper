import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BENCHES, CARD_TYPES } from '../custom/data';
import EmptySlot from './EmptySlot';
import Card from './Card';
import { makeExpBars } from '../custom/utils';

const IfCard = (props) => {
  const { name, type, index, conditionExp, rangeExp, tier, cardId, parentId, colorInd, slots = [] } = props;
  const cardClass = `card if-card command-border-color-${colorInd}`;
  const ifRangeLevel = ~~(rangeExp / 3) + 1;
  const ifConditionLevel = ~~(conditionExp / 3) + 1;
 
 
  const getDropDisabledStatus = () => {
      return slots.length >= ifConditionLevel;
  }

  const emptyConditionSlots = () => {
    const emptySlots = [];
    for (let i = slots.length; i < ifConditionLevel; i++) {
      emptySlots.push(<div className='empty-if-condition-slot' key={i}></div>)
    }
    return emptySlots;
  }

  const dashOrSolid = getDropDisabledStatus() ? 'solid' : 'dashed'

  const rangeBarWidth = `calc(${(ifRangeLevel)*100}% + ${((ifRangeLevel) * 3  )}px)`

  return (
    // <div className={cardClass} onMouseOver={()=>{console.log('over')}}>
      <Draggable  key={name} draggableId={name+':'+cardId} index={index} type={type}>
        {provided => {
          return (
            <div 
                className={cardClass}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
              {/* <div className='if-card-container'> */}
                
                <div className="if-details-container" >
                  <div>IF enemy:</div>
                </div>
                <div className={`if-range-bars command-border-color-${colorInd}`} style={{width: rangeBarWidth}}></div>
                {rangeExp !== 0 && ifRangeLevel !== 3 && <div className="command-exp-bar-container">
                  {makeExpBars(rangeExp, ifRangeLevel)}
                </div>}
              {/* </div> */}
            </div>
          );
        }}
      </Draggable>
  //  </div>
  );
}

  export default IfCard;