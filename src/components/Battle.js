import React from 'react';
import CharacterBench from './CharacterBench';

const Battle = (state) => {
    
    return (
    <div className="container">
        <div className="columns">
            <div className="column col-12 routine-container">
                <CommandBench
                    id={BENCHES.COMMAND}
                    cards={gameData[BENCHES.COMMAND].slots}
                    isDropDisabled={true}
                    />
                <RoutineBench
                    id={BENCHES.ROUTINE}
                    cards={gameData[BENCHES.ROUTINE].slots}
                    isDropDisabled={true}
                    />
            </div>
        </div>
    </div>
    )
}

export default Battle;
