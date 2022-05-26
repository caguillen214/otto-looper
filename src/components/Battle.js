import React, {useEffect, useState} from 'react';

import * as constants from "../custom/data";
import { BENCHES, CARD_TYPES, newAttackCard, newBlockCard } from '../custom/data';
import CharacterBench from './CharacterBench';
import CommandBench from './CommandBench';
import RoutineBench from './RoutineBench';
import UltBench from './UltBench';

const Battle = ({gameData}) => {
    const [programCounter, setProgramCounter] = useState(0);
    const [enemyGameData, setEnemyGameData] = useState(null);
    const [playerGameData, setPlayerGameData] = useState(null);
    const [enemyProgramCounter, setEnemyProgramCounter] = useState(0);

    const determineNextStep = (isEnemy, counter, otherCounter) => {
        const data = isEnemy ? enemyGameData : playerGameData;
        const otherData = !isEnemy ? enemyGameData : playerGameData;
        // const counter = isEnemy ? enemyProgramCounter : programCounter;
        let commandStep = data[BENCHES.COMMAND].slots[counter];
        let nextCommandStep = data[BENCHES.COMMAND].slots[(counter + 1) %7];
        let routineStep = data[BENCHES.ROUTINE].slots[counter];
        let otherRoutineStep = otherData[BENCHES.ROUTINE].slots[(otherCounter + 1) %7];

        // if (commandStep.type === CARD_TYPES.EMPTY) {
  
        switch(routineStep.name) {
            case 'atk':
                const otherArmor = otherData[constants.CHARACTER_STATS].armor;
                const attack = data[constants.CHARACTER_STATS].attack;
                const diff = Math.max(0, otherArmor - attack);
                otherData[constants.CHARACTER_STATS].armor = Math.max(0, diff);
                if (diff === 0) {
                    otherData[constants.CHARACTER_STATS].health += (otherArmor - attack);
                }
                break;
            case 'block':
                data[constants.CHARACTER_STATS].armor += data[constants.CHARACTER_STATS].dexterity;
                break;
            case 'heal':
                data[constants.CHARACTER_STATS].health += data[constants.CHARACTER_STATS].heal;
                break;
        }
        if (commandStep.name === 'loop') {
            const loopCounter = ~~(commandStep.counterExp / 3) + 1;
            if (loopCounter > 0) {
                commandStep.counterExp -= 3;
                return counter - ~~(commandStep.rangeExp / 3);
            }
        }
        if (nextCommandStep.name === 'if') {
            const isEnemyTarget = nextCommandStep.targettingEnemy;
            const dataIf = !isEnemyTarget ? enemyGameData : playerGameData;
            const enemyDataIf = isEnemyTarget ? enemyGameData : playerGameData;
            switch (nextCommandStep.condition) {
                case 0: // IS ATTACK
                    counter = isEnemyTarget && otherRoutineStep.name === 'atk' 
                        ? counter + 1 + ~~(nextCommandStep.rangeExp / 3) : counter;
                    break;
                case 1: // IS BLOCK
                    counter = isEnemyTarget && otherRoutineStep.name === 'block' 
                        ? counter + 1 + ~~(nextCommandStep.rangeExp / 3) : counter;
                    break;
                case 2: // IS CHARGE
                    break;
                case 3: // HAS MORE ATTACK
                    break;
                case 4: // HAS MORE HEALTH
                    break;
            }
            // counter = counter + 1 + ~~(nextCommandStep.rangeExp / 3);
            // commandStep = data[BENCHES.COMMAND].slots[counter+1];
            // routineStep = data[BENCHES.ROUTINE].slots[counter+1];
        }
        return counter + 1;
        // } else {
   
            // if (isEnemy) {
            //     return counter++;
            // } else {
            //     return counter++;
            // }
        // }

    }


    useEffect(() => {
        setPlayerGameData(prev => ({...gameData}));
        setEnemyGameData(prev => ({
            ...gameData,
            isEnemy: true,
            [constants.CHARACTER_STATS]: {
                ...gameData[constants.CHARACTER_STATS]
            },
            [BENCHES.ROUTINE]: {
                id: BENCHES.ROUTINE,
                slots: [newBlockCard(), newAttackCard(), newAttackCard(), newBlockCard(), newAttackCard(), newAttackCard(), newAttackCard()]
            },
            [BENCHES.COMMAND]: {
                id: BENCHES.COMMAND,
                slots: [...gameData[BENCHES.COMMAND].slots.map((c) => ({...c}))]
            }
        }))
    }, [gameData]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgramCounter(counter => determineNextStep(true, (counter) %7, enemyProgramCounter) %7);
            setEnemyProgramCounter(counter => determineNextStep(false, (counter) %7, programCounter) %7);

            
            // determineNextStep(false, counter);
            // setEnemyProgramCounter(enemyProgramCounter => (enemyProgramCounter + 1)%7);
        }, 2000);
      return () => clearInterval(interval);
    }, [enemyGameData])
  
    return (
    <div className="container">
        <div className="columns">
            {playerGameData && <div className="columns column col-6 routine-container">
                <div className="column col-12">
                    Program Step: {programCounter + 1}
                </div>
                <div className="column col-11S">
                    <CommandBench
                        id={BENCHES.COMMAND}
                        cards={gameData[BENCHES.COMMAND].slots}
                        isDragDisabled={true}
                        />
                    <RoutineBench
                        id={BENCHES.ROUTINE}
                        cards={gameData[BENCHES.ROUTINE].slots}
                        isDragDisabled={true}
                        programCounter={programCounter}
                        />
                </div>
                <UltBench
                  id={BENCHES.ULT}
                  cards={gameData[BENCHES.ULT].slots}
                  selectedCard={gameData.selectedCard}/>
                <CharacterBench
                    id={BENCHES.CHARACTER}
                    characterStats={gameData[constants.CHARACTER_STATS]}
                    selectedCard={gameData.selectedCard}
                    cards={gameData[BENCHES.CHARACTER].slots}
                    showBench={false}
                    level={~~(gameData.turnCount / 3)+1}/>
            </div>}
            {enemyGameData  && <div className="columns column col-6 routine-container">
                <div className="column col-12">
                    Enemy Program Step: {enemyProgramCounter + 1}
                </div>
                <div className="column col-11S">
                    <CommandBench
                        id={BENCHES.COMMAND+'enemy'}
                        cards={enemyGameData[BENCHES.COMMAND].slots}
                        isDragDisabled={true}
                        />
                    <RoutineBench
                        id={BENCHES.ROUTINE+'enemy'}
                        cards={enemyGameData[BENCHES.ROUTINE].slots}
                        isDragDisabled={true}
                        programCounter={enemyProgramCounter}
                        />
                </div>
                <UltBench
                  id={BENCHES.ULT+'enemy'}
                  cards={enemyGameData[BENCHES.ULT].slots}
                  selectedCard={enemyGameData.selectedCard}
                  isDragDisabled={true} />
                <CharacterBench
                    id={BENCHES.CHARACTER+'enemy'}
                    characterStats={enemyGameData[constants.CHARACTER_STATS]}
                    selectedCard={enemyGameData.selectedCard}
                    cards={enemyGameData[BENCHES.CHARACTER].slots}
                    showBench={false}
                    level={~~(enemyGameData.turnCount / 3)+1}/>
            </div>}
        </div>
    </div>
    )
}

export default Battle;
