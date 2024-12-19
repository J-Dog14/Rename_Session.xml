// Youth Load Score
function calculateMoverImproverScore(moverImproverDay, warmUpLevel, pitches, infieldThrows, outfieldThrows, miscThrows, sorenessLevel) {
    // Base score based on Mover Improver Day (previously Game Day B4)
    let scoreMoverImprover = 0;
    if (moverImproverDay === 1) {
        scoreMoverImprover = 5;
    } else if (moverImproverDay === 2) {
        scoreMoverImprover = 7.5;
    } else if (moverImproverDay === 3) {
        scoreMoverImprover = 10;
    }

    // Base score based on Warm-Up Level (previously Game Day C4)
    let scoreWarmUp = 0;
    if (warmUpLevel === 1) {
        scoreWarmUp = 5;
    } else if (warmUpLevel === 2) {
        scoreWarmUp = 7.5;
    } else if (warmUpLevel === 3) {
        scoreWarmUp = 10;
    } else if (warmUpLevel === 4) {
        scoreWarmUp = 12.5;
    }

    // Base score based on Soreness Level (previously Game Day H4)
    let scoreSoreness = 0;
    switch (sorenessLevel) {
        case 10: scoreSoreness = 32; break;
        case 9: scoreSoreness = 29; break;
        case 8: scoreSoreness = 26; break;
        case 7: scoreSoreness = 23; break;
        case 6: scoreSoreness = 20; break;
        case 5: scoreSoreness = 17; break;
        case 4: scoreSoreness = 14; break;
        case 3: scoreSoreness = 11; break;
        case 2: scoreSoreness = 8; break;
        case 1: scoreSoreness = 5; break;
        case 0: scoreSoreness = 0; break;
        default: scoreSoreness = 0; break;
    }

    // Adding all components together
    let totalScore = scoreMoverImprover +
                     scoreWarmUp +
                     (pitches * 0.9) +           // Pitches (previously Game Day D4)
                     (infieldThrows * 0.4) +      // Infield Throws (previously Game Day E4)
                     (outfieldThrows * 0.6) +     // Outfield Throws (previously Game Day F4)
                     (miscThrows * 0.25) +        // Misc Throws (previously Game Day G4)
                     scoreSoreness;

    return totalScore;
}



// High School starter equation
function calculatePlyoDayScore(plyoDay, warmUpLevel, pitches, infieldThrows, outfieldThrows, miscThrows, sorenessLevel) {
    // Base score based on Plyo Day (previously Game Day B4)
    let scorePlyoDay = 0;
    if (plyoDay === 1) {
        scorePlyoDay = 5;
    } else if (plyoDay === 2) {
        scorePlyoDay = 7.5;
    } else if (plyoDay === 3) {
        scorePlyoDay = 10;
    }

    // Base score based on Warm-Up Level (previously Game Day C4)
    let scoreWarmUp = 0;
    if (warmUpLevel === 1) {
        scoreWarmUp = 5;
    } else if (warmUpLevel === 2) {
        scoreWarmUp = 7.5;
    } else if (warmUpLevel === 3) {
        scoreWarmUp = 10;
    } else if (warmUpLevel === 4) {
        scoreWarmUp = 12.5;
    }

    // Base score based on Soreness Level (previously Game Day H4)
    let scoreSoreness = 0;
    switch (sorenessLevel) {
        case 10: scoreSoreness = 32; break;
        case 9: scoreSoreness = 29; break;
        case 8: scoreSoreness = 26; break;
        case 7: scoreSoreness = 23; break;
        case 6: scoreSoreness = 20; break;
        case 5: scoreSoreness = 17; break;
        case 4: scoreSoreness = 14; break;
        case 3: scoreSoreness = 11; break;
        case 2: scoreSoreness = 8; break;
        case 1: scoreSoreness = 5; break;
        case 0: scoreSoreness = 0; break;
        default: scoreSoreness = 0; break;
    }

    // Adding all components together
    let totalScore = scorePlyoDay +
                     scoreWarmUp +
                     (pitches * 0.75) +           // Pitches (previously Game Day D4)
                     (infieldThrows * 0.3) +      // Infield Throws (previously Game Day E4)
                     (outfieldThrows * 0.5) +     // Outfield Throws (previously Game Day F4)
                     (miscThrows * 0.2) +         // Misc Throws (previously Game Day G4)
                     scoreSoreness;

    return totalScore;
}


// College Starter Score
function calculatePlyoDayScoreV2(plyoDay, warmUpLevel, pitches, infieldThrows, outfieldThrows, miscThrows, sorenessLevel) {
    // Base score based on Plyo Day (previously Game Day B4)
    let scorePlyoDay = 0;
    if (plyoDay === 1) {
        scorePlyoDay = 5;
    } else if (plyoDay === 2) {
        scorePlyoDay = 7.5;
    } else if (plyoDay === 3) {
        scorePlyoDay = 10;
    }

    // Base score based on Warm-Up Level (previously Game Day C4)
    let scoreWarmUp = 0;
    if (warmUpLevel === 1) {
        scoreWarmUp = 5;
    } else if (warmUpLevel === 2) {
        scoreWarmUp = 7.5;
    } else if (warmUpLevel === 3) {
        scoreWarmUp = 10;
    } else if (warmUpLevel === 4) {
        scoreWarmUp = 12.5;
    }

    // Base score based on Soreness Level (previously Game Day H4)
    let scoreSoreness = 0;
    switch (sorenessLevel) {
        case 10: scoreSoreness = 32; break;
        case 9: scoreSoreness = 29; break;
        case 8: scoreSoreness = 26; break;
        case 7: scoreSoreness = 23; break;
        case 6: scoreSoreness = 20; break;
        case 5: scoreSoreness = 17; break;
        case 4: scoreSoreness = 14; break;
        case 3: scoreSoreness = 11; break;
        case 2: scoreSoreness = 8; break;
        case 1: scoreSoreness = 5; break;
        case 0: scoreSoreness = 0; break;
        default: scoreSoreness = 0; break;
    }

    // Adding all components together
    let totalScore = scorePlyoDay +
                     scoreWarmUp +
                     (pitches * 0.75) +           // Pitches (previously Game Day D4)
                     (infieldThrows * 0.3) +      // Infield Throws (previously Game Day E4)
                     (outfieldThrows * 0.5) +     // Outfield Throws (previously Game Day F4)
                     (miscThrows * 0.2) +         // Misc Throws (previously Game Day G4)
                     scoreSoreness;

    return totalScore;
}


// Pro Starter Score
function calculatePlyoDayScoreV3(plyoDay, warmUpLevel, pitches, infieldThrows, outfieldThrows, miscThrows, sorenessLevel) {
    // Base score based on Plyo Day (previously Game Day B4)
    let scorePlyoDay = 0;
    if (plyoDay === 1) {
        scorePlyoDay = 5;
    } else if (plyoDay === 2) {
        scorePlyoDay = 7.5;
    } else if (plyoDay === 3) {
        scorePlyoDay = 10;
    }

    // Base score based on Warm-Up Level (previously Game Day C4)
    let scoreWarmUp = 0;
    if (warmUpLevel === 1) {
        scoreWarmUp = 5;
    } else if (warmUpLevel === 2) {
        scoreWarmUp = 7.5;
    } else if (warmUpLevel === 3) {
        scoreWarmUp = 10;
    } else if (warmUpLevel === 4) {
        scoreWarmUp = 12.5;
    }

    // Base score based on Soreness Level (previously Game Day H4)
    let scoreSoreness = 0;
    switch (sorenessLevel) {
        case 10: scoreSoreness = 32; break;
        case 9: scoreSoreness = 29; break;
        case 8: scoreSoreness = 26; break;
        case 7: scoreSoreness = 23; break;
        case 6: scoreSoreness = 20; break;
        case 5: scoreSoreness = 17; break;
        case 4: scoreSoreness = 14; break;
        case 3: scoreSoreness = 11; break;
        case 2: scoreSoreness = 8; break;
        case 1: scoreSoreness = 5; break;
        case 0: scoreSoreness = 0; break;
        default: scoreSoreness = 0; break;
    }

    // Adding all components together
    let totalScore = scorePlyoDay +
                     scoreWarmUp +
                     (pitches * 0.7) +            // Pitches (previously Game Day D4)
                     (infieldThrows * 0.3) +      // Infield Throws (previously Game Day E4)
                     (outfieldThrows * 0.5) +     // Outfield Throws (previously Game Day F4)
                     (miscThrows * 0.2) +         // Misc Throws (previously Game Day G4)
                     scoreSoreness;

    return totalScore;
}


// High School Reliever/Athlete Score
function calculateScore(previousDayScore, plyoDay, warmUpLevel, pitches, infieldThrows, outfieldThrows, miscThrows, sorenessLevel) {
    // Base score based on Plyo Day (previously Game Day C4)
    let scorePlyoDay = 0;
    if (plyoDay === 1) {
        scorePlyoDay = 5;
    } else if (plyoDay === 2) {
        scorePlyoDay = 7.5;
    } else if (plyoDay === 3) {
        scorePlyoDay = 10;
    }

    // Base score based on Warm-Up Level (previously Game Day D4)
    let scoreWarmUp = 0;
    if (warmUpLevel === 1) {
        scoreWarmUp = 5;
    } else if (warmUpLevel === 2) {
        scoreWarmUp = 7.5;
    } else if (warmUpLevel === 3) {
        scoreWarmUp = 10;
    } else if (warmUpLevel === 4) {
        scoreWarmUp = 12.5;
    }

    // Base score based on Soreness Level (previously Game Day I4)
    let scoreSoreness = 0;
    switch (sorenessLevel) {
        case 10: scoreSoreness = 32; break;
        case 9: scoreSoreness = 29; break;
        case 8: scoreSoreness = 26; break;
        case 7: scoreSoreness = 23; break;
        case 6: scoreSoreness = 20; break;
        case 5: scoreSoreness = 17; break;
        case 4: scoreSoreness = 14; break;
        case 3: scoreSoreness = 11; break;
        case 2: scoreSoreness = 8; break;
        case 1: scoreSoreness = 5; break;
        case 0: scoreSoreness = 0; break;
        default: scoreSoreness = 0; break;
    }

    // Adding all components together
    let totalScore = scorePlyoDay +
                     scoreWarmUp +
                     (previousDayScore * 0.3) +     // Previous Day Score (previously Game Day B4)
                     (pitches * 0.75) +             // Pitches (previously Game Day E4)
                     (infieldThrows * 0.3) +        // Infield Throws (previously Game Day F4)
                     (outfieldThrows * 0.5) +       // Outfield Throws (previously Game Day G4)
                     (miscThrows * 0.2) +           // Misc Throws (previously Game Day H4)
                     scoreSoreness;

    return totalScore;
}

// Example usage
let result = calculateScore(50, 2, 3, 100, 15, 20, 5, 9);  // Pass the values for each parameter
console.log(result);  // Outputs the calculated result


// College Reliever Score
function calculateScore(previousDayScore, plyoDay, warmUpLevel, pitches, infieldThrows, outfieldThrows, miscThrows, sorenessLevel) {
    // Base score based on Plyo Day (previously Game Day C4)
    let scorePlyoDay = 0;
    if (plyoDay === 1) {
        scorePlyoDay = 5;
    } else if (plyoDay === 2) {
        scorePlyoDay = 7.5;
    } else if (plyoDay === 3) {
        scorePlyoDay = 10;
    }

    // Base score based on Warm-Up Level (previously Game Day D4)
    let scoreWarmUp = 0;
    if (warmUpLevel === 1) {
        scoreWarmUp = 5;
    } else if (warmUpLevel === 2) {
        scoreWarmUp = 7.5;
    } else if (warmUpLevel === 3) {
        scoreWarmUp = 10;
    } else if (warmUpLevel === 4) {
        scoreWarmUp = 12.5;
    }

    // Base score based on Soreness Level (previously Game Day I4)
    let scoreSoreness = 0;
    switch (sorenessLevel) {
        case 10: scoreSoreness = 32; break;
        case 9: scoreSoreness = 29; break;
        case 8: scoreSoreness = 26; break;
        case 7: scoreSoreness = 23; break;
        case 6: scoreSoreness = 20; break;
        case 5: scoreSoreness = 17; break;
        case 4: scoreSoreness = 14; break;
        case 3: scoreSoreness = 11; break;
        case 2: scoreSoreness = 8; break;
        case 1: scoreSoreness = 5; break;
        case 0: scoreSoreness = 0; break;
        default: scoreSoreness = 0; break;
    }

    // Adding all components together
    let totalScore = scorePlyoDay +
                     scoreWarmUp +
                     (previousDayScore * 0.3) +     // Previous Day Score (previously Game Day B4)
                     (pitches * 0.75) +             // Pitches (previously Game Day E4)
                     (infieldThrows * 0.3) +        // Infield Throws (previously Game Day F4)
                     (outfieldThrows * 0.5) +       // Outfield Throws (previously Game Day G4)
                     (miscThrows * 0.2) +           // Misc Throws (previously Game Day H4)
                     scoreSoreness;

    return totalScore;
}

// Example usage
let result = calculateScore(50, 2, 3, 100, 15, 20, 5, 9);  // Pass the values for each parameter
console.log(result);  // Outputs the calculated result


// Pro Reliever Formula
function calculateScore(previousDayScore, plyoDay, warmUpLevel, pitches, infieldThrows, outfieldThrows, miscThrows, sorenessLevel) {
    // Base score based on Plyo Day (previously Game Day C4)
    let scorePlyoDay = 0;
    if (plyoDay === 1) {
        scorePlyoDay = 5;
    } else if (plyoDay === 2) {
        scorePlyoDay = 7.5;
    } else if (plyoDay === 3) {
        scorePlyoDay = 10;
    }

    // Base score based on Warm-Up Level (previously Game Day D4)
    let scoreWarmUp = 0;
    if (warmUpLevel === 1) {
        scoreWarmUp = 5;
    } else if (warmUpLevel === 2) {
        scoreWarmUp = 7.5;
    } else if (warmUpLevel === 3) {
        scoreWarmUp = 10;
    } else if (warmUpLevel === 4) {
        scoreWarmUp = 12.5;
    }

    // Base score based on Soreness Level (previously Game Day I4)
    let scoreSoreness = 0;
    switch (sorenessLevel) {
        case 10: scoreSoreness = 32; break;
        case 9: scoreSoreness = 29; break;
        case 8: scoreSoreness = 26; break;
        case 7: scoreSoreness = 23; break;
        case 6: scoreSoreness = 20; break;
        case 5: scoreSoreness = 17; break;
        case 4: scoreSoreness = 14; break;
        case 3: scoreSoreness = 11; break;
        case 2: scoreSoreness = 8; break;
        case 1: scoreSoreness = 5; break;
        case 0: scoreSoreness = 0; break;
        default: scoreSoreness = 0; break;
    }

    // Adding all components together
    let totalScore = scorePlyoDay +
                     scoreWarmUp +
                     (previousDayScore * 0.3) +     // Previous Day Score (previously Game Day B4)
                     (pitches * 0.75) +             // Pitches (previously Game Day E4)
                     (infieldThrows * 0.3) +        // Infield Throws (previously Game Day F4)
                     (outfieldThrows * 0.5) +       // Outfield Throws (previously Game Day G4)
                     (miscThrows * 0.2) +           // Misc Throws (previously Game Day H4)
                     scoreSoreness;

    return totalScore;
}

// Example usage
let result = calculateScore(50, 2, 3, 100, 15, 20, 5, 9);  // Pass the values for each parameter
console.log(result);  // Outputs the calculated result


// Day Two Score for all levels and positions
function calculateNonCompeteDayScore(nonCompeteDayValue, sorenessLevel) {
    // Base score calculation
    const baseScore = nonCompeteDayValue * 0.5;

    // Additional score based on soreness level
    let additionalScore = 0;

    switch (sorenessLevel) {
        case 10: additionalScore = 32; break;
        case 9:  additionalScore = 29; break;
        case 8:  additionalScore = 26; break;
        case 7:  additionalScore = 23; break;
        case 6:  additionalScore = 20; break;
        case 5:  additionalScore = 17; break;
        case 4:  additionalScore = 14; break;
        case 3:  additionalScore = 11; break;
        case 2:  additionalScore = 8;  break;
        case 1:  additionalScore = 5;  break;
        case 0:  additionalScore = 0;  break;
        default: additionalScore = 0;  break;
    }

    // Total score is the sum of base score and additional score
    return baseScore + additionalScore;
}


// Day Three Score Youth
function calculateScore(previousDayScore, moverImproverDay, warmUpLevel, pitches, infieldThrows, outfieldThrows, miscThrows, sorenessLevel) {
    // Base score from Previous Day Score (B)
    let totalScore = previousDayScore * 0.3;

    // Score based on Mover Improver Day (C)
    let moverImproverScore = 0;
    if (moverImproverDay === 1) {
        moverImproverScore = 5;
    } else if (moverImproverDay === 2) {
        moverImproverScore = 7.5;
    } else if (moverImproverDay === 3) {
        moverImproverScore = 10;
    } else if (moverImproverDay === 4) {
        moverImproverScore = 12.5;
    } else {
        moverImproverScore = 0;
    }
    totalScore += moverImproverScore;

    // Score based on Warm-Up Level (D)
    let warmUpScore = 0;
    if (warmUpLevel === 1) {
        warmUpScore = 5;
    } else if (warmUpLevel === 2) {
        warmUpScore = 7.5;
    } else if (warmUpLevel === 3) {
        warmUpScore = 10;
    } else if (warmUpLevel === 4) {
        warmUpScore = 12.5;
    } else {
        warmUpScore = 0;
    }
    totalScore += warmUpScore;

    // Adding weighted values for Pitches, Infield Throws, Outfield Throws, and Misc Throws
    totalScore += (pitches * 0.6);         // Pitches (E)
    totalScore += (infieldThrows * 0.1);    // Infield Throws (F)
    totalScore += (outfieldThrows * 0.3);   // Outfield Throws (G)
    totalScore += (miscThrows * 0.25);      // Misc Throws (H)

    // Additional score based on Soreness Level (I)
    let sorenessScore = 0;
    switch (sorenessLevel) {
        case 10: sorenessScore = 32; break;
        case 9:  sorenessScore = 29; break;
        case 8:  sorenessScore = 26; break;
        case 7:  sorenessScore = 23; break;
        case 6:  sorenessScore = 20; break;
        case 5:  sorenessScore = 17; break;
        case 4:  sorenessScore = 14; break;
        case 3:  sorenessScore = 11; break;
        case 2:  sorenessScore = 8;  break;
        case 1:  sorenessScore = 5;  break;
        case 0:  sorenessScore = 0;  break;
        default: sorenessScore = 0;  break;
    }
    totalScore += sorenessScore;

    return totalScore;
}


// High School Starter Day Three Score
function calculateScore(warmUpLevel, plyoDay, pitches, infieldThrows, outfieldThrows, miscThrows, sorenessLevel) {
    let totalScore = 0;

    // Score based on Warm-Up Level (cell B)
    let scoreWarmUp = 0;
    if (warmUpLevel === 1) {
        scoreWarmUp = 5;
    } else if (warmUpLevel === 2) {
        scoreWarmUp = 7.5;
    } else if (warmUpLevel === 3) {
        scoreWarmUp = 10;
    } else {
        scoreWarmUp = 0;
    }
    totalScore += scoreWarmUp;

    // Score based on Plyo Day (cell C)
    let scorePlyoDay = 0;
    if (plyoDay === 1) {
        scorePlyoDay = 5;
    } else if (plyoDay === 2) {
        scorePlyoDay = 7.5;
    } else if (plyoDay === 3) {
        scorePlyoDay = 10;
    } else if (plyoDay === 4) {
        scorePlyoDay = 12.5;
    } else {
        scorePlyoDay = 0;
    }
    totalScore += scorePlyoDay;

    // Adding weighted values
    totalScore += (pitches * 0.75);        // Pitches (cell D)
    totalScore += (infieldThrows * 0.3);    // Infield Throws (cell E)
    totalScore += (outfieldThrows * 0.5);   // Outfield Throws (cell F)
    totalScore += (miscThrows * 0.2);       // Misc Throws (cell G)

    // Score based on Soreness Level (cell H)
    let scoreSoreness = 0;
    switch (sorenessLevel) {
        case 10: scoreSoreness = 32; break;
        case 9:  scoreSoreness = 29; break;
        case 8:  scoreSoreness = 26; break;
        case 7:  scoreSoreness = 23; break;
        case 6:  scoreSoreness = 20; break;
        case 5:  scoreSoreness = 17; break;
        case 4:  scoreSoreness = 14; break;
        case 3:  scoreSoreness = 11; break;
        case 2:  scoreSoreness = 8;  break;
        case 1:  scoreSoreness = 5;  break;
        case 0:  scoreSoreness = 0;  break;
        default: scoreSoreness = 0;  break;
    }
    totalScore += scoreSoreness;

    return totalScore;
}


// College Starter Day 3
function calculateScore(previousDayScore, moverImproverDay, warmUpLevel, pitches, infieldThrows, outfieldThrows, miscThrows, sorenessLevel) {
    let totalScore = 0;

    // Base score from Previous Day Score (B)
    totalScore += previousDayScore * 0.3;

    // Score based on Mover Improver Day (C)
    let moverImproverScore = 0;
    if (moverImproverDay === 1) {
        moverImproverScore = 5;
    } else if (moverImproverDay === 2) {
        moverImproverScore = 7.5;
    } else if (moverImproverDay === 3) {
        moverImproverScore = 10;
    } else if (moverImproverDay === 4) {
        moverImproverScore = 12.5;
    } else {
        moverImproverScore = 0;
    }
    totalScore += moverImproverScore;

    // Score based on Warm-Up Level (D)
    let warmUpScore = 0;
    if (warmUpLevel === 1) {
        warmUpScore = 5;
    } else if (warmUpLevel === 2) {
        warmUpScore = 7.5;
    } else if (warmUpLevel === 3) {
        warmUpScore = 10;
    } else if (warmUpLevel === 4) {
        warmUpScore = 12.5;
    } else {
        warmUpScore = 0;
    }
    totalScore += warmUpScore;

    // Adding weighted values
    totalScore += pitches * 0.5;          // Pitches (E)
    totalScore += infieldThrows * 0.1;    // Infield Throws (F)
    totalScore += outfieldThrows * 0.3;   // Outfield Throws (G)
    totalScore += miscThrows * 0.25;      // Misc Throws (H)

    // Additional score based on Soreness Level (I)
    let sorenessScore = 0;
    switch (sorenessLevel) {
        case 10: sorenessScore = 32; break;
        case 9:  sorenessScore = 29; break;
        case 8:  sorenessScore = 26; break;
        case 7:  sorenessScore = 23; break;
        case 6:  sorenessScore = 20; break;
        case 5:  sorenessScore = 17; break;
        case 4:  sorenessScore = 14; break;
        case 3:  sorenessScore = 11; break;
        case 2:  sorenessScore = 8;  break;
        case 1:  sorenessScore = 5;  break;
        case 0:  sorenessScore = 0;  break;
        default: sorenessScore = 0;  break;
    }
    totalScore += sorenessScore;

    return totalScore;
}



// Pro Starter Day 3
function calculateScore(previousDayScore, moverImproverDay, warmUpLevel, pitches, infieldThrows, outfieldThrows, miscThrows, sorenessLevel) {
    let totalScore = 0;

    // Base score from Previous Day Score (B)
    totalScore += previousDayScore * 0.3;

    // Score based on Mover Improver Day (C)
    let moverImproverScore = 0;
    if (moverImproverDay === 1) {
        moverImproverScore = 5;
    } else if (moverImproverDay === 2) {
        moverImproverScore = 7.5;
    } else if (moverImproverDay === 3) {
        moverImproverScore = 10;
    } else if (moverImproverDay === 4) {
        moverImproverScore = 12.5;
    } else {
        moverImproverScore = 0;
    }
    totalScore += moverImproverScore;

    // Score based on Warm-Up Level (D)
    let warmUpScore = 0;
    if (warmUpLevel === 1) {
        warmUpScore = 5;
    } else if (warmUpLevel === 2) {
        warmUpScore = 7.5;
    } else if (warmUpLevel === 3) {
        warmUpScore = 10;
    } else if (warmUpLevel === 4) {
        warmUpScore = 12.5;
    } else {
        warmUpScore = 0;
    }
    totalScore += warmUpScore;

    // Adding weighted values
    totalScore += pitches * 0.5;          // Pitches (E)
    totalScore += infieldThrows * 0.1;    // Infield Throws (F)
    totalScore += outfieldThrows * 0.3;   // Outfield Throws (G)
    totalScore += miscThrows * 0.25;      // Misc Throws (H)

    // Additional score based on Soreness Level (I)
    let sorenessScore = 0;
    switch (sorenessLevel) {
        case 10: sorenessScore = 32; break;
        case 9:  sorenessScore = 29; break;
        case 8:  sorenessScore = 26; break;
        case 7:  sorenessScore = 23; break;
        case 6:  sorenessScore = 20; break;
        case 5:  sorenessScore = 17; break;
        case 4:  sorenessScore = 14; break;
        case 3:  sorenessScore = 11; break;
        case 2:  sorenessScore = 8;  break;
        case 1:  sorenessScore = 5;  break;
        case 0:  sorenessScore = 0;  break;
        default: sorenessScore = 0;  break;
    }
    totalScore += sorenessScore;

    return totalScore;
}


// High School Reliever Day 3
function calculateScore(previousDayScore, moverImproverDay, warmUpLevel, pitches, infieldThrows, outfieldThrows, miscThrows, sorenessLevel) {
    let totalScore = 0;

    // Add previousDayScore multiplied by 0.3
    totalScore += previousDayScore * 0.3;

    // Score based on Mover Improver Day (cell C)
    let moverImproverScore = 0;
    if (moverImproverDay === 1) {
        moverImproverScore = 5;
    } else if (moverImproverDay === 2) {
        moverImproverScore = 7.5;
    } else if (moverImproverDay === 3) {
        moverImproverScore = 10;
    } else if (moverImproverDay === 4) {
        moverImproverScore = 12.5;
    } else {
        moverImproverScore = 0;
    }
    totalScore += moverImproverScore;

    // Score based on Warm-Up Level (cell D)
    let warmUpScore = 0;
    if (warmUpLevel === 1) {
        warmUpScore = 5;
    } else if (warmUpLevel === 2) {
        warmUpScore = 7.5;
    } else if (warmUpLevel === 3) {
        warmUpScore = 10;
    } else if (warmUpLevel === 4) {
        warmUpScore = 12.5;
    } else {
        warmUpScore = 0;
    }
    totalScore += warmUpScore;

    // Adding weighted values
    totalScore += pitches * 0.5;          // Pitches (cell E)
    totalScore += infieldThrows * 0.1;    // Infield Throws (cell F)
    totalScore += outfieldThrows * 0.3;   // Outfield Throws (cell G)
    totalScore += miscThrows * 0.25;      // Misc Throws (cell H)

    // Additional score based on Soreness Level (cell I)
    let sorenessScore = 0;
    switch (sorenessLevel) {
        case 10: sorenessScore = 32; break;
        case 9:  sorenessScore = 29; break;
        case 8:  sorenessScore = 26; break;
        case 7:  sorenessScore = 23; break;
        case 6:  sorenessScore = 20; break;
        case 5:  sorenessScore = 17; break;
        case 4:  sorenessScore = 14; break;
        case 3:  sorenessScore = 11; break;
        case 2:  sorenessScore = 8;  break;
        case 1:  sorenessScore = 5;  break;
        case 0:  sorenessScore = 0;  break;
        default: sorenessScore = 0;  break;
    }
    totalScore += sorenessScore;

    return totalScore;
}


// College Reliever Day 3
function calculateScore(previousDayScore, moverImproverDay, warmUpLevel, pitches, infieldThrows, outfieldThrows, miscThrows, sorenessLevel) {
    let totalScore = 0;

    // Add previousDayScore multiplied by 0.3
    totalScore += previousDayScore * 0.3;

    // Score based on Mover Improver Day (cell C)
    let moverImproverScore = 0;
    if (moverImproverDay === 1) {
        moverImproverScore = 5;
    } else if (moverImproverDay === 2) {
        moverImproverScore = 7.5;
    } else if (moverImproverDay === 3) {
        moverImproverScore = 10;
    } else if (moverImproverDay === 4) {
        moverImproverScore = 12.5;
    } else {
        moverImproverScore = 0;
    }
    totalScore += moverImproverScore;

    // Score based on Warm-Up Level (cell D)
    let warmUpScore = 0;
    if (warmUpLevel === 1) {
        warmUpScore = 5;
    } else if (warmUpLevel === 2) {
        warmUpScore = 7.5;
    } else if (warmUpLevel === 3) {
        warmUpScore = 10;
    } else if (warmUpLevel === 4) {
        warmUpScore = 12.5;
    } else {
        warmUpScore = 0;
    }
    totalScore += warmUpScore;

    // Adding weighted values
    totalScore += pitches * 0.5;          // Pitches (cell E)
    totalScore += infieldThrows * 0.1;    // Infield Throws (cell F)
    totalScore += outfieldThrows * 0.3;   // Outfield Throws (cell G)
    totalScore += miscThrows * 0.25;      // Misc Throws (cell H)

    // Additional score based on Soreness Level (cell I)
    let sorenessScore = 0;
    switch (sorenessLevel) {
        case 10: sorenessScore = 32; break;
        case 9:  sorenessScore = 29; break;
        case 8:  sorenessScore = 26; break;
        case 7:  sorenessScore = 23; break;
        case 6:  sorenessScore = 20; break;
        case 5:  sorenessScore = 17; break;
        case 4:  sorenessScore = 14; break;
        case 3:  sorenessScore = 11; break;
        case 2:  sorenessScore = 8;  break;
        case 1:  sorenessScore = 5;  break;
        case 0:  sorenessScore = 0;  break;
        default: sorenessScore = 0;  break;
    }
    totalScore += sorenessScore;

    return totalScore;
}


// Pro Reliver Dat 3
function calculateScore(previousDayScore, moverImproverDay, warmUpLevel, pitches, infieldThrows, outfieldThrows, miscThrows, sorenessLevel) {
    let totalScore = 0;

    // Add previousDayScore multiplied by 0.3
    totalScore += previousDayScore * 0.3;

    // Score based on Mover Improver Day (cell C)
    let moverImproverScore = 0;
    if (moverImproverDay === 1) {
        moverImproverScore = 5;
    } else if (moverImproverDay === 2) {
        moverImproverScore = 7.5;
    } else if (moverImproverDay === 3) {
        moverImproverScore = 10;
    } else if (moverImproverDay === 4) {
        moverImproverScore = 12.5;
    } else {
        moverImproverScore = 0;
    }
    totalScore += moverImproverScore;

    // Score based on Warm-Up Level (cell D)
    let warmUpScore = 0;
    if (warmUpLevel === 1) {
        warmUpScore = 5;
    } else if (warmUpLevel === 2) {
        warmUpScore = 7.5;
    } else if (warmUpLevel === 3) {
        warmUpScore = 10;
    } else if (warmUpLevel === 4) {
        warmUpScore = 12.5;
    } else {
        warmUpScore = 0;
    }
    totalScore += warmUpScore;

    // Adding weighted values
    totalScore += pitches * 0.5;          // Pitches (cell E)
    totalScore += infieldThrows * 0.1;    // Infield Throws (cell F)
    totalScore += outfieldThrows * 0.3;   // Outfield Throws (cell G)
    totalScore += miscThrows * 0.25;      // Misc Throws (cell H)

    // Additional score based on Soreness Level (cell I)
    let sorenessScore = 0;
    switch (sorenessLevel) {
        case 10: sorenessScore = 32; break;
        case 9:  sorenessScore = 29; break;
        case 8:  sorenessScore = 26; break;
        case 7:  sorenessScore = 23; break;
        case 6:  sorenessScore = 20; break;
        case 5:  sorenessScore = 17; break;
        case 4:  sorenessScore = 14; break;
        case 3:  sorenessScore = 11; break;
        case 2:  sorenessScore = 8;  break;
        case 1:  sorenessScore = 5;  break;
        case 0:  sorenessScore = 0;  break;
        default: sorenessScore = 0;  break;
    }
    totalScore += sorenessScore;

    return totalScore;
}
