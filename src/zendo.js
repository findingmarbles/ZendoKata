function Zendo(trainingSet) {

    return {
        predict: function(config) {
            var maxScore = 0;
            var maxScoringSet = [];
            for (var i=0; i<trainingSet.length; i++) {
                var simScore = trainingSet[i][0].calcSimilarity(config);
                if (simScore > maxScore) {
                    maxScore = simScore;
                    maxScoringSet = [i];
                } else if (simScore == maxScore) {
                    maxScoringSet.push(i);
                }
            }
            return this.getMajorityPrediction(maxScoringSet);
        },
        getMajorityPrediction: function(maxScoringSet) {
            var prediction = getRandomBoolean();
            var trueCounter = 0;
            var falseCounter = 0;

            for (var i = 0; i<maxScoringSet.length; i++) {
                if (trainingSet[maxScoringSet[i]][1]) {
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
        },
        // TODO: Can probably be deleted later on
        // If not deleted: Make independent of order! - Copy array and remove matched obj
        isSameAs: function(config) {
            if (trainingConfig.length != config.length) {
                return false;
            }
            for (var i=0; i<trainingConfig.length; i++) {
                if (trainingConfig[i].color != config[i].color || trainingConfig[i].size != config[i].size) {
                    return false;
                }
            }
            return true;
        }
    }
}


/******** Helpers ***********/

function getRandomBoolean() {
    return Math.random() > 0.5;
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
