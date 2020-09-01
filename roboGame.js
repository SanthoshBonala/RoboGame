const directionToAngleMapping = {
    "N": 0,
    "NE": 45,
    "E": 90,
    "SE": 135,
    "S": 180,
    "SW": 225,
    "W": 270,
    "NW": 315
}

const angleToDirectionMapping = {
    0: "N",
    45: "NE",
    90: "E",
    135: "SE",
    180: "S",
    225: "SW",
    270: "W",
    315: "NW"
}

const directionToCoordinateMapping = {
    "N": [0, 1],
    "NE": [1, 1],
    "E": [1, 0],
    "SE": [1, -1],
    "S": [0, -1],
    "SW": [-1, -1],
    "W": [-1, 0],
    "NW": [-1, 1]
}

const getAngle = (direction) => {
    let angle = 0;
    switch(direction) {
        case "R":
            angle = 90;
            break;
        case "r":
            angle = 45;
            break;
        case "l":
            angle = -45;
            break;
        case "L":
            angle = -90;
            break;
    }
    return angle;
};

const getUnits = (move) => {
    let units = 1;
    switch(move) {
        case "M":
            units = 2;
            break;
    }
    return units;
};

function solveRoboGame(gridx, gridy, inputx, inputy, inputDirection, moves) {
    let splittedMoves = moves.split(" ");
    let currentCoordinates = [inputx, inputy];
    let currentDirection = inputDirection;
    for(let move of splittedMoves) {
        let d = getAngle(move);
        if (d == 0) {
            let multiplier = getUnits(move);
            let directionalCoordinates = directionToCoordinateMapping[currentDirection];
            let finalCoordinates = directionalCoordinates.map(c => c * multiplier);
            finalCoordinates = [finalCoordinates[0] + currentCoordinates[0], finalCoordinates[1] + currentCoordinates[1]];
            if (finalCoordinates[0] < 0 || finalCoordinates[0] >= gridx || finalCoordinates[1] < 0 || finalCoordinates[1] >= gridy) {
                break;
            }
            currentCoordinates = finalCoordinates;
        } else {
            currentDirection = angleToDirectionMapping[directionToAngleMapping[currentDirection] + d];
        }
    }
    return {
        currentCoordinates,
        currentDirection
    };
}