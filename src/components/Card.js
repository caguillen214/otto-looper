import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BENCHES, CARD_TYPES } from '../custom/data';
import EmptySlot from './EmptySlot';

const Card = ({ name, type, index, exp, tier, cardId, parentId, emptyText, isPickedUp }) => {
  const emptyCard = type === CARD_TYPES.EMPTY ? <EmptySlot parentId={parentId} index={index} key={index} emptyText={emptyText} /> : null;
  exp = ~~(6 * Math.random()) + 1;
  const level = ~~(exp / 3) + 1;
  // 1, 2, [3], 4, 5, 6, [7]
  const makeExpBars = () => {
    const expBars = [];
    for (let i = 0; i < level + 1; i++) {
      const toPush = <div key={i} className={i < exp % 3 ? 'exp-bar' : 'exp-bar exp-bar-empty'}></div>
      expBars.push(toPush);
    }
    return expBars;
  }
  console.log(isPickedUp);
  const cardClass = 'card ' + (isPickedUp ? 'placeholder-card' : (type === CARD_TYPES.ROUTINE ? 'routine-card': 'character-card'));

  return ( emptyCard ??
    <Draggable key={name} draggableId={name+cardId} index={index} type={type}>
      {provided => {
        return (
          <div className={cardClass}     ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
            {parentId !== BENCHES.SHOP && <div>
              <div>Level: {level}</div>
              {exp !== 0 && level !== 3 && <div className="exp-bar-container">
                {makeExpBars()}
              </div>}
            </div>}
            <div
              className="menu-item tile tile-centered"
          
            >
              <figure 
                style={{ backgroundColor: 'transparent' }}
                className='avatar tile-icon'>
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