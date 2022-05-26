import React, {useState, useEffect} from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BENCHES, CARD_TYPES } from '../custom/data';
import EmptySlot from './EmptySlot';
import Card from './Card';
import { makeExpBars } from '../custom/utils';

const LoopCard = (props) => {
  const { name,
     type,
     index,
     counterExp,
     rangeExp,
     tier,
     cardId,
     parentId,
     slots = [],
     colorInd,
     isDragDisabled,
     cardWidth,
     menuWidth } = props;

  const [rangeBarWidth, setRangeBarWidth] = useState('100%');
  const [rangeBarLeftOffset, setRangeBarLeftOffset] = useState('0px');
  const cardClass = `card if-card command-border-color-${colorInd}`;
  const loopRangeLevel = ~~(rangeExp / 3) + 1;
  const loopCounterLevel = ~~(counterExp / 3) + 1;
 
  // const rangeBarWidth = `calc(${(loopRangeLevel)*100}% + ${((loopRangeLevel) * 3)}px)`
  // const rangeBarLeftOffset = `calc(${(-loopRangeLevel+1)*100}% - ${((loopRangeLevel) * 2)}px)`

  
  const showCombineHover = (combineTargetFor) => {
    return combineTargetFor?.includes(name) ? 'combined-hover' : '';
  }


  useEffect(() => {
    // setMenuWidth(menuRef.current);
    // console.log(menuRef)
    const remainingWidth = menuWidth - cardWidth * 7;
    const finWidth = cardWidth * loopRangeLevel + (loopRangeLevel - 1) * remainingWidth / 8 + 3;
    const finOffset = cardWidth * (-loopRangeLevel+1) - (loopRangeLevel - 1) * remainingWidth / 8 - 4;
    setRangeBarLeftOffset(`${finOffset}px`)
    setRangeBarWidth(`${finWidth}px`);
  }, [menuWidth, cardWidth, rangeExp]);

  return (
    // <div className={cardClass} onMouseOver={()=>{console.log('over')}}>
      <Draggable
        isDragDisabled={isDragDisabled}
        key={name}
        draggableId={name+':'+cardId}
        index={index}
        type={type}>
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
                  {/* {counterExp !== 0 && loopCounterLevel !== 3 && <div className="exp-bar-container">
                    {makeExpBars(counterExp, loopCounterLevel)}
                  </div>} */}
                </div>
                <div className={`loop-range-bars command-border-color-${colorInd}`} style={{width: rangeBarWidth, left: rangeBarLeftOffset}}></div>
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