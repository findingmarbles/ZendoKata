function Zendo(trainingSet) {

    return {
        predict: function(config) {
            var maxScore = 0;
            var maxScoringIndexes = [];
            for (var i=0; i<trainingSet.length; i++) {
                var simScore = trainingSet[i][0].calcSimilarity(config);
                if (simScore > maxScore) {
                    maxScore = simScore;
                    maxScoringIndexes = [i];
                } else if (simScore == maxScore) {
                    maxScoringIndexes.push(i);
                }
            }
            return this.getMajorityPrediction(maxScoringIndexes);
        },
        getMajorityPrediction: function(maxScoringIndexes) {
            var prediction = this.getRandomBoolean();
            var trueCounter = 0;
            var falseCounter = 0;

            for (var i = 0; i<maxScoringIndexes.length; i++) {
                if (trainingSet[maxScoringIndexes[i]][1]) {
                    trueCounter++;
                } else {
                    falseCounter++;
                }
            }
            if (trueCounter > falseCounter) {
                prediction = true;
            } else if (falseCounter > trueCounter) {
                prediction = false;
            }
            return prediction;
        },
        getRandomBoolean: function() {
            return Math.random() > 0.5;
        }
    }
}

function Config(trainingConfig) {
    return {
        calcSimilarity: function(config) {
            var simScore = 0;
            var clonedConfig = JSON.parse( JSON.stringify(config) );
            var clonedTrainingConfig = JSON.parse( JSON.stringify(trainingConfig) );

            // Check for identical objects
            for (var i=0; i<clonedConfig.length; i++) {
                for (var k=0; k<clonedTrainingConfig.length; k++) {
                    if (clonedConfig[i].color == clonedTrainingConfig[k].color && clonedConfig[i].size == clonedTrainingConfig[k].size) {
                        simScore += 2;
                        clonedConfig.remove(i);
                        i--;
                        clonedTrainingConfig.remove(k);
                        break;
                    }
                }
            }

            // Check for 1 matching property
            for (var i=0; i<clonedConfig.length; i++) {
                for (var k=0; k<clonedTrainingConfig.length; k++) {
                    if (clonedConfig[i].color == clonedTrainingConfig[k].color || clonedConfig[i].size == clonedTrainingConfig[k].size) {
                        simScore += 1;
                        clonedConfig.remove(i);
                        i--;
                        clonedTrainingConfig.remove(k);
                        break;
                    }
                }
            }

            // Subtract points for leftover items in training config
            simScore -= Math.abs(clonedConfig.length - clonedTrainingConfig.length);

            return simScore;
        }
    }
}


/******** Helpers ***********/

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
