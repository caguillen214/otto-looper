import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BENCHES, CARD_TYPES } from '../custom/data';
import { makeExpBars } from '../custom/utils';
import EmptySlot from './EmptySlot';

const Card = ({ name, type, index, exp, tier, cardId, parentId, emptyText, isPickedUp, ifConditionCards = [] }) => {
  exp = ~~(6 * Math.random()) + 1;
  const level = ~~(exp / 3) + 1;
  const emptyCard = type === CARD_TYPES.EMPTY ? <EmptySlot parentId={parentId} index={index} key={index} emptyText={emptyText} /> : null;

  const cardClass = 'card ' + (isPickedUp ? 'placeholder-card' : (type === CARD_TYPES.ROUTINE ? 'routine-card': 'character-card'));

  return ( emptyCard ??
    <Draggable key={name} draggableId={name+':'+cardId} index={index} type={type}>
      {(provided) => {
        return (
          <div className={cardClass}     
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