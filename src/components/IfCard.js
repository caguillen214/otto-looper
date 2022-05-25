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

  const rangeBarWidth = `calc(${(ifRangeLevel)*100}% + ${((ifRangeLevel) * 3  )}px)`
  
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
                className={`${cardClass}  ${showCombineHover(snapshot.combineTargetFor)}`}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
              {/* <div className='if-card-container'> */}
                  If Enemy:
                <select name="cars" id="cars">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
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