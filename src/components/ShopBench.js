import React from 'react';
import { Droppable} from 'react-beautiful-dnd';
import Card from './Card';

const ShopBench = ({ isDropDisabled, selectedCard, cards = [], id }) => {
  console.log(selectedCard);
  return <div className="column col-12">
    <div className="divider" data-content={id.toUpperCase()} />
    <Droppable
        droppableId={id}
        direction="horizontal"
        isCombineEnabled
        isDropDisabled={isDropDisabled}>
      {provided => {
        return (
          <div className="menu hero-list" {...provided.droppableProps} ref={provided.innerRef}>
            {cards.map(({ name, type, cardId}, index) => (
              <Card
                key={name+cardId}
                cardId={cardId}
                parentId={id}
                name={name}
                index={index}
                type={type}
                isPickedUp={selectedCard?.name === name}/>
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  </div>
};

export default ShopBench;