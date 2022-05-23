import React from 'react';
import { Droppable} from 'react-beautiful-dnd';
import { EMPTY_CARD } from '../custom/data';
import Card from './Card';

const ShopBench = ({ isDropDisabled, selectedCard, cards = [], id, currentGold}) => {
    const MAX_SLOTS = 5;
    const emptySlots = Array(MAX_SLOTS - cards.length).fill(EMPTY_CARD);
  return <div className="column col-5">
    <div className="divider" data-content={id.toUpperCase()} />
    <b>Current Gold: {currentGold}</b>
    <Droppable
        key={id}
        droppableId={id}
        direction="horizontal"
        isCombineEnabled
        isDropDisabled={isDropDisabled}>
      {provided => {
        return (
          <div className="menu" {...provided.droppableProps} ref={provided.innerRef}>
            {[...cards, ...emptySlots].map(({ name, type, cardId}, index) => (
              <Card
                key={name+':'+ (cardId??index)}
                cardId={cardId}
                parentId={id}
                name={name}
                index={index}
                type={type}
                isPickedUp={selectedCard?.cardId === cardId}/>
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  </div>
};

export default ShopBench;