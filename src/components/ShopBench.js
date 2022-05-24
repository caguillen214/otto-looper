import React from 'react';
import { Droppable} from 'react-beautiful-dnd';
import { EMPTY_CARD } from '../custom/data';
import Card from './Card';

const ShopBench = ({ isDropDisabled, selectedCard, cards = [], id}) => {
    const MAX_SLOTS = 5;
    const emptySlots = Array(MAX_SLOTS - cards.length).fill(EMPTY_CARD);
  return <div className="column col-10">
    <div className="divider" data-content={id.toUpperCase()} />
    
    <Droppable
        key={id}
        droppableId={id}
        direction="horizontal"
        isCombineEnabled
        isDropDisabled={isDropDisabled}>
      {provided => {
        return (
          <div className="menu shop-bench" {...provided.droppableProps} ref={provided.innerRef}>
            {[...cards, ...emptySlots].map(({ name, type, cardId}, index) => (
            //   <div class="something">
                  <Card
                key={name+':'+ (cardId??index)}
                cardId={cardId}
                parentId={id}
                name={name}
                index={index}
                type={type}
                isPickedUp={selectedCard?.cardId === cardId}/>
                // </div>
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  </div>
};

export default ShopBench;