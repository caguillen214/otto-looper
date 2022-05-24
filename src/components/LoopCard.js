import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BENCHES, CARD_TYPES } from '../custom/data';
import EmptySlot from './EmptySlot';
import Card from './Card';
import { makeExpBars } from '../custom/utils';

const LoopCard = (props) => {
  const { name, type, index, counterExp, rangeExp, tier, cardId, parentId, slots = [], colorInd } = props;
  const cardClass = `card if-card command-border-color-${colorInd}`;
  const loopRangeLevel = ~~(rangeExp / 3) + 1;
  const loopCounterLevel = ~~(counterExp / 3) + 1;
 
  const rangeBarWidth = `calc(${(loopRangeLevel)*100}% + ${((loopRangeLevel) * 3)}px)`
  const rangeBarLeft = `calc(${(-loopRangeLevel+1)*100}% - ${((loopRangeLevel) * 2)}px)`

  
  const showCombineHover = (combineTargetFor) => {
    return combineTargetFor?.includes(name) ? 'combined-hover' : '';
  }

  return (
    // <div className={cardClass} onMouseOver={()=>{console.log('over')}}>
      <Draggable  key={name} draggableId={name+':'+cardId} index={index} type={type}>
        {(provided, snapshot) => {
          if(!snapshot.isDragging) {
            provided.draggableProps = {
                ...provided.draggableProps,
                style: {
                  ...provided.draggableProps.style,
                  transform: 'none !important'
                }
              }
          }
          if(snapshot.isDropAnimating) {
            provided.draggableProps = {
                ...provided.draggableProps,
                style: {
                  ...provided.draggableProps.style,
                  transform: 'none'
                }
              }
          }
          return (
            <div 
                className={`${cardClass} ${showCombineHover(snapshot.combineTargetFor)}`}     
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
              {/* <div className='if-card-container'> */}
                
                <div className="if-details-container" >
                  <div>Loop Counter: {loopCounterLevel}</div>
                  {counterExp !== 0 && loopCounterLevel !== 3 && <div className="exp-bar-container">
                    {makeExpBars(counterExp, loopCounterLevel)}
                  </div>}
                </div>
                <div className={`loop-range-bars command-border-color-${colorInd}`} style={{width: rangeBarWidth, left: rangeBarLeft}}></div>
                {rangeExp !== 0 && loopRangeLevel !== 3 && <div className="command-exp-bar-container">
                  {makeExpBars(rangeExp, loopRangeLevel)}
                </div>}
              {/* </div> */}
            </div>
          );
        }}
      </Draggable>
  //  </div>
  );
}

  export default LoopCard;