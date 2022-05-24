import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BENCHES, CARD_TYPES } from '../custom/data';
import { makeExpBars } from '../custom/utils';
import EmptySlot from './EmptySlot';

const Card = ({ name, type, index, exp, tier, cardId, parentId, emptyText, isPickedUp, ifConditionCards = [] }) => {
  // exp = ~~(6 * Math.random()) + 1;
  const level = ~~(exp / 3) + 1;
  const emptyCard = type === CARD_TYPES.EMPTY ? <EmptySlot parentId={parentId} index={index} key={index} emptyText={emptyText} type={type}/> : null;

  const cardClass = 'card ' + (isPickedUp ? 'placeholder-card' : `${type}-card`);

  const showCombineHover = (combineTargetFor) => {
    return combineTargetFor?.includes(name) ? 'combined-hover' : '';
  }

  return ( emptyCard ??
    <Draggable key={name} draggableId={name+':'+cardId} index={index} type={type}>
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
        // if (snapshot.draggingOver) {
        //   console.log(provided)
          // provided.draggableProps = {
          //   ...provided.draggableProps,
          //   style: {
          //     ...provided.draggableProps.style,
          //     left: provided.draggableProps.style.left - 150
          //   }
          // }
        // }
        return (
          <div className={`${cardClass} ${showCombineHover(snapshot.combineTargetFor)}`}     
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
            {parentId !== BENCHES.SHOP && <div>
              <div style={{marginBottom: '4px'}}>Level: {level}</div>
              {exp !== 0 && level !== 3 && <div className="exp-bar-container">
                {makeExpBars(exp, level)}
              </div>}
            </div>}
            <div
              className="tile tile-centered">
              <figure 
                style={{ backgroundColor: 'transparent' }}
                className='card-icon'>
                <img src={`./cards/${name}.png`} alt={name} />
              </figure>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

  export default Card;